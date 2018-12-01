
	$(document).ready(function() {
		// setInterval('AutoScrollL("#headInfor")', 3000)
		// setInterval('AutoScrollU("#headInfor")', 3000)
		SlideDirection("#headInfor",2,500,5000);
		
		$("#mbmenu_subbox").click(function() {
			$(".header2-menu").toggle(500);
		});
		$(".currency-select-box").click(function() {
			$(".currency-flags").toggle(500);
		});
		
	})
	
	// 左右判断函数
	function SlideDirection(obj,nums,anV,times){		
		if(nums==1){
			scrollDirection = 'marginTop: "-25px"',
			scrollO = 'marginTop'
		}else if(nums==2){
			scrollDirection = 'marginTop: "25px"',
			scrollO = 'marginTop'
		}else if(nums==3){
			scrollDirection = 'marginLeft: "-300px"',
			scrollO = 'marginLeft'
		}else if(nums==4){
			scrollDirection = 'marginLeft: "300px"',
			scrollO = 'marginLeft'
		}
		
		setInterval('AutoScroll("'+obj+'"'+','+anV+')', times);
	}

// header function blocks
// 向上滚动
function AutoScroll(obj,anV,scrollDirection,scrollO) {	
	$(obj).find("ul:first").animate({
		// 			25px:容器定高,
		// 			500:动画速度
		// marginTop: "-25px",
		scrollDirection,
	}, anV, function() {
		$(this).css({
		scrollO: "0px"
		}).find("li:first").appendTo(this);
	});
}

//点击显示
function ShowMenu(obj) {
	$(obj).click(function() {
		$("p").toggle();
	});
}


