

$(document).ready(function() {

	// prep main screen buttons
	$('#screen-main .home-btn').click(function(){ changeScreenTo('screen-home'); });
	$('#screen-main .friends-btn').click(function(){ alert('clicked'); });
	$('#screen-main .record-btn').click(function(){ alert('clicked'); });
	$('#screen-main .feedback-btn').click(function(){ alert('clicked'); });


	// prep home screen buttons
	$('#screen-home .main-btn').click(function() { changeScreenTo('screen-main'); });
	$('#screen-home .playback-btn').click(function() { changeScreenTo('screen-playback'); });
	$('#screen-home .settings-btn').click(function() { alert('clicked'); });
	$('#screen-home .exit-btn').click(function() { window.location.href = 'index.html#prototype' });


	// prep playback screen buttons
	$('#screen-playback .back-btn').click(function() { changeScreenTo('screen-home'); });
	$('#screen-playback .previous-btn').click(function() { alert('clicked'); });
	$('#screen-playback .start-btn').click(function() { changeScreenTo('screen-viewvideo'); });
	$('#screen-playback .next-btn').click(function() { alert('clicked'); });


	// prep viewvideo screen buttons
	$('#screen-viewvideo .back-btn').click(function() { changeScreenTo('screen-playback'); });
	$('#screen-viewvideo .previous-btn').click(function() { alert('clicked'); });
	$('#screen-viewvideo .play-btn').click(function() { flipPlayButton(this) });
	$('#screen-viewvideo .next-btn').click(function() { alert('clicked'); });


});




function changeScreenTo(screenName) {
	var oldScreen = $('.displaying');
	oldScreen.removeClass('displaying');
	var newScreen = $('#'+screenName);
	newScreen.addClass('displaying');
}




function flipPlayButton(button) {
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
