(function ($) {
    if (!$.fn.Accordion) {
        $.fn.Accordion = function (a) {
            var b = {
                accordion: "true",
                speed: 200,
                closedSign: '<em class="fa fa-angle-down fa-right"></em>',
                openedSign: '<em class="fa fa-angle-up fa-right fa-up"></em>'
            },
                c = $.extend(b, a),
                d = $(this);

            if ($(".v-sidbar>nav>ul>li>ul>li>a.active").length == 0) {
                $(".v-sidbar>nav>ul ul:eq(0)").show();
            }

            d.find("li").each(function () {
                0 !== $(this).find("ul").size() //&& $(this).find("ul").slideUp()
                    && ($(this).find("a:first").append("<b class='collapse-sign'>" + c.closedSign + "</b>"), "#" == $(this).find("a:first").attr("href") && $(this).find("a:first").click(function () {
                        return !1
                    }))
            }),
                d.find("a.active").each(function () {
                    $(this).parents("li").parents("ul").slideDown(c.speed),
                        $(this).parents("li").parents("ul").parent("li").find("b:first").html(c.openedSign),
                        $(this).parents("li").parents("ul").parent("li").addClass("open")
                }),
                d.find("li a").click(function () {
                    0 !== $(this).parent().find("ul").size() && (c.accordion && ($(this).parent().find("ul").is(":visible") || (parents = $(this).parent().parents("ul"), visible = d.find("ul:visible"), visible.each(function (a) {
                        var b = !0;
                        parents.each(function (c) {
                            return parents[c] == visible[a] ? (b = !1, !1) : void 0
                        }),
                            b && $(this).parent().find("ul") != visible[a] && $(visible[a]).slideUp(c.speed,
                                function () {
                                    $(this).parent("li").find("b:first").html(c.closedSign),
                                        $(this).parent("li").removeClass("open")
                                })
                    }))), $(this).parent().find("ul:first").is(":visible") && !$(this).parent().find("ul:first").hasClass("active") ? $(this).parent().find("ul:first").slideUp(c.speed,
                        function () {
                            $(this).parent("li").removeClass("open"),
                                $(this).parent("li").find("b:first").delay(c.speed).html(c.closedSign)
                        }) : $(this).parent().find("ul:first").slideDown(c.speed,
                            function () {
                                $(this).parent("li").addClass("open"),
                                    $(this).parent("li").find("b:first").delay(c.speed).html(c.openedSign)
                            }))
                })
        };
    }
    $("nav").length && checkURL(), $(document).on("click", 'nav a[href!="#"]', function (a) {
        a.preventDefault();
        var b = $(a.currentTarget);
        if (b.attr("target") == "_blank") {
            return;
        }
        b.parent().hasClass("active") || b.attr("target") || window.location.search ? window.location.href = window.location.href.replace(window.location.search, "").replace(window.location.hash, "") + "#" + b.attr("href") : window.location.hash = b.attr("href")
    }),
        $(document).on("click", 'nav a[target="_blank"]', function (a) {
            a.preventDefault();
            var b = $(a.currentTarget);
            window.open(b.attr("href"))
        }),
        $(document).on("click", 'nav a[target="_top"]', function (a) {
            a.preventDefault();
            var b = $(a.currentTarget);
            window.location = b.attr("href")
        }),
        $(document).on("click", 'nav a[href="#"]', function (a) {
            a.preventDefault()
        }),
        $(window).on("hashchange", function () {
            checkURL()
        }),
        $(document).ready(function () {
            $("nav ul").Accordion({
                accordion: !0,
                speed: 235,
                closedSign: '<em class="fa fa-angle-down fa-right"></em>',
                openedSign: '<em class="fa fa-angle-up fa-right fa-up"></em>'
            });
            $('[data-action=minifyMenu]').click(function () {
                $('body').toggleClass('sidebar-collapsed');
            });
            $('#topbar_talk,#talk-panel').hover(function () {
                $('#talk-panel').stop(true).show();
            }, function () {
                $('#talk-panel').delay(100).hide(0);
            });

            $('.js-logout,.logout-link').hover(function () {
                $('div.logout-link').stop(true).show();
            }, function () {
                $('div.logout-link').delay(300).hide(0);
            });

        })
})(jQuery)

