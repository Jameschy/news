// banner控制

var swiper1 = new Swiper('#content .swiper-container',{

    // var swiper = new Swiper('.swiper-container', {
    loop: true,
    autoplay: 500,
    lazy: {
        // loadPrevNext: true,
    },
    // effect: 'fade',
    // effect : 'coverflow',
    // effect: 'flip',
    // effect: 'cube',
    // effect: 'fade',
    // 			fadeEffect: {
    // 				crossFade: false,
    // 			}

    // effect : 'coverflow',
    //   slidesPerView: 3,
    //   centeredSlides: true,
    //   coverflowEffect: {
    //     rotate: 30,
    //     stretch: 10,
    //     depth: 60,
    //     modifier: 2,
    //     slideShadows : true
    //   },
    // })

    speed: 500,
    longSwipes: false,
    autoplay: {
    	disableOnInteraction: false,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});
//0.625   5/8
function homeResize() {

    WinHeight = $(window).height();
    WinWidth = $(window).width();
    fullBox = $(".swiper-slide .full");

    // if (WinWidth > 768) {
    //     if (WinWidth / WinHeight > 1.6) {
    //         fullBox.width("100%").height(WinWidth * 0.625).css({
    //             "position": 'absolute',
    //             "left": "0px",
    //             "top": (WinHeight - fullBox.height()) / 2 + "px"
    //         });
    //     } else {
    //         fullBox.width(WinHeight * 1.6).height("100%").css({
    //             "position": 'absolute',
    //             "left": "-" + (fullBox.width() - WinWidth) / 2 + "px",
    //             "top": "0px"
    //         });
    //     }
    // } else {
    //     fullBox.width("100%").height("auto").css({
    //         "position": 'static',
    //     });
    // }
}

homeResize();

$(window).resize(function() {
    homeResize();
});