(function ($) {
    'use strict';
    
    // Welcome Slider Active Code
    if ($.fn.owlCarousel) {
        $(".header_slides, .page_content_slides, .footer_slides").owlCarousel({
            items: 1,
            margin: 0,
            loop: true,
            nav: true,
            navText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'],
            dots: false,
            autoplay: true,
            smartSpeed: 800,
            autoHeight: true
        });
    }

})(jQuery);