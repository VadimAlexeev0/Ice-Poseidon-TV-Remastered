$(function() {
	$('.popupchat').click(function() {
		window.open('https://gaming.youtube.com/live_chat?v=AvZ0cYrbsAQ&is_popout=1', 'Ice Poseidon Chat', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=yes,width=500,height=800');
	});

	$('.openOptions').click(function() {
		chrome.runtime.openOptionsPage();
	});
});

var liveCheck = function() {

	$.get("https://api-production.iceposeidon.com/streamers/live", function (shit) {
        var data = shit
        if(data.success == true){
			var i;
			for(i = 0; i < data.streamers.length; i++){
				if(data.streamers[i].streamer === "ice_poseidon"){
					$('.stream-offline').addClass('hidden');
					$('.stream-online').removeClass('hidden');
					$('.view-count').text(data.streamers[i].livedata.viewers);
				}
				else{
					$('.stream-online').addClass('hidden');
					$('.stream-offline').removeClass('hidden');
				}
			}
        }
        else{
            console.log("failed")
        }
    });
};

var getLatestTweet = function() {

	if (JSON.parse(localStorage.showRecentTweet) === false) {
		$('<style type="text/css">html{height: 125px;}</style>').appendTo('head');
		return;
	}

	$('.tweet-container').removeClass('hidden');
};

var getCxLiveStreamers = function() {
	if (JSON.parse(localStorage.showCxLive) !== false) {
		$('.cxlive-container').removeClass('hidden');
	}
};

document.addEventListener('DOMContentLoaded', function () {
	liveCheck();
	getLatestTweet();
    getCxLiveStreamers();
});
