
(function() {
	var FRAME_COUNT = 10;
	var FRAME_TIMEOUT = 2000; // in ms
	var FRAME_FEEDBACK_LIST = new Array(FRAME_COUNT);

	var currentFrame = 0;

	$(document).ready(function() {

		var toggleLabel = function() {
			$(this).find('.btn-label').toggleClass('invisible', 200);
		}
		$('.btn-circle').parent().hover(toggleLabel, toggleLabel);

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
			toggleButton(this, showFeedback, hideFeedback);
		});
		$('#exit-btn').click(function() { window.location.href = 'index.html#prototype' });



		// prep feedback list
		var fillFeedbackList = function(text, frameList) {
			for (var i=0; i<frameList.length; i++) {
				FRAME_FEEDBACK_LIST[frameList[i]] = text;
			}
		}
		fillFeedbackList("Speak Slower", [2,3,4,5]);
		fillFeedbackList("Derp Less", [6,7,8]);


		// prep playback screen buttons
		$('#backmain-btn').click(function() { changeScreenTo('screen-main'); });
		$('#previousvideo-btn').click(function() { alert('clicked'); });
		$('#rewind-btn').click(function() { stepBackward(); });
		$('#play-btn').click(function() {
			toggleButton(this, playVideo, pauseVideo, this);
		 });
		$('#fastforward-btn').click(function() { stepForward(); });
		$('#nextvideo-btn').click(function() { alert('clicked'); });


		// prep video carousel
		$('#video-carousel').waterwheelCarousel({

		});


		// start the conversation screen stop-motion simulation
		nextSimulationFrame();
	});

	function nextSimulationFrame() {

		console.log(currentFrame);

		// increment the frame count
		var oldFeedback = FRAME_FEEDBACK_LIST[currentFrame];
		currentFrame = (currentFrame < FRAME_COUNT-1 ? currentFrame + 1 : 0);
		var feedbackText = FRAME_FEEDBACK_LIST[currentFrame];

		var feedbackArea = $('#feedback');
		// the feedback text changed!
		if (feedbackText != oldFeedback) {

			if (!oldFeedback) {
				// there is no existing text there!
				showFeedback();
			} else if (!feedbackText) {
				// there is no new text there!
				hideFeedback();
			} else {
				// we are switching text!
				hideFeedback(showFeedback);
			}
		}

		// schedule the next frame change
		$(document.body).delay(FRAME_TIMEOUT).show(1, nextSimulationFrame);
	}

	function changeScreenTo(screenName) {
		var oldScreen = $('.displaying');
		oldScreen.removeClass('displaying');
		var newScreen = $('#'+screenName);
		newScreen.addClass('displaying');
	}

	function toggleButton(button, onCallback, offCallback, args) {
		var btn = $(button).parent();
		if (btn.hasClass('btn-toggled')) {
			btn.removeClass('btn-toggled');
			if (offCallback) { offCallback(args); }
		} else {
			btn.addClass('btn-toggled');
			if (onCallback) { onCallback(args); }
		}
	}

	function showFeedback(callback) {
		var feedbackText = FRAME_FEEDBACK_LIST[currentFrame];
		// if feedback button is toggled and there is feedback to show
		if ($('#feedback-btn').parent().hasClass('btn-toggled') && feedbackText) {
			var feedbackArea = $('#feedback');
			feedbackArea.show(0);
			feedbackArea.find('span').html(feedbackText);
			feedbackArea.removeClass('invisible', FRAME_TIMEOUT/4, 'easeInOutCirc', function() {
				if (callback) { callback(); }
			});
		}
	};

	function hideFeedback(callback) {
		$('#feedback').fadeOut(FRAME_TIMEOUT/4, function() {
			var feedbackArea = $('#feedback');
			feedbackArea.addClass('invisible', 0);
			if (callback) { callback(); }
		});
	}

	function playVideo() {
		var icon = $('#play-btn i');
		var label = $('#play-btn').parent().parent().find('.btn-label');
		$('.selectedVideo video').get(0).play();
		label.html("Pause");
		icon.removeClass('icon-play');
		icon.addClass('icon-pause');
	}

	function pauseVideo() {
		var icon = $('#play-btn i');
		var label = $('#play-btn').parent().parent().find('.btn-label');
		$('.selectedVideo video').get(0).pause();
		label.html("Play");
		icon.removeClass('icon-pause');
		icon.addClass('icon-play');
	}

	function stepForward() {
		$('.selectedVideo video').get(0).currentTime += 8;
	}

	function stepBackward() {
		$('.selectedVideo video').get(0).currentTime -= 8;
	}
})();
