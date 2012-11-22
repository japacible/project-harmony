

$(document).ready(function() {
	// prep main screen buttons
	$("#screen-main .home-btn").click(function(){ changeScreenTo("screen-home"); });
	$("#screen-main .friends-btn").click(function(){ alert("clicked"); });
	$("#screen-main .record-btn").click(function(){ alert("clicked"); });
	$("#screen-main .feedback-btn").click(function(){ alert("clicked"); });

	// prep home screen buttons
	$("#screen-home .main-btn").click(function() { changeScreenTo("screen-main"); });
	$("#screen-home .playback-btn").click(function() { changeScreenTo("screen-playback"); });
	$("#screen-home .settings-btn").click(function() { alert("clicked"); });
	$("#screen-home .exit-btn").click(function() { window.location.href = "index.html#prototype" });

	// prep playback screen buttons
	$("#screen-playback .back-btn").click(function() { changeScreenTo("screen-home"); });
	$("#screen-playback .play-btn").click(function() { alert("clicked"); });
});




function changeScreenTo(screenName) {
	$(".displaying").removeClass("displaying");
	$("#"+screenName).addClass("displaying");
}
