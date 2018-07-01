$(function () {
    var tabs = 5;
    var sliders = ["#luxurysedans", "#sportutility", "#luxuryvans", "#luxurylimousines", "#luxurybuses"];
    $.each(sliders, function (index, slider) {
        initSlider(slider);
    });

    turnOnEvents(sliders[0]);
    function turnOffEvents(slider) {
        $(slider + 'S').off('swipe');
        $(slider + " .prev").off('click');
        $(slider + " .next").off('click');

    }

    function turnOnEvents(slider) {
        var prevArrow = $(slider + " .prev");
        var nextArrow = $(slider + " .next");
        nextArrow.on('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            var slick = $(slider + "S").slick("getSlick");
            var slickCurrentSlide = slick.slickCurrentSlide();
            if (slickCurrentSlide == slick.$slides.length - 2) {
                nextTab();
            } else {
                slick.slickNext();
            }
        });
        prevArrow.on('click', function (event) {
            var slick = $(slider + "S").slick("getSlick");
            event.preventDefault();
            event.stopPropagation();
            if (slick.slickCurrentSlide() == 0) {
                prevTab();
            } else {
                slick.slickPrev();
            }
        });
        $(slider + "S").on('swipe', swipeFunction)
    }

    function nextTab() {
        var $tab = $('#tab-caption');
        var activeTabIndex = $tab.find("li.active").index();
        var newIdx = (activeTabIndex + 1) % tabs;
        turnOffEvents(sliders[activeTabIndex]);
        turnOnEvents(sliders[newIdx]);
        $(sliders[newIdx] + 'S').slick('getSlick').slickGoTo(0);

        $tab.find('li').removeClass('active');//.eq(newIdx).addClass('active');
        $tab.find('a[href="' + sliders[newIdx] + '"]').tab('show');
    }

    function prevTab() {
        var $tab = $('#tab-caption');
        var activeTabIndex = $tab.find('li.active').index();
        var newIdx = (activeTabIndex - 1);
        if (newIdx < 0) newIdx = newIdx + tabs;
        turnOffEvents(sliders[activeTabIndex]);
        turnOnEvents(sliders[newIdx]);
        var slick = $(sliders[newIdx] + 'S').slick('getSlick');
        slick.slickGoTo(slick.slideCount - 2);


        $tab.find('li').removeClass('active');//.eq(newIdx).addClass('active');
        $tab.find('a[href="' + sliders[newIdx] + '"]').tab('show');
    }

    function swipeFunction(event, slick, direction) {
        event.preventDefault();
        event.stopPropagation();
        if (direction === "left") {
            if (slick.slickCurrentSlide() == slick.$slides.length - 1) {
                nextTab();
            } else {
                slick.slickNext();
            }
        } else {
            if (slick.slickCurrentSlide() == slick.$slides.length - 1) {
                prevTab();
            } else {
                slick.slickPrev();
            }
        }
        console.log(direction);
    }

    function initSlider(slider) {
        var prevArrow = $(slider + " .prev");
        var nextArrow = $(slider + " .next");
        $(slider + "S").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: false,
            infinite: true,
            arrows: false,
            prevArrow: prevArrow,
            nextArrow: nextArrow,
            responsive: [{breakpoint: 1200, settings: {slidesToShow: 1, slidesToScroll: 1, infinite: !0}}, {
                breakpoint: 992,
                settings: {slidesToShow: 1, slidesToScroll: 1, infinite: !0}
            }, {breakpoint: 640, settings: {slidesToShow: 1, slidesToScroll: 1, infinite: !0}}]
        });
        return $(slider + 'S').slick("getSlick");

    }

    $('.service-img-wrapper figcaption a').css('outline', 0);
    $(".service-slider").slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        // variableWidth: true,
        prevArrow: $(".services .prev"),
        nextArrow: $(".services .next"),
        responsive: [{
            breakpoint: 1024,
            settings: {slidesToShow: 2, slidesToScroll: 1, nextArrow: false, prevArrow: false, infinite: !0}
        }, {
            breakpoint: 667,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                nextArrow: false,
                prevArrow: false,
                infinite: !0,
                variableWidth: false
            }
        }
            // , {breakpoint: 640, settings: {slidesToShow: 1, slidesToScroll: 1, variableWidth: false, infinite: !0}}
        ]
    });
    $('.slide-about').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
        dots: true,
        dotsClass: 'review-dot',
        nextArrow: false,
        prevArrow: false,
        responsive: [{
            breakpoint: 1024,
            settings: {slidesToShow: 1, slidesToScroll: 1, nextArrow: false, prevArrow: false, infinite: !0}
        }]
    });
    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
        var el = $(this).attr('href');

        var slick = $(el + 'S').slick('getSlick');

        if (e.relatedTarget) {
            var prev = $(e.relatedTarget).attr('href');
            turnOffEvents(prev);
            turnOnEvents(el);
            slick.slickGoTo(0);
        }
        slick.refresh();

        $('#preloader').appendTo(el + ' .fleet-tab-content__wrap').show();
        var $caption = $(el+ ' .container p');
        $caption.hide();
        setTimeout(hidePreloader($caption), 400);
        setTimeout(function(){$caption.fadeIn();},600);
    });
    $('#myModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget);
        var img = button.data('img');
        var caption = button.data('caption');
        var modal = $(this)
        modal.find('.modal-body img').attr("src", img);
        modal.find('#myModalLabel').text(caption);
    });
    $('.navbar-nav li').on('click', function () {
        $('.navbar-nav li.active').removeClass('active');
        $(this).addClass('active');
    });
});