jQuery(function($) {

    "use strict";
    
    //Preloader


    if($('.ale_preloader_holder').length){
        $(window).load(function(){
            $('.ale_preloader_holder').fadeOut('slow',function(){$(this).remove();});
        });
    }






    /* The hamburger */
    $('.hamburger--collapse-r').on('click', function(){
        $('.hamburger--collapse-r').toggleClass('is-active');
        $('.art-header-menu .main-menu-header').fadeToggle(450);
    });


    /* The search */

    $('#header-search-form .header-search-icon').on('click', function(e){
        e.preventDefault();
        $('#header-search-form .search-input').fadeToggle(300);
    });

    $('#header-search-form-sticky .header-search-icon').on('click', function(e){
        e.preventDefault();
        $('#header-search-form-sticky .search-input').fadeToggle(300);
    });

    /* The smart search */

    $('#art-header-smart-search .header-smart-search-icon').on('click', function(e){
        e.preventDefault();
        $('#art-header-smart-search .art-aws-wrapper').fadeToggle(300);
    });



    $('.variations_form.cart select').change(function(){
        //if($(this).val() == 0) return false;

        var current = $(this);
        var art_product_color = current.val();
        var art_product_variations = current.closest('.variations_form.cart').data('product_variations');


        //console.log( art_product_variations );
        art_product_variations.forEach(function(item, i, arr) {

            if( item['attributes']['attribute_pa_color'] == art_product_color ) {

                current.closest('.product-wrapper').find('.art-product-image img').attr( 'src', item['image']['src'] );
                current.closest('.product-wrapper').find('.art-product-image img').attr( 'srcset', item['image']['srcset'] );
            }

        });


    });



    $('.art-future-date').each(function(){

        var deal_id = $(this).attr('id');

        $( '#' + deal_id ).countdowntimer({
            dateAndTime : $(this).data('deal-end') + " 00:00:00",
            //tickInterval : 10000,
            regexpMatchFormat: "([0-9]{1,4}):([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})",
            regexpReplaceWith: "<div class='art_countdowntime'><span class='art-timer-number'>$1</span><span class='art-timer-word'>Days</span></div>  <div class='art_countdowntime'><span class='art-timer-number'>$2</span><span class='art-timer-word'>Hours</span></div>  <div class='art_countdowntime'><span class='art-timer-number'>$3</span><span class='art-timer-word'>Min</span></div>  <div class='art_countdowntime'><span class='art-timer-number'>$4</span><span class='art-timer-word'>Sec</span></div>"
        });


    });


    $('.art-future-proposition-date').each(function(){

        var deal_id = $(this).attr('id');

        $( '#' + deal_id ).countdowntimer({
            dateAndTime : $(this).data('deal-end') + " 00:00:00",
            //tickInterval : 10000,
            regexpMatchFormat: "([0-9]{1,4}):([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})",
            regexpReplaceWith: "<div class='art_countdowntime'><span class='art-timer-number'>$1</span><span class='art-timer-word'>Days</span></div>  <div class='art_countdowntime'><span class='art-timer-number'>$2</span><span class='art-timer-word'>Hours</span></div>  <div class='art_countdowntime'><span class='art-timer-number'>$3</span><span class='art-timer-word'>Min</span></div>  <div class='art_countdowntime'><span class='art-timer-number'>$4</span><span class='art-timer-word'>Sec</span></div>"
        });


    });













    if (jQuery.fn.slick) {


        // Slides For the Reviews
        $('.slider-nav').slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            asNavFor: '.slider-for',
            dots: false,
            centerMode: true,
            focusOnSelect: true
        });
        $('.slider-for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            adaptiveHeight: true,
            asNavFor: '.slider-nav'

        });


        // Slides For the Reviews Two
        $('.art-review-two').slick({
            slidesToShow: 2,
            slidesToScroll: 1,
            dots: false,
            arrows: false,
            autoplay: true,
            autoplaySpeed: 4000,
            swipeToSlide: true,
            responsive: [
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 1
                    }
                },

            ]
        });


        // Slides For the Partners
        $('.slider-partners').slick({
            slidesToShow: 6,
            slidesToScroll: 2,
            dots: false,
            arrows: false,
            swipeToSlide: true,
            responsive: [
                {
                    breakpoint: 991,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 671,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 471,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        });



        /*
         * Blog slider
         * */
        $('.art-blog-posts-slider').slick({
            dots: false,
            infinite: false,
            autoplaySpeed: 4000,
            slidesToShow: 2,
            slidesToScroll: 1,
            arrows: false,
            autoplay: true,
            responsive: [
             {
             breakpoint: 770,
                 settings: {
                 slidesToShow: 1,
                 slidesToScroll: 1
                 }
             }
             ]
        });

    }





    /*
     *  Sticky Sidebar Settings
     * */
    if( artScriptsObject.blogStickySidebar === '1' ) {

        // Blog Archive
        var sidebarBlog = $('.art-sidebar-wrap');
        var ListBlog = $('.art-posts-list');
        var sidebarBlogList = $('.art-posts-list , .art-sidebar-wrap ');
        if ( ListBlog.length && sidebarBlog.length) {
            sidebarBlogList.theiaStickySidebar({
                additionalMarginTop: 130
                //additionalMarginBottom: 0//40
            });
        }


        // Blog Single
        var ContentBlogSingle = $('.art-post-single');
        var sidebarBlogContentSingle = $('.art-post-single , .art-sidebar-wrap ');
        if ( ContentBlogSingle.length && sidebarBlog.length) {
            sidebarBlogContentSingle.theiaStickySidebar({
                additionalMarginTop: 130
                //additionalMarginBottom: 0//40
            });
        }

    }


    if( artScriptsObject.shopStickySidebar === '1' ) {

        // Shop Archive
        var ContentShop = $('.art-primary-content-shop');
        var sidebarShop = $('.art-main-sidebar-shop');
        var sidebarShopContent = $('.art-primary-content-shop , .art-main-sidebar-shop ');
        if ( ContentShop.length && sidebarShop.length ) {
            sidebarShopContent.theiaStickySidebar({
                additionalMarginTop: 130
                //additionalMarginBottom: 0//40
            });
        }

        // Shop Single
        var ContentShopSingle = $('.primary-wrapper-shop-single');
        var SidebarShopContentSingle = $('.primary-wrapper-shop-single , .art-main-sidebar-shop ');
        if ( ContentShopSingle.length && sidebarShop.length ) {
            SidebarShopContentSingle.theiaStickySidebar({
                additionalMarginTop: 130
                //additionalMarginBottom: 0//40
            });
        }


    }


    /*
     *  Sticky Header
     * */
    function stickyHeader() {
        var header        = $('header.art-main-header');
        var	headerHeight  = header.outerHeight();

        $(window).scroll(function(){
            var scroll = $(window).scrollTop();

            if ( scroll >= headerHeight + 200 ) {
                $('.art-header-sticky').addClass('art-header-sticky-show');
            } else {
                $('.art-header-sticky').removeClass('art-header-sticky-show');
            }
        });
    }






    $( document ).ready( function() {
        stickyHeader();
    });


});


