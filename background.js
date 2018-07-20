const INTERVAL = 1000 * 30, // 30 second interval
      DEFAULT_ICON_PATH = './icons/128.png',
      LIVE_ICON_PATH = './icons/128-green.png',
      SOUND_EFFECT = new Audio('sounds/online.mp3');

let subscriptions = {};

function onInstall() {
    console.log("Extension Installed");
    chrome.tabs.create({url: chrome.extension.getURL("firstrun/firstrun.html")})
}

function onUpdate() {
    console.log("Extension Updated");
    $.get("https://api-production.iceposeidon.com/streamers/full", function (shit) {
        var data = shit
        //console.log(data.streamers.length)
        var i;
        for(i = 0; i < data.streamers.length; i++){
            temp1 = data.streamers[number].id;
            id = temp1.toString();
            localStorage.setItem(id+"_live", true);
        }
    })
}

function getVersion() {
    var details = chrome.app.getDetails();
    return details.version;
}

// Check if the version has changed.
var currVersion = getVersion();
var prevVersion = localStorage['version']
if (currVersion != prevVersion) {
    // Check if we just installed this extension.
    if (typeof prevVersion == 'undefined') {
        onInstall();
    } else {
        onUpdate();
    }
    localStorage['version'] = currVersion;
}

const getSubscriptions = function() {
    $.get('https://www.iceposeidon.com/api/v1/subscriptions', function(response) {
        subscriptions = response['subscriptions'];
    });
};

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {

    if (request === 'requestSubscriptions') {
        sendResponse(subscriptions);
    }

    if (request === 'requestLocalstorage') {
        let data = {};

        for (let i = 0, len = localStorage.length; i < len; i++) {

            let item = localStorage.getItem(localStorage.key(i));

            if (item === 'true') item = true;
            if (item === 'false') item = false;

            data[localStorage.key(i)] = item;
        }

        getSubscriptions();

        data['subscriptions'] = subscriptions;

        sendResponse(data);
    }
});

chrome.notifications.onClicked.addListener(function(notificationId) {
 	if(notificationId === 'liveNotification') {
        chrome.tabs.create({ url: 'http://www.iceposeidon.com/' });
        chrome.notifications.clear(notificationId);
    }
});

const showNotification = function(name, id) {

    const time = /(..)(:..)/.exec(new Date());
    const hour = time[1] % 12 || 12;
    const period = time[1] < 12 ? 'AM' : 'PM';

    if (JSON.parse(localStorage.isActivated) === true) {

        chrome.notifications.create('liveNotification', {
 			type: 'basic',
 			title: 'Live! (' + hour + time[2] + ' ' + period + ')',
 			message: name+'has started streaming.',
 			contextMessage: 'Ice Poseidon TV Remastered',
 			iconUrl: LIVE_ICON_PATH
  		});
    }

    if (JSON.parse(localStorage.notificationSoundEnabled) === true) {

        if (localStorage.getItem('audio') === null) {

            const volume = (localStorage.notificationVolume / 100);

            SOUND_EFFECT.volume = (typeof volume === 'undefined' ? 0.50 : volume);
            SOUND_EFFECT.play();

        } else {

            const encodedAudio = localStorage.getItem('audio');
            const arrayBuffer = base64ToArrayBuffer(encodedAudio);

            createSoundWithBuffer(arrayBuffer);
        }
    }
};

const updateIcon = function () {

    const isLive = JSON.parse(localStorage.ice_poseidon_live) === true;

    const iconPath = isLive ? LIVE_ICON_PATH : DEFAULT_ICON_PATH;

    chrome.browserAction.setIcon({
        path: iconPath
    });
};
checkIfLive();
function checkIfLive() {
    //console.clear() 
    $.get("https://api-production.iceposeidon.com/streamers/full", function (shit) {
        var data = shit
        if(data.success == true){
            var i;
            for(i = 0; i < data.streamers.length; i++){
                check(i);
            }
            function check(number){
                //Removes Non ascii chars like emoji
                name = data.streamers[number].name.replace(/[^\x00-\x7F]/g, "");
                temp1 = data.streamers[number].id
                id = temp1.toString();

                if(id != "ice_poseidon"){
                    console.log("In here")
                    if(data.streamers[number].liveData.live === false){
                        localStorage.setItem(id+"_live", false);
                    }
                    if(data.streamers[number].liveData.live === true){
                        if(localStorage.getItem(id+"_live") === "false"){
                            if(localStorage.getItem(id+"_enabled") === "true"){
                                showNotification(name, id);
                            }
                            localStorage.setItem(id+"_live", true);
                        }
                    }
                }
            } 
        }
    else{
        console.log("failed")
    }
    });
}

const icecheckIfLive = function () {
   $.get("https://api-production.iceposeidon.com/streamers/full", function (shit) {
        var data = shit
        if(data.success == true){
            var i;
            for(i = 0; i < data.streamers.length; i++){
                check(i);
            }
            function check(number){
                //Removes Non ascii chars like emoji
                name = data.streamers[number].name.replace(/[^\x00-\x7F]/g, "");
                temp1 = data.streamers[number].id
                id = temp1.toString();
                if(id === "ice_poseidon"){
                    if(data.streamers[number].liveData.live === false){
                        localStorage.setItem(id+"_live", false);
                    }
                    if(data.streamers[number].liveData.live === true){
                        if(localStorage.getItem(id+"_live") === "false"){
                            showNotification(name, id);
                            localStorage.setItem(id+"_live", true);
                        }
                    }
                    updateIcon();
                }
            } 
        }
        else{
            console.log("failed")
        }
    });
};

