var game_mode = 0;
var GAME_MODE_SKIRMISH = 0;
var GAME_MODE_CLASSIC = 1;
var GAME_MODE_INTERCEPT = 2;
var GAME_MODE_BREAKTHROUGH = 3;
var GAME_MODE_CONVOY = 4;

function showStartGameSetting() {
	var box = document.getElementById('settingBox');
	for ( i = 0; i < string.game_mode.length; i ++ ) {
		var option = document.createElement( 'option' );
		option.value = i;
		option.text = string.game_mode[i];
		document.getElementById("modeSelect").add( option );
	}

	document.getElementById("modeSelect").onchange = function () {
		onSelectedModeChanged();
	};

	var readyButton = document.getElementById("gameSetButton");
	readyButton.innerHTML = string.ready;
	readyButton.addEventListener('click', function () {
		if (document.getElementById('diff-easy').checked) {
			ai_config = AI_CONFIGURATION_BASIC;
		} else if (document.getElementById('diff-normal').checked) {
			ai_config = AI_CONFIGURATION_INTERMEDIATE;
		}

		if (document.getElementById('randomMap').checked) {
			RANDOM_MAP_SIZE = true;
		} else {
			RANDOM_MAP_SIZE = false;
		}
		if (document.getElementById('sound').checked) {
			SOUND_ENABLED = true;
		} else {
			SOUND_ENABLED = false;
		}
		readyGame();
	}, false);
}

function onSelectedModeChanged() {
	var o = document.getElementById("modeSelect");
	switch (parseInt(o.options[o.selectedIndex].value)) {
		case GAME_MODE_SKIRMISH:
			game_mode = GAME_MODE_SKIRMISH;
			document.getElementById('randomMap').disabled = false;
			break;
		case GAME_MODE_INTERCEPT:
			game_mode = GAME_MODE_INTERCEPT;
			document.getElementById('randomMap').disabled = false;
			break;
		case GAME_MODE_BREAKTHROUGH:
			game_mode = GAME_MODE_BREAKTHROUGH;
			document.getElementById('randomMap').disabled = false;
			break;
		case GAME_MODE_CONVOY:
			game_mode = GAME_MODE_CONVOY;
			document.getElementById('randomMap').disabled = false;
			break;
		case GAME_MODE_CLASSIC:
			game_mode = GAME_MODE_CLASSIC;
			document.getElementById('randomMap').disabled = true;
			RANDOM_MAP_SIZE = false;
	}

}

function openTutorial() {
	window.open("https://github.com/tonY1883/fleet-battle/wiki/Basic-Tutorial", '_blank');
}


window.onload = function () {
	if(screen.width < 750){
		window.location = "mobile.htm";
		return
	}
	document.getElementById("title").innerHTML = string.game_title;
	document.title = string.game_title;
	document.getElementById("version-code").innerHTML = string.version_code;
	document.getElementById("github-link").innerHTML = string.github_link_text;
	if (localStorage.getItem("isPlaying") !== null) {
		// do nothing and proceed
	} else {
		localStorage.setItem("isPlaying", "yes");
		//why can't I just use confirm()?Why?
		document.getElementById("confirm-text").innerHTML = string.tutorial_confirm;
		document.getElementById("yes-btn").innerHTML = string.tutorial_confirm_yes;
		document.getElementById("yes-btn").addEventListener('click', function () {
			openTutorial();
			document.getElementById("tutorialBox").style.display = "none";
		}, false);
		document.getElementById("no-btn").innerHTML = string.tutorial_confirm_no;
		document.getElementById("no-btn").addEventListener('click', function () {
			document.getElementById("tutorialBox").style.display = "none";
		}, false);
		document.getElementById("tutorialBox").style.display = "table";
	}
	showStartGameSetting();
};