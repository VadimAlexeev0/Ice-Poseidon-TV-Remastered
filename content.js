/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "options", function() { return options; });
/* harmony export (immutable) */ __webpack_exports__["getOptions"] = getOptions;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pageCheck__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__subscribers__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__chatObserver__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__tabComplete__ = __webpack_require__(6);






const DISALLOWED_CHARS = ['\\', ':', '/', '&', "'", '"', '?', '!', '#'],
    SCROLL_ENABLED_URL = chrome.extension.getURL('icons/scroll-enabled.png'),
    SCROLL_DISABLED_URL = chrome.extension.getURL('icons/scroll-disabled.png');
/* harmony export (immutable) */ __webpack_exports__["DISALLOWED_CHARS"] = DISALLOWED_CHARS;

/* harmony export (immutable) */ __webpack_exports__["SCROLL_ENABLED_URL"] = SCROLL_ENABLED_URL;

/* harmony export (immutable) */ __webpack_exports__["SCROLL_DISABLED_URL"] = SCROLL_DISABLED_URL;


let options = null;

window.IPTVLoaded = false;
window.LSPageLoaded = false;

function getOptions() {
    if (options === null) {
        return JSON.parse(localStorage.getItem('optionsCache'));
    }

    return options;
}

const onNewPageLoad = function () {

    $('[class^="iptv-"]').remove();
    $('.yt-live-chat-header-renderer#title').text('Chat');

    setTimeout(function () {
        if (__WEBPACK_IMPORTED_MODULE_0__pageCheck__["a" /* default */].isLivestream() && __WEBPACK_IMPORTED_MODULE_0__pageCheck__["a" /* default */].isIcePoseidonStream()) {
            init();
            if (!window.LSPageLoaded) { __WEBPACK_IMPORTED_MODULE_0__pageCheck__["a" /* default */].livestreamPage(); window.LSPageLoaded = true; }
        }
    }, 2E3);
};

(function () {
    const target = document.querySelector('head > title');

    const observer = new MutationObserver(function (mutations) {
        mutations.forEach(function () {
            onNewPageLoad();
        });
    });

    if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__util__["a" /* isNode */])(target)) {
        return;
    }

    const options = {
        characterData: true,
        attributes: false,
        childList: true,
        subtree: true
    };

    observer.observe(target, options);
}());

var init = function() {
    if(!window.IPTVLoaded) {
        window.IPTVLoaded = true;
        setTimeout(function () {
            chrome.runtime.sendMessage('requestSubscriptions', function (response) {
                options['subscriptions'] = response;
            });
        }, 5000);

        chrome.runtime.sendMessage('requestLocalstorage', function (response) {

            options = response;

            localStorage.setItem('optionsCache', JSON.stringify(options));

            if (getOptions()['enableChatColors']) {
                const a = chrome.extension.getURL('external/chat-colors.css');
                $('<link rel="stylesheet" type="text/css" href="' + a + '" >').appendTo('head');
            }

            if (getOptions()['disableAvatars'] === true) {
                $('<style type="text/css">.style-scope .yt-live-chat-item-list-renderer #author-photo { width: 0px; height: 0px; margin-right: 0px; visibility: hidden; }.style-scope.yt-live-chat-message-input-renderer.no-transition{ display: none !important; }.style-scope yt-live-chat-message-input-renderer #avatar { display: none !important;margin:0 !important; }</style>').appendTo('head');
            }

            if (getOptions()['enableSplitChat'] === true) {
                $('<style type="text/css">.style-scope yt-live-chat-text-message-renderer { border-top: 0.5px solid #333333; border-bottom: 0.5px solid #000000; }</style>').appendTo('head');
            }

            if (getOptions()['showDeletedMessages'] === true) {
                $('<style type="text/css">.yt-live-chat-text-message-renderer-0[is-deleted]:not([show-original]) #message.yt-live-chat-text-message-renderer {display: inline;} .yt-live-chat-text-message-renderer-0 #deleted-state.yt-live-chat-text-message-renderer { color: rgba(255, 255, 255, 0.25); } .yt-live-chat-text-message-renderer-0[is-deleted]:not([show-original]) #message.yt-live-chat-text-message-renderer { color: rgba(255, 255, 255, 0.25); } .yt-live-chat-text-message-renderer-0 #deleted-state:before{content: "  "}</style>').appendTo('head');
            }

            if (getOptions()['mentionHighlight'] === true) {
                $('<style type="text/css">.yt-live-chat-text-message-renderer-0 .mention.yt-live-chat-text-message-renderer { background-color: rgba(114, 15, 15, 0) !important; padding: 0px 0px !important; }</style>').appendTo('head');
            }

            const chatColor = $('.yt-live-chat-header-renderer-0').css('background-color');
            const chatColorPopout = $('.style-scope.yt-live-chat-renderer[role="heading"]').css('background-color');

            if (chatColor === 'rgb(40, 40, 40)' || chatColorPopout === 'rgb(40, 40, 40)') {
                $('<style type="text/css">.yt-live-chat-text-message-renderer-0[author-type=moderator]{background-color:#282828}</style>').appendTo('head');
                $('<style type="text/css">.style-scope.yt-live-chat-item-list-renderer[author-type=moderator]{background-color:#282828}</style>').appendTo('head');
            } else if (chatColor === 'rgba(238, 238, 238, 0.4)' || chatColorPopout === 'rgba(238, 238, 238, 0.4)') {
                $('<style type="text/css">.yt-live-chat-text-message-renderer-0[author-type=moderator]{background-color:#e2e2e2}</style>').appendTo('head');
                $('<style type="text/css">.style-scope.yt-live-chat-item-list-renderer[author-type=moderator]{background-color:#e2e2e2}</style>').appendTo('head');
            }
        });

        __WEBPACK_IMPORTED_MODULE_1__subscribers__["a" /* default */].loadBadges();

        if (getOptions()['emotesTwitch'] === true || getOptions()['emotesSub'] === true || getOptions()['emotesBTTV'] === true || getOptions()['emotesIce'] === true) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__chatObserver__["a" /* default */])();
        }

        __WEBPACK_IMPORTED_MODULE_4__tabComplete__["a" /* default */].bindEvent();

        console.info('[IPTV] Init!');

    }
}

onNewPageLoad();


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__main__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__overlay_loadingEmotesInfo__ = __webpack_require__(12);




class Emote
{
    /**
     * Load all enabled emotes.
     * @constructor
     */
    static loadEmotes()
    {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__overlay_loadingEmotesInfo__["a" /* default */])();

        setTimeout(function() {

            const $loading = $('.iptv-loading-emotes');

            if ($loading[0]) {

                $loading.css({
                    'color': '#c0392b',
                    'background-color': '#282828',
                    'right': '19px'
                });

                $loading.text('Failed loading some emotes (API servers down)');
            }

            setTimeout(function() {
                $('.iptv-loading-emotes').remove();
            }, 7.5 * 1000);

        }, 10 * 1000);

        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__main__["getOptions"])()['emotesTwitch']) Emote.loadTwitchEmotes();
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__main__["getOptions"])()['emotesSub']) Emote.loadSubEmotes();

        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__main__["getOptions"])()['emotesBTTV']) {
            Emote.loadBTTVEmotes();
            Emote.loadBTTVChannelEmotes();
        }

        Emote.waitTillEmotesLoaded();
    };

    /**
     * setTimeout that keeps running until all emotes are loaded.
     * @static
     */
    static waitTillEmotesLoaded()
    {
        if ((__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__main__["getOptions"])()['emotesTwitch'] !== Emote.states['twitch'].loaded) ||
            (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__main__["getOptions"])()['emotesSub'] !== Emote.states['sub'].loaded) ||
            (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__main__["getOptions"])()['emotesBTTV'] !== Emote.states['BTTV'].loaded) ||
            (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__main__["getOptions"])()['emotesBTTV'] !== Emote.states['BTTVChannels'].loaded)) {

            setTimeout(Emote.waitTillEmotesLoaded, 250);
            return;
        }

        // Temp fix to prevent ram from filling up with messages.
        setInterval(function () {
            Emote.messages = {};
        }, 1000 * 60 * 5);

        Emote.loadIceEmotes();

        const blacklistedEmotes = ['THICC'];

        for (let i = 0; i < blacklistedEmotes.length; i++) {
            delete Emote.emotes[blacklistedEmotes[i]];
        }

        $('.iptv-loading-emotes').remove();
        Emote.replaceExistingEmotes();
		
		console.log(Object.keys(Emote.emotes).length);
    };

    /**
     * Replace existing text with emotes in chat, happens when emotes are done loading.
     * @static
     */
    static replaceExistingEmotes()
    {
        const chatElements = $('.style-scope yt-live-chat-item-list-renderer x-scope yt-live-chat-text-message-renderer-0');
        const chatElementsPopout = $('#items.yt-live-chat-item-list-renderer .yt-live-chat-item-list-renderer');

        if (chatElements.length < 1 && chatElementsPopout < 1) {
            setTimeout(Emote.replaceExistingEmotes, 250);
            return;
        }

        chatElements.each(function (i, el) {
            Emote.emoteCheck(el);
        });

        chatElementsPopout.each(function (i, el) {
            Emote.emoteCheck(el);
        });
    };

    /**
     * Checks if a message contains emotes.
     * @static
     * @param {node} node - Message node
     */
    static emoteCheck(node)
    {
        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__main__["getOptions"])()['emotesTwitch'] === false && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__main__["getOptions"])()['emotesSub'] === false && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__main__["getOptions"])()['emotesBTTV'] === false && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__main__["getOptions"])()['emotesIce'] === false) {
            return;
        }

        const $message = $(node).find('#message');
        Emote.kappaCheck($message);

        let oldHTML = $message.html().trim();
        let msgHTML = oldHTML;

        const words = msgHTML.replace('/\xEF\xBB\xBF/', '').replace('﻿', '').split(' ');
        const uniqueWords = [];
        let emoteCount = 0;
        let changeAttempts = 0;

        $.each(words, function (i, el) {
            if ($.inArray(el, uniqueWords) === -1) uniqueWords.push(el);
        });

        for (let i = 0; i < uniqueWords.length; i++) {

            const word = uniqueWords[i];

            if (typeof Emote.emotes[word] === 'undefined') {
                continue;
            }

            const messageTier = $(node).find('#author-photo').data('sub-tier');
            let tooltipText = word;

            if (messageTier < Emote.emotes[word]['tier']) {
                return;
            }

            const emoteTier = Emote.emotes[word]['tier'];

            if (typeof Emote.emotes[word]['tier'] !== 'undefined') {
                tooltipText = `IcePoseidon.com &#10;&#10;Tier ${emoteTier} Sub Emote &#10;&#10;${word}`;
            }

            emoteCount++;

            const emoteHtml = `<span class="hint--top" aria-label="${tooltipText}">
                                    <img src="${Emote.emotes[word]['url']}" alt="${word}" style="display:inline;width:auto;max-height:32px;overflow:hidden;" class="extension-emote">
                                </span>`;

            msgHTML = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__util__["b" /* replaceAll */])(msgHTML, word, emoteHtml);
        }

        if (emoteCount < 1) {
            return;
        }

        $message.html(msgHTML);

        $message.parent().parent().bind('DOMSubtreeModified', function () {

            const $message = $(this).find('#message');
            Emote.kappaCheck($message);

            let html = $message.html().trim();

            if (changeAttempts > 30) {
                return;
            }

            if (typeof html === 'undefined' || html === '') {
                return;
            }

            if (html.includes('extension-emote')) {
                return
            }

            changeAttempts++;

            $message.html(msgHTML);
        });
    };

    /**
     * Checks if a message contains a kappa emote.
     * @static
     * @param {node} msg - Message node
     */
    static kappaCheck(msg)
    {
        $('img', msg).each(function() {

            const $img = $(this);

            if (/\ud83c\udf1d/g.test($img.attr('alt'))) {
                $img.replaceWith(document.createTextNode('Kappa'));
            }
        });
    };

    /**
     * Load Twitch emotes.
     * @static
     */
    static loadTwitchEmotes()
    {
        Emote.emotes['LUL'] = { url: 'https://cdn.betterttv.net/emote/567b00c61ddbe1786688a633/1x' };
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://twitchemotes.com/api_cache/v3/global.json');
        xhr.send();
        xhr.timeout = 5000;
        const urlTemplate = 'https://static-cdn.jtvnw.net/emoticons/v1/';

        xhr.ontimeout = function() {
            Emote.states['twitch'].loaded = true;
        };

        xhr.onerror = function() {
            Emote.states['twitch'].loaded = true;
        };

        xhr.onload = function () {

            Emote.states['twitch'].loaded = true;

            if (xhr.responseText === '') {
                return;
            }

            const emoteDic = JSON.parse(xhr.responseText);

            for (const emote in emoteDic) {

                Emote.addEmoteToTrie(emote);

                Emote.emotes[emote] = {
                    url: urlTemplate + emoteDic[emote]['id'] + '/' + '1.0'
                };
            }
        }
    };

    /**
     * Load Twitch subscriber emotes.
     * @static
     */
    static loadSubEmotes()
    {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://twitchemotes.com/api_cache/v3/subscriber.json');
        xhr.send();
        xhr.timeout = 5000;
        const urlTemplate = 'https://static-cdn.jtvnw.net/emoticons/v1/';

        xhr.ontimeout = function() {
            Emote.states['sub'].loaded = true;
        };

        xhr.onerror = function() {
            Emote.states['sub'].loaded = true;
        };

        xhr.onload = function () {

            Emote.states['sub'].loaded = true;

            if (xhr.responseText === '') {
                return;
            }

            const emoteDic = JSON.parse(xhr.responseText);

            for (const channel in emoteDic) {
			
                for (const i in emoteDic[channel]['emotes']) {

                    const dict = emoteDic[channel]['emotes'][i];
                    const code = dict['code'];
				
                    if (Emote.isValidEmote(code)) {

                        Emote.addEmoteToTrie(code);

                        Emote.emotes[code] = {
                            url: urlTemplate + dict['id'] + '/' + '1.0'
                        };
                    }
                }
            }
        }
    };

    /**
     * Load BTTV emotes.
     * @static
     */
    static loadBTTVEmotes()
    {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://api.betterttv.net/2/emotes');
        xhr.send();
        xhr.timeout = 5000;
        const urlTemplate = 'https://cdn.betterttv.net/emote/';

        xhr.ontimeout = function() {
            Emote.states['BTTV'].loaded = true;
        };

        xhr.onerror = function() {
            Emote.states['BTTV'].loaded = true;
        };

        xhr.onload = function () {

            Emote.states['BTTV'].loaded = true;

            if (xhr.responseText === '') {
                return;
            }

            const emoteList = JSON.parse(xhr.responseText)['emotes'];

            for (const i in emoteList) {

                const dict = emoteList[i];

                if (!Emote.containsDisallowedChar(dict['code'])) {

                    Emote.addEmoteToTrie(dict['code']);

                    Emote.emotes[dict['code']] = {
                        url: urlTemplate + dict['id'] + '/' + '1x'
                    };
                }
            }
        }
    };

    /**
     * Load BTTV channel emotes.
     * @static
     */
    static loadBTTVChannelEmotes()
    {
        const channels = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__main__["getOptions"])()['BTTVChannels'];
        const commaChannels = channels.replace(/\s+/g, '').split(',');
        let channelsLength = commaChannels.length;

        commaChannels.forEach(function (channel) {

            if (channel.trim() === '') {
                channelsLength--;

                if (Emote.states['BTTVChannels'].loadedCount >= channelsLength) {
                    Emote.states['BTTVChannels'].loaded = true;
                }

                return;
            }

            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'https://api.betterttv.net/2/channels/' + channel);
            xhr.send();
            xhr.timeout = 5000;
            const urlTemplate = 'https://cdn.betterttv.net/emote/';

            xhr.ontimeout = function() {

                Emote.states['BTTVChannels'].loadedCount++;

                if (Emote.states['BTTVChannels'].loadedCount >= channelsLength) {
                    Emote.states['BTTVChannels'].loaded = true;
                }
            };

            xhr.onerror = function() {

                Emote.states['BTTVChannels'].loadedCount++;

                if (Emote.states['BTTVChannels'].loadedCount >= channelsLength) {
                    Emote.states['BTTVChannels'].loaded = true;
                }
            };

            xhr.onload = function () {

                Emote.states['BTTVChannels'].loadedCount++;

                if (Emote.states['BTTVChannels'].loadedCount >= channelsLength) {
                    Emote.states['BTTVChannels'].loaded = true;
                }

                if (xhr.responseText === '') {
                    return;
                }

                const emoteList = JSON.parse(xhr.responseText)['emotes'];

                for (const i in emoteList) {

                    const dict = emoteList[i];

                    if (!Emote.containsDisallowedChar(dict['code'])) {

                        Emote.addEmoteToTrie(dict['code']);

                        Emote.emotes[dict['code']] = {
                            url: urlTemplate + dict['id'] + '/' + '1x',
                            channel: channel + ' (bttv)'
                        };
                    }
                }
            }
        }, this);
    };

    /**
     * Load Ice's old subscriber emotes.
     * @static
     */
    static loadIceEmotes()
    {
        const subTierEmotes = {
            1: [
                'purple1', 'purple2', 'purple3', 'purple4', 'purpleAhhh', 'purpleArm1', 'purpleArm2', 'purpleBluescreen', 'purpleBruh', 'purpleCigrip', 'purpleClaus',
                'purpleCoolstory', 'purpleCreep', 'purpleEnza', 'purpleFake', 'purpleReal', 'purpleFrank', 'purpleFro', 'purpleIce', 'purpleKKona', 'purpleLUL',
                'purpleOmg', 'purplePride', 'purpleRofl', 'purpleLeo', 'purpleW', 'purpleWat'
            ],
            2: [
                'purpleCx', 'purpleLewd', 'purpleLama', 'purplePizza', 'purpleWallet', 'purpleS', 'purpleLate', 'purpleMoose', 'purpleNose', 'purpleWut'
            ],
            3: [
                'purpleAllen', 'purpleTroll'
            ]
        };

        for(const tier in subTierEmotes) {
            for (let i = 0; i < subTierEmotes[tier].length; i++) {

                Emote.addEmoteToTrie(subTierEmotes[tier][i]);

                Emote.emotes[subTierEmotes[tier][i]] = {
                    url: chrome.extension.getURL('/icons/emotes/' + subTierEmotes[tier][i] + '.png'),
                    tier: tier
                }
            }
        }
    };

    /**
     * Checks if text is a valid emote
     * @static
     * @param {string} text
     */
    static isValidEmote(text)
    {
        return !(text[0].match(/[A-Z]/g) ||
            text.match(/^[a-z]+$/g) ||
            text.match(/^\d*$/g)
        );
    };

    /**
     * Checks if text contains disallowed characters.
     * @static
     * @param {string} word
     */
    static containsDisallowedChar(word)
    {
        for (const c in __WEBPACK_IMPORTED_MODULE_1__main__["DISALLOWED_CHARS"]) {
            if (word.indexOf(c) > -1) {
                return true;
            }
        }

        return false;
    };


    /**
     * Adds emote into global Emote.trie.
     * @static
     * @param {string} emoteString
     */
    static addEmoteToTrie(emoteString) {
        var lowered = emoteString.toLowerCase();
        var localTrie = Emote.trie;
        for (var i = 0; i < emoteString.length; i++) {
            if (lowered.charAt(i) in localTrie) {
                if(typeof localTrie[lowered.charAt(i)] !== 'string' || i == emoteString.length-1){
                    localTrie = localTrie[lowered.charAt(i)];
                }
            } else {
                if (i == emoteString.length - 1) {
                    localTrie[lowered.charAt(i)] = emoteString;
                } else {
                    localTrie[lowered.charAt(i)] = [];
                }
                localTrie = localTrie[lowered.charAt(i)];
            }
        }
    };
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Emote;
;

Emote.states = {
    twitch: {
        loaded: false
    },
    sub: {
        loaded: false
    },
    BTTV: {
        loaded: false
    },
    BTTVChannels: {
        loaded: false,
        loadedCount: 0
    }
};

Emote.emotes = {};
Emote.trie = [];


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__chatColors__ = __webpack_require__(15);



class Subscribers
{
    static loadBadges()
    {
        Subscribers.badges['1'] = chrome.extension.getURL('/icons/tierBadge1.png');
        Subscribers.badges['2'] = chrome.extension.getURL('/icons/tierBadge2.png');
        Subscribers.badges['3'] = chrome.extension.getURL('/icons/tierBadge3.png');
    }

    static setSelfInfo(imgSrc)
    {
        const profileId = imgSrc.split('/')[3];
        const subTier = __WEBPACK_IMPORTED_MODULE_0__main__["getOptions"]['subscriptions'][profileId]['subtier'];

        Subscribers.self = {
            profileImageUrl: imgSrc,
            profileId: profileId,
            subTier: subTier
        };
    }

    /**
     * Retrieves subscriber info
     * @static
     */
    static addBadges(node)
    {
        if ($(node).find('img').length === 0) {
            return;
        }

        if (typeof $(node).find('#author-photo')[0] === 'undefined') {
            return;
        }

        /** Listen for mutations on author image */
        const imageObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {

                if (mutation.attributeName === 'src') {

                    const profileId = mutation.target.src.split('/')[3];

                    if (profileId === '') {
                        return;
                    }

                    mutation.target.setAttribute('data-profile-id', profileId);
					__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__chatColors__["a" /* default */])(mutation.target, profileId);

                    const subInfo = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__main__["getOptions"])()['subscriptions'][profileId];

                    if (typeof subInfo === 'undefined') {
                        mutation.target.setAttribute('data-sub-tier', 0);
                    } else {
                        mutation.target.setAttribute('data-sub-tier', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__main__["getOptions"])()['subscriptions'][profileId]['subtier']);
                    }

                    Subscribers.setBadgeImage(node, profileId);

