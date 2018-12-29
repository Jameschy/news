  
  // 判断函数
  function SlideDirection(obj,nums,anV,times){
		if(nums==0){
			// 停止滚动
    }else if(nums==1){
			setInterval('AutoScrollU("'+obj+'"'+','+anV+')', times);
    }else if(nums==2){
      setInterval('AutoScrollD("'+obj+'"'+','+anV+')', times);
    }else if(nums==3){
      setInterval('AutoScrollL("'+obj+'"'+','+anV+')', times);
    }else if(nums==4){
      setInterval('AutoScrollR("'+obj+'"'+','+anV+')', times);
    }  
  }

// header function blocks
// 向上
function AutoScrollU(obj,anV) {  
  $(obj).find("ul:first").animate({
    marginTop: "-25px",
  }, anV, function() {
    $(this).css({
      marginTop: "0px"
    }).find("li:first").appendTo(this);
  });
}

// 向下
function AutoScrollD(obj,anV) {
  
  $(obj).find("ul:first").animate({
    marginTop: "25px",
  }, anV, function() {
    $(this).css({
      marginTop: "0px"
    }).find("li:first").appendTo(this);
  });
}

// 向左
function AutoScrollL(obj,anV) {
  $(obj).find("ul:first").animate({
    marginLeft: "-300px",
  }, anV, function() {
    $(this).css({
      marginLeft: "0px"
    }).find("li:first").appendTo(this);
  });
}

// 向右
function AutoScrollR(obj,anV) {
  $(obj).find("ul:first").animate({
    marginLeft: "300px",
  }, anV, function() {
    $(this).css({
      marginLeft: "0px"
    }).find("li:first").appendTo(this);
  });
}

//点击显示
function ShowMenu(obj) {
  $(obj).click(function() {
    $("p").toggle();
  });
}