if (window.Notification) {
    setInterval(function () {
        icecheckIfLive();
        checkIfLive();
    }, INTERVAL);
}

//Is live list
if (!localStorage.setItem("ice_poseidon_live", false)) localStorage.setItem("ice_poseidon_live", false);
if (!localStorage.setItem("sam_pepper_live", false)) localStorage.setItem("sam_pepper_live", false);
if (!localStorage.setItem("tracksuit_andy_live", false)) localStorage.setItem("tracksuit_andy_live", false);
if (!localStorage.setItem("ebz_live", false)) localStorage.setItem("ebz_live", false);
if (!localStorage.setItem("onlyusemeblade_live", false)) localStorage.setItem("onlyusemeblade_live", false);
if (!localStorage.setItem("marie_live", false)) localStorage.setItem("marie_live", false);
if (!localStorage.setItem("hypeman_vince_live", false)) localStorage.setItem("hypeman_vince_live", false);
if (!localStorage.setItem("asian_andy_live", false)) localStorage.setItem("asian_andy_live", false);
if (!localStorage.setItem("bjorn_live", false)) localStorage.setItem("bjorn_live", false);
if (!localStorage.setItem("gray_live", false)) localStorage.setItem("gray_live", false);
if (!localStorage.setItem("kiedom_live", false)) localStorage.setItem("kiedom_live", false);
if (!localStorage.setItem("sweeterin_live", false)) localStorage.setItem("sweeterin_live", false);
if (!localStorage.setItem("mexicanandy_live", false)) localStorage.setItem("mexicanandy_live", false);
if (!localStorage.setItem("anything4views_live", false)) localStorage.setItem("anything4views_live", false);
if (!localStorage.setItem("hyphonix_live", false)) localStorage.setItem("hyphonix_live", false);
if (!localStorage.setItem("mizkif_live", false)) localStorage.setItem("mizkif_live", false);
if (!localStorage.setItem("vexxed_live", false)) localStorage.setItem("vexxed_live", false);
//Toggles
if (!localStorage.sam_pepper_enabled) localStorage.setItem("sam_pepper_enabled", "false");
if (!localStorage.tracksuit_andy_enabled) localStorage.setItem("tracksuit_andy_enabled", "false");
if (!localStorage.ebz_enabled) localStorage.setItem("ebz_enabled", "false");
if (!localStorage.onlyusemeblade_enabled) localStorage.setItem("onlyusemeblade_enabled", "false");
if (!localStorage.marie_enabled) localStorage.setItem("marie_enabled", "false");
if (!localStorage.hypeman_vince_enabled) localStorage.setItem("hypeman_vince_enabled", "false");
if (!localStorage.asian_andy_enabled) localStorage.setItem("asian_andy_enabled", "false");
if (!localStorage.bjorn_enabled) localStorage.setItem("bjorn_enabled", "false");
if (!localStorage.gray_enabled) localStorage.setItem("gray_enabled", "false");
if (!localStorage.kiedom_enabled) localStorage.setItem("kiedom_enabled", "false");
if (!localStorage.sweeterin_enabled) localStorage.setItem("sweeterin_enabled", "false");
if (!localStorage.mexicanandy_enabled) localStorage.setItem("mexicanandy_enabled", "false");
if (!localStorage.anything4views_enabled) localStorage.setItem("anything4views_enabled", "false");
if (!localStorage.hyphonix_enabled) localStorage.setItem("hyphonix_enabled", "false");
if (!localStorage.mizkif_enabled) localStorage.setItem("mizkif_enabled", "false");
if (!localStorage.vexxed_enabled) localStorage.setItem("vexxed_enabled", "false");
//Options
if (!localStorage.isActivated) localStorage.isActivated = true;
if (!localStorage.notificationSoundEnabled) localStorage.notificationSoundEnabled = true;
if (!localStorage.notificationVolume) localStorage.notificationVolume = 40;
if (!localStorage.emotesTwitch) localStorage.emotesTwitch = true;
if (!localStorage.emotesBTTV) localStorage.emotesBTTV = true;
if (!localStorage.emotesSub) localStorage.emotesSub = true;
if (!localStorage.emotesIce) localStorage.emotesIce = true;
if (!localStorage.BTTVChannels) localStorage.BTTVChannels = 'monkasen, graphistrs, trihex, reckful, b0aty, NightDev';
if (!localStorage.disableAvatars) localStorage.disableAvatars = true;
if (!localStorage.enableChatColors) localStorage.enableChatColors = true;
if (!localStorage.redirectToYTGaming) localStorage.redirectToYTGaming = true;
if (!localStorage.enableSplitChat) localStorage.enableSplitChat = false;
if (!localStorage.showDeletedMessages) localStorage.showDeletedMessages = false;
if (!localStorage.mentionHighlight) localStorage.mentionHighlight = true;

if (localStorage.BTTVChannels) {
    localStorage.BTTVChannels = localStorage.BTTVChannels.replace('MonkaSenpai', 'monkasen');
    localStorage.BTTVChannels = localStorage.BTTVChannels.replace('Ice_Poseidon, ', '');
    localStorage.BTTVChannels = localStorage.BTTVChannels.replace('Ice_Poseidon', '');
}

icecheckIfLive();
getSubscriptions();
