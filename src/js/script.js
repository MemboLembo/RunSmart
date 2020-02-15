// //tiny
var slider = tns({
    container: '.carousel__inner',
    items: 1,
    slideBy: 'page',
    autoplay: false,
    controls: false,
    navPosition: true,
    responsive: {
        992: {
            edgePadding: 20,
            gutter: 200,
            items: 1,
            // edgePadding: 200,
        },
    },
});

document.querySelector('.prev').addEventListener('click', function () {
    slider.goTo('prev');
});
document.querySelector('.next').addEventListener('click', function () {
    slider.goTo('next');
});

$(document).ready(function () {

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function (i) {
            $(this).on('click', function (e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list-box').eq(i).toggleClass('catalog-item__list-box_active');
            })
        });
    };

    toggleSlide(".catalog-item__back");
    toggleSlide(".catalog-item__link");

    //modal
    $('[data-modal=consultation]').on('click', function () {
        $('.overlay, #consultation').fadeIn('slow');
    });

    $('.modal__close').on('click', function () {
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });

    $('.button_mini').on('click', function () {
        $('.overlay, #order').fadeIn('slow');
    });

    $('.button_mini').each(function (i) {
        $(this).on('click', function () {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
        })
    });

    //validation
    function valideForm(form) {
        $(form).validate({
            rules: {
                // simple rule, converted to {required:true}
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                // compound rule
                email: {
                    required: true,
                    email: true
                },
            },
            messages: {
                name: {
                    required: "Имя",
                    minlength: jQuery.validator.format("Хотя бы {0} символа.")
                },
                email: {
                    required: "E-mail",
                    email: "Введите нормально"
                },
                phone: "телефон"
            }
        });
    };

    valideForm('#consultation form');
    valideForm('#order form');
    valideForm('.consultation form');

    //маска ввода номера, плагин
    $("input[name=phone]").mask("+ 38 (999) 999-99-99");

    //сервер через php
    $('form').submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function () {
            $(this).find('input').val('');

            $('form').trigger('reset');
        });
        return false;
    });

    //scroll up
    $(window).scroll(function () {
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });
    //Smooth
    $("a[href^='#']").click(function () {
        const _href = $(this).attr("href");
        $("html, body").animate({
            scrollTop: $(_href).offset().top + "px"
        });
        return false;
    });

    //animation
    new WOW().init();
});