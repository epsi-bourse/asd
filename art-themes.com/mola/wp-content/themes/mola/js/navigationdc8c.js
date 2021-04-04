/* global molaScreenReaderText */
/**
 * Theme functions file.
 *
 * Contains handlers for navigation and widget area.
 */

(function( $ ) {
    var masthead, menuToggle, siteNavigation;

    function initMainNavigation( container ) {

        // Add dropdown toggle that displays child menu items.
        var dropdownToggle = $( '<button />', { 'class': 'dropdown-toggle', 'aria-expanded': false })
            .append( $( '<span />', { 'class': 'dropdown-symbol', text: '+' }) )
            .append( $( '<span />', { 'class': 'screen-reader-text', text: molaScreenReaderText.expand }) );

        container.find( '.menu-item-has-children > a, .page_item_has_children > a' ).after( dropdownToggle );

        container.find( '.dropdown-toggle' ).click( function( e ) {
            var _this = $( this ), // current item. It will be dropdown-toggle
                screenReaderSpan = _this.find( '.screen-reader-text' ),
                dropdownSymbol = _this.find( '.dropdown-symbol' );
            dropdownSymbol.text( dropdownSymbol.text() === '-' ? '+' : '-' );

            e.preventDefault();
            _this.toggleClass( 'toggled-on' );
            _this.next( '.children, .sub-menu' ).toggleClass( 'toggled-on' );

            _this.attr( 'aria-expanded', _this.attr( 'aria-expanded' ) === 'false' ? 'true' : 'false' );

            screenReaderSpan.text( screenReaderSpan.text() === molaScreenReaderText.expand ? molaScreenReaderText.collapse : molaScreenReaderText.expand );
        });
    }

    initMainNavigation( $( '.header_nav' ) );

    masthead       = $( '#masthead' );
    menuToggle     = masthead.find( '.menu-toggle' );
    siteNavigation = masthead.find( '.header_nav > div > ul' );

    // Enable menuToggle.
    (function() {

        // Return early if menuToggle is missing.
        if ( ! menuToggle.length ) {
            return;
        }

        // Add an initial values for the attribute.
        menuToggle.add( siteNavigation ).attr( 'aria-expanded', 'false' );

        menuToggle.on( 'click.mola', function() {
            $( siteNavigation.closest( '.header_nav' ), this ).toggleClass( 'toggled-on' );

            $( this )
                .add( siteNavigation )
                .attr( 'aria-expanded', $( this ).add( siteNavigation ).attr( 'aria-expanded' ) === 'false' ? 'true' : 'false' );
        });
    })();

    // Fix sub-menus for touch devices and better focus for hidden submenu items for accessibility.
    (function() {
        if ( ! siteNavigation.length || ! siteNavigation.children().length ) {
            return;
        }

        // Toggle `focus` class to allow submenu access on tablets.
        function toggleFocusClassTouchScreen() {
            if ( 'none' === $( '.menu-toggle' ).css( 'display' ) ) {

                $( document.body ).on( 'touchstart.mola', function( e ) {
                    if ( ! $( e.target ).closest( '.header_nav li' ).length ) {
                        $( '.header_nav li' ).removeClass( 'focus' );
                    }
                });

                siteNavigation.find( '.menu-item-has-children > a, .page_item_has_children > a' )
                    .on( 'touchstart.mola', function( e ) {
                        var el = $( this ).parent( 'li' );

                        if ( ! el.hasClass( 'focus' ) ) {
                            e.preventDefault();
                            el.toggleClass( 'focus' );
                            el.siblings( '.focus' ).removeClass( 'focus' );
                        }
                    });

            } else {
                siteNavigation.find( '.menu-item-has-children > a, .page_item_has_children > a' ).unbind( 'touchstart.mola' );
            }
        }

        if ( 'ontouchstart' in window ) {
            $( window ).on( 'resize.mola', toggleFocusClassTouchScreen );
            toggleFocusClassTouchScreen();
        }

        siteNavigation.find( 'a' ).on( 'focus.mola blur.mola', function() {
            $( this ).parents( '.menu-item, .page_item' ).toggleClass( 'focus' );
        });
    })();

    // Add the default ARIA attributes for the menu toggle and the navigations.
    function onResizeARIA() {
        if ( 'block' === $( '.menu-toggle' ).css( 'display' ) ) {

            if ( menuToggle.hasClass( 'toggled-on' ) ) {
                menuToggle.attr( 'aria-expanded', 'true' );
            } else {
                menuToggle.attr( 'aria-expanded', 'false' );
            }

            if ( siteNavigation.closest( '.header_nav' ).hasClass( 'toggled-on' ) ) {
                siteNavigation.attr( 'aria-expanded', 'true' );
            } else {
                siteNavigation.attr( 'aria-expanded', 'false' );
            }
        } else {
            menuToggle.removeAttr( 'aria-expanded' );
            siteNavigation.removeAttr( 'aria-expanded' );
            menuToggle.removeAttr( 'aria-controls' );
        }
    }

    $( document ).ready( function() {
        $( window ).on( 'load.mola', onResizeARIA );
        $( window ).on( 'resize.mola', onResizeARIA );
    });

})( jQuery );