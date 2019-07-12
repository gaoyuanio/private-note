document.documentElement.style.fontSize = window.innerWidth / 3.75 + 'px';
$(function(){
	$(".nav-wrap>li").click(function(){			
		$(this).siblings().removeClass("nav-1");
		$(this).addClass("nav-1");
	})
});
