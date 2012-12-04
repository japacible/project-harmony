
(function() {
	var FRAME_COUNT = 53;
	var FRAME_TIMEOUT = 1000; // in ms
	var FRAME_FEEDBACK_LIST = new Array(FRAME_COUNT);

	var currentFrame = -1;
	var startSimulation = false;

	$(window).load(function() {
		console.log("WINDOW");

		var toggleLabel = function() {
			$(this).find('.btn-label').toggleClass('invisible', 200);
		}
		$('.btn-circle').parent().hover(toggleLabel, toggleLabel);

		// prep main screen buttons
		$('#playback-btn').click(function() { changeScreenTo('screen-playback'); });
		$('#friends-btn').click(function(){
			toggleButton(this);
			toggleFriendsMode();
			startSimulation = true;
			// start the conversation screen stop-motion simulation
			nextSimulationFrame();
		});
		$('#record-btn').click(function(){
			toggleButton(this);
			toggleRecordMode();
			startSimulation = true;
			// start the conversation screen stop-motion simulation
			nextSimulationFrame();
		});
		$('#feedback-btn').click(function(){
			toggleButton(this, showFeedback, hideFeedback);
			startSimulation = true;
			// start the conversation screen stop-motion simulation
			nextSimulationFrame();
		});
		$('#exit-btn').click(function() { window.location.href = 'index.html#prototype' });


		// prep playback screen buttons
		$('#backmain-btn').click(function() { changeScreenTo('screen-main'); });
		$('#previousvideo-btn').click(function() { alert('clicked'); });
		$('#rewind-btn').click(function() { stepBackward(); });
		$('#play-btn').click(function() {
			toggleButton(this, playVideo, pauseVideo, this);
		 });
		$('#fastforward-btn').click(function() { stepForward(); });
		$('#nextvideo-btn').click(function() { alert('clicked'); });

		cycleImage();
		hideSpinner();
	});


	$(document).ready(function() {
		console.log("DOCUMENT");
		showSpinner();
		injectImages();

		// prep feedback list
		var fillFeedbackList = function(text, start, stop) {
			for (var i=start; i<stop; i++) {
				FRAME_FEEDBACK_LIST[i] = text;
			}
		}
		fillFeedbackList("Introduce Yourself", 9, 12);
		fillFeedbackList("Keep Eye Contact", 22, 27);
		fillFeedbackList("Change the Subject", 32, 36);
		fillFeedbackList("Stop Talking", 46, 51);
	});

	function showSpinner() {
		$('body').addClass("loading"); 
	}
	function hideSpinner() {
		$('body').removeClass("loading"); 
	}

	function injectImages() {
		var background = $('#background');
		for (var i=0; i<FRAME_COUNT; i++) {
			var frameNum = (""+(1000 + i)).slice(1);
			console.log(frameNum);
			var img = $('<img/>', {
				'id' : "frame_"+i,
				'src' : "images/frames/frame_"+(frameNum)+".jpg"
			});
			if (i==0) {
				img.addClass('active');
			}
			background.append(img);
		}
	}

	function nextSimulationFrame() {
		if (!startSimulation) {
			return;
		}

		console.log("frame "+currentFrame);

		// increment the frame count
		var oldFrame = currentFrame;
		currentFrame = (currentFrame < FRAME_COUNT-1 ? currentFrame + 1 : 0);

		setTimeout(cycleImage, 0);

		var oldFeedback = FRAME_FEEDBACK_LIST[oldFrame];
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

	function cycleImage(){
		var $active = $('#background .active');
		var $next = ($active.next().length > 0) ? $active.next() : $('#background img:first');
		$next.css('z-index',2);//move the next image up the pile
		$active.fadeOut(500,function() {//fade out the top image
			$active.css('z-index',1).show().removeClass('active');//reset the z-index and unhide the image
			$next.css('z-index',3).addClass('active');//make the next image the top one
		});
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