                    /** Listen for mutations on data-profile id of author image */
                    const dataObserver = new MutationObserver(function(mutations) {

                        mutations.forEach(function(mutation) {

                            if (mutation.target.getAttribute('data-profile-id') === '') {
                                mutation.target.setAttribute('data-profile-id', profileId);
								__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__chatColors__["a" /* default */])(mutation.target, profileId);
                            }

                            if (mutation.target.getAttribute('data-sub-tier') === '') {

                                const subInfo = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__main__["getOptions"])()['subscriptions'][profileId];

                                if (typeof subInfo === 'undefined') {
                                    mutation.target.setAttribute('data-sub-tier', 0);
                                } else {
                                    mutation.target.setAttribute('data-sub-tier', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__main__["getOptions"])()['subscriptions'][profileId]['subtier']);
									__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__chatColors__["a" /* default */])(mutation.target, profileId);
                                }
                            }
                        });
                    });

                    const dataObserverConfig = { attributes: true, childList: true, characterData: true, subtree: false };
                    dataObserver.observe(mutation.target, dataObserverConfig);
                }
            });
        });

        const imageObserverConfig = { attributes: true, childList: true, characterData: true, subtree: true };
        imageObserver.observe($(node).find('#author-photo')[0], imageObserverConfig);
    };

    static setBadgeImage(node, profileId)
    {
        if ($(node).find('.tier-badge').length !== 0) {
            return;
        }

        const subInfo = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__main__["getOptions"])()['subscriptions'][profileId];

        if (typeof subInfo === 'undefined') {
            return;
        }

        const tierImg = Subscribers.badges[subInfo['subtier']];

        const imgHtml = `<span class="hint--right" aria-label="IcePoseidon.com &#10;&#10;Tier ${subInfo['subtier']} Subscriber">
                            <img src="${tierImg}" class="tier-badge" />
                         </span>`;

        $(node).find('#author-badges').prepend(imgHtml);

        if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__main__["getOptions"])()['enableChatColors']) {
            $(node).find('#author-name').css('color', subInfo['color']);
        }

        const html = $(node).find('#author-badges').html();

        $(node).find('#author-badges').on('DOMSubtreeModified', function () {
            if ($(this).find('.tier-badge').length === 0) {
                $(this).html(html);

                /** Remove empty badges added by YT */
                $(this).parent().find('.yt-live-chat-author-badge-renderer-0').each(function(i, el) {
                    if ($(el).width() === 0) {
                        $(el).remove();
                    }
                });
            }
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Subscribers;
;

Subscribers.chatMessages = {};
Subscribers.badges = {};


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = replaceAll;
/* harmony export (immutable) */ __webpack_exports__["a"] = isNode;
function replaceAll(str, find, replace) {
    let string = "("+find+")(?![^alt=\"]*\")";
    return str.replace(new RegExp(string, 'g'), replace);
}

function isNode(o) {
    return (
        typeof Node === 'object' ? o instanceof Node : o && typeof o === 'object' && typeof o.nodeType === 'number' && typeof o.nodeName === 'string'
    );
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = chatObserver;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__emote__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__subscribers__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mentionHighlight__ = __webpack_require__(7);




/**
 * Binds chat mutation observer and listen for new chat messages.
 */
function chatObserver()
{
    /** Loop over existing messages and add badges */
    $(document).on('DOMNodeInserted', $('#chat').parent(), function (e) {

        if ($(e.target).find('img').length === 0) {
            return;
        }

        /** Listen for self-avatar load and set self-info */
        if ($(e.target).find('#avatar').length !== 0) {

            $(e.target).find('#avatar').on('load', function() {

                const imgSrc = $(this).attr('src');

                if (imgSrc.includes('https://')) {
                    __WEBPACK_IMPORTED_MODULE_1__subscribers__["a" /* default */].setSelfInfo(imgSrc);
                }
            });
        }

        if (typeof $(e.target).find('#author-photo')[0] === 'undefined') {
            return;
        }

        __WEBPACK_IMPORTED_MODULE_1__subscribers__["a" /* default */].addBadges(e.target);
    });

    const target = document.querySelector('.style-scope .yt-live-chat-item-list-renderer');

    if (!target) {
        setTimeout(chatObserver, 250);
        return;
    }

    // Chat box observer
    const observer = new MutationObserver(function (mutations) {

        mutations.forEach(function (mutation) {

            const newNodes = mutation.addedNodes;

            if (newNodes !== null) {

                const $nodes = $(newNodes);

                $nodes.each(function () {

                    const $node = $(this);

                    if (!$node.hasClass('yt-live-chat-item-list-renderer')) {
                        return;
                    }

                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__mentionHighlight__["a" /* default */])($node);
                    __WEBPACK_IMPORTED_MODULE_0__emote__["a" /* default */].emoteCheck($node);
                });
            }
        });
    });

    const options = {
        characterData: false,
        attributes: false,
        childList: true,
        subtree: true
    };

    observer.observe(target, options);
};


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__emote__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__overlay_donateButton__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__overlay_sponsorButton__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__overlay_colorButton__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__overlay_checkIfWatchingLive__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__overlay_alwaysScrollDown__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__overlay_sponsorCheck__ = __webpack_require__(14);








class PageCheck
{
    /**
     * Checks if user is watching from wrong livestream page and warns them.
     * @static
     */
    static youtubeGaming()
    {
        // Run checks in steps so we're not calling methods unnecessarily
        const url = document.location.href;

        if(!url.includes('gaming.youtube')){
            const iframe = document.getElementById('live-chat-iframe');

            if(iframe){
                const $textWrapper = $('.yt-user-info');
                const text = $textWrapper.find('a').text();

                if(text === 'Ice Poseidon'){
                    const redirectConfirm = confirm('[Ice PoseidonTV] Go to the official Ice Poseidon livestream page?');

                    if (redirectConfirm === true) {
                        window.location = 'https://gaming.youtube.com/ice_poseidon/live';
                    }
                }
            }
        }
    };

    /**
     * Checks if user is watching a livestream on Youtube gaming.
     * @static
     */
    static livestreamPage()
    {
        // Run checks in steps so we're not calling methods unnecessarily
        const url = document.location.href;
        const target = document.getElementById('owner');
        const text = $(target).find('span').text();

        if(!url.includes('live_chat') && !url.includes('is_popout=1')){
            const chat = document.getElementById('chat');

            if(!target || !chat){
                PageCheck.streampageChecks++;

                if (PageCheck.streampageChecks < 5)
                    setTimeout(PageCheck.livestreamPage, 1000);

                return false;
            }
        }

        if(text === 'Ice Poseidon') {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__overlay_donateButton__["a" /* default */])();
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__overlay_sponsorButton__["a" /* default */])();
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__overlay_colorButton__["a" /* default */])();
            setTimeout(__WEBPACK_IMPORTED_MODULE_6__overlay_sponsorCheck__["a" /* default */].check, 2500);
        }

        __WEBPACK_IMPORTED_MODULE_0__emote__["a" /* default */].loadEmotes();
        __WEBPACK_IMPORTED_MODULE_5__overlay_alwaysScrollDown__["a" /* default */].init();
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__overlay_checkIfWatchingLive__["a" /* default */])();

        PageCheck.streampageChecks = 0;
    };

    /**
     * Check if user is watching a livestream.
     * @static
     */
    static isLivestream() {
        const liveButton = document.querySelector('.ytp-live-badge.ytp-button');
        const chatApp    = document.querySelector('yt-live-chat-app');
        const chatiFrame = document.querySelector('#live-chat-iframe');
        const chatHeader = document.querySelector('.yt-live-chat-header-renderer');

        // Thanks StackOverflow! https://stackoverflow.com/questions/3420004/access-parent-url-from-iframe
        var url = (window.location != window.parent.location)
            ? document.referrer
            : document.location.href;


        var urlCheck = (url.indexOf('iceposeidon.com') > -1);
        var liveButtonCheck = (document.body.contains(liveButton) && !liveButton.getAttribute('disabled'));
        var chatCheck = (document.body.contains(chatApp) || document.body.contains(chatiFrame) || document.body.contains(chatHeader));

        console.debug("URL CHECK:", urlCheck, url);
        console.debug("LIVE BUTTON CHECK:", liveButtonCheck);
        console.debug("CHAT EXISTS CHECK:", chatCheck);

        if (urlCheck || liveButtonCheck || chatCheck) {
            console.debug("IS LIVESTREAM!");
            return true;
        } else {
            console.debug("IS NOT LIVESTREAM");
            return false;
        }
    }

    /**
     * Check if user is watching an Ice Poseidon livestream.
     * @static
     */
    static isIcePoseidonStream() {
        // Thanks StackOverflow! https://stackoverflow.com/questions/3420004/access-parent-url-from-iframe
        var url = (window.location != window.parent.location)
            ? document.referrer
            : document.location.href;
        var YTGchannel = $("ytg-owner-badges").parent().attr('href');
        var YTchannel  = $("a.ytd-video-owner-renderer").attr('href');

        var whitelistedChannels = [
            "/channel/UCv9Edl_WbtbPeURPtFDo-uA", // Ice Poseidon
            "/channel/UCpxAv8i0MTPoci7I7aFNxZg", // George Allen
            "/channel/UCaDJ_DTz3kbneMWiV31YiFA", // Ansien 12 / andries_dev
            "/channel/UCTmrHQEEFDYPy51mUg0JpjA", // xByt3z
            "/channel/UC1EzZOW1tVEK2vjmbSo137A", // xByt3z IPTV testing stream
            "/channel/UC8EoOFAm_reNXGHWK-kBUXw"  // sparcut
        ];

        var urlCheck = (url.indexOf('iceposeidon.com') > -1 || url.indexOf('live_chat') > -1);
        var channelCheck = (whitelistedChannels.indexOf(YTGchannel) > -1 || whitelistedChannels.indexOf(YTchannel) > -1);

        console.debug("URL CHECK:", urlCheck, url);
        console.debug("CHANNEL CHECK:", channelCheck, YTGchannel, YTchannel);

        if (urlCheck || channelCheck) {
            console.debug("IS ICEPOSEIDON STREAM!");
            return true;
        } else {
            console.debug("IS NOT ICEPOSEIDON STREAM!");
            return false;
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PageCheck;
;

PageCheck.streampageChecks = 0;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__emote__ = __webpack_require__(1);



class TabComplete
{
    /**
    Recursively adds to valuesArray possible emotes from localTrie
    */
    static getPossibleValues(localTrie, valuesArray) {
        if (typeof localTrie === 'string') {
            valuesArray.push(localTrie);
        } else {
            let keys = Object.keys(localTrie);
            let returnValues = [];
            for (let i = 0; i < keys.length; i++) {
                TabComplete.getPossibleValues(localTrie[keys[i]], valuesArray);
            }
        }
    }

    /**
    Searches Emote.trie for all emotes starting with s. If it finds multiple values, returns pos (index) value
    */
    static findSimilar(s, pos) {
        s = s.toLowerCase();
        let i = 0;
        let localTrie = __WEBPACK_IMPORTED_MODULE_0__emote__["a" /* default */].trie;
        while ((i < s.length) && (s.charAt(i) in localTrie)) {
            localTrie = localTrie[s.charAt(i)];
            i++;
        }
        if (i == 0) return false;
        else {
            let values = [];
            TabComplete.getPossibleValues(localTrie, values);
            if (pos >= values.length) {
                return false;
            } else {
                return values[pos];
            }
        }
    }

    static bindEvent() {
        $("yt-live-chat-text-input-field-renderer").on('keydown', "div#input", function(e) {
            let keyCode = e.keyCode || e.which;
            if (keyCode == 9) {
                e.preventDefault();
                let currentText = $(this).text();
                if(/\s$/.test(currentText)){ //last char is whitespace - so dont treat it as a word. split function doesnt actually split eg "TriHard " into "TriHard" and "" but returns "TriHard "
                    return;
                }
                let words = currentText.split(' ');
                if (TabComplete.lastWord.length) { //word typed by used has been already replaced by some suggestion -> remove that suggestion (is going to get replaced by new suggestion or lastWord)
                    words.pop();
                } else {
                    TabComplete.lastWord = words.pop();
                }
                let similar = TabComplete.findSimilar(TabComplete.lastWord, TabComplete.tabPressedCount);
                let newText = '';
                for (let i = 0; i < words.length; i++) {
                    newText += words[i] + ' ';
                }
                if (similar) {
                    newText += similar;
                    TabComplete.tabPressedCount++;
                } else {
                    newText += TabComplete.lastWord;
                    TabComplete.lastWord = '';
                    TabComplete.tabPressedCount = 0;
                }
                $(this).text(newText);
                //adds focus to last char
                let range = document.createRange();
                range.selectNodeContents($(this)[0]);
                range.collapse(false);
                let sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);

                //updates character count
                this.dispatchEvent(TabComplete.inputChangedEvent);
            } else {
                TabComplete.tabPressedCount = 0;
                TabComplete.lastWord = '';
            }
        });
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = TabComplete;
;

TabComplete.inputChangedEvent = new Event('input', {
    'bubbles': true,
    'cancelable': true
});
TabComplete.tabPressedCount = 0;
TabComplete.lastWord = '';


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = MentionHighlight;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main__ = __webpack_require__(0);


/**
 * Checks if a message contains mention and changes background to BTTV style background.
 * @param {node} node - Message node
 */
function MentionHighlight(node)
{
    const currentUser = $('#author #author-name').text().toLowerCase();
    const authorType = node.get(0).getAttribute('author-type');

    if (typeof currentUser === 'undefined') {
        return;
    }

    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__main__["getOptions"])()['mentionHighlight'] && currentUser.length > 2 && !node.hasClass('yt-live-chat-legacy-paid-message-renderer-0')) { // Check it's not sponsor / superchat, also mentionHighlight enabled

        const uniqueid = node.get(0).getAttribute('id'); // Copy unique message id
        const message = (" " + node.find('#message').text().toLowerCase() + " ").replace(/[\u200B-\u200D\uFEFF]/g, '');

        if (uniqueid === null) {
            return;
        }

        if (uniqueid.length > 30 && (authorType === "owner" || message.indexOf(' '+currentUser+' ') !== -1 || message.indexOf('@'+currentUser+' ') !== -1)) { // If your name is in the message, and it's not your message or the message is from the streamer
            node.get(0).style.backgroundColor = "rgba(255,0,0,0.40)";
            node.find('#author-name').get(0).style.color = "#ffffff";
        }
    }
};


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main__ = __webpack_require__(0);


class AlwaysScrollDown
{
    /**
     * Creates 'Always scroll down' overlay and binds the necessary listeners.
     * @constructor
     */
    static init()
    {
        const scrolldownWrapper = $('.iptv-scrolldown-wrapper');

        if (scrolldownWrapper.length) {
            scrolldownWrapper.remove();
        }

        const scrollWrapper = document.createElement('div');

        scrollWrapper.setAttribute('aria-label', 'Always scroll down (Enabled)');
        scrollWrapper.classList.add('hint--top', 'iptv-scrolldown-wrapper');

        $(scrollWrapper).css({
            'position': 'absolute',
            'right': '113px',
            'bottom': '18px'
        });

        $(scrollWrapper).html(`
            <a href="javascript:void(0)" class="iptv-scrolldown-toggle" style="outline: 0;">
                <img src="${__WEBPACK_IMPORTED_MODULE_0__main__["SCROLL_ENABLED_URL"]}" alt="Always scroll down" height="11" width="11" class="iptv-scrolldown-toggle-icon">
            </a>
        `);

        document.body.appendChild(scrollWrapper);

        $(document).on('click', '.iptv-scrolldown-toggle', function() {
            AlwaysScrollDown.toggleScrollDown();
        });

        clearInterval(AlwaysScrollDown.interval);

        AlwaysScrollDown.interval = setInterval(function () {
            if (AlwaysScrollDown.scrollDown === true) {
                $('#item-scroller').scrollTop(999999999);
            }
        }, 100);

        AlwaysScrollDown.hideScrollOnCinema(scrollWrapper);
        AlwaysScrollDown.hideScrollOnSponsorMenu(scrollWrapper);
        AlwaysScrollDown.bindScrollListener();
        AlwaysScrollDown.bindScrollDownListener();
    };

    /**
     * Hides the 'Always scroll down' overlay when cinema mode is open
     * @static
     * @param {node} scrollWrapper
     */
    static hideScrollOnCinema(scrollWrapper)
    {
        const watchPage = 'ytg-watch-page';

        const observer = new MutationObserver(function(mutations) {
            mutations.forEach((m) => {
                $(m.target).is('[sidebar-collapsed]') ? $(scrollWrapper).hide() : $(scrollWrapper).show();
            });
        });

        const observerOpts = {
            childList: false,
            attributes: true,
            characterData: false,
            subtree: false,
            attributeFilter: ['sidebar-collapsed']
        };

        const addObserver = setInterval(() => {
            if ($(watchPage).length) {
                observer.observe($(watchPage)[0], observerOpts);
                clearInterval(addObserver);
            }
        }, 250);
    };

    /**
     * Hides the 'Always scroll down' overlay when sponsor menu is open.
     * @static
     * @param {node} scrollWrapper
     */
    static hideScrollOnSponsorMenu(scrollWrapper)
    {
        const chatInputRenderer = 'yt-live-chat-message-input-renderer';

        const observer = new MutationObserver(function (mutations) {
            mutations.forEach((m) => {
                $(m.target).attr('creator-open') ? $(scrollWrapper).hide() : $(scrollWrapper).show();
            });
        });

        const observerOpts = {
            childList: false,
            attributes: true,
            characterData: false,
            subtree: false,
            attributeFilter: ['creator-open']
        }

        const sponsorClick = setInterval(() => {
            if ($(chatInputRenderer).length) {
                observer.observe($(chatInputRenderer)[0], observerOpts);
                clearInterval(sponsorClick);
            }
        }, 250);
    };

    /**
     * Disables 'Always scroll down' functionality when scrolling manually.
     * @static
     */
    static bindScrollListener()
    {
        const target = document.getElementById('item-scroller');

        if (!target) {
            setTimeout(() => { AlwaysScrollDown.bindScrollListener() }, 250);
            return;
        }

        $('#item-scroller').on('mousewheel DOMMouseScroll', function () {
            AlwaysScrollDown.toggleScrollDown(false);
        });

        $('#item-scroller').on('mousedown', function (event) {
            if(event.target === this) {
                AlwaysScrollDown.toggleScrollDown(false);
            }
        });
    };

    /**
     * Enables 'Always scroll down' functionality when blue jump down button is clicked.
     * @static
     */
    static bindScrollDownListener()
    {
        const target = document.getElementById('show-more');

        if (!target) {
            window.setTimeout(() => { AlwaysScrollDown.bindScrollDownListener() }, 250);
            return;
        }

        target.onmousedown = function () {
            AlwaysScrollDown.toggleScrollDown(true);
            return true;
        };
    };

    /**
     * Toggle scrollDown state and adjust overlay accordingly.
     * @static
     */
    static toggleScrollDown(state)
    {
        if (typeof state === 'undefined') {
            AlwaysScrollDown.scrollDown = !AlwaysScrollDown.scrollDown;
        } else {
            AlwaysScrollDown.scrollDown = state;
        }

        $('.iptv-scrolldown-wrapper').attr('aria-label', AlwaysScrollDown.scrollDown ? 'Always scroll down (Enabled)' : 'Always scroll down (Disabled)');
        $('.iptv-scrolldown-toggle-icon').attr('src', AlwaysScrollDown.scrollDown ? __WEBPACK_IMPORTED_MODULE_0__main__["SCROLL_ENABLED_URL"] : __WEBPACK_IMPORTED_MODULE_0__main__["SCROLL_DISABLED_URL"]);
    };
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AlwaysScrollDown;
;

AlwaysScrollDown.scrollDown = true;
AlwaysScrollDown.interval = null;


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = checkIfWatchingLive;
/**
 * Checks if user is behind in livestream and warns them.
 */
function checkIfWatchingLive() {

    let liveCheckInterval = null;

    liveCheckInterval = setInterval(function() {

        const $liveButton = $('.ytp-live-badge.ytp-button');

        if ($liveButton.is(':enabled') && $liveButton.is(':visible') && $('.iptv-live-warning').length < 1) {
            $('#player-container').append(`
                <div class="iptv-live-warning">
                    <div class="iptv-live-warning-text">
                        You\'re watching old footage, click the LIVE button in the bottom left corner to watch live.
                    </div>
                    <div class="iptv-live-warning-dismiss">
                        <a href="javascript:void(0)" class="iptv-live-warning-close">✕</a>
                    </div>
                </div>
            `);
        }
    }, 15 * 1000);

    $(document).on('click', '.iptv-live-warning-close', function() {
        $('.iptv-live-warning').remove();
        clearInterval(liveCheckInterval);
    });

    $(document).on('mousedown', '.ytp-live-badge', function() {
        $('.iptv-live-warning').remove();
    });
};


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = colorButton;
/**
 * Adds new color change button to livestream page.
 */
function colorButton()
{
    const colorIcon = chrome.extension.getURL('/icons/pencil-icon.png');
    const colorImage = `<img src="${colorIcon}" alt="star" style="pointer-events: none; display: block; width: 80%; height:80%; margin-right: 2px;">`;

    const colorButton = `
        <iptv-color-button style="display: inline-block;" raised="" supported-cold-load-actions="[&quot;color&quot;]" wait-for-signal="watch-page-initialized" class="style-scope ytg-watch-footer x-scope iptv-color-button-0">
            <iron-signals class="style-scope iptv-color-button"></iron-signals>
            <paper-button style="color: #fff; background-color: #0f9d58; min-width: 0;" class="enabled style-scope iptv-color-button x-scope paper-button-0" role="button" tabindex="0" animated="" aria-disabled="false" elevation="1" raised="" aria-label="CHANGE NAME COLOR">
                <div class="layout horizontal center-justified style-scope iptv-color-button">
                    <div style="width: 24px; height: 24px;" class="icon-container layout horizontal center-center style-scope iptv-color-button">
                        <yt-icon class="style-scope iptv-color-button x-scope yt-icon-0">
                        </yt-icon>
                    </div>
                <iptv-formatted-string id="text" class="layout horizontal center-center style-scope iptv-color-button" style="margin: 0 3px"><span class="style-scope iptv-formatted-string">CHANGE NAME COLOR</span></iptv-formatted-string>
                </div>
            </paper-button>
        </iptv-color-button>`;

    $('.iptv-sponsor-button-0').after(colorButton);

    $(colorButton).ready( function() {
        $('.style-scope.iptv-color-button.x-scope.yt-icon-0').html(colorImage);
    });

    $('.style-scope.ytg-watch-footer.x-scope.iptv-color-button-0').on('click', () => {
        window.open('https://www.iceposeidon.com/profile', '_blank');
        $('.style-scope.ytg-watch-footer.x-scope.iptv-color-button-0 paper-button')[0].blur();
    });
};


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = donateButton;
/**
 * Adds donate button to livestream page.
 */
function donateButton()
{
    $('.iptv-donate-button-0').remove();

    const donateIcon = chrome.extension.getURL('/icons/donate-icon.png');
    const sponsorIcon = chrome.extension.getURL('/icons/sponsor-icon.png');

    const sponsorImage = `<img src="${sponsorIcon}" alt="star" style="pointer-events: none; display: block; width: 100%; height: 100%;">`;

    const donateButton = `
        <iptv-donate-button style="display: inline-block;" raised="" supported-cold-load-actions="[&quot;sponsor&quot;]" wait-for-signal="watch-page-initialized" class="style-scope ytg-watch-footer x-scope iptv-donate-button-0">
            <iron-signals class="style-scope iptv-donate-button"></iron-signals>
            <paper-button style="color: #fff; background-color: #0f9d58; min-width: 0;" class="enabled style-scope iptv-donate-button x-scope paper-button-0" role="button" tabindex="0" animated="" aria-disabled="false" elevation="1" raised="" aria-label="Donate to Ice_Poseidon">
                <div class="layout horizontal center-justified style-scope iptv-donate-button">
                    <div style="width: 24px; height: 24px;" class="icon-container layout horizontal center-center style-scope iptv-donate-button">
                        <yt-icon class="style-scope iptv-donate-button x-scope yt-icon-0">
                        </yt-icon>
                    </div>
                <iptv-formatted-string id="text" class="layout horizontal center-center style-scope iptv-donate-button" style="margin: 0 3px"><span class="style-scope iptv-formatted-string">DONATE</span></iptv-formatted-string>
                </div>
            </paper-button>
        </iptv-donate-button>`;

    const donateImage = `<img src="${donateIcon}" alt="dollar-sign" style="pointer-events: none; display: block; width: 100%; height: 100%;">`;

    // Insert donateButton next to sponsorButton
    const sponsorButton = '.style-scope.ytg-watch-footer.x-scope.ytg-membership-offer-button-0';

    $(sponsorButton).before(donateButton);
    $(donateButton).ready( function() { $('.style-scope.iptv-donate-button.x-scope.yt-icon-0').html(donateImage); });

    $('.style-scope.ytg-watch-footer.x-scope.iptv-donate-button-0').on('click', () => {
        window.open('https://youtube.streamlabs.com/iceposeidon#/', '_blank');
        $('.style-scope.ytg-watch-footer.x-scope.iptv-donate-button-0 paper-button')[0].blur();
    });

    // Change sponsorButton icon to star
    $(`${sponsorButton} .style-scope.ytg-membership-offer-button.x-scope.yt-icon-0`).html(sponsorImage);
};


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = loadingEmotesInfo;
/**
 * Show emote loading information.
 */
function loadingEmotesInfo()
{
    const div = document.createElement('div');

    $(div).text('Loading emotes...');

    $(div).css({
        'font-size': '16px',
        'position': 'absolute',
        'right': '25px',
        'bottom': '75px',
        'color': '#fff',
        'text-shadow': '2px 2px 2px rgba(0,0,0,0.75)'
    });

    $(div).addClass('iptv-loading-emotes');

    document.body.appendChild(div);
};


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = sponsorButton;
/**
 * Adds new sponsor button to livestream page.
 */
function sponsorButton()
{
    const sponsorIcon = chrome.extension.getURL('/icons/sponsor-icon.png');
    const sponsorImage = `<img src="${sponsorIcon}" alt="star" style="pointer-events: none; display: block; width: 100%; height: 100%;">`;

    const sponsorButton = `
        <iptv-sponsor-button style="display: inline-block;" raised="" supported-cold-load-actions="[&quot;sponsor&quot;]" wait-for-signal="watch-page-initialized" class="style-scope ytg-watch-footer x-scope iptv-sponsor-button-0">
            <iron-signals class="style-scope iptv-sponsor-button"></iron-signals>
            <paper-button style="color: #fff; background-color: #0f9d58; min-width: 0;" class="enabled style-scope iptv-sponsor-button x-scope paper-button-0" role="button" tabindex="0" animated="" aria-disabled="false" elevation="1" raised="" aria-label="SPONSOR ON OFFICIAL SITE">
                <div class="layout horizontal center-justified style-scope iptv-sponsor-button">
                    <div style="width: 24px; height: 24px;" class="icon-container layout horizontal center-center style-scope iptv-sponsor-button">
                        <yt-icon class="style-scope iptv-sponsor-button x-scope yt-icon-0">
                        </yt-icon>
                    </div>
                <iptv-formatted-string id="text" class="layout horizontal center-center style-scope iptv-sponsor-button" style="margin: 0 3px"><span class="style-scope iptv-formatted-string">SPONSOR ON OFFICIAL SITE</span></iptv-formatted-string>
                </div>
            </paper-button>
        </iptv-sponsor-button>`;

    $('.style-scope.ytg-watch-footer.x-scope.ytg-membership-offer-button-0').before(sponsorButton);

    $(sponsorButton).ready( function() {
        $('.style-scope.iptv-sponsor-button.x-scope.yt-icon-0').html(sponsorImage);
    });

    $('.style-scope.ytg-watch-footer.x-scope.iptv-sponsor-button-0').on('click', () => {
        window.open('https://www.iceposeidon.com/', '_blank');
        $('.style-scope.ytg-watch-footer.x-scope.iptv-sponsor-button-0 paper-button')[0].blur();
    });
};


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class SponsorCheck
{
    /**
     * Check if user is still using old sponsorship
     */
    static check()
    {
        $.get(chrome.extension.getURL('content.html'), function(data) {

            $(data).appendTo('body');

            const imgUrl = chrome.extension.getURL('icons/sponsor-benefits.png');
            $('.sponsor-modal .sub-benefits').attr('src', imgUrl);

            $(document).on('click', '.close-modal', function() {
                $('.sponsor-modal').hide();
            });

            const container = $('.yt-live-chat-message-input-renderer-0');

            const sponsorBadge = $(container).find('.yt-live-chat-author-badge-renderer-0[aria-label="Sponsor"]');

            if ($(sponsorBadge).length !== 0) {
                $('.sponsor-modal').show();
            }
        });
    };
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SponsorCheck;
;


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = chatColors;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__main__ = __webpack_require__(0);


const randomChatColors = {
    '-A': '#47d288',
    '-B': '#b94ff1',
    '-C': '#3cdc36',
    '-D': '#df44dc',
    '-E': '#6bd432',
    '-F': '#8c69f1',
    '-G': '#a3d12d',
    '-H': '#b35dd5',
    '-I': '#5edb62',
    '-J': '#ca46bb',
    '-K': '#3daa27',
    '-L': '#ef67d5',
    '-M': '#83cc3f',
    '-N': '#d978eb',
    '-O': '#97bd12',
    '-P': '#5c7af1',
    '-Q': '#dfc71b',
    '-R': '#4c8ae7',
    '-S': '#f02f14',
    '-T': '#2dd3ad',
    '-U': '#ee3034',
    '-V': '#44c357',
    '-W': '#ab76dc',
    '-X': '#c5bf30',
    '-Y': '#6d7ddb',
    '-Z': '#eca821',
    '-0': '#cc6a35',
    '-1': '#858b23',
    '-2': '#f09464',
    '-3': '#bca527',
    '-4': '#e7964d',
    '-5': '#ac850f',
    '-6': '#e1b655',
    '-7': '#bb7722',
    '-8': '#aa852e',
    '-9': '#de9b36',
    '--': '#e57e20',
    '-_': '#46ad68'
};

function chatColors(node, profileId)
{
	if (typeof node === 'undefined' || typeof profileId === 'undefined') {
		return false;
	}
	
	const msgParent = $(node).parents('.yt-live-chat-text-message-renderer-0');
	const msgParentPopout = $(node).parents('.yt-live-chat-item-list-renderer');
	const authorName = $(msgParent).find('#author-name');
	const authorNamePopout = $(msgParentPopout).find('#author-name');
	
	const firstTwo = profileId.substring(0, 2);
	
	if (authorName.length > 0) {
		$(authorName).css('color', randomChatColors[firstTwo.toUpperCase()]);
	}
	
	if (authorNamePopout.length > 0) {
		$(authorNamePopout).css('color', randomChatColors[firstTwo.toUpperCase()]);
	}
};


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTc4M2U0OTIzOTZlZjMxODBjNjEiLCJ3ZWJwYWNrOi8vLy4vbWFpbi5qcyIsIndlYnBhY2s6Ly8vLi9lbW90ZS5qcyIsIndlYnBhY2s6Ly8vLi9zdWJzY3JpYmVycy5qcyIsIndlYnBhY2s6Ly8vLi91dGlsLmpzIiwid2VicGFjazovLy8uL2NoYXRPYnNlcnZlci5qcyIsIndlYnBhY2s6Ly8vLi9wYWdlQ2hlY2suanMiLCJ3ZWJwYWNrOi8vLy4vdGFiQ29tcGxldGUuanMiLCJ3ZWJwYWNrOi8vLy4vbWVudGlvbkhpZ2hsaWdodC5qcyIsIndlYnBhY2s6Ly8vLi9vdmVybGF5L2Fsd2F5c1Njcm9sbERvd24uanMiLCJ3ZWJwYWNrOi8vLy4vb3ZlcmxheS9jaGVja0lmV2F0Y2hpbmdMaXZlLmpzIiwid2VicGFjazovLy8uL292ZXJsYXkvY29sb3JCdXR0b24uanMiLCJ3ZWJwYWNrOi8vLy4vb3ZlcmxheS9kb25hdGVCdXR0b24uanMiLCJ3ZWJwYWNrOi8vLy4vb3ZlcmxheS9sb2FkaW5nRW1vdGVzSW5mby5qcyIsIndlYnBhY2s6Ly8vLi9vdmVybGF5L3Nwb25zb3JCdXR0b24uanMiLCJ3ZWJwYWNrOi8vLy4vb3ZlcmxheS9zcG9uc29yQ2hlY2suanMiLCJ3ZWJwYWNrOi8vLy4vY2hhdENvbG9ycy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2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QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLEtBQUs7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUM3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7O0FBRUE7Ozs7Ozs7OztBQ2pKQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsMkJBQTJCLGlCQUFpQjtBQUM1QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QztBQUM1QztBQUNBO0FBQ0E7QUFDQSxrREFBa0Q7QUFDbEQ7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0Isa0JBQWtCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQUE7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTs7Ozs7Ozs7OztBQ2hHcUI7O0FBRXJCO0FBQ0E7QUFDQSxXQUFXLEtBQUs7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsb01BQXNJOztBQUV0SSx3REFBd0Q7QUFDeEQ7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDZKQUE2SjtBQUM3SjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUM3QmtEOztBQUVsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0EsMEZBQTBGO0FBQzFGLDRCQUE0QiwwREFBbUI7QUFDL0M7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLEtBQUs7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLEtBQUs7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhCQUE4Qix3Q0FBd0M7QUFDdEU7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFDQUFxQyw0Q0FBNEM7QUFDakY7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7O0FBRUE7QUFDQTs7Ozs7Ozs7QUNoTEE7QUFBQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7QUFDTDs7Ozs7Ozs7QUNqQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsVUFBVSx5Q0FBeUMsZ0JBQWdCLFlBQVksWUFBWSxtQkFBbUI7O0FBRWxKO0FBQ0Esd0RBQXdELGdEQUFnRCxXQUFXO0FBQ25IO0FBQ0EsNkNBQTZDLDJCQUEyQixjQUFjO0FBQ3RGO0FBQ0EsNENBQTRDLGNBQWM7QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7Ozs7OztBQ2hDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHNDQUFzQyxZQUFZLHlDQUF5QyxnQkFBZ0IsYUFBYSxjQUFjOztBQUV0STtBQUNBLHlEQUF5RCxnREFBZ0QsYUFBYTtBQUN0SDtBQUNBLDZDQUE2QywyQkFBMkIsY0FBYztBQUN0RjtBQUNBLDRDQUE0QyxjQUFjO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFDQUFxQyxXQUFXLGdEQUFnRCxnQkFBZ0IsYUFBYSxjQUFjOztBQUUzSTtBQUNBOztBQUVBO0FBQ0EsdUNBQXVDLDBFQUEwRSxFQUFFOztBQUVuSDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsU0FBUyxjQUFjO0FBQ3ZCOzs7Ozs7OztBQ3pDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTs7Ozs7Ozs7QUNyQkE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsWUFBWSx5Q0FBeUMsZ0JBQWdCLGFBQWEsY0FBYzs7QUFFdEk7QUFDQSwwREFBMEQsZ0RBQWdELGFBQWE7QUFDdkg7QUFDQSw2Q0FBNkMsMkJBQTJCLGNBQWM7QUFDdEY7QUFDQSw0Q0FBNEMsY0FBYztBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7Ozs7Ozs7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUFBO0FBQUE7Ozs7Ozs7Ozs7QUMzQnFCOztBQUVyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJjb250ZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCAxNzgzZTQ5MjM5NmVmMzE4MGM2MSIsImltcG9ydCBQYWdlQ2hlY2sgZnJvbSAnLi9wYWdlQ2hlY2snO1xyXG5pbXBvcnQgU3Vic2NyaWJlcnMgZnJvbSAnLi9zdWJzY3JpYmVycyc7XHJcbmltcG9ydCB7IGlzTm9kZSB9IGZyb20gJy4vdXRpbCc7XHJcbmltcG9ydCBDaGF0T2JzZXJ2ZXIgZnJvbSAnLi9jaGF0T2JzZXJ2ZXInO1xyXG5pbXBvcnQgVGFiQ29tcGxldGUgZnJvbSAnLi90YWJDb21wbGV0ZSc7XHJcblxyXG5leHBvcnQgY29uc3QgRElTQUxMT1dFRF9DSEFSUyA9IFsnXFxcXCcsICc6JywgJy8nLCAnJicsIFwiJ1wiLCAnXCInLCAnPycsICchJywgJyMnXSxcclxuICAgIFNDUk9MTF9FTkFCTEVEX1VSTCA9IGNocm9tZS5leHRlbnNpb24uZ2V0VVJMKCdpY29ucy9zY3JvbGwtZW5hYmxlZC5wbmcnKSxcclxuICAgIFNDUk9MTF9ESVNBQkxFRF9VUkwgPSBjaHJvbWUuZXh0ZW5zaW9uLmdldFVSTCgnaWNvbnMvc2Nyb2xsLWRpc2FibGVkLnBuZycpO1xyXG5cclxuZXhwb3J0IGxldCBvcHRpb25zID0gbnVsbDtcclxuXHJcbndpbmRvdy5JUFRWTG9hZGVkID0gZmFsc2U7XHJcbndpbmRvdy5MU1BhZ2VMb2FkZWQgPSBmYWxzZTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBnZXRPcHRpb25zKCkge1xyXG4gICAgaWYgKG9wdGlvbnMgPT09IG51bGwpIHtcclxuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnb3B0aW9uc0NhY2hlJykpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBvcHRpb25zO1xyXG59XHJcblxyXG5jb25zdCBvbk5ld1BhZ2VMb2FkID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICQoJ1tjbGFzc149XCJpcHR2LVwiXScpLnJlbW92ZSgpO1xyXG4gICAgJCgnLnl0LWxpdmUtY2hhdC1oZWFkZXItcmVuZGVyZXIjdGl0bGUnKS50ZXh0KCdDaGF0Jyk7XHJcblxyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKFBhZ2VDaGVjay5pc0xpdmVzdHJlYW0oKSAmJiBQYWdlQ2hlY2suaXNJY2VQb3NlaWRvblN0cmVhbSgpKSB7XHJcbiAgICAgICAgICAgIGluaXQoKTtcclxuICAgICAgICAgICAgaWYgKCF3aW5kb3cuTFNQYWdlTG9hZGVkKSB7IFBhZ2VDaGVjay5saXZlc3RyZWFtUGFnZSgpOyB3aW5kb3cuTFNQYWdlTG9hZGVkID0gdHJ1ZTsgfVxyXG4gICAgICAgIH1cclxuICAgIH0sIDJFMyk7XHJcbn07XHJcblxyXG4oZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignaGVhZCA+IHRpdGxlJyk7XHJcblxyXG4gICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbiAobXV0YXRpb25zKSB7XHJcbiAgICAgICAgbXV0YXRpb25zLmZvckVhY2goZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBvbk5ld1BhZ2VMb2FkKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoIWlzTm9kZSh0YXJnZXQpKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgY2hhcmFjdGVyRGF0YTogdHJ1ZSxcclxuICAgICAgICBhdHRyaWJ1dGVzOiBmYWxzZSxcclxuICAgICAgICBjaGlsZExpc3Q6IHRydWUsXHJcbiAgICAgICAgc3VidHJlZTogdHJ1ZVxyXG4gICAgfTtcclxuXHJcbiAgICBvYnNlcnZlci5vYnNlcnZlKHRhcmdldCwgb3B0aW9ucyk7XHJcbn0oKSk7XHJcblxyXG52YXIgaW5pdCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgaWYoIXdpbmRvdy5JUFRWTG9hZGVkKSB7XHJcbiAgICAgICAgd2luZG93LklQVFZMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBjaHJvbWUucnVudGltZS5zZW5kTWVzc2FnZSgncmVxdWVzdFN1YnNjcmlwdGlvbnMnLCBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuICAgICAgICAgICAgICAgIG9wdGlvbnNbJ3N1YnNjcmlwdGlvbnMnXSA9IHJlc3BvbnNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LCA1MDAwKTtcclxuXHJcbiAgICAgICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2UoJ3JlcXVlc3RMb2NhbHN0b3JhZ2UnLCBmdW5jdGlvbiAocmVzcG9uc2UpIHtcclxuXHJcbiAgICAgICAgICAgIG9wdGlvbnMgPSByZXNwb25zZTtcclxuXHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdvcHRpb25zQ2FjaGUnLCBKU09OLnN0cmluZ2lmeShvcHRpb25zKSk7XHJcblxyXG4gICAgICAgICAgICBpZiAoZ2V0T3B0aW9ucygpWydlbmFibGVDaGF0Q29sb3JzJ10pIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGEgPSBjaHJvbWUuZXh0ZW5zaW9uLmdldFVSTCgnZXh0ZXJuYWwvY2hhdC1jb2xvcnMuY3NzJyk7XHJcbiAgICAgICAgICAgICAgICAkKCc8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgdHlwZT1cInRleHQvY3NzXCIgaHJlZj1cIicgKyBhICsgJ1wiID4nKS5hcHBlbmRUbygnaGVhZCcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZ2V0T3B0aW9ucygpWydkaXNhYmxlQXZhdGFycyddID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAkKCc8c3R5bGUgdHlwZT1cInRleHQvY3NzXCI+LnN0eWxlLXNjb3BlIC55dC1saXZlLWNoYXQtaXRlbS1saXN0LXJlbmRlcmVyICNhdXRob3ItcGhvdG8geyB3aWR0aDogMHB4OyBoZWlnaHQ6IDBweDsgbWFyZ2luLXJpZ2h0OiAwcHg7IHZpc2liaWxpdHk6IGhpZGRlbjsgfS5zdHlsZS1zY29wZS55dC1saXZlLWNoYXQtbWVzc2FnZS1pbnB1dC1yZW5kZXJlci5uby10cmFuc2l0aW9ueyBkaXNwbGF5OiBub25lICFpbXBvcnRhbnQ7IH0uc3R5bGUtc2NvcGUgeXQtbGl2ZS1jaGF0LW1lc3NhZ2UtaW5wdXQtcmVuZGVyZXIgI2F2YXRhciB7IGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDttYXJnaW46MCAhaW1wb3J0YW50OyB9PC9zdHlsZT4nKS5hcHBlbmRUbygnaGVhZCcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZ2V0T3B0aW9ucygpWydlbmFibGVTcGxpdENoYXQnXSA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgJCgnPHN0eWxlIHR5cGU9XCJ0ZXh0L2Nzc1wiPi5zdHlsZS1zY29wZSB5dC1saXZlLWNoYXQtdGV4dC1tZXNzYWdlLXJlbmRlcmVyIHsgYm9yZGVyLXRvcDogMC41cHggc29saWQgIzMzMzMzMzsgYm9yZGVyLWJvdHRvbTogMC41cHggc29saWQgIzAwMDAwMDsgfTwvc3R5bGU+JykuYXBwZW5kVG8oJ2hlYWQnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKGdldE9wdGlvbnMoKVsnc2hvd0RlbGV0ZWRNZXNzYWdlcyddID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAkKCc8c3R5bGUgdHlwZT1cInRleHQvY3NzXCI+Lnl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXItMFtpcy1kZWxldGVkXTpub3QoW3Nob3ctb3JpZ2luYWxdKSAjbWVzc2FnZS55dC1saXZlLWNoYXQtdGV4dC1tZXNzYWdlLXJlbmRlcmVyIHtkaXNwbGF5OiBpbmxpbmU7fSAueXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlci0wICNkZWxldGVkLXN0YXRlLnl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXIgeyBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjI1KTsgfSAueXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlci0wW2lzLWRlbGV0ZWRdOm5vdChbc2hvdy1vcmlnaW5hbF0pICNtZXNzYWdlLnl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXIgeyBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjI1KTsgfSAueXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlci0wICNkZWxldGVkLXN0YXRlOmJlZm9yZXtjb250ZW50OiBcIiAgXCJ9PC9zdHlsZT4nKS5hcHBlbmRUbygnaGVhZCcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAoZ2V0T3B0aW9ucygpWydtZW50aW9uSGlnaGxpZ2h0J10gPT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgICQoJzxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIj4ueXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlci0wIC5tZW50aW9uLnl0LWxpdmUtY2hhdC10ZXh0LW1lc3NhZ2UtcmVuZGVyZXIgeyBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDExNCwgMTUsIDE1LCAwKSAhaW1wb3J0YW50OyBwYWRkaW5nOiAwcHggMHB4ICFpbXBvcnRhbnQ7IH08L3N0eWxlPicpLmFwcGVuZFRvKCdoZWFkJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGNoYXRDb2xvciA9ICQoJy55dC1saXZlLWNoYXQtaGVhZGVyLXJlbmRlcmVyLTAnKS5jc3MoJ2JhY2tncm91bmQtY29sb3InKTtcclxuICAgICAgICAgICAgY29uc3QgY2hhdENvbG9yUG9wb3V0ID0gJCgnLnN0eWxlLXNjb3BlLnl0LWxpdmUtY2hhdC1yZW5kZXJlcltyb2xlPVwiaGVhZGluZ1wiXScpLmNzcygnYmFja2dyb3VuZC1jb2xvcicpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGNoYXRDb2xvciA9PT0gJ3JnYig0MCwgNDAsIDQwKScgfHwgY2hhdENvbG9yUG9wb3V0ID09PSAncmdiKDQwLCA0MCwgNDApJykge1xyXG4gICAgICAgICAgICAgICAgJCgnPHN0eWxlIHR5cGU9XCJ0ZXh0L2Nzc1wiPi55dC1saXZlLWNoYXQtdGV4dC1tZXNzYWdlLXJlbmRlcmVyLTBbYXV0aG9yLXR5cGU9bW9kZXJhdG9yXXtiYWNrZ3JvdW5kLWNvbG9yOiMyODI4Mjh9PC9zdHlsZT4nKS5hcHBlbmRUbygnaGVhZCcpO1xyXG4gICAgICAgICAgICAgICAgJCgnPHN0eWxlIHR5cGU9XCJ0ZXh0L2Nzc1wiPi5zdHlsZS1zY29wZS55dC1saXZlLWNoYXQtaXRlbS1saXN0LXJlbmRlcmVyW2F1dGhvci10eXBlPW1vZGVyYXRvcl17YmFja2dyb3VuZC1jb2xvcjojMjgyODI4fTwvc3R5bGU+JykuYXBwZW5kVG8oJ2hlYWQnKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChjaGF0Q29sb3IgPT09ICdyZ2JhKDIzOCwgMjM4LCAyMzgsIDAuNCknIHx8IGNoYXRDb2xvclBvcG91dCA9PT0gJ3JnYmEoMjM4LCAyMzgsIDIzOCwgMC40KScpIHtcclxuICAgICAgICAgICAgICAgICQoJzxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIj4ueXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlci0wW2F1dGhvci10eXBlPW1vZGVyYXRvcl17YmFja2dyb3VuZC1jb2xvcjojZTJlMmUyfTwvc3R5bGU+JykuYXBwZW5kVG8oJ2hlYWQnKTtcclxuICAgICAgICAgICAgICAgICQoJzxzdHlsZSB0eXBlPVwidGV4dC9jc3NcIj4uc3R5bGUtc2NvcGUueXQtbGl2ZS1jaGF0LWl0ZW0tbGlzdC1yZW5kZXJlclthdXRob3ItdHlwZT1tb2RlcmF0b3Jde2JhY2tncm91bmQtY29sb3I6I2UyZTJlMn08L3N0eWxlPicpLmFwcGVuZFRvKCdoZWFkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgU3Vic2NyaWJlcnMubG9hZEJhZGdlcygpO1xyXG5cclxuICAgICAgICBpZiAoZ2V0T3B0aW9ucygpWydlbW90ZXNUd2l0Y2gnXSA9PT0gdHJ1ZSB8fCBnZXRPcHRpb25zKClbJ2Vtb3Rlc1N1YiddID09PSB0cnVlIHx8IGdldE9wdGlvbnMoKVsnZW1vdGVzQlRUViddID09PSB0cnVlIHx8IGdldE9wdGlvbnMoKVsnZW1vdGVzSWNlJ10gPT09IHRydWUpIHtcclxuICAgICAgICAgICAgQ2hhdE9ic2VydmVyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBUYWJDb21wbGV0ZS5iaW5kRXZlbnQoKTtcclxuXHJcbiAgICAgICAgY29uc29sZS5pbmZvKCdbSVBUVl0gSW5pdCEnKTtcclxuXHJcbiAgICB9XHJcbn1cclxuXHJcbm9uTmV3UGFnZUxvYWQoKTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9tYWluLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IHJlcGxhY2VBbGwgfSBmcm9tICcuL3V0aWwnO1xyXG5pbXBvcnQgeyBnZXRPcHRpb25zLCBESVNBTExPV0VEX0NIQVJTIH0gZnJvbSAnLi9tYWluJztcclxuaW1wb3J0IGxvYWRpbmdFbW90ZXNJbmZvIGZyb20gJy4vb3ZlcmxheS9sb2FkaW5nRW1vdGVzSW5mbyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFbW90ZVxyXG57XHJcbiAgICAvKipcclxuICAgICAqIExvYWQgYWxsIGVuYWJsZWQgZW1vdGVzLlxyXG4gICAgICogQGNvbnN0cnVjdG9yXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBsb2FkRW1vdGVzKClcclxuICAgIHtcclxuICAgICAgICBsb2FkaW5nRW1vdGVzSW5mbygpO1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgY29uc3QgJGxvYWRpbmcgPSAkKCcuaXB0di1sb2FkaW5nLWVtb3RlcycpO1xyXG5cclxuICAgICAgICAgICAgaWYgKCRsb2FkaW5nWzBdKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJGxvYWRpbmcuY3NzKHtcclxuICAgICAgICAgICAgICAgICAgICAnY29sb3InOiAnI2MwMzkyYicsXHJcbiAgICAgICAgICAgICAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiAnIzI4MjgyOCcsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3JpZ2h0JzogJzE5cHgnXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAkbG9hZGluZy50ZXh0KCdGYWlsZWQgbG9hZGluZyBzb21lIGVtb3RlcyAoQVBJIHNlcnZlcnMgZG93biknKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgICQoJy5pcHR2LWxvYWRpbmctZW1vdGVzJykucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH0sIDcuNSAqIDEwMDApO1xyXG5cclxuICAgICAgICB9LCAxMCAqIDEwMDApO1xyXG5cclxuICAgICAgICBpZiAoZ2V0T3B0aW9ucygpWydlbW90ZXNUd2l0Y2gnXSkgRW1vdGUubG9hZFR3aXRjaEVtb3RlcygpO1xyXG4gICAgICAgIGlmIChnZXRPcHRpb25zKClbJ2Vtb3Rlc1N1YiddKSBFbW90ZS5sb2FkU3ViRW1vdGVzKCk7XHJcblxyXG4gICAgICAgIGlmIChnZXRPcHRpb25zKClbJ2Vtb3Rlc0JUVFYnXSkge1xyXG4gICAgICAgICAgICBFbW90ZS5sb2FkQlRUVkVtb3RlcygpO1xyXG4gICAgICAgICAgICBFbW90ZS5sb2FkQlRUVkNoYW5uZWxFbW90ZXMoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIEVtb3RlLndhaXRUaWxsRW1vdGVzTG9hZGVkKCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogc2V0VGltZW91dCB0aGF0IGtlZXBzIHJ1bm5pbmcgdW50aWwgYWxsIGVtb3RlcyBhcmUgbG9hZGVkLlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgd2FpdFRpbGxFbW90ZXNMb2FkZWQoKVxyXG4gICAge1xyXG4gICAgICAgIGlmICgoZ2V0T3B0aW9ucygpWydlbW90ZXNUd2l0Y2gnXSAhPT0gRW1vdGUuc3RhdGVzWyd0d2l0Y2gnXS5sb2FkZWQpIHx8XHJcbiAgICAgICAgICAgIChnZXRPcHRpb25zKClbJ2Vtb3Rlc1N1YiddICE9PSBFbW90ZS5zdGF0ZXNbJ3N1YiddLmxvYWRlZCkgfHxcclxuICAgICAgICAgICAgKGdldE9wdGlvbnMoKVsnZW1vdGVzQlRUViddICE9PSBFbW90ZS5zdGF0ZXNbJ0JUVFYnXS5sb2FkZWQpIHx8XHJcbiAgICAgICAgICAgIChnZXRPcHRpb25zKClbJ2Vtb3Rlc0JUVFYnXSAhPT0gRW1vdGUuc3RhdGVzWydCVFRWQ2hhbm5lbHMnXS5sb2FkZWQpKSB7XHJcblxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KEVtb3RlLndhaXRUaWxsRW1vdGVzTG9hZGVkLCAyNTApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBUZW1wIGZpeCB0byBwcmV2ZW50IHJhbSBmcm9tIGZpbGxpbmcgdXAgd2l0aCBtZXNzYWdlcy5cclxuICAgICAgICBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIEVtb3RlLm1lc3NhZ2VzID0ge307XHJcbiAgICAgICAgfSwgMTAwMCAqIDYwICogNSk7XHJcblxyXG4gICAgICAgIEVtb3RlLmxvYWRJY2VFbW90ZXMoKTtcclxuXHJcbiAgICAgICAgY29uc3QgYmxhY2tsaXN0ZWRFbW90ZXMgPSBbJ1RISUNDJ107XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYmxhY2tsaXN0ZWRFbW90ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZGVsZXRlIEVtb3RlLmVtb3Rlc1tibGFja2xpc3RlZEVtb3Rlc1tpXV07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKCcuaXB0di1sb2FkaW5nLWVtb3RlcycpLnJlbW92ZSgpO1xyXG4gICAgICAgIEVtb3RlLnJlcGxhY2VFeGlzdGluZ0Vtb3RlcygpO1xyXG5cdFx0XHJcblx0XHRjb25zb2xlLmxvZyhPYmplY3Qua2V5cyhFbW90ZS5lbW90ZXMpLmxlbmd0aCk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVwbGFjZSBleGlzdGluZyB0ZXh0IHdpdGggZW1vdGVzIGluIGNoYXQsIGhhcHBlbnMgd2hlbiBlbW90ZXMgYXJlIGRvbmUgbG9hZGluZy5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHJlcGxhY2VFeGlzdGluZ0Vtb3RlcygpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgY2hhdEVsZW1lbnRzID0gJCgnLnN0eWxlLXNjb3BlIHl0LWxpdmUtY2hhdC1pdGVtLWxpc3QtcmVuZGVyZXIgeC1zY29wZSB5dC1saXZlLWNoYXQtdGV4dC1tZXNzYWdlLXJlbmRlcmVyLTAnKTtcclxuICAgICAgICBjb25zdCBjaGF0RWxlbWVudHNQb3BvdXQgPSAkKCcjaXRlbXMueXQtbGl2ZS1jaGF0LWl0ZW0tbGlzdC1yZW5kZXJlciAueXQtbGl2ZS1jaGF0LWl0ZW0tbGlzdC1yZW5kZXJlcicpO1xyXG5cclxuICAgICAgICBpZiAoY2hhdEVsZW1lbnRzLmxlbmd0aCA8IDEgJiYgY2hhdEVsZW1lbnRzUG9wb3V0IDwgMSkge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KEVtb3RlLnJlcGxhY2VFeGlzdGluZ0Vtb3RlcywgMjUwKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2hhdEVsZW1lbnRzLmVhY2goZnVuY3Rpb24gKGksIGVsKSB7XHJcbiAgICAgICAgICAgIEVtb3RlLmVtb3RlQ2hlY2soZWwpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjaGF0RWxlbWVudHNQb3BvdXQuZWFjaChmdW5jdGlvbiAoaSwgZWwpIHtcclxuICAgICAgICAgICAgRW1vdGUuZW1vdGVDaGVjayhlbCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIGEgbWVzc2FnZSBjb250YWlucyBlbW90ZXMuXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKiBAcGFyYW0ge25vZGV9IG5vZGUgLSBNZXNzYWdlIG5vZGVcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGVtb3RlQ2hlY2sobm9kZSlcclxuICAgIHtcclxuICAgICAgICBpZiAoZ2V0T3B0aW9ucygpWydlbW90ZXNUd2l0Y2gnXSA9PT0gZmFsc2UgJiYgZ2V0T3B0aW9ucygpWydlbW90ZXNTdWInXSA9PT0gZmFsc2UgJiYgZ2V0T3B0aW9ucygpWydlbW90ZXNCVFRWJ10gPT09IGZhbHNlICYmIGdldE9wdGlvbnMoKVsnZW1vdGVzSWNlJ10gPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0ICRtZXNzYWdlID0gJChub2RlKS5maW5kKCcjbWVzc2FnZScpO1xyXG4gICAgICAgIEVtb3RlLmthcHBhQ2hlY2soJG1lc3NhZ2UpO1xyXG5cclxuICAgICAgICBsZXQgb2xkSFRNTCA9ICRtZXNzYWdlLmh0bWwoKS50cmltKCk7XHJcbiAgICAgICAgbGV0IG1zZ0hUTUwgPSBvbGRIVE1MO1xyXG5cclxuICAgICAgICBjb25zdCB3b3JkcyA9IG1zZ0hUTUwucmVwbGFjZSgnL1xceEVGXFx4QkJcXHhCRi8nLCAnJykucmVwbGFjZSgn77u/JywgJycpLnNwbGl0KCcgJyk7XHJcbiAgICAgICAgY29uc3QgdW5pcXVlV29yZHMgPSBbXTtcclxuICAgICAgICBsZXQgZW1vdGVDb3VudCA9IDA7XHJcbiAgICAgICAgbGV0IGNoYW5nZUF0dGVtcHRzID0gMDtcclxuXHJcbiAgICAgICAgJC5lYWNoKHdvcmRzLCBmdW5jdGlvbiAoaSwgZWwpIHtcclxuICAgICAgICAgICAgaWYgKCQuaW5BcnJheShlbCwgdW5pcXVlV29yZHMpID09PSAtMSkgdW5pcXVlV29yZHMucHVzaChlbCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdW5pcXVlV29yZHMubGVuZ3RoOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHdvcmQgPSB1bmlxdWVXb3Jkc1tpXTtcclxuXHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgRW1vdGUuZW1vdGVzW3dvcmRdID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2VUaWVyID0gJChub2RlKS5maW5kKCcjYXV0aG9yLXBob3RvJykuZGF0YSgnc3ViLXRpZXInKTtcclxuICAgICAgICAgICAgbGV0IHRvb2x0aXBUZXh0ID0gd29yZDtcclxuXHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlVGllciA8IEVtb3RlLmVtb3Rlc1t3b3JkXVsndGllciddKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGVtb3RlVGllciA9IEVtb3RlLmVtb3Rlc1t3b3JkXVsndGllciddO1xyXG5cclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBFbW90ZS5lbW90ZXNbd29yZF1bJ3RpZXInXSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgIHRvb2x0aXBUZXh0ID0gYEljZVBvc2VpZG9uLmNvbSAmIzEwOyYjMTA7VGllciAke2Vtb3RlVGllcn0gU3ViIEVtb3RlICYjMTA7JiMxMDske3dvcmR9YDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZW1vdGVDb3VudCsrO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZW1vdGVIdG1sID0gYDxzcGFuIGNsYXNzPVwiaGludC0tdG9wXCIgYXJpYS1sYWJlbD1cIiR7dG9vbHRpcFRleHR9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiJHtFbW90ZS5lbW90ZXNbd29yZF1bJ3VybCddfVwiIGFsdD1cIiR7d29yZH1cIiBzdHlsZT1cImRpc3BsYXk6aW5saW5lO3dpZHRoOmF1dG87bWF4LWhlaWdodDozMnB4O292ZXJmbG93OmhpZGRlbjtcIiBjbGFzcz1cImV4dGVuc2lvbi1lbW90ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5gO1xyXG5cclxuICAgICAgICAgICAgbXNnSFRNTCA9IHJlcGxhY2VBbGwobXNnSFRNTCwgd29yZCwgZW1vdGVIdG1sKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChlbW90ZUNvdW50IDwgMSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkbWVzc2FnZS5odG1sKG1zZ0hUTUwpO1xyXG5cclxuICAgICAgICAkbWVzc2FnZS5wYXJlbnQoKS5wYXJlbnQoKS5iaW5kKCdET01TdWJ0cmVlTW9kaWZpZWQnLCBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCAkbWVzc2FnZSA9ICQodGhpcykuZmluZCgnI21lc3NhZ2UnKTtcclxuICAgICAgICAgICAgRW1vdGUua2FwcGFDaGVjaygkbWVzc2FnZSk7XHJcblxyXG4gICAgICAgICAgICBsZXQgaHRtbCA9ICRtZXNzYWdlLmh0bWwoKS50cmltKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoY2hhbmdlQXR0ZW1wdHMgPiAzMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodHlwZW9mIGh0bWwgPT09ICd1bmRlZmluZWQnIHx8IGh0bWwgPT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChodG1sLmluY2x1ZGVzKCdleHRlbnNpb24tZW1vdGUnKSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNoYW5nZUF0dGVtcHRzKys7XHJcblxyXG4gICAgICAgICAgICAkbWVzc2FnZS5odG1sKG1zZ0hUTUwpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiBhIG1lc3NhZ2UgY29udGFpbnMgYSBrYXBwYSBlbW90ZS5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7bm9kZX0gbXNnIC0gTWVzc2FnZSBub2RlXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBrYXBwYUNoZWNrKG1zZylcclxuICAgIHtcclxuICAgICAgICAkKCdpbWcnLCBtc2cpLmVhY2goZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCAkaW1nID0gJCh0aGlzKTtcclxuXHJcbiAgICAgICAgICAgIGlmICgvXFx1ZDgzY1xcdWRmMWQvZy50ZXN0KCRpbWcuYXR0cignYWx0JykpKSB7XHJcbiAgICAgICAgICAgICAgICAkaW1nLnJlcGxhY2VXaXRoKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCdLYXBwYScpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWQgVHdpdGNoIGVtb3Rlcy5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGxvYWRUd2l0Y2hFbW90ZXMoKVxyXG4gICAge1xyXG4gICAgICAgIEVtb3RlLmVtb3Rlc1snTFVMJ10gPSB7IHVybDogJ2h0dHBzOi8vY2RuLmJldHRlcnR0di5uZXQvZW1vdGUvNTY3YjAwYzYxZGRiZTE3ODY2ODhhNjMzLzF4JyB9O1xyXG4gICAgICAgIGNvbnN0IHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHhoci5vcGVuKCdHRVQnLCAnaHR0cHM6Ly90d2l0Y2hlbW90ZXMuY29tL2FwaV9jYWNoZS92My9nbG9iYWwuanNvbicpO1xyXG4gICAgICAgIHhoci5zZW5kKCk7XHJcbiAgICAgICAgeGhyLnRpbWVvdXQgPSA1MDAwO1xyXG4gICAgICAgIGNvbnN0IHVybFRlbXBsYXRlID0gJ2h0dHBzOi8vc3RhdGljLWNkbi5qdHZudy5uZXQvZW1vdGljb25zL3YxLyc7XHJcblxyXG4gICAgICAgIHhoci5vbnRpbWVvdXQgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgRW1vdGUuc3RhdGVzWyd0d2l0Y2gnXS5sb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHhoci5vbmVycm9yID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIEVtb3RlLnN0YXRlc1sndHdpdGNoJ10ubG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgRW1vdGUuc3RhdGVzWyd0d2l0Y2gnXS5sb2FkZWQgPSB0cnVlO1xyXG5cclxuICAgICAgICAgICAgaWYgKHhoci5yZXNwb25zZVRleHQgPT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGVtb3RlRGljID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2VUZXh0KTtcclxuXHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgZW1vdGUgaW4gZW1vdGVEaWMpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBFbW90ZS5hZGRFbW90ZVRvVHJpZShlbW90ZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgRW1vdGUuZW1vdGVzW2Vtb3RlXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IHVybFRlbXBsYXRlICsgZW1vdGVEaWNbZW1vdGVdWydpZCddICsgJy8nICsgJzEuMCdcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZCBUd2l0Y2ggc3Vic2NyaWJlciBlbW90ZXMuXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBsb2FkU3ViRW1vdGVzKClcclxuICAgIHtcclxuICAgICAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICB4aHIub3BlbignR0VUJywgJ2h0dHBzOi8vdHdpdGNoZW1vdGVzLmNvbS9hcGlfY2FjaGUvdjMvc3Vic2NyaWJlci5qc29uJyk7XHJcbiAgICAgICAgeGhyLnNlbmQoKTtcclxuICAgICAgICB4aHIudGltZW91dCA9IDUwMDA7XHJcbiAgICAgICAgY29uc3QgdXJsVGVtcGxhdGUgPSAnaHR0cHM6Ly9zdGF0aWMtY2RuLmp0dm53Lm5ldC9lbW90aWNvbnMvdjEvJztcclxuXHJcbiAgICAgICAgeGhyLm9udGltZW91dCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBFbW90ZS5zdGF0ZXNbJ3N1YiddLmxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgRW1vdGUuc3RhdGVzWydzdWInXS5sb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICBFbW90ZS5zdGF0ZXNbJ3N1YiddLmxvYWRlZCA9IHRydWU7XHJcblxyXG4gICAgICAgICAgICBpZiAoeGhyLnJlc3BvbnNlVGV4dCA9PT0gJycpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgZW1vdGVEaWMgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xyXG5cclxuICAgICAgICAgICAgZm9yIChjb25zdCBjaGFubmVsIGluIGVtb3RlRGljKSB7XHJcblx0XHRcdFxyXG4gICAgICAgICAgICAgICAgZm9yIChjb25zdCBpIGluIGVtb3RlRGljW2NoYW5uZWxdWydlbW90ZXMnXSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkaWN0ID0gZW1vdGVEaWNbY2hhbm5lbF1bJ2Vtb3RlcyddW2ldO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvZGUgPSBkaWN0Wydjb2RlJ107XHJcblx0XHRcdFx0XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKEVtb3RlLmlzVmFsaWRFbW90ZShjb2RlKSkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgRW1vdGUuYWRkRW1vdGVUb1RyaWUoY29kZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBFbW90ZS5lbW90ZXNbY29kZV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IHVybFRlbXBsYXRlICsgZGljdFsnaWQnXSArICcvJyArICcxLjAnXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWQgQlRUViBlbW90ZXMuXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBsb2FkQlRUVkVtb3RlcygpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgeGhyLm9wZW4oJ0dFVCcsICdodHRwczovL2FwaS5iZXR0ZXJ0dHYubmV0LzIvZW1vdGVzJyk7XHJcbiAgICAgICAgeGhyLnNlbmQoKTtcclxuICAgICAgICB4aHIudGltZW91dCA9IDUwMDA7XHJcbiAgICAgICAgY29uc3QgdXJsVGVtcGxhdGUgPSAnaHR0cHM6Ly9jZG4uYmV0dGVydHR2Lm5ldC9lbW90ZS8nO1xyXG5cclxuICAgICAgICB4aHIub250aW1lb3V0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIEVtb3RlLnN0YXRlc1snQlRUViddLmxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgRW1vdGUuc3RhdGVzWydCVFRWJ10ubG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG5cclxuICAgICAgICAgICAgRW1vdGUuc3RhdGVzWydCVFRWJ10ubG9hZGVkID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgICAgIGlmICh4aHIucmVzcG9uc2VUZXh0ID09PSAnJykge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCBlbW90ZUxpc3QgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpWydlbW90ZXMnXTtcclxuXHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgaSBpbiBlbW90ZUxpc3QpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBkaWN0ID0gZW1vdGVMaXN0W2ldO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghRW1vdGUuY29udGFpbnNEaXNhbGxvd2VkQ2hhcihkaWN0Wydjb2RlJ10pKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIEVtb3RlLmFkZEVtb3RlVG9UcmllKGRpY3RbJ2NvZGUnXSk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIEVtb3RlLmVtb3Rlc1tkaWN0Wydjb2RlJ11dID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1cmw6IHVybFRlbXBsYXRlICsgZGljdFsnaWQnXSArICcvJyArICcxeCdcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIExvYWQgQlRUViBjaGFubmVsIGVtb3Rlcy5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGxvYWRCVFRWQ2hhbm5lbEVtb3RlcygpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3QgY2hhbm5lbHMgPSBnZXRPcHRpb25zKClbJ0JUVFZDaGFubmVscyddO1xyXG4gICAgICAgIGNvbnN0IGNvbW1hQ2hhbm5lbHMgPSBjaGFubmVscy5yZXBsYWNlKC9cXHMrL2csICcnKS5zcGxpdCgnLCcpO1xyXG4gICAgICAgIGxldCBjaGFubmVsc0xlbmd0aCA9IGNvbW1hQ2hhbm5lbHMubGVuZ3RoO1xyXG5cclxuICAgICAgICBjb21tYUNoYW5uZWxzLmZvckVhY2goZnVuY3Rpb24gKGNoYW5uZWwpIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChjaGFubmVsLnRyaW0oKSA9PT0gJycpIHtcclxuICAgICAgICAgICAgICAgIGNoYW5uZWxzTGVuZ3RoLS07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKEVtb3RlLnN0YXRlc1snQlRUVkNoYW5uZWxzJ10ubG9hZGVkQ291bnQgPj0gY2hhbm5lbHNMZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBFbW90ZS5zdGF0ZXNbJ0JUVFZDaGFubmVscyddLmxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICAgICAgeGhyLm9wZW4oJ0dFVCcsICdodHRwczovL2FwaS5iZXR0ZXJ0dHYubmV0LzIvY2hhbm5lbHMvJyArIGNoYW5uZWwpO1xyXG4gICAgICAgICAgICB4aHIuc2VuZCgpO1xyXG4gICAgICAgICAgICB4aHIudGltZW91dCA9IDUwMDA7XHJcbiAgICAgICAgICAgIGNvbnN0IHVybFRlbXBsYXRlID0gJ2h0dHBzOi8vY2RuLmJldHRlcnR0di5uZXQvZW1vdGUvJztcclxuXHJcbiAgICAgICAgICAgIHhoci5vbnRpbWVvdXQgPSBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBFbW90ZS5zdGF0ZXNbJ0JUVFZDaGFubmVscyddLmxvYWRlZENvdW50Kys7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKEVtb3RlLnN0YXRlc1snQlRUVkNoYW5uZWxzJ10ubG9hZGVkQ291bnQgPj0gY2hhbm5lbHNMZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgICAgICBFbW90ZS5zdGF0ZXNbJ0JUVFZDaGFubmVscyddLmxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uKCkge1xyXG5cclxuICAgICAgICAgICAgICAgIEVtb3RlLnN0YXRlc1snQlRUVkNoYW5uZWxzJ10ubG9hZGVkQ291bnQrKztcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoRW1vdGUuc3RhdGVzWydCVFRWQ2hhbm5lbHMnXS5sb2FkZWRDb3VudCA+PSBjaGFubmVsc0xlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgICAgIEVtb3RlLnN0YXRlc1snQlRUVkNoYW5uZWxzJ10ubG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgRW1vdGUuc3RhdGVzWydCVFRWQ2hhbm5lbHMnXS5sb2FkZWRDb3VudCsrO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChFbW90ZS5zdGF0ZXNbJ0JUVFZDaGFubmVscyddLmxvYWRlZENvdW50ID49IGNoYW5uZWxzTGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgRW1vdGUuc3RhdGVzWydCVFRWQ2hhbm5lbHMnXS5sb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmICh4aHIucmVzcG9uc2VUZXh0ID09PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbW90ZUxpc3QgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpWydlbW90ZXMnXTtcclxuXHJcbiAgICAgICAgICAgICAgICBmb3IgKGNvbnN0IGkgaW4gZW1vdGVMaXN0KSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRpY3QgPSBlbW90ZUxpc3RbaV07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICghRW1vdGUuY29udGFpbnNEaXNhbGxvd2VkQ2hhcihkaWN0Wydjb2RlJ10pKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBFbW90ZS5hZGRFbW90ZVRvVHJpZShkaWN0Wydjb2RlJ10pO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgRW1vdGUuZW1vdGVzW2RpY3RbJ2NvZGUnXV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cmw6IHVybFRlbXBsYXRlICsgZGljdFsnaWQnXSArICcvJyArICcxeCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGFubmVsOiBjaGFubmVsICsgJyAoYnR0diknXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogTG9hZCBJY2UncyBvbGQgc3Vic2NyaWJlciBlbW90ZXMuXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBsb2FkSWNlRW1vdGVzKClcclxuICAgIHtcclxuICAgICAgICBjb25zdCBzdWJUaWVyRW1vdGVzID0ge1xyXG4gICAgICAgICAgICAxOiBbXHJcbiAgICAgICAgICAgICAgICAncHVycGxlMScsICdwdXJwbGUyJywgJ3B1cnBsZTMnLCAncHVycGxlNCcsICdwdXJwbGVBaGhoJywgJ3B1cnBsZUFybTEnLCAncHVycGxlQXJtMicsICdwdXJwbGVCbHVlc2NyZWVuJywgJ3B1cnBsZUJydWgnLCAncHVycGxlQ2lncmlwJywgJ3B1cnBsZUNsYXVzJyxcclxuICAgICAgICAgICAgICAgICdwdXJwbGVDb29sc3RvcnknLCAncHVycGxlQ3JlZXAnLCAncHVycGxlRW56YScsICdwdXJwbGVGYWtlJywgJ3B1cnBsZVJlYWwnLCAncHVycGxlRnJhbmsnLCAncHVycGxlRnJvJywgJ3B1cnBsZUljZScsICdwdXJwbGVLS29uYScsICdwdXJwbGVMVUwnLFxyXG4gICAgICAgICAgICAgICAgJ3B1cnBsZU9tZycsICdwdXJwbGVQcmlkZScsICdwdXJwbGVSb2ZsJywgJ3B1cnBsZUxlbycsICdwdXJwbGVXJywgJ3B1cnBsZVdhdCdcclxuICAgICAgICAgICAgXSxcclxuICAgICAgICAgICAgMjogW1xyXG4gICAgICAgICAgICAgICAgJ3B1cnBsZUN4JywgJ3B1cnBsZUxld2QnLCAncHVycGxlTGFtYScsICdwdXJwbGVQaXp6YScsICdwdXJwbGVXYWxsZXQnLCAncHVycGxlUycsICdwdXJwbGVMYXRlJywgJ3B1cnBsZU1vb3NlJywgJ3B1cnBsZU5vc2UnLCAncHVycGxlV3V0J1xyXG4gICAgICAgICAgICBdLFxyXG4gICAgICAgICAgICAzOiBbXHJcbiAgICAgICAgICAgICAgICAncHVycGxlQWxsZW4nLCAncHVycGxlVHJvbGwnXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmb3IoY29uc3QgdGllciBpbiBzdWJUaWVyRW1vdGVzKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3ViVGllckVtb3Rlc1t0aWVyXS5sZW5ndGg7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgICAgIEVtb3RlLmFkZEVtb3RlVG9UcmllKHN1YlRpZXJFbW90ZXNbdGllcl1baV0pO1xyXG5cclxuICAgICAgICAgICAgICAgIEVtb3RlLmVtb3Rlc1tzdWJUaWVyRW1vdGVzW3RpZXJdW2ldXSA9IHtcclxuICAgICAgICAgICAgICAgICAgICB1cmw6IGNocm9tZS5leHRlbnNpb24uZ2V0VVJMKCcvaWNvbnMvZW1vdGVzLycgKyBzdWJUaWVyRW1vdGVzW3RpZXJdW2ldICsgJy5wbmcnKSxcclxuICAgICAgICAgICAgICAgICAgICB0aWVyOiB0aWVyXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIHRleHQgaXMgYSB2YWxpZCBlbW90ZVxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHRleHRcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGlzVmFsaWRFbW90ZSh0ZXh0KVxyXG4gICAge1xyXG4gICAgICAgIHJldHVybiAhKHRleHRbMF0ubWF0Y2goL1tBLVpdL2cpIHx8XHJcbiAgICAgICAgICAgIHRleHQubWF0Y2goL15bYS16XSskL2cpIHx8XHJcbiAgICAgICAgICAgIHRleHQubWF0Y2goL15cXGQqJC9nKVxyXG4gICAgICAgICk7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2tzIGlmIHRleHQgY29udGFpbnMgZGlzYWxsb3dlZCBjaGFyYWN0ZXJzLlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHdvcmRcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGNvbnRhaW5zRGlzYWxsb3dlZENoYXIod29yZClcclxuICAgIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGMgaW4gRElTQUxMT1dFRF9DSEFSUykge1xyXG4gICAgICAgICAgICBpZiAod29yZC5pbmRleE9mKGMpID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9O1xyXG5cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZHMgZW1vdGUgaW50byBnbG9iYWwgRW1vdGUudHJpZS5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBlbW90ZVN0cmluZ1xyXG4gICAgICovXHJcbiAgICBzdGF0aWMgYWRkRW1vdGVUb1RyaWUoZW1vdGVTdHJpbmcpIHtcclxuICAgICAgICB2YXIgbG93ZXJlZCA9IGVtb3RlU3RyaW5nLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgdmFyIGxvY2FsVHJpZSA9IEVtb3RlLnRyaWU7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbW90ZVN0cmluZy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAobG93ZXJlZC5jaGFyQXQoaSkgaW4gbG9jYWxUcmllKSB7XHJcbiAgICAgICAgICAgICAgICBpZih0eXBlb2YgbG9jYWxUcmllW2xvd2VyZWQuY2hhckF0KGkpXSAhPT0gJ3N0cmluZycgfHwgaSA9PSBlbW90ZVN0cmluZy5sZW5ndGgtMSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxUcmllID0gbG9jYWxUcmllW2xvd2VyZWQuY2hhckF0KGkpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChpID09IGVtb3RlU3RyaW5nLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBsb2NhbFRyaWVbbG93ZXJlZC5jaGFyQXQoaSldID0gZW1vdGVTdHJpbmc7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxvY2FsVHJpZVtsb3dlcmVkLmNoYXJBdChpKV0gPSBbXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGxvY2FsVHJpZSA9IGxvY2FsVHJpZVtsb3dlcmVkLmNoYXJBdChpKV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9O1xyXG59O1xyXG5cclxuRW1vdGUuc3RhdGVzID0ge1xyXG4gICAgdHdpdGNoOiB7XHJcbiAgICAgICAgbG9hZGVkOiBmYWxzZVxyXG4gICAgfSxcclxuICAgIHN1Yjoge1xyXG4gICAgICAgIGxvYWRlZDogZmFsc2VcclxuICAgIH0sXHJcbiAgICBCVFRWOiB7XHJcbiAgICAgICAgbG9hZGVkOiBmYWxzZVxyXG4gICAgfSxcclxuICAgIEJUVFZDaGFubmVsczoge1xyXG4gICAgICAgIGxvYWRlZDogZmFsc2UsXHJcbiAgICAgICAgbG9hZGVkQ291bnQ6IDBcclxuICAgIH1cclxufTtcclxuXHJcbkVtb3RlLmVtb3RlcyA9IHt9O1xyXG5FbW90ZS50cmllID0gW107XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZW1vdGUuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgZ2V0T3B0aW9ucyB9IGZyb20gJy4vbWFpbic7XHJcbmltcG9ydCBDaGF0Q29sb3JzIGZyb20gJy4vY2hhdENvbG9ycyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBTdWJzY3JpYmVyc1xyXG57XHJcbiAgICBzdGF0aWMgbG9hZEJhZGdlcygpXHJcbiAgICB7XHJcbiAgICAgICAgU3Vic2NyaWJlcnMuYmFkZ2VzWycxJ10gPSBjaHJvbWUuZXh0ZW5zaW9uLmdldFVSTCgnL2ljb25zL3RpZXJCYWRnZTEucG5nJyk7XHJcbiAgICAgICAgU3Vic2NyaWJlcnMuYmFkZ2VzWycyJ10gPSBjaHJvbWUuZXh0ZW5zaW9uLmdldFVSTCgnL2ljb25zL3RpZXJCYWRnZTIucG5nJyk7XHJcbiAgICAgICAgU3Vic2NyaWJlcnMuYmFkZ2VzWyczJ10gPSBjaHJvbWUuZXh0ZW5zaW9uLmdldFVSTCgnL2ljb25zL3RpZXJCYWRnZTMucG5nJyk7XHJcbiAgICB9XHJcblxyXG4gICAgc3RhdGljIHNldFNlbGZJbmZvKGltZ1NyYylcclxuICAgIHtcclxuICAgICAgICBjb25zdCBwcm9maWxlSWQgPSBpbWdTcmMuc3BsaXQoJy8nKVszXTtcclxuICAgICAgICBjb25zdCBzdWJUaWVyID0gZ2V0T3B0aW9uc1snc3Vic2NyaXB0aW9ucyddW3Byb2ZpbGVJZF1bJ3N1YnRpZXInXTtcclxuXHJcbiAgICAgICAgU3Vic2NyaWJlcnMuc2VsZiA9IHtcclxuICAgICAgICAgICAgcHJvZmlsZUltYWdlVXJsOiBpbWdTcmMsXHJcbiAgICAgICAgICAgIHByb2ZpbGVJZDogcHJvZmlsZUlkLFxyXG4gICAgICAgICAgICBzdWJUaWVyOiBzdWJUaWVyXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHJpZXZlcyBzdWJzY3JpYmVyIGluZm9cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGFkZEJhZGdlcyhub2RlKVxyXG4gICAge1xyXG4gICAgICAgIGlmICgkKG5vZGUpLmZpbmQoJ2ltZycpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHlwZW9mICQobm9kZSkuZmluZCgnI2F1dGhvci1waG90bycpWzBdID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvKiogTGlzdGVuIGZvciBtdXRhdGlvbnMgb24gYXV0aG9yIGltYWdlICovXHJcbiAgICAgICAgY29uc3QgaW1hZ2VPYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uKG11dGF0aW9ucykge1xyXG4gICAgICAgICAgICBtdXRhdGlvbnMuZm9yRWFjaChmdW5jdGlvbihtdXRhdGlvbikge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChtdXRhdGlvbi5hdHRyaWJ1dGVOYW1lID09PSAnc3JjJykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm9maWxlSWQgPSBtdXRhdGlvbi50YXJnZXQuc3JjLnNwbGl0KCcvJylbM107XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcm9maWxlSWQgPT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIG11dGF0aW9uLnRhcmdldC5zZXRBdHRyaWJ1dGUoJ2RhdGEtcHJvZmlsZS1pZCcsIHByb2ZpbGVJZCk7XHJcblx0XHRcdFx0XHRDaGF0Q29sb3JzKG11dGF0aW9uLnRhcmdldCwgcHJvZmlsZUlkKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3ViSW5mbyA9IGdldE9wdGlvbnMoKVsnc3Vic2NyaXB0aW9ucyddW3Byb2ZpbGVJZF07XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygc3ViSW5mbyA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbXV0YXRpb24udGFyZ2V0LnNldEF0dHJpYnV0ZSgnZGF0YS1zdWItdGllcicsIDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG11dGF0aW9uLnRhcmdldC5zZXRBdHRyaWJ1dGUoJ2RhdGEtc3ViLXRpZXInLCBnZXRPcHRpb25zKClbJ3N1YnNjcmlwdGlvbnMnXVtwcm9maWxlSWRdWydzdWJ0aWVyJ10pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgU3Vic2NyaWJlcnMuc2V0QmFkZ2VJbWFnZShub2RlLCBwcm9maWxlSWQpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvKiogTGlzdGVuIGZvciBtdXRhdGlvbnMgb24gZGF0YS1wcm9maWxlIGlkIG9mIGF1dGhvciBpbWFnZSAqL1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGFPYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKGZ1bmN0aW9uKG11dGF0aW9ucykge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgbXV0YXRpb25zLmZvckVhY2goZnVuY3Rpb24obXV0YXRpb24pIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobXV0YXRpb24udGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1wcm9maWxlLWlkJykgPT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbXV0YXRpb24udGFyZ2V0LnNldEF0dHJpYnV0ZSgnZGF0YS1wcm9maWxlLWlkJywgcHJvZmlsZUlkKTtcclxuXHRcdFx0XHRcdFx0XHRcdENoYXRDb2xvcnMobXV0YXRpb24udGFyZ2V0LCBwcm9maWxlSWQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChtdXRhdGlvbi50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLXN1Yi10aWVyJykgPT09ICcnKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN1YkluZm8gPSBnZXRPcHRpb25zKClbJ3N1YnNjcmlwdGlvbnMnXVtwcm9maWxlSWRdO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHN1YkluZm8gPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG11dGF0aW9uLnRhcmdldC5zZXRBdHRyaWJ1dGUoJ2RhdGEtc3ViLXRpZXInLCAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtdXRhdGlvbi50YXJnZXQuc2V0QXR0cmlidXRlKCdkYXRhLXN1Yi10aWVyJywgZ2V0T3B0aW9ucygpWydzdWJzY3JpcHRpb25zJ11bcHJvZmlsZUlkXVsnc3VidGllciddKTtcclxuXHRcdFx0XHRcdFx0XHRcdFx0Q2hhdENvbG9ycyhtdXRhdGlvbi50YXJnZXQsIHByb2ZpbGVJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0YU9ic2VydmVyQ29uZmlnID0geyBhdHRyaWJ1dGVzOiB0cnVlLCBjaGlsZExpc3Q6IHRydWUsIGNoYXJhY3RlckRhdGE6IHRydWUsIHN1YnRyZWU6IGZhbHNlIH07XHJcbiAgICAgICAgICAgICAgICAgICAgZGF0YU9ic2VydmVyLm9ic2VydmUobXV0YXRpb24udGFyZ2V0LCBkYXRhT2JzZXJ2ZXJDb25maWcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3QgaW1hZ2VPYnNlcnZlckNvbmZpZyA9IHsgYXR0cmlidXRlczogdHJ1ZSwgY2hpbGRMaXN0OiB0cnVlLCBjaGFyYWN0ZXJEYXRhOiB0cnVlLCBzdWJ0cmVlOiB0cnVlIH07XHJcbiAgICAgICAgaW1hZ2VPYnNlcnZlci5vYnNlcnZlKCQobm9kZSkuZmluZCgnI2F1dGhvci1waG90bycpWzBdLCBpbWFnZU9ic2VydmVyQ29uZmlnKTtcclxuICAgIH07XHJcblxyXG4gICAgc3RhdGljIHNldEJhZGdlSW1hZ2Uobm9kZSwgcHJvZmlsZUlkKVxyXG4gICAge1xyXG4gICAgICAgIGlmICgkKG5vZGUpLmZpbmQoJy50aWVyLWJhZGdlJykubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHN1YkluZm8gPSBnZXRPcHRpb25zKClbJ3N1YnNjcmlwdGlvbnMnXVtwcm9maWxlSWRdO1xyXG5cclxuICAgICAgICBpZiAodHlwZW9mIHN1YkluZm8gPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHRpZXJJbWcgPSBTdWJzY3JpYmVycy5iYWRnZXNbc3ViSW5mb1snc3VidGllciddXTtcclxuXHJcbiAgICAgICAgY29uc3QgaW1nSHRtbCA9IGA8c3BhbiBjbGFzcz1cImhpbnQtLXJpZ2h0XCIgYXJpYS1sYWJlbD1cIkljZVBvc2VpZG9uLmNvbSAmIzEwOyYjMTA7VGllciAke3N1YkluZm9bJ3N1YnRpZXInXX0gU3Vic2NyaWJlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIke3RpZXJJbWd9XCIgY2xhc3M9XCJ0aWVyLWJhZGdlXCIgLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5gO1xyXG5cclxuICAgICAgICAkKG5vZGUpLmZpbmQoJyNhdXRob3ItYmFkZ2VzJykucHJlcGVuZChpbWdIdG1sKTtcclxuXHJcbiAgICAgICAgaWYgKGdldE9wdGlvbnMoKVsnZW5hYmxlQ2hhdENvbG9ycyddKSB7XHJcbiAgICAgICAgICAgICQobm9kZSkuZmluZCgnI2F1dGhvci1uYW1lJykuY3NzKCdjb2xvcicsIHN1YkluZm9bJ2NvbG9yJ10pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgaHRtbCA9ICQobm9kZSkuZmluZCgnI2F1dGhvci1iYWRnZXMnKS5odG1sKCk7XHJcblxyXG4gICAgICAgICQobm9kZSkuZmluZCgnI2F1dGhvci1iYWRnZXMnKS5vbignRE9NU3VidHJlZU1vZGlmaWVkJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoJCh0aGlzKS5maW5kKCcudGllci1iYWRnZScpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS5odG1sKGh0bWwpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8qKiBSZW1vdmUgZW1wdHkgYmFkZ2VzIGFkZGVkIGJ5IFlUICovXHJcbiAgICAgICAgICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmZpbmQoJy55dC1saXZlLWNoYXQtYXV0aG9yLWJhZGdlLXJlbmRlcmVyLTAnKS5lYWNoKGZ1bmN0aW9uKGksIGVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCQoZWwpLndpZHRoKCkgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJChlbCkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufTtcclxuXHJcblN1YnNjcmliZXJzLmNoYXRNZXNzYWdlcyA9IHt9O1xyXG5TdWJzY3JpYmVycy5iYWRnZXMgPSB7fTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zdWJzY3JpYmVycy5qc1xuLy8gbW9kdWxlIGlkID0gMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgZnVuY3Rpb24gcmVwbGFjZUFsbChzdHIsIGZpbmQsIHJlcGxhY2UpIHtcclxuICAgIGxldCBzdHJpbmcgPSBcIihcIitmaW5kK1wiKSg/IVteYWx0PVxcXCJdKlxcXCIpXCI7XHJcbiAgICByZXR1cm4gc3RyLnJlcGxhY2UobmV3IFJlZ0V4cChzdHJpbmcsICdnJyksIHJlcGxhY2UpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gaXNOb2RlKG8pIHtcclxuICAgIHJldHVybiAoXHJcbiAgICAgICAgdHlwZW9mIE5vZGUgPT09ICdvYmplY3QnID8gbyBpbnN0YW5jZW9mIE5vZGUgOiBvICYmIHR5cGVvZiBvID09PSAnb2JqZWN0JyAmJiB0eXBlb2Ygby5ub2RlVHlwZSA9PT0gJ251bWJlcicgJiYgdHlwZW9mIG8ubm9kZU5hbWUgPT09ICdzdHJpbmcnXHJcbiAgICApO1xyXG59XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vdXRpbC5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgRW1vdGUgZnJvbSAnLi9lbW90ZSc7XHJcbmltcG9ydCBTdWJzY3JpYmVycyBmcm9tICcuL3N1YnNjcmliZXJzJztcclxuaW1wb3J0IE1lbnRpb25IaWdobGlnaHQgZnJvbSAnLi9tZW50aW9uSGlnaGxpZ2h0JztcclxuXHJcbi8qKlxyXG4gKiBCaW5kcyBjaGF0IG11dGF0aW9uIG9ic2VydmVyIGFuZCBsaXN0ZW4gZm9yIG5ldyBjaGF0IG1lc3NhZ2VzLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY2hhdE9ic2VydmVyKClcclxue1xyXG4gICAgLyoqIExvb3Agb3ZlciBleGlzdGluZyBtZXNzYWdlcyBhbmQgYWRkIGJhZGdlcyAqL1xyXG4gICAgJChkb2N1bWVudCkub24oJ0RPTU5vZGVJbnNlcnRlZCcsICQoJyNjaGF0JykucGFyZW50KCksIGZ1bmN0aW9uIChlKSB7XHJcblxyXG4gICAgICAgIGlmICgkKGUudGFyZ2V0KS5maW5kKCdpbWcnKS5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLyoqIExpc3RlbiBmb3Igc2VsZi1hdmF0YXIgbG9hZCBhbmQgc2V0IHNlbGYtaW5mbyAqL1xyXG4gICAgICAgIGlmICgkKGUudGFyZ2V0KS5maW5kKCcjYXZhdGFyJykubGVuZ3RoICE9PSAwKSB7XHJcblxyXG4gICAgICAgICAgICAkKGUudGFyZ2V0KS5maW5kKCcjYXZhdGFyJykub24oJ2xvYWQnLCBmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBpbWdTcmMgPSAkKHRoaXMpLmF0dHIoJ3NyYycpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChpbWdTcmMuaW5jbHVkZXMoJ2h0dHBzOi8vJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBTdWJzY3JpYmVycy5zZXRTZWxmSW5mbyhpbWdTcmMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0eXBlb2YgJChlLnRhcmdldCkuZmluZCgnI2F1dGhvci1waG90bycpWzBdID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBTdWJzY3JpYmVycy5hZGRCYWRnZXMoZS50YXJnZXQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN0eWxlLXNjb3BlIC55dC1saXZlLWNoYXQtaXRlbS1saXN0LXJlbmRlcmVyJyk7XHJcblxyXG4gICAgaWYgKCF0YXJnZXQpIHtcclxuICAgICAgICBzZXRUaW1lb3V0KGNoYXRPYnNlcnZlciwgMjUwKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2hhdCBib3ggb2JzZXJ2ZXJcclxuICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoZnVuY3Rpb24gKG11dGF0aW9ucykge1xyXG5cclxuICAgICAgICBtdXRhdGlvbnMuZm9yRWFjaChmdW5jdGlvbiAobXV0YXRpb24pIHtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IG5ld05vZGVzID0gbXV0YXRpb24uYWRkZWROb2RlcztcclxuXHJcbiAgICAgICAgICAgIGlmIChuZXdOb2RlcyAhPT0gbnVsbCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0ICRub2RlcyA9ICQobmV3Tm9kZXMpO1xyXG5cclxuICAgICAgICAgICAgICAgICRub2Rlcy5lYWNoKGZ1bmN0aW9uICgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgJG5vZGUgPSAkKHRoaXMpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoISRub2RlLmhhc0NsYXNzKCd5dC1saXZlLWNoYXQtaXRlbS1saXN0LXJlbmRlcmVyJykpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgTWVudGlvbkhpZ2hsaWdodCgkbm9kZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgRW1vdGUuZW1vdGVDaGVjaygkbm9kZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHtcclxuICAgICAgICBjaGFyYWN0ZXJEYXRhOiBmYWxzZSxcclxuICAgICAgICBhdHRyaWJ1dGVzOiBmYWxzZSxcclxuICAgICAgICBjaGlsZExpc3Q6IHRydWUsXHJcbiAgICAgICAgc3VidHJlZTogdHJ1ZVxyXG4gICAgfTtcclxuXHJcbiAgICBvYnNlcnZlci5vYnNlcnZlKHRhcmdldCwgb3B0aW9ucyk7XHJcbn07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vY2hhdE9ic2VydmVyLmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBFbW90ZSBmcm9tICcuL2Vtb3RlJztcclxuaW1wb3J0IGRvbmF0ZUJ1dHRvbiBmcm9tICcuL292ZXJsYXkvZG9uYXRlQnV0dG9uJztcclxuaW1wb3J0IHNwb25zb3JCdXR0b24gZnJvbSAnLi9vdmVybGF5L3Nwb25zb3JCdXR0b24nO1xyXG5pbXBvcnQgY29sb3JCdXR0b24gZnJvbSAnLi9vdmVybGF5L2NvbG9yQnV0dG9uJztcclxuaW1wb3J0IGNoZWNrSWZXYXRjaGluZ0xpdmUgZnJvbSAnLi9vdmVybGF5L2NoZWNrSWZXYXRjaGluZ0xpdmUnO1xyXG5pbXBvcnQgQWx3YXlzU2Nyb2xsRG93biBmcm9tICcuL292ZXJsYXkvYWx3YXlzU2Nyb2xsRG93bic7XHJcbmltcG9ydCBTcG9uc29yQ2hlY2sgZnJvbSAnLi9vdmVybGF5L3Nwb25zb3JDaGVjayc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQYWdlQ2hlY2tcclxue1xyXG4gICAgLyoqXHJcbiAgICAgKiBDaGVja3MgaWYgdXNlciBpcyB3YXRjaGluZyBmcm9tIHdyb25nIGxpdmVzdHJlYW0gcGFnZSBhbmQgd2FybnMgdGhlbS5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIHlvdXR1YmVHYW1pbmcoKVxyXG4gICAge1xyXG4gICAgICAgIC8vIFJ1biBjaGVja3MgaW4gc3RlcHMgc28gd2UncmUgbm90IGNhbGxpbmcgbWV0aG9kcyB1bm5lY2Vzc2FyaWx5XHJcbiAgICAgICAgY29uc3QgdXJsID0gZG9jdW1lbnQubG9jYXRpb24uaHJlZjtcclxuXHJcbiAgICAgICAgaWYoIXVybC5pbmNsdWRlcygnZ2FtaW5nLnlvdXR1YmUnKSl7XHJcbiAgICAgICAgICAgIGNvbnN0IGlmcmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsaXZlLWNoYXQtaWZyYW1lJyk7XHJcblxyXG4gICAgICAgICAgICBpZihpZnJhbWUpe1xyXG4gICAgICAgICAgICAgICAgY29uc3QgJHRleHRXcmFwcGVyID0gJCgnLnl0LXVzZXItaW5mbycpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGV4dCA9ICR0ZXh0V3JhcHBlci5maW5kKCdhJykudGV4dCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHRleHQgPT09ICdJY2UgUG9zZWlkb24nKXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByZWRpcmVjdENvbmZpcm0gPSBjb25maXJtKCdbSWNlIFBvc2VpZG9uVFZdIEdvIHRvIHRoZSBvZmZpY2lhbCBJY2UgUG9zZWlkb24gbGl2ZXN0cmVhbSBwYWdlPycpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVkaXJlY3RDb25maXJtID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbiA9ICdodHRwczovL2dhbWluZy55b3V0dWJlLmNvbS9pY2VfcG9zZWlkb24vbGl2ZSc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENoZWNrcyBpZiB1c2VyIGlzIHdhdGNoaW5nIGEgbGl2ZXN0cmVhbSBvbiBZb3V0dWJlIGdhbWluZy5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGxpdmVzdHJlYW1QYWdlKClcclxuICAgIHtcclxuICAgICAgICAvLyBSdW4gY2hlY2tzIGluIHN0ZXBzIHNvIHdlJ3JlIG5vdCBjYWxsaW5nIG1ldGhvZHMgdW5uZWNlc3NhcmlseVxyXG4gICAgICAgIGNvbnN0IHVybCA9IGRvY3VtZW50LmxvY2F0aW9uLmhyZWY7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ293bmVyJyk7XHJcbiAgICAgICAgY29uc3QgdGV4dCA9ICQodGFyZ2V0KS5maW5kKCdzcGFuJykudGV4dCgpO1xyXG5cclxuICAgICAgICBpZighdXJsLmluY2x1ZGVzKCdsaXZlX2NoYXQnKSAmJiAhdXJsLmluY2x1ZGVzKCdpc19wb3BvdXQ9MScpKXtcclxuICAgICAgICAgICAgY29uc3QgY2hhdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaGF0Jyk7XHJcblxyXG4gICAgICAgICAgICBpZighdGFyZ2V0IHx8ICFjaGF0KXtcclxuICAgICAgICAgICAgICAgIFBhZ2VDaGVjay5zdHJlYW1wYWdlQ2hlY2tzKys7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKFBhZ2VDaGVjay5zdHJlYW1wYWdlQ2hlY2tzIDwgNSlcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KFBhZ2VDaGVjay5saXZlc3RyZWFtUGFnZSwgMTAwMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZih0ZXh0ID09PSAnSWNlIFBvc2VpZG9uJykge1xyXG4gICAgICAgICAgICBkb25hdGVCdXR0b24oKTtcclxuICAgICAgICAgICAgc3BvbnNvckJ1dHRvbigpO1xyXG4gICAgICAgICAgICBjb2xvckJ1dHRvbigpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KFNwb25zb3JDaGVjay5jaGVjaywgMjUwMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBFbW90ZS5sb2FkRW1vdGVzKCk7XHJcbiAgICAgICAgQWx3YXlzU2Nyb2xsRG93bi5pbml0KCk7XHJcbiAgICAgICAgY2hlY2tJZldhdGNoaW5nTGl2ZSgpO1xyXG5cclxuICAgICAgICBQYWdlQ2hlY2suc3RyZWFtcGFnZUNoZWNrcyA9IDA7XHJcbiAgICB9O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2sgaWYgdXNlciBpcyB3YXRjaGluZyBhIGxpdmVzdHJlYW0uXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBpc0xpdmVzdHJlYW0oKSB7XHJcbiAgICAgICAgY29uc3QgbGl2ZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy55dHAtbGl2ZS1iYWRnZS55dHAtYnV0dG9uJyk7XHJcbiAgICAgICAgY29uc3QgY2hhdEFwcCAgICA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3l0LWxpdmUtY2hhdC1hcHAnKTtcclxuICAgICAgICBjb25zdCBjaGF0aUZyYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xpdmUtY2hhdC1pZnJhbWUnKTtcclxuICAgICAgICBjb25zdCBjaGF0SGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnl0LWxpdmUtY2hhdC1oZWFkZXItcmVuZGVyZXInKTtcclxuXHJcbiAgICAgICAgLy8gVGhhbmtzIFN0YWNrT3ZlcmZsb3chIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzM0MjAwMDQvYWNjZXNzLXBhcmVudC11cmwtZnJvbS1pZnJhbWVcclxuICAgICAgICB2YXIgdXJsID0gKHdpbmRvdy5sb2NhdGlvbiAhPSB3aW5kb3cucGFyZW50LmxvY2F0aW9uKVxyXG4gICAgICAgICAgICA/IGRvY3VtZW50LnJlZmVycmVyXHJcbiAgICAgICAgICAgIDogZG9jdW1lbnQubG9jYXRpb24uaHJlZjtcclxuXHJcblxyXG4gICAgICAgIHZhciB1cmxDaGVjayA9ICh1cmwuaW5kZXhPZignaWNlcG9zZWlkb24uY29tJykgPiAtMSk7XHJcbiAgICAgICAgdmFyIGxpdmVCdXR0b25DaGVjayA9IChkb2N1bWVudC5ib2R5LmNvbnRhaW5zKGxpdmVCdXR0b24pICYmICFsaXZlQnV0dG9uLmdldEF0dHJpYnV0ZSgnZGlzYWJsZWQnKSk7XHJcbiAgICAgICAgdmFyIGNoYXRDaGVjayA9IChkb2N1bWVudC5ib2R5LmNvbnRhaW5zKGNoYXRBcHApIHx8IGRvY3VtZW50LmJvZHkuY29udGFpbnMoY2hhdGlGcmFtZSkgfHwgZG9jdW1lbnQuYm9keS5jb250YWlucyhjaGF0SGVhZGVyKSk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUuZGVidWcoXCJVUkwgQ0hFQ0s6XCIsIHVybENoZWNrLCB1cmwpO1xyXG4gICAgICAgIGNvbnNvbGUuZGVidWcoXCJMSVZFIEJVVFRPTiBDSEVDSzpcIiwgbGl2ZUJ1dHRvbkNoZWNrKTtcclxuICAgICAgICBjb25zb2xlLmRlYnVnKFwiQ0hBVCBFWElTVFMgQ0hFQ0s6XCIsIGNoYXRDaGVjayk7XHJcblxyXG4gICAgICAgIGlmICh1cmxDaGVjayB8fCBsaXZlQnV0dG9uQ2hlY2sgfHwgY2hhdENoZWNrKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoXCJJUyBMSVZFU1RSRUFNIVwiKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc29sZS5kZWJ1ZyhcIklTIE5PVCBMSVZFU1RSRUFNXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ2hlY2sgaWYgdXNlciBpcyB3YXRjaGluZyBhbiBJY2UgUG9zZWlkb24gbGl2ZXN0cmVhbS5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGlzSWNlUG9zZWlkb25TdHJlYW0oKSB7XHJcbiAgICAgICAgLy8gVGhhbmtzIFN0YWNrT3ZlcmZsb3chIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzM0MjAwMDQvYWNjZXNzLXBhcmVudC11cmwtZnJvbS1pZnJhbWVcclxuICAgICAgICB2YXIgdXJsID0gKHdpbmRvdy5sb2NhdGlvbiAhPSB3aW5kb3cucGFyZW50LmxvY2F0aW9uKVxyXG4gICAgICAgICAgICA/IGRvY3VtZW50LnJlZmVycmVyXHJcbiAgICAgICAgICAgIDogZG9jdW1lbnQubG9jYXRpb24uaHJlZjtcclxuICAgICAgICB2YXIgWVRHY2hhbm5lbCA9ICQoXCJ5dGctb3duZXItYmFkZ2VzXCIpLnBhcmVudCgpLmF0dHIoJ2hyZWYnKTtcclxuICAgICAgICB2YXIgWVRjaGFubmVsICA9ICQoXCJhLnl0ZC12aWRlby1vd25lci1yZW5kZXJlclwiKS5hdHRyKCdocmVmJyk7XHJcblxyXG4gICAgICAgIHZhciB3aGl0ZWxpc3RlZENoYW5uZWxzID0gW1xyXG4gICAgICAgICAgICBcIi9jaGFubmVsL1VDdjlFZGxfV2J0YlBlVVJQdEZEby11QVwiLCAvLyBJY2UgUG9zZWlkb25cclxuICAgICAgICAgICAgXCIvY2hhbm5lbC9VQ3B4QXY4aTBNVFBvY2k3STdhRk54WmdcIiwgLy8gR2VvcmdlIEFsbGVuXHJcbiAgICAgICAgICAgIFwiL2NoYW5uZWwvVUNhREpfRFR6M2tibmVNV2lWMzFZaUZBXCIsIC8vIEFuc2llbiAxMiAvIGFuZHJpZXNfZGV2XHJcbiAgICAgICAgICAgIFwiL2NoYW5uZWwvVUNUbXJIUUVFRkRZUHk1MW1VZzBKcGpBXCIsIC8vIHhCeXQzelxyXG4gICAgICAgICAgICBcIi9jaGFubmVsL1VDMUV6Wk9XMXRWRUsydmptYlNvMTM3QVwiLCAvLyB4Qnl0M3ogSVBUViB0ZXN0aW5nIHN0cmVhbVxyXG4gICAgICAgICAgICBcIi9jaGFubmVsL1VDOEVvT0ZBbV9yZU5YR0hXSy1rQlVYd1wiICAvLyBzcGFyY3V0XHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgdmFyIHVybENoZWNrID0gKHVybC5pbmRleE9mKCdpY2Vwb3NlaWRvbi5jb20nKSA+IC0xIHx8IHVybC5pbmRleE9mKCdsaXZlX2NoYXQnKSA+IC0xKTtcclxuICAgICAgICB2YXIgY2hhbm5lbENoZWNrID0gKHdoaXRlbGlzdGVkQ2hhbm5lbHMuaW5kZXhPZihZVEdjaGFubmVsKSA+IC0xIHx8IHdoaXRlbGlzdGVkQ2hhbm5lbHMuaW5kZXhPZihZVGNoYW5uZWwpID4gLTEpO1xyXG5cclxuICAgICAgICBjb25zb2xlLmRlYnVnKFwiVVJMIENIRUNLOlwiLCB1cmxDaGVjaywgdXJsKTtcclxuICAgICAgICBjb25zb2xlLmRlYnVnKFwiQ0hBTk5FTCBDSEVDSzpcIiwgY2hhbm5lbENoZWNrLCBZVEdjaGFubmVsLCBZVGNoYW5uZWwpO1xyXG5cclxuICAgICAgICBpZiAodXJsQ2hlY2sgfHwgY2hhbm5lbENoZWNrKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZGVidWcoXCJJUyBJQ0VQT1NFSURPTiBTVFJFQU0hXCIpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmRlYnVnKFwiSVMgTk9UIElDRVBPU0VJRE9OIFNUUkVBTSFcIik7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5QYWdlQ2hlY2suc3RyZWFtcGFnZUNoZWNrcyA9IDA7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vcGFnZUNoZWNrLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCBFbW90ZSBmcm9tICcuL2Vtb3RlJztcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUYWJDb21wbGV0ZVxyXG57XHJcbiAgICAvKipcclxuICAgIFJlY3Vyc2l2ZWx5IGFkZHMgdG8gdmFsdWVzQXJyYXkgcG9zc2libGUgZW1vdGVzIGZyb20gbG9jYWxUcmllXHJcbiAgICAqL1xyXG4gICAgc3RhdGljIGdldFBvc3NpYmxlVmFsdWVzKGxvY2FsVHJpZSwgdmFsdWVzQXJyYXkpIHtcclxuICAgICAgICBpZiAodHlwZW9mIGxvY2FsVHJpZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgdmFsdWVzQXJyYXkucHVzaChsb2NhbFRyaWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmtleXMobG9jYWxUcmllKTtcclxuICAgICAgICAgICAgbGV0IHJldHVyblZhbHVlcyA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIFRhYkNvbXBsZXRlLmdldFBvc3NpYmxlVmFsdWVzKGxvY2FsVHJpZVtrZXlzW2ldXSwgdmFsdWVzQXJyYXkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgU2VhcmNoZXMgRW1vdGUudHJpZSBmb3IgYWxsIGVtb3RlcyBzdGFydGluZyB3aXRoIHMuIElmIGl0IGZpbmRzIG11bHRpcGxlIHZhbHVlcywgcmV0dXJucyBwb3MgKGluZGV4KSB2YWx1ZVxyXG4gICAgKi9cclxuICAgIHN0YXRpYyBmaW5kU2ltaWxhcihzLCBwb3MpIHtcclxuICAgICAgICBzID0gcy50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIGxldCBpID0gMDtcclxuICAgICAgICBsZXQgbG9jYWxUcmllID0gRW1vdGUudHJpZTtcclxuICAgICAgICB3aGlsZSAoKGkgPCBzLmxlbmd0aCkgJiYgKHMuY2hhckF0KGkpIGluIGxvY2FsVHJpZSkpIHtcclxuICAgICAgICAgICAgbG9jYWxUcmllID0gbG9jYWxUcmllW3MuY2hhckF0KGkpXTtcclxuICAgICAgICAgICAgaSsrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaSA9PSAwKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCB2YWx1ZXMgPSBbXTtcclxuICAgICAgICAgICAgVGFiQ29tcGxldGUuZ2V0UG9zc2libGVWYWx1ZXMobG9jYWxUcmllLCB2YWx1ZXMpO1xyXG4gICAgICAgICAgICBpZiAocG9zID49IHZhbHVlcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZXNbcG9zXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzdGF0aWMgYmluZEV2ZW50KCkge1xyXG4gICAgICAgICQoXCJ5dC1saXZlLWNoYXQtdGV4dC1pbnB1dC1maWVsZC1yZW5kZXJlclwiKS5vbigna2V5ZG93bicsIFwiZGl2I2lucHV0XCIsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgbGV0IGtleUNvZGUgPSBlLmtleUNvZGUgfHwgZS53aGljaDtcclxuICAgICAgICAgICAgaWYgKGtleUNvZGUgPT0gOSkge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRUZXh0ID0gJCh0aGlzKS50ZXh0KCk7XHJcbiAgICAgICAgICAgICAgICBpZigvXFxzJC8udGVzdChjdXJyZW50VGV4dCkpeyAvL2xhc3QgY2hhciBpcyB3aGl0ZXNwYWNlIC0gc28gZG9udCB0cmVhdCBpdCBhcyBhIHdvcmQuIHNwbGl0IGZ1bmN0aW9uIGRvZXNudCBhY3R1YWxseSBzcGxpdCBlZyBcIlRyaUhhcmQgXCIgaW50byBcIlRyaUhhcmRcIiBhbmQgXCJcIiBidXQgcmV0dXJucyBcIlRyaUhhcmQgXCJcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgd29yZHMgPSBjdXJyZW50VGV4dC5zcGxpdCgnICcpO1xyXG4gICAgICAgICAgICAgICAgaWYgKFRhYkNvbXBsZXRlLmxhc3RXb3JkLmxlbmd0aCkgeyAvL3dvcmQgdHlwZWQgYnkgdXNlZCBoYXMgYmVlbiBhbHJlYWR5IHJlcGxhY2VkIGJ5IHNvbWUgc3VnZ2VzdGlvbiAtPiByZW1vdmUgdGhhdCBzdWdnZXN0aW9uIChpcyBnb2luZyB0byBnZXQgcmVwbGFjZWQgYnkgbmV3IHN1Z2dlc3Rpb24gb3IgbGFzdFdvcmQpXHJcbiAgICAgICAgICAgICAgICAgICAgd29yZHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIFRhYkNvbXBsZXRlLmxhc3RXb3JkID0gd29yZHMucG9wKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBsZXQgc2ltaWxhciA9IFRhYkNvbXBsZXRlLmZpbmRTaW1pbGFyKFRhYkNvbXBsZXRlLmxhc3RXb3JkLCBUYWJDb21wbGV0ZS50YWJQcmVzc2VkQ291bnQpO1xyXG4gICAgICAgICAgICAgICAgbGV0IG5ld1RleHQgPSAnJztcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd29yZHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXdUZXh0ICs9IHdvcmRzW2ldICsgJyAnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHNpbWlsYXIpIHtcclxuICAgICAgICAgICAgICAgICAgICBuZXdUZXh0ICs9IHNpbWlsYXI7XHJcbiAgICAgICAgICAgICAgICAgICAgVGFiQ29tcGxldGUudGFiUHJlc3NlZENvdW50Kys7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld1RleHQgKz0gVGFiQ29tcGxldGUubGFzdFdvcmQ7XHJcbiAgICAgICAgICAgICAgICAgICAgVGFiQ29tcGxldGUubGFzdFdvcmQgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICBUYWJDb21wbGV0ZS50YWJQcmVzc2VkQ291bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgJCh0aGlzKS50ZXh0KG5ld1RleHQpO1xyXG4gICAgICAgICAgICAgICAgLy9hZGRzIGZvY3VzIHRvIGxhc3QgY2hhclxyXG4gICAgICAgICAgICAgICAgbGV0IHJhbmdlID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcclxuICAgICAgICAgICAgICAgIHJhbmdlLnNlbGVjdE5vZGVDb250ZW50cygkKHRoaXMpWzBdKTtcclxuICAgICAgICAgICAgICAgIHJhbmdlLmNvbGxhcHNlKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGxldCBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBzZWwucmVtb3ZlQWxsUmFuZ2VzKCk7XHJcbiAgICAgICAgICAgICAgICBzZWwuYWRkUmFuZ2UocmFuZ2UpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vdXBkYXRlcyBjaGFyYWN0ZXIgY291bnRcclxuICAgICAgICAgICAgICAgIHRoaXMuZGlzcGF0Y2hFdmVudChUYWJDb21wbGV0ZS5pbnB1dENoYW5nZWRFdmVudCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBUYWJDb21wbGV0ZS50YWJQcmVzc2VkQ291bnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgVGFiQ29tcGxldGUubGFzdFdvcmQgPSAnJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxufTtcclxuXHJcblRhYkNvbXBsZXRlLmlucHV0Q2hhbmdlZEV2ZW50ID0gbmV3IEV2ZW50KCdpbnB1dCcsIHtcclxuICAgICdidWJibGVzJzogdHJ1ZSxcclxuICAgICdjYW5jZWxhYmxlJzogdHJ1ZVxyXG59KTtcclxuVGFiQ29tcGxldGUudGFiUHJlc3NlZENvdW50ID0gMDtcclxuVGFiQ29tcGxldGUubGFzdFdvcmQgPSAnJztcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi90YWJDb21wbGV0ZS5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJpbXBvcnQgeyBnZXRPcHRpb25zIH0gZnJvbSAnLi9tYWluJztcclxuXHJcbi8qKlxyXG4gKiBDaGVja3MgaWYgYSBtZXNzYWdlIGNvbnRhaW5zIG1lbnRpb24gYW5kIGNoYW5nZXMgYmFja2dyb3VuZCB0byBCVFRWIHN0eWxlIGJhY2tncm91bmQuXHJcbiAqIEBwYXJhbSB7bm9kZX0gbm9kZSAtIE1lc3NhZ2Ugbm9kZVxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gTWVudGlvbkhpZ2hsaWdodChub2RlKVxyXG57XHJcbiAgICBjb25zdCBjdXJyZW50VXNlciA9ICQoJyNhdXRob3IgI2F1dGhvci1uYW1lJykudGV4dCgpLnRvTG93ZXJDYXNlKCk7XHJcbiAgICBjb25zdCBhdXRob3JUeXBlID0gbm9kZS5nZXQoMCkuZ2V0QXR0cmlidXRlKCdhdXRob3ItdHlwZScpO1xyXG5cclxuICAgIGlmICh0eXBlb2YgY3VycmVudFVzZXIgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChnZXRPcHRpb25zKClbJ21lbnRpb25IaWdobGlnaHQnXSAmJiBjdXJyZW50VXNlci5sZW5ndGggPiAyICYmICFub2RlLmhhc0NsYXNzKCd5dC1saXZlLWNoYXQtbGVnYWN5LXBhaWQtbWVzc2FnZS1yZW5kZXJlci0wJykpIHsgLy8gQ2hlY2sgaXQncyBub3Qgc3BvbnNvciAvIHN1cGVyY2hhdCwgYWxzbyBtZW50aW9uSGlnaGxpZ2h0IGVuYWJsZWRcclxuXHJcbiAgICAgICAgY29uc3QgdW5pcXVlaWQgPSBub2RlLmdldCgwKS5nZXRBdHRyaWJ1dGUoJ2lkJyk7IC8vIENvcHkgdW5pcXVlIG1lc3NhZ2UgaWRcclxuICAgICAgICBjb25zdCBtZXNzYWdlID0gKFwiIFwiICsgbm9kZS5maW5kKCcjbWVzc2FnZScpLnRleHQoKS50b0xvd2VyQ2FzZSgpICsgXCIgXCIpLnJlcGxhY2UoL1tcXHUyMDBCLVxcdTIwMERcXHVGRUZGXS9nLCAnJyk7XHJcblxyXG4gICAgICAgIGlmICh1bmlxdWVpZCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodW5pcXVlaWQubGVuZ3RoID4gMzAgJiYgKGF1dGhvclR5cGUgPT09IFwib3duZXJcIiB8fCBtZXNzYWdlLmluZGV4T2YoJyAnK2N1cnJlbnRVc2VyKycgJykgIT09IC0xIHx8IG1lc3NhZ2UuaW5kZXhPZignQCcrY3VycmVudFVzZXIrJyAnKSAhPT0gLTEpKSB7IC8vIElmIHlvdXIgbmFtZSBpcyBpbiB0aGUgbWVzc2FnZSwgYW5kIGl0J3Mgbm90IHlvdXIgbWVzc2FnZSBvciB0aGUgbWVzc2FnZSBpcyBmcm9tIHRoZSBzdHJlYW1lclxyXG4gICAgICAgICAgICBub2RlLmdldCgwKS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMjU1LDAsMCwwLjQwKVwiO1xyXG4gICAgICAgICAgICBub2RlLmZpbmQoJyNhdXRob3ItbmFtZScpLmdldCgwKS5zdHlsZS5jb2xvciA9IFwiI2ZmZmZmZlwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9tZW50aW9uSGlnaGxpZ2h0LmpzXG4vLyBtb2R1bGUgaWQgPSA3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IFNDUk9MTF9FTkFCTEVEX1VSTCwgU0NST0xMX0RJU0FCTEVEX1VSTCB9IGZyb20gJy4vLi4vbWFpbic7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBbHdheXNTY3JvbGxEb3duXHJcbntcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlcyAnQWx3YXlzIHNjcm9sbCBkb3duJyBvdmVybGF5IGFuZCBiaW5kcyB0aGUgbmVjZXNzYXJ5IGxpc3RlbmVycy5cclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaW5pdCgpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3Qgc2Nyb2xsZG93bldyYXBwZXIgPSAkKCcuaXB0di1zY3JvbGxkb3duLXdyYXBwZXInKTtcclxuXHJcbiAgICAgICAgaWYgKHNjcm9sbGRvd25XcmFwcGVyLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBzY3JvbGxkb3duV3JhcHBlci5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHNjcm9sbFdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuXHJcbiAgICAgICAgc2Nyb2xsV3JhcHBlci5zZXRBdHRyaWJ1dGUoJ2FyaWEtbGFiZWwnLCAnQWx3YXlzIHNjcm9sbCBkb3duIChFbmFibGVkKScpO1xyXG4gICAgICAgIHNjcm9sbFdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnaGludC0tdG9wJywgJ2lwdHYtc2Nyb2xsZG93bi13cmFwcGVyJyk7XHJcblxyXG4gICAgICAgICQoc2Nyb2xsV3JhcHBlcikuY3NzKHtcclxuICAgICAgICAgICAgJ3Bvc2l0aW9uJzogJ2Fic29sdXRlJyxcclxuICAgICAgICAgICAgJ3JpZ2h0JzogJzExM3B4JyxcclxuICAgICAgICAgICAgJ2JvdHRvbSc6ICcxOHB4J1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAkKHNjcm9sbFdyYXBwZXIpLmh0bWwoYFxyXG4gICAgICAgICAgICA8YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgY2xhc3M9XCJpcHR2LXNjcm9sbGRvd24tdG9nZ2xlXCIgc3R5bGU9XCJvdXRsaW5lOiAwO1wiPlxyXG4gICAgICAgICAgICAgICAgPGltZyBzcmM9XCIke1NDUk9MTF9FTkFCTEVEX1VSTH1cIiBhbHQ9XCJBbHdheXMgc2Nyb2xsIGRvd25cIiBoZWlnaHQ9XCIxMVwiIHdpZHRoPVwiMTFcIiBjbGFzcz1cImlwdHYtc2Nyb2xsZG93bi10b2dnbGUtaWNvblwiPlxyXG4gICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgYCk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoc2Nyb2xsV3JhcHBlcik7XHJcblxyXG4gICAgICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuaXB0di1zY3JvbGxkb3duLXRvZ2dsZScsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBBbHdheXNTY3JvbGxEb3duLnRvZ2dsZVNjcm9sbERvd24oKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbChBbHdheXNTY3JvbGxEb3duLmludGVydmFsKTtcclxuXHJcbiAgICAgICAgQWx3YXlzU2Nyb2xsRG93bi5pbnRlcnZhbCA9IHNldEludGVydmFsKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKEFsd2F5c1Njcm9sbERvd24uc2Nyb2xsRG93biA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgJCgnI2l0ZW0tc2Nyb2xsZXInKS5zY3JvbGxUb3AoOTk5OTk5OTk5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDEwMCk7XHJcblxyXG4gICAgICAgIEFsd2F5c1Njcm9sbERvd24uaGlkZVNjcm9sbE9uQ2luZW1hKHNjcm9sbFdyYXBwZXIpO1xyXG4gICAgICAgIEFsd2F5c1Njcm9sbERvd24uaGlkZVNjcm9sbE9uU3BvbnNvck1lbnUoc2Nyb2xsV3JhcHBlcik7XHJcbiAgICAgICAgQWx3YXlzU2Nyb2xsRG93bi5iaW5kU2Nyb2xsTGlzdGVuZXIoKTtcclxuICAgICAgICBBbHdheXNTY3JvbGxEb3duLmJpbmRTY3JvbGxEb3duTGlzdGVuZXIoKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIaWRlcyB0aGUgJ0Fsd2F5cyBzY3JvbGwgZG93bicgb3ZlcmxheSB3aGVuIGNpbmVtYSBtb2RlIGlzIG9wZW5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqIEBwYXJhbSB7bm9kZX0gc2Nyb2xsV3JhcHBlclxyXG4gICAgICovXHJcbiAgICBzdGF0aWMgaGlkZVNjcm9sbE9uQ2luZW1hKHNjcm9sbFdyYXBwZXIpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3Qgd2F0Y2hQYWdlID0gJ3l0Zy13YXRjaC1wYWdlJztcclxuXHJcbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbihtdXRhdGlvbnMpIHtcclxuICAgICAgICAgICAgbXV0YXRpb25zLmZvckVhY2goKG0pID0+IHtcclxuICAgICAgICAgICAgICAgICQobS50YXJnZXQpLmlzKCdbc2lkZWJhci1jb2xsYXBzZWRdJykgPyAkKHNjcm9sbFdyYXBwZXIpLmhpZGUoKSA6ICQoc2Nyb2xsV3JhcHBlcikuc2hvdygpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXJPcHRzID0ge1xyXG4gICAgICAgICAgICBjaGlsZExpc3Q6IGZhbHNlLFxyXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiB0cnVlLFxyXG4gICAgICAgICAgICBjaGFyYWN0ZXJEYXRhOiBmYWxzZSxcclxuICAgICAgICAgICAgc3VidHJlZTogZmFsc2UsXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZUZpbHRlcjogWydzaWRlYmFyLWNvbGxhcHNlZCddXHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY29uc3QgYWRkT2JzZXJ2ZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICgkKHdhdGNoUGFnZSkubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBvYnNlcnZlci5vYnNlcnZlKCQod2F0Y2hQYWdlKVswXSwgb2JzZXJ2ZXJPcHRzKTtcclxuICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoYWRkT2JzZXJ2ZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMjUwKTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBIaWRlcyB0aGUgJ0Fsd2F5cyBzY3JvbGwgZG93bicgb3ZlcmxheSB3aGVuIHNwb25zb3IgbWVudSBpcyBvcGVuLlxyXG4gICAgICogQHN0YXRpY1xyXG4gICAgICogQHBhcmFtIHtub2RlfSBzY3JvbGxXcmFwcGVyXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBoaWRlU2Nyb2xsT25TcG9uc29yTWVudShzY3JvbGxXcmFwcGVyKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IGNoYXRJbnB1dFJlbmRlcmVyID0gJ3l0LWxpdmUtY2hhdC1tZXNzYWdlLWlucHV0LXJlbmRlcmVyJztcclxuXHJcbiAgICAgICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcihmdW5jdGlvbiAobXV0YXRpb25zKSB7XHJcbiAgICAgICAgICAgIG11dGF0aW9ucy5mb3JFYWNoKChtKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAkKG0udGFyZ2V0KS5hdHRyKCdjcmVhdG9yLW9wZW4nKSA/ICQoc2Nyb2xsV3JhcHBlcikuaGlkZSgpIDogJChzY3JvbGxXcmFwcGVyKS5zaG93KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zdCBvYnNlcnZlck9wdHMgPSB7XHJcbiAgICAgICAgICAgIGNoaWxkTGlzdDogZmFsc2UsXHJcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHRydWUsXHJcbiAgICAgICAgICAgIGNoYXJhY3RlckRhdGE6IGZhbHNlLFxyXG4gICAgICAgICAgICBzdWJ0cmVlOiBmYWxzZSxcclxuICAgICAgICAgICAgYXR0cmlidXRlRmlsdGVyOiBbJ2NyZWF0b3Itb3BlbiddXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBzcG9uc29yQ2xpY2sgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICgkKGNoYXRJbnB1dFJlbmRlcmVyKS5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIG9ic2VydmVyLm9ic2VydmUoJChjaGF0SW5wdXRSZW5kZXJlcilbMF0sIG9ic2VydmVyT3B0cyk7XHJcbiAgICAgICAgICAgICAgICBjbGVhckludGVydmFsKHNwb25zb3JDbGljayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAyNTApO1xyXG4gICAgfTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIERpc2FibGVzICdBbHdheXMgc2Nyb2xsIGRvd24nIGZ1bmN0aW9uYWxpdHkgd2hlbiBzY3JvbGxpbmcgbWFudWFsbHkuXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBiaW5kU2Nyb2xsTGlzdGVuZXIoKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpdGVtLXNjcm9sbGVyJyk7XHJcblxyXG4gICAgICAgIGlmICghdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4geyBBbHdheXNTY3JvbGxEb3duLmJpbmRTY3JvbGxMaXN0ZW5lcigpIH0sIDI1MCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgICQoJyNpdGVtLXNjcm9sbGVyJykub24oJ21vdXNld2hlZWwgRE9NTW91c2VTY3JvbGwnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIEFsd2F5c1Njcm9sbERvd24udG9nZ2xlU2Nyb2xsRG93bihmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICQoJyNpdGVtLXNjcm9sbGVyJykub24oJ21vdXNlZG93bicsIGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICBpZihldmVudC50YXJnZXQgPT09IHRoaXMpIHtcclxuICAgICAgICAgICAgICAgIEFsd2F5c1Njcm9sbERvd24udG9nZ2xlU2Nyb2xsRG93bihmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBFbmFibGVzICdBbHdheXMgc2Nyb2xsIGRvd24nIGZ1bmN0aW9uYWxpdHkgd2hlbiBibHVlIGp1bXAgZG93biBidXR0b24gaXMgY2xpY2tlZC5cclxuICAgICAqIEBzdGF0aWNcclxuICAgICAqL1xyXG4gICAgc3RhdGljIGJpbmRTY3JvbGxEb3duTGlzdGVuZXIoKVxyXG4gICAge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaG93LW1vcmUnKTtcclxuXHJcbiAgICAgICAgaWYgKCF0YXJnZXQpIHtcclxuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4geyBBbHdheXNTY3JvbGxEb3duLmJpbmRTY3JvbGxEb3duTGlzdGVuZXIoKSB9LCAyNTApO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0YXJnZXQub25tb3VzZWRvd24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIEFsd2F5c1Njcm9sbERvd24udG9nZ2xlU2Nyb2xsRG93bih0cnVlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfTtcclxuICAgIH07XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBUb2dnbGUgc2Nyb2xsRG93biBzdGF0ZSBhbmQgYWRqdXN0IG92ZXJsYXkgYWNjb3JkaW5nbHkuXHJcbiAgICAgKiBAc3RhdGljXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyB0b2dnbGVTY3JvbGxEb3duKHN0YXRlKVxyXG4gICAge1xyXG4gICAgICAgIGlmICh0eXBlb2Ygc3RhdGUgPT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgIEFsd2F5c1Njcm9sbERvd24uc2Nyb2xsRG93biA9ICFBbHdheXNTY3JvbGxEb3duLnNjcm9sbERvd247XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgQWx3YXlzU2Nyb2xsRG93bi5zY3JvbGxEb3duID0gc3RhdGU7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAkKCcuaXB0di1zY3JvbGxkb3duLXdyYXBwZXInKS5hdHRyKCdhcmlhLWxhYmVsJywgQWx3YXlzU2Nyb2xsRG93bi5zY3JvbGxEb3duID8gJ0Fsd2F5cyBzY3JvbGwgZG93biAoRW5hYmxlZCknIDogJ0Fsd2F5cyBzY3JvbGwgZG93biAoRGlzYWJsZWQpJyk7XHJcbiAgICAgICAgJCgnLmlwdHYtc2Nyb2xsZG93bi10b2dnbGUtaWNvbicpLmF0dHIoJ3NyYycsIEFsd2F5c1Njcm9sbERvd24uc2Nyb2xsRG93biA/IFNDUk9MTF9FTkFCTEVEX1VSTCA6IFNDUk9MTF9ESVNBQkxFRF9VUkwpO1xyXG4gICAgfTtcclxufTtcclxuXHJcbkFsd2F5c1Njcm9sbERvd24uc2Nyb2xsRG93biA9IHRydWU7XHJcbkFsd2F5c1Njcm9sbERvd24uaW50ZXJ2YWwgPSBudWxsO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL292ZXJsYXkvYWx3YXlzU2Nyb2xsRG93bi5qc1xuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcclxuICogQ2hlY2tzIGlmIHVzZXIgaXMgYmVoaW5kIGluIGxpdmVzdHJlYW0gYW5kIHdhcm5zIHRoZW0uXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjaGVja0lmV2F0Y2hpbmdMaXZlKCkge1xyXG5cclxuICAgIGxldCBsaXZlQ2hlY2tJbnRlcnZhbCA9IG51bGw7XHJcblxyXG4gICAgbGl2ZUNoZWNrSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcclxuXHJcbiAgICAgICAgY29uc3QgJGxpdmVCdXR0b24gPSAkKCcueXRwLWxpdmUtYmFkZ2UueXRwLWJ1dHRvbicpO1xyXG5cclxuICAgICAgICBpZiAoJGxpdmVCdXR0b24uaXMoJzplbmFibGVkJykgJiYgJGxpdmVCdXR0b24uaXMoJzp2aXNpYmxlJykgJiYgJCgnLmlwdHYtbGl2ZS13YXJuaW5nJykubGVuZ3RoIDwgMSkge1xyXG4gICAgICAgICAgICAkKCcjcGxheWVyLWNvbnRhaW5lcicpLmFwcGVuZChgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXB0di1saXZlLXdhcm5pbmdcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXB0di1saXZlLXdhcm5pbmctdGV4dFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBZb3VcXCdyZSB3YXRjaGluZyBvbGQgZm9vdGFnZSwgY2xpY2sgdGhlIExJVkUgYnV0dG9uIGluIHRoZSBib3R0b20gbGVmdCBjb3JuZXIgdG8gd2F0Y2ggbGl2ZS5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiaXB0di1saXZlLXdhcm5pbmctZGlzbWlzc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgY2xhc3M9XCJpcHR2LWxpdmUtd2FybmluZy1jbG9zZVwiPuKclTwvYT5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgKTtcclxuICAgICAgICB9XHJcbiAgICB9LCAxNSAqIDEwMDApO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcuaXB0di1saXZlLXdhcm5pbmctY2xvc2UnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcuaXB0di1saXZlLXdhcm5pbmcnKS5yZW1vdmUoKTtcclxuICAgICAgICBjbGVhckludGVydmFsKGxpdmVDaGVja0ludGVydmFsKTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdtb3VzZWRvd24nLCAnLnl0cC1saXZlLWJhZGdlJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnLmlwdHYtbGl2ZS13YXJuaW5nJykucmVtb3ZlKCk7XHJcbiAgICB9KTtcclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9vdmVybGF5L2NoZWNrSWZXYXRjaGluZ0xpdmUuanNcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXHJcbiAqIEFkZHMgbmV3IGNvbG9yIGNoYW5nZSBidXR0b24gdG8gbGl2ZXN0cmVhbSBwYWdlLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29sb3JCdXR0b24oKVxyXG57XHJcbiAgICBjb25zdCBjb2xvckljb24gPSBjaHJvbWUuZXh0ZW5zaW9uLmdldFVSTCgnL2ljb25zL3BlbmNpbC1pY29uLnBuZycpO1xyXG4gICAgY29uc3QgY29sb3JJbWFnZSA9IGA8aW1nIHNyYz1cIiR7Y29sb3JJY29ufVwiIGFsdD1cInN0YXJcIiBzdHlsZT1cInBvaW50ZXItZXZlbnRzOiBub25lOyBkaXNwbGF5OiBibG9jazsgd2lkdGg6IDgwJTsgaGVpZ2h0OjgwJTsgbWFyZ2luLXJpZ2h0OiAycHg7XCI+YDtcclxuXHJcbiAgICBjb25zdCBjb2xvckJ1dHRvbiA9IGBcclxuICAgICAgICA8aXB0di1jb2xvci1idXR0b24gc3R5bGU9XCJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XCIgcmFpc2VkPVwiXCIgc3VwcG9ydGVkLWNvbGQtbG9hZC1hY3Rpb25zPVwiWyZxdW90O2NvbG9yJnF1b3Q7XVwiIHdhaXQtZm9yLXNpZ25hbD1cIndhdGNoLXBhZ2UtaW5pdGlhbGl6ZWRcIiBjbGFzcz1cInN0eWxlLXNjb3BlIHl0Zy13YXRjaC1mb290ZXIgeC1zY29wZSBpcHR2LWNvbG9yLWJ1dHRvbi0wXCI+XHJcbiAgICAgICAgICAgIDxpcm9uLXNpZ25hbHMgY2xhc3M9XCJzdHlsZS1zY29wZSBpcHR2LWNvbG9yLWJ1dHRvblwiPjwvaXJvbi1zaWduYWxzPlxyXG4gICAgICAgICAgICA8cGFwZXItYnV0dG9uIHN0eWxlPVwiY29sb3I6ICNmZmY7IGJhY2tncm91bmQtY29sb3I6ICMwZjlkNTg7IG1pbi13aWR0aDogMDtcIiBjbGFzcz1cImVuYWJsZWQgc3R5bGUtc2NvcGUgaXB0di1jb2xvci1idXR0b24geC1zY29wZSBwYXBlci1idXR0b24tMFwiIHJvbGU9XCJidXR0b25cIiB0YWJpbmRleD1cIjBcIiBhbmltYXRlZD1cIlwiIGFyaWEtZGlzYWJsZWQ9XCJmYWxzZVwiIGVsZXZhdGlvbj1cIjFcIiByYWlzZWQ9XCJcIiBhcmlhLWxhYmVsPVwiQ0hBTkdFIE5BTUUgQ09MT1JcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYXlvdXQgaG9yaXpvbnRhbCBjZW50ZXItanVzdGlmaWVkIHN0eWxlLXNjb3BlIGlwdHYtY29sb3ItYnV0dG9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cIndpZHRoOiAyNHB4OyBoZWlnaHQ6IDI0cHg7XCIgY2xhc3M9XCJpY29uLWNvbnRhaW5lciBsYXlvdXQgaG9yaXpvbnRhbCBjZW50ZXItY2VudGVyIHN0eWxlLXNjb3BlIGlwdHYtY29sb3ItYnV0dG9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx5dC1pY29uIGNsYXNzPVwic3R5bGUtc2NvcGUgaXB0di1jb2xvci1idXR0b24geC1zY29wZSB5dC1pY29uLTBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC95dC1pY29uPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGlwdHYtZm9ybWF0dGVkLXN0cmluZyBpZD1cInRleHRcIiBjbGFzcz1cImxheW91dCBob3Jpem9udGFsIGNlbnRlci1jZW50ZXIgc3R5bGUtc2NvcGUgaXB0di1jb2xvci1idXR0b25cIiBzdHlsZT1cIm1hcmdpbjogMCAzcHhcIj48c3BhbiBjbGFzcz1cInN0eWxlLXNjb3BlIGlwdHYtZm9ybWF0dGVkLXN0cmluZ1wiPkNIQU5HRSBOQU1FIENPTE9SPC9zcGFuPjwvaXB0di1mb3JtYXR0ZWQtc3RyaW5nPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvcGFwZXItYnV0dG9uPlxyXG4gICAgICAgIDwvaXB0di1jb2xvci1idXR0b24+YDtcclxuXHJcbiAgICAkKCcuaXB0di1zcG9uc29yLWJ1dHRvbi0wJykuYWZ0ZXIoY29sb3JCdXR0b24pO1xyXG5cclxuICAgICQoY29sb3JCdXR0b24pLnJlYWR5KCBmdW5jdGlvbigpIHtcclxuICAgICAgICAkKCcuc3R5bGUtc2NvcGUuaXB0di1jb2xvci1idXR0b24ueC1zY29wZS55dC1pY29uLTAnKS5odG1sKGNvbG9ySW1hZ2UpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJCgnLnN0eWxlLXNjb3BlLnl0Zy13YXRjaC1mb290ZXIueC1zY29wZS5pcHR2LWNvbG9yLWJ1dHRvbi0wJykub24oJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgIHdpbmRvdy5vcGVuKCdodHRwczovL3d3dy5pY2Vwb3NlaWRvbi5jb20vcHJvZmlsZScsICdfYmxhbmsnKTtcclxuICAgICAgICAkKCcuc3R5bGUtc2NvcGUueXRnLXdhdGNoLWZvb3Rlci54LXNjb3BlLmlwdHYtY29sb3ItYnV0dG9uLTAgcGFwZXItYnV0dG9uJylbMF0uYmx1cigpO1xyXG4gICAgfSk7XHJcbn07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vb3ZlcmxheS9jb2xvckJ1dHRvbi5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXHJcbiAqIEFkZHMgZG9uYXRlIGJ1dHRvbiB0byBsaXZlc3RyZWFtIHBhZ2UuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkb25hdGVCdXR0b24oKVxyXG57XHJcbiAgICAkKCcuaXB0di1kb25hdGUtYnV0dG9uLTAnKS5yZW1vdmUoKTtcclxuXHJcbiAgICBjb25zdCBkb25hdGVJY29uID0gY2hyb21lLmV4dGVuc2lvbi5nZXRVUkwoJy9pY29ucy9kb25hdGUtaWNvbi5wbmcnKTtcclxuICAgIGNvbnN0IHNwb25zb3JJY29uID0gY2hyb21lLmV4dGVuc2lvbi5nZXRVUkwoJy9pY29ucy9zcG9uc29yLWljb24ucG5nJyk7XHJcblxyXG4gICAgY29uc3Qgc3BvbnNvckltYWdlID0gYDxpbWcgc3JjPVwiJHtzcG9uc29ySWNvbn1cIiBhbHQ9XCJzdGFyXCIgc3R5bGU9XCJwb2ludGVyLWV2ZW50czogbm9uZTsgZGlzcGxheTogYmxvY2s7IHdpZHRoOiAxMDAlOyBoZWlnaHQ6IDEwMCU7XCI+YDtcclxuXHJcbiAgICBjb25zdCBkb25hdGVCdXR0b24gPSBgXHJcbiAgICAgICAgPGlwdHYtZG9uYXRlLWJ1dHRvbiBzdHlsZT1cImRpc3BsYXk6IGlubGluZS1ibG9jaztcIiByYWlzZWQ9XCJcIiBzdXBwb3J0ZWQtY29sZC1sb2FkLWFjdGlvbnM9XCJbJnF1b3Q7c3BvbnNvciZxdW90O11cIiB3YWl0LWZvci1zaWduYWw9XCJ3YXRjaC1wYWdlLWluaXRpYWxpemVkXCIgY2xhc3M9XCJzdHlsZS1zY29wZSB5dGctd2F0Y2gtZm9vdGVyIHgtc2NvcGUgaXB0di1kb25hdGUtYnV0dG9uLTBcIj5cclxuICAgICAgICAgICAgPGlyb24tc2lnbmFscyBjbGFzcz1cInN0eWxlLXNjb3BlIGlwdHYtZG9uYXRlLWJ1dHRvblwiPjwvaXJvbi1zaWduYWxzPlxyXG4gICAgICAgICAgICA8cGFwZXItYnV0dG9uIHN0eWxlPVwiY29sb3I6ICNmZmY7IGJhY2tncm91bmQtY29sb3I6ICMwZjlkNTg7IG1pbi13aWR0aDogMDtcIiBjbGFzcz1cImVuYWJsZWQgc3R5bGUtc2NvcGUgaXB0di1kb25hdGUtYnV0dG9uIHgtc2NvcGUgcGFwZXItYnV0dG9uLTBcIiByb2xlPVwiYnV0dG9uXCIgdGFiaW5kZXg9XCIwXCIgYW5pbWF0ZWQ9XCJcIiBhcmlhLWRpc2FibGVkPVwiZmFsc2VcIiBlbGV2YXRpb249XCIxXCIgcmFpc2VkPVwiXCIgYXJpYS1sYWJlbD1cIkRvbmF0ZSB0byBJY2VfUG9zZWlkb25cIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYXlvdXQgaG9yaXpvbnRhbCBjZW50ZXItanVzdGlmaWVkIHN0eWxlLXNjb3BlIGlwdHYtZG9uYXRlLWJ1dHRvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9XCJ3aWR0aDogMjRweDsgaGVpZ2h0OiAyNHB4O1wiIGNsYXNzPVwiaWNvbi1jb250YWluZXIgbGF5b3V0IGhvcml6b250YWwgY2VudGVyLWNlbnRlciBzdHlsZS1zY29wZSBpcHR2LWRvbmF0ZS1idXR0b25cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHl0LWljb24gY2xhc3M9XCJzdHlsZS1zY29wZSBpcHR2LWRvbmF0ZS1idXR0b24geC1zY29wZSB5dC1pY29uLTBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC95dC1pY29uPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGlwdHYtZm9ybWF0dGVkLXN0cmluZyBpZD1cInRleHRcIiBjbGFzcz1cImxheW91dCBob3Jpem9udGFsIGNlbnRlci1jZW50ZXIgc3R5bGUtc2NvcGUgaXB0di1kb25hdGUtYnV0dG9uXCIgc3R5bGU9XCJtYXJnaW46IDAgM3B4XCI+PHNwYW4gY2xhc3M9XCJzdHlsZS1zY29wZSBpcHR2LWZvcm1hdHRlZC1zdHJpbmdcIj5ET05BVEU8L3NwYW4+PC9pcHR2LWZvcm1hdHRlZC1zdHJpbmc+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9wYXBlci1idXR0b24+XHJcbiAgICAgICAgPC9pcHR2LWRvbmF0ZS1idXR0b24+YDtcclxuXHJcbiAgICBjb25zdCBkb25hdGVJbWFnZSA9IGA8aW1nIHNyYz1cIiR7ZG9uYXRlSWNvbn1cIiBhbHQ9XCJkb2xsYXItc2lnblwiIHN0eWxlPVwicG9pbnRlci1ldmVudHM6IG5vbmU7IGRpc3BsYXk6IGJsb2NrOyB3aWR0aDogMTAwJTsgaGVpZ2h0OiAxMDAlO1wiPmA7XHJcblxyXG4gICAgLy8gSW5zZXJ0IGRvbmF0ZUJ1dHRvbiBuZXh0IHRvIHNwb25zb3JCdXR0b25cclxuICAgIGNvbnN0IHNwb25zb3JCdXR0b24gPSAnLnN0eWxlLXNjb3BlLnl0Zy13YXRjaC1mb290ZXIueC1zY29wZS55dGctbWVtYmVyc2hpcC1vZmZlci1idXR0b24tMCc7XHJcblxyXG4gICAgJChzcG9uc29yQnV0dG9uKS5iZWZvcmUoZG9uYXRlQnV0dG9uKTtcclxuICAgICQoZG9uYXRlQnV0dG9uKS5yZWFkeSggZnVuY3Rpb24oKSB7ICQoJy5zdHlsZS1zY29wZS5pcHR2LWRvbmF0ZS1idXR0b24ueC1zY29wZS55dC1pY29uLTAnKS5odG1sKGRvbmF0ZUltYWdlKTsgfSk7XHJcblxyXG4gICAgJCgnLnN0eWxlLXNjb3BlLnl0Zy13YXRjaC1mb290ZXIueC1zY29wZS5pcHR2LWRvbmF0ZS1idXR0b24tMCcpLm9uKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICB3aW5kb3cub3BlbignaHR0cHM6Ly95b3V0dWJlLnN0cmVhbWxhYnMuY29tL2ljZXBvc2VpZG9uIy8nLCAnX2JsYW5rJyk7XHJcbiAgICAgICAgJCgnLnN0eWxlLXNjb3BlLnl0Zy13YXRjaC1mb290ZXIueC1zY29wZS5pcHR2LWRvbmF0ZS1idXR0b24tMCBwYXBlci1idXR0b24nKVswXS5ibHVyKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBDaGFuZ2Ugc3BvbnNvckJ1dHRvbiBpY29uIHRvIHN0YXJcclxuICAgICQoYCR7c3BvbnNvckJ1dHRvbn0gLnN0eWxlLXNjb3BlLnl0Zy1tZW1iZXJzaGlwLW9mZmVyLWJ1dHRvbi54LXNjb3BlLnl0LWljb24tMGApLmh0bWwoc3BvbnNvckltYWdlKTtcclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9vdmVybGF5L2RvbmF0ZUJ1dHRvbi5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyoqXHJcbiAqIFNob3cgZW1vdGUgbG9hZGluZyBpbmZvcm1hdGlvbi5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxvYWRpbmdFbW90ZXNJbmZvKClcclxue1xyXG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblxyXG4gICAgJChkaXYpLnRleHQoJ0xvYWRpbmcgZW1vdGVzLi4uJyk7XHJcblxyXG4gICAgJChkaXYpLmNzcyh7XHJcbiAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcxNnB4JyxcclxuICAgICAgICAncG9zaXRpb24nOiAnYWJzb2x1dGUnLFxyXG4gICAgICAgICdyaWdodCc6ICcyNXB4JyxcclxuICAgICAgICAnYm90dG9tJzogJzc1cHgnLFxyXG4gICAgICAgICdjb2xvcic6ICcjZmZmJyxcclxuICAgICAgICAndGV4dC1zaGFkb3cnOiAnMnB4IDJweCAycHggcmdiYSgwLDAsMCwwLjc1KSdcclxuICAgIH0pO1xyXG5cclxuICAgICQoZGl2KS5hZGRDbGFzcygnaXB0di1sb2FkaW5nLWVtb3RlcycpO1xyXG5cclxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZGl2KTtcclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9vdmVybGF5L2xvYWRpbmdFbW90ZXNJbmZvLmpzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcclxuICogQWRkcyBuZXcgc3BvbnNvciBidXR0b24gdG8gbGl2ZXN0cmVhbSBwYWdlLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3BvbnNvckJ1dHRvbigpXHJcbntcclxuICAgIGNvbnN0IHNwb25zb3JJY29uID0gY2hyb21lLmV4dGVuc2lvbi5nZXRVUkwoJy9pY29ucy9zcG9uc29yLWljb24ucG5nJyk7XHJcbiAgICBjb25zdCBzcG9uc29ySW1hZ2UgPSBgPGltZyBzcmM9XCIke3Nwb25zb3JJY29ufVwiIGFsdD1cInN0YXJcIiBzdHlsZT1cInBvaW50ZXItZXZlbnRzOiBub25lOyBkaXNwbGF5OiBibG9jazsgd2lkdGg6IDEwMCU7IGhlaWdodDogMTAwJTtcIj5gO1xyXG5cclxuICAgIGNvbnN0IHNwb25zb3JCdXR0b24gPSBgXHJcbiAgICAgICAgPGlwdHYtc3BvbnNvci1idXR0b24gc3R5bGU9XCJkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XCIgcmFpc2VkPVwiXCIgc3VwcG9ydGVkLWNvbGQtbG9hZC1hY3Rpb25zPVwiWyZxdW90O3Nwb25zb3ImcXVvdDtdXCIgd2FpdC1mb3Itc2lnbmFsPVwid2F0Y2gtcGFnZS1pbml0aWFsaXplZFwiIGNsYXNzPVwic3R5bGUtc2NvcGUgeXRnLXdhdGNoLWZvb3RlciB4LXNjb3BlIGlwdHYtc3BvbnNvci1idXR0b24tMFwiPlxyXG4gICAgICAgICAgICA8aXJvbi1zaWduYWxzIGNsYXNzPVwic3R5bGUtc2NvcGUgaXB0di1zcG9uc29yLWJ1dHRvblwiPjwvaXJvbi1zaWduYWxzPlxyXG4gICAgICAgICAgICA8cGFwZXItYnV0dG9uIHN0eWxlPVwiY29sb3I6ICNmZmY7IGJhY2tncm91bmQtY29sb3I6ICMwZjlkNTg7IG1pbi13aWR0aDogMDtcIiBjbGFzcz1cImVuYWJsZWQgc3R5bGUtc2NvcGUgaXB0di1zcG9uc29yLWJ1dHRvbiB4LXNjb3BlIHBhcGVyLWJ1dHRvbi0wXCIgcm9sZT1cImJ1dHRvblwiIHRhYmluZGV4PVwiMFwiIGFuaW1hdGVkPVwiXCIgYXJpYS1kaXNhYmxlZD1cImZhbHNlXCIgZWxldmF0aW9uPVwiMVwiIHJhaXNlZD1cIlwiIGFyaWEtbGFiZWw9XCJTUE9OU09SIE9OIE9GRklDSUFMIFNJVEVcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJsYXlvdXQgaG9yaXpvbnRhbCBjZW50ZXItanVzdGlmaWVkIHN0eWxlLXNjb3BlIGlwdHYtc3BvbnNvci1idXR0b25cIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwid2lkdGg6IDI0cHg7IGhlaWdodDogMjRweDtcIiBjbGFzcz1cImljb24tY29udGFpbmVyIGxheW91dCBob3Jpem9udGFsIGNlbnRlci1jZW50ZXIgc3R5bGUtc2NvcGUgaXB0di1zcG9uc29yLWJ1dHRvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8eXQtaWNvbiBjbGFzcz1cInN0eWxlLXNjb3BlIGlwdHYtc3BvbnNvci1idXR0b24geC1zY29wZSB5dC1pY29uLTBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC95dC1pY29uPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGlwdHYtZm9ybWF0dGVkLXN0cmluZyBpZD1cInRleHRcIiBjbGFzcz1cImxheW91dCBob3Jpem9udGFsIGNlbnRlci1jZW50ZXIgc3R5bGUtc2NvcGUgaXB0di1zcG9uc29yLWJ1dHRvblwiIHN0eWxlPVwibWFyZ2luOiAwIDNweFwiPjxzcGFuIGNsYXNzPVwic3R5bGUtc2NvcGUgaXB0di1mb3JtYXR0ZWQtc3RyaW5nXCI+U1BPTlNPUiBPTiBPRkZJQ0lBTCBTSVRFPC9zcGFuPjwvaXB0di1mb3JtYXR0ZWQtc3RyaW5nPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvcGFwZXItYnV0dG9uPlxyXG4gICAgICAgIDwvaXB0di1zcG9uc29yLWJ1dHRvbj5gO1xyXG5cclxuICAgICQoJy5zdHlsZS1zY29wZS55dGctd2F0Y2gtZm9vdGVyLngtc2NvcGUueXRnLW1lbWJlcnNoaXAtb2ZmZXItYnV0dG9uLTAnKS5iZWZvcmUoc3BvbnNvckJ1dHRvbik7XHJcblxyXG4gICAgJChzcG9uc29yQnV0dG9uKS5yZWFkeSggZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCgnLnN0eWxlLXNjb3BlLmlwdHYtc3BvbnNvci1idXR0b24ueC1zY29wZS55dC1pY29uLTAnKS5odG1sKHNwb25zb3JJbWFnZSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcuc3R5bGUtc2NvcGUueXRnLXdhdGNoLWZvb3Rlci54LXNjb3BlLmlwdHYtc3BvbnNvci1idXR0b24tMCcpLm9uKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICB3aW5kb3cub3BlbignaHR0cHM6Ly93d3cuaWNlcG9zZWlkb24uY29tLycsICdfYmxhbmsnKTtcclxuICAgICAgICAkKCcuc3R5bGUtc2NvcGUueXRnLXdhdGNoLWZvb3Rlci54LXNjb3BlLmlwdHYtc3BvbnNvci1idXR0b24tMCBwYXBlci1idXR0b24nKVswXS5ibHVyKCk7XHJcbiAgICB9KTtcclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9vdmVybGF5L3Nwb25zb3JCdXR0b24uanNcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwb25zb3JDaGVja1xyXG57XHJcbiAgICAvKipcclxuICAgICAqIENoZWNrIGlmIHVzZXIgaXMgc3RpbGwgdXNpbmcgb2xkIHNwb25zb3JzaGlwXHJcbiAgICAgKi9cclxuICAgIHN0YXRpYyBjaGVjaygpXHJcbiAgICB7XHJcbiAgICAgICAgJC5nZXQoY2hyb21lLmV4dGVuc2lvbi5nZXRVUkwoJ2NvbnRlbnQuaHRtbCcpLCBmdW5jdGlvbihkYXRhKSB7XHJcblxyXG4gICAgICAgICAgICAkKGRhdGEpLmFwcGVuZFRvKCdib2R5Jyk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBpbWdVcmwgPSBjaHJvbWUuZXh0ZW5zaW9uLmdldFVSTCgnaWNvbnMvc3BvbnNvci1iZW5lZml0cy5wbmcnKTtcclxuICAgICAgICAgICAgJCgnLnNwb25zb3ItbW9kYWwgLnN1Yi1iZW5lZml0cycpLmF0dHIoJ3NyYycsIGltZ1VybCk7XHJcblxyXG4gICAgICAgICAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmNsb3NlLW1vZGFsJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcuc3BvbnNvci1tb2RhbCcpLmhpZGUoKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBjb250YWluZXIgPSAkKCcueXQtbGl2ZS1jaGF0LW1lc3NhZ2UtaW5wdXQtcmVuZGVyZXItMCcpO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgc3BvbnNvckJhZGdlID0gJChjb250YWluZXIpLmZpbmQoJy55dC1saXZlLWNoYXQtYXV0aG9yLWJhZGdlLXJlbmRlcmVyLTBbYXJpYS1sYWJlbD1cIlNwb25zb3JcIl0nKTtcclxuXHJcbiAgICAgICAgICAgIGlmICgkKHNwb25zb3JCYWRnZSkubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAkKCcuc3BvbnNvci1tb2RhbCcpLnNob3coKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfTtcclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9vdmVybGF5L3Nwb25zb3JDaGVjay5qc1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHsgZ2V0T3B0aW9ucyB9IGZyb20gJy4vbWFpbic7XHJcblxyXG5jb25zdCByYW5kb21DaGF0Q29sb3JzID0ge1xyXG4gICAgJy1BJzogJyM0N2QyODgnLFxyXG4gICAgJy1CJzogJyNiOTRmZjEnLFxyXG4gICAgJy1DJzogJyMzY2RjMzYnLFxyXG4gICAgJy1EJzogJyNkZjQ0ZGMnLFxyXG4gICAgJy1FJzogJyM2YmQ0MzInLFxyXG4gICAgJy1GJzogJyM4YzY5ZjEnLFxyXG4gICAgJy1HJzogJyNhM2QxMmQnLFxyXG4gICAgJy1IJzogJyNiMzVkZDUnLFxyXG4gICAgJy1JJzogJyM1ZWRiNjInLFxyXG4gICAgJy1KJzogJyNjYTQ2YmInLFxyXG4gICAgJy1LJzogJyMzZGFhMjcnLFxyXG4gICAgJy1MJzogJyNlZjY3ZDUnLFxyXG4gICAgJy1NJzogJyM4M2NjM2YnLFxyXG4gICAgJy1OJzogJyNkOTc4ZWInLFxyXG4gICAgJy1PJzogJyM5N2JkMTInLFxyXG4gICAgJy1QJzogJyM1YzdhZjEnLFxyXG4gICAgJy1RJzogJyNkZmM3MWInLFxyXG4gICAgJy1SJzogJyM0YzhhZTcnLFxyXG4gICAgJy1TJzogJyNmMDJmMTQnLFxyXG4gICAgJy1UJzogJyMyZGQzYWQnLFxyXG4gICAgJy1VJzogJyNlZTMwMzQnLFxyXG4gICAgJy1WJzogJyM0NGMzNTcnLFxyXG4gICAgJy1XJzogJyNhYjc2ZGMnLFxyXG4gICAgJy1YJzogJyNjNWJmMzAnLFxyXG4gICAgJy1ZJzogJyM2ZDdkZGInLFxyXG4gICAgJy1aJzogJyNlY2E4MjEnLFxyXG4gICAgJy0wJzogJyNjYzZhMzUnLFxyXG4gICAgJy0xJzogJyM4NThiMjMnLFxyXG4gICAgJy0yJzogJyNmMDk0NjQnLFxyXG4gICAgJy0zJzogJyNiY2E1MjcnLFxyXG4gICAgJy00JzogJyNlNzk2NGQnLFxyXG4gICAgJy01JzogJyNhYzg1MGYnLFxyXG4gICAgJy02JzogJyNlMWI2NTUnLFxyXG4gICAgJy03JzogJyNiYjc3MjInLFxyXG4gICAgJy04JzogJyNhYTg1MmUnLFxyXG4gICAgJy05JzogJyNkZTliMzYnLFxyXG4gICAgJy0tJzogJyNlNTdlMjAnLFxyXG4gICAgJy1fJzogJyM0NmFkNjgnXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjaGF0Q29sb3JzKG5vZGUsIHByb2ZpbGVJZClcclxue1xyXG5cdGlmICh0eXBlb2Ygbm9kZSA9PT0gJ3VuZGVmaW5lZCcgfHwgdHlwZW9mIHByb2ZpbGVJZCA9PT0gJ3VuZGVmaW5lZCcpIHtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9XHJcblx0XHJcblx0Y29uc3QgbXNnUGFyZW50ID0gJChub2RlKS5wYXJlbnRzKCcueXQtbGl2ZS1jaGF0LXRleHQtbWVzc2FnZS1yZW5kZXJlci0wJyk7XHJcblx0Y29uc3QgbXNnUGFyZW50UG9wb3V0ID0gJChub2RlKS5wYXJlbnRzKCcueXQtbGl2ZS1jaGF0LWl0ZW0tbGlzdC1yZW5kZXJlcicpO1xyXG5cdGNvbnN0IGF1dGhvck5hbWUgPSAkKG1zZ1BhcmVudCkuZmluZCgnI2F1dGhvci1uYW1lJyk7XHJcblx0Y29uc3QgYXV0aG9yTmFtZVBvcG91dCA9ICQobXNnUGFyZW50UG9wb3V0KS5maW5kKCcjYXV0aG9yLW5hbWUnKTtcclxuXHRcclxuXHRjb25zdCBmaXJzdFR3byA9IHByb2ZpbGVJZC5zdWJzdHJpbmcoMCwgMik7XHJcblx0XHJcblx0aWYgKGF1dGhvck5hbWUubGVuZ3RoID4gMCkge1xyXG5cdFx0JChhdXRob3JOYW1lKS5jc3MoJ2NvbG9yJywgcmFuZG9tQ2hhdENvbG9yc1tmaXJzdFR3by50b1VwcGVyQ2FzZSgpXSk7XHJcblx0fVxyXG5cdFxyXG5cdGlmIChhdXRob3JOYW1lUG9wb3V0Lmxlbmd0aCA+IDApIHtcclxuXHRcdCQoYXV0aG9yTmFtZVBvcG91dCkuY3NzKCdjb2xvcicsIHJhbmRvbUNoYXRDb2xvcnNbZmlyc3RUd28udG9VcHBlckNhc2UoKV0pO1xyXG5cdH1cclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9jaGF0Q29sb3JzLmpzXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9