"use strict";

function initActive(href) {
    $('a[href="' + href + '"]').parent().addClass('active');
}

$(function () {

    //scroll down button
    // $(window).scroll(function () {
    //     $('.scroll-down').hide();
    // });

    $('.scroll-down').viewportChecker({
        classToAdd: 'animated bounce',
        offset: 0
    });

    $('.scroll-down').click(function (e) {
        // e.preventDefault();
        console.log('click');
        var self = $(this);
        var scroll_el = $(this).attr('href');
        if ($(scroll_el).length != 0) {
            if ($('.navbar').hasClass('navbar-fixed-top')) {
                console.log('has fixed');
                $('html, body').animate({scrollTop: $(scroll_el).offset().top - 65}, 500, function () {
                    self.hide();
                });
            } else {
                $('html, body').animate({scrollTop: $(scroll_el).offset().top - 130}, 500, function () {
                    self.hide();
                });
            }
        }
        return false;
    });
    function jupmingItem(item) {
        item.toggleClass('animated bounce');
    }

    // button term agree

    $('#term-agree').on('click', function () {
        $("#myModal").hide();
        $('.agreed__checked').show();
    });

    //scroll animation

    $(window).scroll(function () {
        if ($(this).scrollTop() > 250) {
            // navbar

            $('.my-navbar').addClass('navbar-fixed-top');
            $('.brand').addClass('animated bounceIn')


        }
        else {
            //navbar
            $('.my-navbar').removeClass('navbar-fixed-top');
            $('.brand').removeClass('animated bounceIn')


        }
    });

    //push and pull columns on every odd row for swapping
    if (window.matchMedia('(min-width: 768px)').matches) {
        $('.fleet-item:odd').each(function () {
            $(this).addClass('flex-reverse');
            $(this).find('.fleet-item__title').addClass('right-skew');
        });
        $('.fleet-item:even').each(function () {
            $(this).find('.fleet-item__title').addClass('left-skew');
        });
    }

    $(window).resize(function () {
        if (window.matchMedia('(min-width: 768px)').matches) {
            $('.fleet-item:odd').each(function () {
                $(this).addClass('flex-reverse');
                $(this).find('.fleet-item__title').addClass('right-skew');
            });
            $('.fleet-item:even').each(function () {
                $(this).find('.fleet-item__title').addClass('left-skew');
            });
        }
    });
    //rate-table
    $('.rate-table__row').hover(
        function () {
            if (window.matchMedia('(min-width: 768px)').matches) {
                // $(this).toggleClass('white-bg');
                $(this).find('.btn-price').toggleClass('btn-price-hovered');
                $(this).find('.btn-reserve').toggleClass('visible-xs');
            }
        },
        function () {
            if (window.matchMedia('(min-width: 768px)').matches) {
                // $(this).toggleClass('white-bg');
                $(this).find('.btn-price').toggleClass('btn-price-hovered');
                $(this).find('.btn-reserve').toggleClass('visible-xs');
            }
        }
    );


    //add click to input file

    $('.upload').click(function () {
        $(this).siblings($("input[type='file']")).trigger('click');
    });

    $("input[type='file']").change(function () {
        var p = $(this).closest(".up")
        var uploadVal = p.find('.upload-val');
        uploadVal.text(this.value.replace(/C:\\fakepath\\/i, ''))
    });


    //incrementer for contact form
    $(".plus").on('click', function () {
        console.log('click');
        var oldval = $(this).siblings("#num-vehicles").val();
        var val = parseInt(oldval) + 1;
        $(this).siblings("#num-vehicles").val(val);
        var siblings = $(this).siblings(".num");
        siblings.text(val);
    });

    $(".minus").on('click', function () {
        var oldval = $(this).siblings("#num-vehicles").val();
        if (parseInt(oldval) <= 1) return;
        var val = parseInt(oldval) - 1;
        $(this).siblings("#num-vehicles").val(val);
        $(this).siblings(".num").text(val);
    });

    // add class in to accordion faq

    // $('#faq1').addClass("in");
    // $('#faq1').siblings('.faq-block__heading').find('.faq-block__title').addClass("open");

    $('.faq-block__heading').on('click', function () {
        var self = $(this).find('.faq-block__title');
        $('.faq-wrap .open').each(function () {
            if (!$(this).is(self)) {
                $(this).removeClass('open');
            }
        });
        $(this).find('.faq-block__title').toggleClass('open');
    });


    $("label[for='submit_agree']").on('click', function (ev) {
        var checkbox = $(this).find('span');
        var checkedClass = 'agreed__checked';
        var checked = checkbox.hasClass(checkedClass);
        if(checked) {
            checkbox.removeClass(checkedClass);
        } else {
            checkbox.addClass(checkedClass);
        }
    });
    $('.pickup .agreed').on('click', function (ev) {
        var checkbox = $(this).find('.agreed__checkbox span');
        var checkedClass = 'agreed__checked';
        var checked = checkbox.hasClass(checkedClass);
        if(checked){
            checkbox.removeClass(checkedClass);
        }else {
            checkbox.addClass(checkedClass);
            $('#address2').val($('#address').val());
            $('#city2').val($('#city').val());
            $('#zip2').val($('#zip').val());
            $('#phone').val($('#mobile').val());
            $('#state2').val($('#state').val());
        }
    });
    $('#billing-same').on('click', function (ev) {
        var checkbox = $(this).find('.agreed__checkbox span');
        var checkedClass = 'agreed__checked';
        var checked = checkbox.hasClass(checkedClass);
        if (!checked) {
            checkbox.addClass(checkedClass);
            $(this).next('.row').addClass('hidden');

        } else {
            checkbox.removeClass(checkedClass);
            $(this).next('.row').removeClass('hidden');
        }
    });
    $('input[name=pickup]').change(function (ev) {
        var showId = $(this).data("show");
        var hideId = $(this).data("hide");
        $(showId).show();
        $(hideId).hide();
    });
    $('input[name=destination]').change(function () {
        var showId = $(this).data("show");
        var hideId = $(this).data("hide");
        $(showId).show();
        $(hideId).hide();
    });
    $('#pickup_airport').hide();
    $('#destination_airport').hide();
    //trigger click for faq


});

function hidePreloader() {
    $('#preloader').fadeOut();
}
