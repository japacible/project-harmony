

$(document).ready(function() {

	// prep main screen buttons
	$('#playback-btn').click(function() { changeScreenTo('screen-playback'); });
	$('#friends-btn').click(function(){
		toggleButton(this);
		toggleFriendsMode();
	});
	$('#record-btn').click(function(){
		toggleButton(this);
		toggleRecordMode();
	});
	$('#feedback-btn').click(function(){
		toggleButton(this);
		toggleFeedbackMode();
	});
	$('#exit-btn').click(function() { window.location.href = 'index.html#prototype' });


	// prep playback screen buttons
	$('#backmain-btn').click(function() { changeScreenTo('screen-main'); });
	$('#previousvideo-btn').click(function() { alert('clicked'); });
	$('#rewind-btn').click(function() { alert('clicked'); });
	$('#play-btn').click(function() {
		toggleButton(this);
		togglePlayButton(this)
	 });
	$('#fastforward-btn').click(function() { alert('clicked'); });
	$('#nextvideo-btn').click(function() { alert('clicked'); });
});




function changeScreenTo(screenName) {
	var oldScreen = $('.displaying');
	oldScreen.removeClass('displaying');
	var newScreen = $('#'+screenName);
	newScreen.addClass('displaying');
}


function toggleButton(button) {
	var btn = $(button).parent();
	if (btn.hasClass('btn-toggled')) {
		btn.removeClass('btn-toggled');
	} else {
		btn.addClass('btn-toggled');
	}
}

function togglePlayButton(button) {
	var icon = $(button).find('i');
	var state = icon.attr('class');
	if (state == 'icon-play') {
		icon.removeClass('icon-play');
		icon.addClass('icon-pause');
	} else if (state == 'icon-pause') {
		icon.removeClass('icon-pause');
		icon.addClass('icon-play');
	}
}
