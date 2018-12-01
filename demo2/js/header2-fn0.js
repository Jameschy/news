  
  // 左右判断函数
  function SlideDirection(obj,nums,anV,times){      
    if(nums==1){	
		scrollDirect = 'marginTop',
		scrollData = '-25px'
      // setInterval('AutoScrollU("'+obj+'"'+','+anV+')', times);
    }else if(nums==2){
		scrollDirect = 'marginTop',
		scrollData = '25px'
      // setInterval('AutoScrollD("'+obj+'"'+','+anV+')', times);
    }else if(nums==3){
		scrollDirect = 'marginLeft',
		scrollData = '-300px'
      // setInterval('AutoScrolL("'+obj+'"'+','+anV+')', times);
    }else if(nums==4){
		scrollDirect = 'marginLeft',
		scrollData = '300px'
      // setInterval('AutoScrolR("'+obj+'"'+','+anV+')', times);
    }
	
	setInterval('AutoScrollU("'+obj+'"'+','+anV+',"'+scrollDirect+'","'+scrollData+'")', times);
	
	console.log("obj:"+obj);
	console.log("anV:"+anV);
	console.log("scrollDirect:"+scrollDirect);
	console.log("scrollData:"+scrollData);
	console.log("times:"+times)
  }

// header function blocks
// 向上滚动
function AutoScrollU(obj,anV,scrollDirect,scrollData) {  
  $(obj).find("ul:first").animate({
    //       25px:容器定高,
    //       500:动画速度
		scrollDirect:scrollData
  }, anV, function() {
    $(this).css({
		scrollDirect:"0px"
    }).find("li:first").appendTo(this);
  });
}

// 向下滚动
// function AutoScrollD(obj,anV) {
//   
//   $(obj).find("ul:first").animate({
//     //       25px:容器定高,
//     //       500:动画速度
//     marginTop: "25px",
//   }, anV, function() {
//     $(this).css({
//       marginTop: "0px"
//     }).find("li:first").appendTo(this);
//   });
// }

// 向左滚动
// function AutoScrollL(obj,anV) {
//   $(obj).find("ul:first").animate({
//     //       300px:容器定宽,
//     //       500:动画速度
//     marginLeft: "-300px",
//   }, anV, function() {
//     $(this).css({
//       marginLeft: "0px"
//     }).find("li:first").appendTo(this);
//   });
// }

// 向右滚动
// function AutoScrollR(obj,anV) {
//   $(obj).find("ul:first").animate({
//     //       300px:容器定宽,
//     //       500:动画速度
//     marginLeft: "300px",
//   }, anV, function() {
//     $(this).css({
//       marginLeft: "0px"
//     }).find("li:first").appendTo(this);
//   });
// }

//点击显示
function ShowMenu(obj) {
  $(obj).click(function() {
    $("p").toggle();
  });
}
