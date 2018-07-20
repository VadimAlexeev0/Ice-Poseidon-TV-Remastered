window.addEventListener('load', function () {
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

    //Toggle part
    streamers.sam_pepper_enabled.onchange = function () {
        localStorage.sam_pepper_enabled = streamers.sam_pepper_enabled.checked;
        console.log("Changed")
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
    $('.close').click(function() {
		window.close()
	});
});
