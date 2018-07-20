window.addEventListener('load', function () {

    // @TODO: Find a better way to do this, lol.
    options.isActivated.checked = JSON.parse(localStorage.isActivated)
    options.notificationSoundEnabled.checked = JSON.parse(localStorage.notificationSoundEnabled);
    options.notificationVolume.value = JSON.parse(localStorage.notificationVolume);
    options.emotesTwitch.checked = JSON.parse(localStorage.emotesTwitch);
    options.emotesBTTV.checked = JSON.parse(localStorage.emotesBTTV);
    options.emotesSub.checked = JSON.parse(localStorage.emotesSub);
    options.emotesIce.checked = JSON.parse(localStorage.emotesIce);
    options.BTTVChannels.value = localStorage.BTTVChannels;
    options.disableAvatars.checked = JSON.parse(localStorage.disableAvatars);
    options.enableChatColors.checked = JSON.parse(localStorage.enableChatColors);
    options.redirectToYTGaming.checked = JSON.parse(localStorage.redirectToYTGaming);
    options.enableSplitChat.checked = JSON.parse(localStorage.enableSplitChat);
    options.showDeletedMessages.checked = JSON.parse(localStorage.showDeletedMessages);
    options.mentionHighlight.checked = JSON.parse(localStorage.mentionHighlight);
    //Streamer Toggles
    streamers.sam_pepper_enabled.checked = JSON.parse(localStorage.sam_pepper_enabled)
    streamers.tracksuit_andy_enabled.checked = JSON.parse(localStorage.tracksuit_andy_enabled)
    streamers.ebz_enabled.checked = JSON.parse(localStorage.ebz_enabled)
    streamers.onlyusemeblade_enabled.checked = JSON.parse(localStorage.onlyusemeblade_enabled)
    streamers.marie_enabled.checked = JSON.parse(localStorage.marie_enabled)
    streamers.hypeman_vince_enabled.checked = JSON.parse(localStorage.hypeman_vince_enabled)
    streamers.asian_andy_enabled.checked = JSON.parse(localStorage.asian_andy_enabled)
    streamers.bjorn_enabled.checked = JSON.parse(localStorage.bjorn_enabled)
    streamers.gray_enabled.checked = JSON.parse(localStorage.gray_enabled)
    streamers.kiedom_enabled.checked = JSON.parse(localStorage.kiedom_enabled)
    streamers.sweeterin_enabled.checked = JSON.parse(localStorage.sweeterin_enabled)
    streamers.mexicanandy_enabled.checked = JSON.parse(localStorage.mexicanandy_enabled)
    streamers.anything4views_enabled.checked = JSON.parse(localStorage.anything4views_enabled)
    streamers.hyphonix_enabled.checked = JSON.parse(localStorage.hyphonix_enabled)
    streamers.vexxed_enabled.checked = JSON.parse(localStorage.vexxed_enabled)

    options.isActivated.onchange = function () {
        localStorage.isActivated = options.isActivated.checked;
    };

    options.notificationSoundEnabled.onchange = function () {
        localStorage.notificationSoundEnabled = options.notificationSoundEnabled.checked;
    };

    options.notificationVolume.onchange = function () {
        localStorage.notificationVolume = options.notificationVolume.value;
    };


    options.emotesTwitch.onchange = function () {
        localStorage.emotesTwitch = options.emotesTwitch.checked;
    };

    options.emotesBTTV.onchange = function () {
        localStorage.emotesBTTV = options.emotesBTTV.checked;
    };

    options.emotesSub.onchange = function () {
        localStorage.emotesSub = options.emotesSub.checked;
    };

    options.emotesIce.onchange = function () {
        localStorage.emotesIce = options.emotesIce.checked;
    };

    options.BTTVChannels.onchange = function () {
        localStorage.BTTVChannels = options.BTTVChannels.value;
    };

    options.disableAvatars.onchange = function () {
        localStorage.disableAvatars = options.disableAvatars.checked;
    };

    options.enableChatColors.onchange = function () {
        localStorage.enableChatColors = options.enableChatColors.checked;
    };

    options.redirectToYTGaming.onchange = function () {
        localStorage.redirectToYTGaming = options.redirectToYTGaming.checked;
    };

    options.enableSplitChat.onchange = function () {
        localStorage.enableSplitChat = options.enableSplitChat.checked;
    };

    options.showDeletedMessages.onchange = function () {
        localStorage.showDeletedMessages = options.showDeletedMessages.checked;
    };

    options.mentionHighlight.onchange = function () {
        localStorage.mentionHighlight = options.mentionHighlight.checked;
    };
    //Toggle part
    streamers.sam_pepper_enabled.onchange = function () {
        localStorage.sam_pepper_enabled = streamers.sam_pepper_enabled.checked;
    };
    streamers.tracksuit_andy_enabled.onchange = function () {
        localStorage.tracksuit_andy_enabled = streamers.tracksuit_andy_enabled.checked;
    };
    streamers.ebz_enabled.onchange = function () {
        localStorage.ebz_enabled = streamers.ebz_enabled.checked;
    };
    streamers.onlyusemeblade_enabled.onchange = function () {
        localStorage.onlyusemeblade_enabled = streamers.onlyusemeblade_enabled.checked;
    };
    streamers.marie_enabled.onchange = function () {
        localStorage.marie_enabled = streamers.marie_enabled.checked;
    };
    streamers.hypeman_vince_enabled.onchange = function () {
        localStorage.hypeman_vince_enabled = streamers.hypeman_vince_enabled.checked;
    };
    streamers.asian_andy_enabled.onchange = function () {
        localStorage.asian_andy_enabled = streamers.asian_andy_enabled.checked;
    };
    streamers.bjorn_enabled.onchange = function () {
        localStorage.bjorn_enabled = streamers.bjorn_enabled.checked;
    };
    streamers.gray_enabled.onchange = function () {
        localStorage.gray_enabled = streamers.gray_enabled.checked;
    };
    streamers.kiedom_enabled.onchange = function () {
        localStorage.kiedom_enabled = streamers.kiedom_enabled.checked;
    };
    streamers.sweeterin_enabled.onchange = function () {
        localStorage.sweeterin_enabled = streamers.sweeterin_enabled.checked;
    };
    streamers.mexicanandy_enabled.onchange = function () {
        localStorage.mexicanandy_enabled = streamers.mexicanandy_enabled.checked;
    };
    streamers.anything4views_enabled.onchange = function () {
        localStorage.anything4views_enabled = streamers.anything4views_enabled.checked;
    };
    streamers.hyphonix_enabled.onchange = function () {
        localStorage.hyphonix_enabled = streamers.hyphonix_enabled.checked;
    };
    streamers.vexxed_enabled.onchange = function () {
        localStorage.vexxed_enabled = streamers.vexxed_enabled.checked;
    };

    var audio = localStorage.getItem('audio');

    if (audio === null) {
        $('#currentSound').text('Current Sound: online.mp3');
    } else {
        $('#currentSound').text('Current Sound: ' + localStorage.getItem('audioName'));
    }

    $('.testNotification').click(function () {
        showTestNotification();
    });

    $('#newSound').change(function () {

        if (!hasExtension('newSound', ['.mp3', '.ogg', '.aac', '.wav', '.aiff', '.pcm', '.wma', '.alac', '.flac'])) {
            window.alert('Invalid file type');
        } else {

            var fileReader = new FileReader;

            fileReader.onload = function () {

                var arrayBuffer = this.result;
                var encodedAudio = arrayBufferToBase64(arrayBuffer);

                localStorage.setItem('audio', encodedAudio);

                var soundPath = newSound.value;
                var audioName = soundPath.replace(/^.*\\/, '');

                localStorage.setItem('audioName', audioName);

                $('#currentSound').text('currentSound: ' + localStorage.getItem('audioName'));
            }

            fileReader.readAsArrayBuffer(this.files[0]);
        }
    });

    reset.onclick = function () {
        localStorage.removeItem('audio');
        localStorage.removeItem('audioName');
        $('#currentSound').text('Current Sound: online.mp3');
    }
});

