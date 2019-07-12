document.documentElement.style.fontSize = window.innerWidth / 3.75 + 'px';		
$(function() {				
			$(".number-jian").click(function() {
				var num = $(this).siblings(".number").val();
				if(num>0){
				num--;
				$(this).siblings(".number").val(num)
				}
			});
			
			$(".number-jia").click(function() {
				var num = $(this).siblings(".number").val();
				num++;
				$(this).siblings(".number").val(num)
			});

			$(".first-1").toggle(function(){
                  $(".head-round-box").addClass("option-ico")
                                        
             	},function(){
             		$(".head-round-box").removeClass("option-ico")
             	});
			
            $(".head-round-box").toggle(function(){
                  $(this).addClass("option-ico")             
                },function(){
                    $(this).removeClass("option-ico")
                })
			});
            
     
		
