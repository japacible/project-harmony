

$(document).ready(function() {

	// prep main screen buttons
	$('#playback-btn').click(function() { changeScreenTo('screen-playback'); });
	$('#friends-btn').click(function(){ alert('clicked'); });
	$('#record-btn').click(function(){ alert('clicked'); });
	$('#feedback-btn').click(function(){ alert('clicked'); });
	$('#exit-btn').click(function() { window.location.href = 'index.html#prototype' });


	// prep playback screen buttons
	$('#backmain-btn').click(function() { changeScreenTo('screen-main'); });
	$('#previousvideo-btn').click(function() { alert('clicked'); });
	$('#rewind-btn').click(function() { alert('clicked'); });
	$('#play-btn').click(function() { flipPlayButton(this) });
	$('#fastforward-btn').click(function() { alert('clicked'); });
	$('#nextvideo-btn').click(function() { alert('clicked'); });

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
