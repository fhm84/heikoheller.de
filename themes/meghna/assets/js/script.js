/* ========================================================================= */
/*	Page Preloader
/* ========================================================================= */

$(window).on('load', function () {
	$('.preloader').fadeOut(100);
});

jQuery(function ($) {
	"use strict";

	/* ========================================================================= */
	/*	Magnific popup
	/* =========================================================================  */
	$('.image-popup').magnificPopup({
		type: 'image',
		removalDelay: 160, //delay removal by X to allow out-animation
		callbacks: {
			beforeOpen: function () {
				// just a hack that adds mfp-anim class to markup
				this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
				this.st.mainClass = this.st.el.attr('data-effect');
			}
		},
		closeOnContentClick: true,
		midClick: true,
		fixedContentPos: false,
		fixedBgPos: true
	});

	/* ========================================================================= */
	/*	Portfolio Filtering Hook
	/* =========================================================================  */

	var containerElPortfolio = document.querySelector('.shuffle-wrapper');
	var portfolioShuffle;
	if (containerElPortfolio) {
		var Shuffle = window.Shuffle;
		portfolioShuffle = new Shuffle(document.querySelector('.shuffle-wrapper'), {
			itemSelector: '.shuffle-item',
			buffer: 1
		});

		jQuery('input[name="shuffle-filter"]').on('change', function (evt) {
			var input = evt.currentTarget;
			if (input.checked) {
				portfolioShuffle.filter(input.value);
			}
		});
	}

	/* ========================================================================= */
    /*	Machine Filtering Hook
    /* =========================================================================  */

    var containerElMachines = document.querySelector('.machine-wrapper');
    var machineShuffle;
    if (containerElMachines) {
        var Shuffle = window.Shuffle;
        machineShuffle = new Shuffle(document.querySelector('.machine-wrapper'), {
            itemSelector: '.machine-item',
            buffer: 1
        });

        jQuery('input[name="machine-filter"]').on('change', function (evt) {
            var input = evt.currentTarget;
            if (input.checked) {
                machineShuffle.filter(input.value);
            }
        });
    }

    /* ========================================================================= */
	/*	lazy load initialize
	/* ========================================================================= */

	const observer = lozad(); // lazy loads elements with default selector as ".lozad"
	observer.observe();

	/* ========================================================================= */
	/*	Testimonial Carousel
	/* =========================================================================  */

	$("#testimonials").slick({
		infinite: true,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 4000
	});

	/* ========================================================================= */
	/*	animation scroll js
	/* ========================================================================= */



	function myFunction(x) {
		if (x.matches) {
			var topOf = 50
		} else {
			var topOf = 350
		}
	}

	var html_body = $('html, body');
	$('nav a, .page-scroll').on('click', function () { //use page-scroll class in any HTML tag for scrolling
		if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				html_body.animate({
					scrollTop: target.offset().top - 50
				}, 1500, 'easeInOutExpo');
				return false;
			}
		}
	});

	// easeInOutExpo Declaration
	jQuery.extend(jQuery.easing, {
		easeInOutExpo: function (x, t, b, c, d) {
			if (t === 0) {
				return b;
			}
			if (t === d) {
				return b + c;
			}
			if ((t /= d / 2) < 1) {
				return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
			}
			return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
		}
	});

	/* ========================================================================= */
	/*	counter up
	/* ========================================================================= */
	function counter() {
		var oTop;
		if ($('.count').length !== 0) {
			oTop = $('.count').offset().top - window.innerHeight;
		}
		if ($(window).scrollTop() > oTop) {
			$('.count').each(function () {
				var $this = $(this),
					countTo = $this.attr('data-count');
				$({
					countNum: $this.text()
				}).animate({
					countNum: countTo
				}, {
					duration: 1000,
					easing: 'swing',
					step: function () {
						$this.text(Math.floor(this.countNum));
					},
					complete: function () {
						$this.text(this.countNum);
					}
				});
			});
		}
	}

	function machines() {
	    var oTop;
        if ($('#machines').length !== 0) {
            oTop = $('#machines').offset().top - window.innerHeight;
        }
        if ($(window).scrollTop() > oTop) {
            document.body.querySelectorAll('div.machine-wrapper .img-fluid').forEach(el => observer.triggerLoad(el));
            machineShuffle.filter();
	    }
	}

	function portfolio() {
        var oTop;
        if ($('#portfolio').length !== 0) {
            oTop = $('#portfolio').offset().top - window.innerHeight;
        }
        if ($(window).scrollTop() > oTop) {
            document.body.querySelectorAll('div.portfolio-wrapper .img-fluid').forEach(el => observer.triggerLoad(el));
            portfolioShuffle.filter();
        }
    }

	$(window).on('scroll', function () {
		counter();
		machines();
		portfolio();
	});

});