

jQuery(document).ready(function($){

    $.history.init(function(hash){
        if(hash == "") {
            // initialize your app
        } else {
        
        	switch(hash){
        		case "home":
        			$(this).css({"height": "468px", "overflow":"hidden"});
        			$('.featured').load("projects/home.html");
        			$.scrollTo( {top:0, left:0}, {duration:1000, easing: 'easeInOutExpo'});
        			break;
        		case "projectharmony":
        			var offset = $('#projectharmony_wrap').offset().top - 90;
        			$.scrollTo( {top:offset, left:0}, {duration:1000, easing: 'easeInOutExpo'});
        			break;
        		case "documentation":
        			var offset = $('#documentation_wrap').offset().top - 90;
        			$.scrollTo( {top:offset, left:0}, {duration:1000, easing: 'easeInOutExpo'});
        			break;
        		case "prototype":
        			var offset = $('#prototype_wrap').offset().top - 90;
        			$.scrollTo( {top:offset, left:0}, {duration:1000, easing: 'easeInOutExpo'});
        			break;
        		case "team":
        			var offset = $('#team_wrap').offset().top - 90;
        			$.scrollTo( {top:offset, left:0}, {duration:1000, easing: 'easeInOutExpo'});
        			break;
        		default:
        			$.scrollTo( { top:0, left:0}, {duration:1000, easing: 'easeOutExpo', onAfter: function(){
		        		$('.featured').animate({"height" : "50px"}, {duration:500, easing: 'easeInOutExpo', complete:function(){
							$(this).css({"overflow":"hidden"}).html('<img src="img/ajax_loader.gif" alt="" id="ajaxload" />');        			
		        			
			        		$('.featured').load("projects/"+hash+".html", function(){
			        			$(this).css({"height": "auto", "overflow":"auto"});
			        			$('.featured').slideDown(200);
			        		});
			        	}});
		        	}});
        			break;
        	}
        }
    },
    { unescape: ",/" });
});