var showTestNotification = function () {

    var time = /(..)(:..)/.exec(new Date());
    var hour = time[1] % 12 || 12;
    var period = time[1] < 12 ? 'AM' : 'PM';

    if (JSON.parse(localStorage.isActivated) === true) {

        chrome.notifications.create(null, {
  			type: 'basic',
 			title: 'Test! (' + hour + time[2] + ' ' + period + ')',
 			message: 'Test notification!',
 			contextMessage: 'Ice Poseidon TV',
 			iconUrl: '../icons/64.png'
  		});
    }

    if (JSON.parse(localStorage.notificationSoundEnabled) === true) {

        if (localStorage.getItem('audio') === null) {

            var defaultSound = new Audio('./../sounds/online.mp3');
            var volume = (localStorage.notificationVolume / 100);

            defaultSound.volume = (typeof volume == 'undefined' ? 0.50 : volume);
            defaultSound.play();

        } else {

            var encodedAudio = localStorage.getItem('audio');
            var arrayBuffer = base64ToArrayBuffer(encodedAudio);

            createSoundWithBuffer(arrayBuffer);
        }
    }
};

// Convert ArrayBuffer to Base64.
var arrayBufferToBase64 = function (arrayBuffer) {

    var binary = '';
    var bytes = new Uint8Array(arrayBuffer)
    var len = bytes.byteLength;

    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }

    return window.btoa(binary);
};

// Convert Base64 to ArrayBuffer.
var base64ToArrayBuffer = function (base64) {

    var binaryString = window.atob(base64);
    var len = binaryString.length;
    var bytes = new Uint8Array(len);

    for (var i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }

    return bytes.buffer;
};

// Convert buffer into audio object.
var createSoundWithBuffer = function (buffer) {

    var context = new AudioContext();
    var audioSource = context.createBufferSource();
    var volumeNode = context.createGain();
    var volume = (localStorage.notificationVolume / 100);

    audioSource.connect(volumeNode);
    volumeNode.connect(context.destination);

    volumeNode.gain.value = (typeof volume == 'undefined' ? 0.50 : volume);

    context.decodeAudioData(buffer, function (res) {
        audioSource.buffer = res;
        audioSource.start(0);
    });
};

// Check for valid audio extensions.
var hasExtension = function (inputID, exts) {
    var fileName = document.getElementById(inputID).value;
    return (new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test(fileName);
};
