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

        /**
         * JQUERY FUNCTION - Particles moving animation on home page
         * Added by aruniw 30/04/2016.
         */

        (function() {

            var width, height, largeHeader, canvas, ctx, circles, target, animateHeader = true;

            // Main
            initHeader();
            addListeners();

            function initHeader() {
                width = window.innerWidth;
                height = window.innerHeight;
                target = {x: 0, y: height};

                largeHeader = document.getElementById('main');
                largeHeader.style.height = height+'px';

                canvas = document.getElementById('demo-canvas');
                canvas.width = width;
                canvas.height = height;
                ctx = canvas.getContext('2d');

                // create particles
                circles = [];
                for(var x = 0; x < width*0.5; x++) {
                    var c = new Circle();
                    circles.push(c);
                }
                animate();
            }

            // Event handling
            function addListeners() {
                window.addEventListener('scroll', scrollCheck);
                window.addEventListener('resize', resize);
            }

            function scrollCheck() {
                if(document.body.scrollTop > height) animateHeader = false;
                else animateHeader = true;
            }

            function resize() {
                width = window.innerWidth;
                height = window.innerHeight;
                largeHeader.style.height = height+'px';
                canvas.width = width;
                canvas.height = height;
            }

            function animate() {
                if(animateHeader) {
                    ctx.clearRect(0,0,width,height);
                    for(var i in circles) {
                        circles[i].draw();
                    }
                }
                requestAnimationFrame(animate);
            }

            // Canvas manipulation
            function Circle() {
                var _this = this;

                // constructor
                (function() {
                    _this.pos = {};
                    init();
                    //console.log(_this);
                })();

                function init() {
                    _this.pos.x = Math.random()*width;
                    _this.pos.y = height+Math.random()*100;
                    _this.alpha = 0.1+Math.random()*0.3;
                    _this.scale = 0.1+Math.random()*0.3;
                    _this.velocity = Math.random();
                }

                this.draw = function() {
                    if(_this.alpha <= 0) {
                        init();
                    }
                    _this.pos.y -= _this.velocity;
                    _this.alpha -= 0.0005;
                    ctx.beginPath();
                    ctx.arc(_this.pos.x, _this.pos.y, _this.scale*10, 0, 2 * Math.PI, false);
                    ctx.fillStyle = 'rgba(255,255,255,'+ _this.alpha+')';
                    ctx.fill();
                };
            }

        })();

        $scope.height = $window.innerHeight;
        $scope.changeView = function(view){
            $location.path(view);
        };
        $('.header').height($scope.height - 200);



});
/**
 * Created by Zone24x7 on 7/9/2014.
 */