var jsArray = {}, cssArray = {};
function loadCss(src, callback) {
    if (cssArray[src]) callback && callback();
    else {
        cssArray[src] = !0;
        var c = document.getElementsByTagName("body")[0],
            d = document.createElement("link");
        d.type = "text/css",
            d.rel = "stylesheet",
            d.href = src,
            d.onload = callback,
            c.appendChild(d)
    }
}
function loadScript(src, callback) {
    if (jsArray[src]) callback && callback();
    else {
        jsArray[src] = !0;
        var c = document.getElementsByTagName("body")[0],
            d = document.createElement("script");
        d.type = "text/javascript",
            d.src = src,
            d.onload = callback,
            c.appendChild(d)
    }
}
function loadURL(url, container) {
    $.ajax({
        type: "GET",
        url: url,
        dataType: "html",
        cache: !0,
        beforeSend: function () {
            container.html('<div class="d-main d-main-w">' +
                '<div class="waiting-loading" style="width:100px;margin:100px auto;text-align:center">' +
                '<div class="line-scale">' +
                '<div style="background:#999"></div>' +
                '<div style="background:#999"></div>' +
                '<div style="background:#999"></div>' +
                '<div style="background:#999"></div>' +
                '<div style="background:#999"></div>' +
                '</div></div></div>'),
                container[0] == $("#content")[0] && $("html").animate({
                    scrollTop: 0
                }, "fast")
        },
        success: function (data) {
            if (data.Status === 111 && data.Message === "请登录") {
                window.RedirectUrl = originalUrl;
                showQrCode(function () {
                    checkURL();
                });
                return;
            }
            else if (data.Status === 0) {
                $("#content").html("");
                modalAlert(data.Message);
            }
            else {
                container.css({
                    opacity: "0.0"
                }).html(data).delay(1).animate({ opacity: "1.0" }, 50);
                pageSetUp();
            }
        },
        error: function () {
            container.html('<div class="error"><h1>世界这么大，我想去看看</h1><h2>别担心也许页面很快就回来了,您可以:</h2><p><a href="#/Member/Dashboard" class="btn">返回首页</a></p></div>')
        },
        async: !0
    })
}

function checkURL() {
    var hash = location.hash.replace(/^#/, "");
    if (!hash) try {
        var b = window.document.URL;
        b && b.indexOf("#", 0) > 0 && b.indexOf("#", 0) < b.length + 1 && (hash = b.substring(b.indexOf("#", 0) + 1))
    } catch (c) { }
    if (container = $("#content"), hash) {
        $("nav li>a.active").removeClass("active");
        var absolutePath = hash.split('?')[0];
        var rootPath = '/' + absolutePath.split('/')[1];
        var title = '';
        if ($('nav a[href="' + absolutePath + '"]').length > 0) {
            $('nav li:has(a[href="' + absolutePath + '"])>a').addClass("active");
            title = $('nav a[href="' + absolutePath + '"]').attr("title");
        }
        else if ($('nav li:has(a[href="' + hash + '"])').length > 0) {
            $('nav li:has(a[href="' + hash + '"])>a').addClass("active");
            title = $('nav a[href="' + hash + '"]').attr("title");
        }
        else {
            if ($('nav li:has(a[href^="' + rootPath + '"])>a').length > 1) {
                $('nav li:has(a[href^="' + rootPath + '"])>a:eq(0)').addClass("active");
                $('nav a[href^="' + rootPath + '"]:eq(0)').addClass('active');
                title = $('nav a[href^="' + rootPath + '"]:eq(0)').attr("title");
            }
            else {
                $('nav li:has(a[href^="' + rootPath + '"])>a').addClass("active");
                title = $('nav a[href^="' + rootPath + '"]').attr("title");
            }
        }

        document.title = title || document.title;
        loadURL(hash + location.search, container);
    } else {
        window.location.hash = "/Aweme";
        return;
        //var e = $('nav > ul > li:first-child > a[href!="#"]');
        //window.location.hash = e.attr("href")
    }
}
function pageSetUp() {
    $(document).ready(function () {
        $("#back-to-top").click(function () {
            $('.v-main').animate({ scrollTop: 0 }, 750);
            return false;
        });
        $(".v-main").bind('scroll', function () {
            if ($(this).scrollTop() >= 1500) {
                $('#back-to-top-con').show();
            } else {
                $('#back-to-top-con').hide();
            }
        });
        $('[data-checkbox]').iCheck({
            checkboxClass: 'icheckbox_square-green',
            radioClass: 'iradio_square-green',
            increaseArea: '20%'
        });
        $('[data-select]').select2({ minimumResultsForSearch: -1 });
    });
}
function showLoading() {
    $('#loadingLayer').show();
}
function hideLoading() {
    $('#loadingLayer').hide();
}
function modalAlert(message) {
    var defaultOpts = {
        title: "提示",
        message: "",
        okButton: { text: "确认" },
        dialogId: "Modal_Alert_Dialog"
    };
    defaultOpts.message = message;
    if ($("#" + defaultOpts.dialogId, "body").is('div')) {
        $("#" + defaultOpts.dialogId).remove();
    }
    var $dialog = $(document.createElement("div"));
    $dialog.attr("class", "mask-pop js-layer-tip");
    $dialog.attr("id", defaultOpts.dialogId);
    $dialog.attr("style", "display:none");
    $("body").append($dialog);
    var modaldialog = $(document.createElement("div"));
    modaldialog.attr("class", "video-pop1 clearfix");
    //对话框头部
    modaldialog.append('<a href="javascript:void(0);" class="a-close js-know-btn"></a> <h5 class="video-pop1-title">' + defaultOpts.title + '</h5>');
    //对话框内容
    modaldialog.append('<div class="over-tip"></div><p class="over-word-tip">' + defaultOpts.message + '</p>');
    //对话框底部按钮
    modaldialog.append('<div class="pop-btns"><a href="javascript:void(0);" class="btn btns-unified js-know-btn">' + defaultOpts.okButton.text + '</a></div>');
    $dialog.append(modaldialog);
    $dialog.click(function (e) {
        if ($(".js-layer-tip").is(e.target)) {
            $(".js-layer-tip").hide();
        }
    });
    $('.js-know-btn').click(function () {
        $('.js-layer-tip').hide();
    });
    $dialog.show();
}