// header控制
    $(document).ready(function() {
        $(".menu-btn-box").click(function() {
            // $('.slide-menu-box').toggleClass("dis-bl");
            $('.side-left-bar').toggleClass("wid-15");
            $('.main-center-bar').toggleClass("wid-85");
            $('.side-left-bar').toggleClass("v-visble");
            $('.side-left-bar').toggleClass("fl-left");
            $('.side-left-bar .search-product').toggleClass("dis-no");
            $('#header').toggleClass("fl-right");
            $('#header').toggleClass("wid-85");
            // $('.slide-menu-box').toggleClass("zindex-1");
            // $('.msg-box').toggleClass("mb-on");
            // $('.mb-menu').toggleClass("mb-off");
            // $('.content-box').toggleClass("zindex-20");
            $('.main-center-bar').toggleClass("fl-left");

        });

        // header tips滚动
        SlideDirection(("#headInfor"), 2, 500, 5000);

    });