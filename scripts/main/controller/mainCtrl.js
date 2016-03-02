/**
 *
 * @type {module}
 * controller for the login page
 */
var loginControllers = angular.module('mainControllers', []);


loginControllers.controller('mainCtrl',
    function ($scope, $window, mainService, $location, $rootScope,utilService,userFeaturesService) {
        (function($) {
            "use strict"; // Start of use strict

            // jQuery for page scrolling feature - requires jQuery Easing plugin
            $('a.page-scroll').bind('click', function(event) {
                var $anchor = $(this);
                $('html, body').stop().animate({
                    scrollTop: ($($anchor.attr('href')).offset().top - 50)
                }, 1250, 'easeInOutExpo');
                event.preventDefault();
            });

            // Highlight the top nav as scrolling occurs
            $('body').scrollspy({
                target: '.navbar-fixed-top',
                offset: 51
            })

            // Closes the Responsive Menu on Menu Item Click
            $('.navbar-collapse ul li a').click(function() {
                $('.navbar-toggle:visible').click();
            });

            // Fit Text Plugin for Main Header
            $("h1").fitText(
                1.2, {
                    minFontSize: '35px',
                    maxFontSize: '65px'
                }
            );

            // Offset for Main Navigation
            $('#mainNav').affix({
                offset: {
                    top: 100
                }
            });

            // Initialize WOW.js Scrolling Animations
            new WOW().init();

        })(jQuery);
        // End of use strict

        $scope.height = $window.innerHeight;
        $scope.changeView = function(view){
            $location.path(view);
        };
        $('.header').height($scope.height - 200);



});
/**
 * Created by Zone24x7 on 7/9/2014.
 */
