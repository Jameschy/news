var galleryThumbs = new Swiper('.gallery-thumbs', {
    lazy: true,
    spaceBetween: 10,
    // autoplay: {
    //     delay: 3000,
    //     stopOnLastSlide: false,
    //     disableOnInteraction: true,
    // },
    slidesPerView:3,
    loop: true,
    freeMode: true,
    loopedSlides: 5, //looped slides should be the same
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
});
var galleryTop = new Swiper('.gallery-top', {
    lazy: true,
    spaceBetween: 10,
    loop:true,
    autoplay: {
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: true,
    },
    loopedSlides: 5, //looped slides should be the same
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    thumbs: {
        swiper: galleryThumbs,
    },
});

$("input[name='countDown']").each(function () {
    var time_end=this.value;
    var con=$(this).next("span");
    var _=this.dataset;
    countDown(con,{
        title:_.title,//优先级最高,填充在prefix位置
        prefix:_.prefix,//前缀部分
        suffix:_.suffix,//后缀部分
        time_end:time_end//要到达的时间
    })
    //提供3个事件分别为:启动,重启,停止
        .on("countDownStarted countDownRestarted  countDownEnded ",function (arguments) {
            console.info(arguments);
        });
});

$("a").click(function () {
    $("html, body").animate({scrollTop: $($(this).attr("href")).offset().top -150+ "px"}, 1000);
    return false;

});

galleryThumbs.lazy.load();