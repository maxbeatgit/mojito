$(document).ready(function () {

	/* Hide/show header on scroll */

	var header = $('.header'),
		scrollPrev = 0;

	$(window).scroll(function () {
		var scrolled = $(window).scrollTop();

		if (scrolled > 10 && scrolled > scrollPrev) {
			header.addClass('header_hide');
		} else {
			header.removeClass('header_hide');
		}
		scrollPrev = scrolled;
	});
	


	/* Mobile menu */

	$('.header__mobilemenu').click(function (e) { 
		$('.mainmenu').toggleClass('mainmenu_open');
	});



	/* Catalog menu */

	// open catalog submenu
	function openCatalogSubmenu(el) {
		
		const link = $(el);
		
		// set active link
		link.siblings().removeClass('catmenu__link_active');
		link.addClass('catmenu__link_active');
		
		// open submenu
		var submenu = $('.catmenu__links_subcategory');
		var active = 'catmenu__links_active';
		var targetId = link.data('id');
		var targetSubmenu = $('.catmenu__links_subcategory[data-id="' + targetId + '"]');

		submenu.removeClass(active);
		targetSubmenu.addClass(active);
	}

	const isHoverableDevice = window.matchMedia(
		'(hover: hover) and (pointer: fine)'
	);

	// on hover
	if (isHoverableDevice.matches) {

		// open/close catalog menu
		$('.mainmenu__link_catalog').mouseenter(function () { 
			$('.mainmenu__link_catalog').css('color', '#5a656b'); 
			$('.catmenu').addClass('catmenu_open');
		});
		$('.catmenu').mouseleave(function () { 
			$('.mainmenu__link_catalog').css('color', '');
			$('.catmenu').removeClass('catmenu_open');
		});

		// open catalog submenu
		$('.catmenu__link').hover(function (e) { 
			openCatalogSubmenu(this);
		});
		
	// on click (for touch device)
	} else {

		// open/close catalog menu
		$('.mainmenu__link_catalog').click(function (e) {
			if ($('.header__mobilemenu').is(':hidden')) {
				e.preventDefault();
				$('.catmenu').toggleClass('catmenu_open');
			}
		});
		// Close after click anywhere
		$(document).on('click', function (e) {
		  if ($(e.target).closest('.catmenu, .mainmenu__link_catalog').length === 0) {
			$('.catmenu').removeClass('catmenu_open');
		  }
		});
		
		// open catalog submenu
		$('.catmenu__link').click(function (e) {
			if (!$(this).hasClass('catmenu__link_nosubmenu')) {
				e.preventDefault();
				openCatalogSubmenu(this);
			}
		});
	}




	/* Big Slider */
	
	if ($('.bigslider__slider').length > 0) {

		$('.bigslider__slider').each(function (index, element) {

			const slider = $(this);
			const dots = slider.next('.bigslider__nav').find('.bigslider__dots');

			slider.slick({
				infinite: true,
				autoplay: true,
				autoplaySpeed: 4000,
				fade: true,
				speed: 1000,
				pauseOnFocus: false,
				pauseOnHover: false,
				slidesToShow: 1,
				slidesToScroll: 1,
				spaceBetweenSlides: 30,
				arrows: false,
				dots: true,
				appendDots: dots,
			});
		});
		
	}

	// fix autoplay pause on touch
	$(document).on('touchstart', function(event) {
		
		const slider = $(event.target).closest('.slick-slider');
	 
		if (slider.length > 0 && slider.slick('slickGetOption', 'autoplay')) {
		  $(document).on('touchend', function(event) {
			 slider.slick('slickPlay');
			 $(document).off('touchend');
		  });
		}
	});
	 




	/* Merch Slider */
	
	if ($('.merch__slider').length > 0) {
		$('.merch__slider').slick({
			infinite: true,
			autoplay: true,
			autoplaySpeed: 4000,
			pauseOnFocus: false,
			slidesToShow: 4,
			slidesToScroll: 1,
			spaceBetweenSlides: 4,
			arrows: false,
			dots: false,
			responsive: [
				{
				  breakpoint: 1201,
				  settings: {
					 slidesToShow: 3,
				  }
				},
				{
					breakpoint: 861,
					settings: {
					  slidesToShow: 2,
					}
				},
				{
					breakpoint: 571,
					settings: {
					  slidesToShow: 1,
					}
				}
			 ]
		});
	}




	/* Catalog Slider */
	
	if ($('.catalog__slider').length > 0) {
		$('.catalog__slider').slick({
			infinite: true,
			autoplay: true,
			autoplaySpeed: 4000,
			pauseOnFocus: false,
			slidesToShow: 5,
			slidesToScroll: 1,
			spaceBetweenSlides: 4,
			arrows: false,
			dots: true,
			responsive: [
				{
				  breakpoint: 1201,
				  settings: {
					 slidesToShow: 4,
				  }
				},
				{
					breakpoint: 861,
					settings: {
					  slidesToShow: 3,
					}
				},
				{
					breakpoint: 571,
					settings: {
					  slidesToShow: 2,
					  spaceBetweenSlides: 16,
					  autoplay: false,
					}
				}
			 ]
		});
	}



	/* Favorite button */

	$('.favorite').click(function (e) { 
		$(this).toggleClass('favorite_active');
	});



	/* Catalog category */

	$('.catalog__category').hide();

	$('.catalog__all-button').click(function (e) { 
		e.preventDefault();
		$(this).toggleClass('catalog__all-button_open');
		$('.catalog__category').slideToggle();
	});

	$('.catalog__category-item').hover(function () {
			var height = $(this).outerHeight(true);
			$(this).css('height', height);
			$(this).addClass('catalog__category-item_hover');
		}, function () {
			$(this).css('height', '');
			$(this).removeClass('catalog__category-item_hover');
		}
	);



	/* Services slider */

	if ($('.services__list').length > 0) {
		function sliderToggle() {
			const slider = $('.services__list')
			var breakpoint = 571
			
			if ($(window).width() >= breakpoint && slider.hasClass('slick-initialized')) {
				slider.slick('unslick');
			}
			if ($(window).width() < breakpoint && slider.not('.slick-initialized')) {
				slider.not('.slick-initialized').slick({  
				infinite: true,
				slidesToShow: 1,
				slidesToScroll: 1,
				spaceBetweenSlides: 4,
				arrows: false,
				dots: false,
			});
			}
		}
		sliderToggle();
		$(window).resize(sliderToggle);
	}





	/* UP button */
	if ($(window).width() > 767) {
		$(window).scroll(function () {
			if ($(window).scrollTop() > 500) {
				$('.up').addClass('up_show');
			} else {
				$('.up').removeClass('up_show');
			}
			// останавливаем стрелку когда доходим до футера
			scrollTop = $(window).scrollTop() + $(window).height();
			footerPosition = $('.footer__body').offset().top;
			footerHeight = $('.footer__body').outerHeight(true);
			marqueeHeight = $('.marquee').outerHeight(true);
			stopTrigger = footerPosition + marqueeHeight;
			buttonPosition = footerHeight + marqueeHeight;

			if (scrollTop >= stopTrigger) {
				$('.up').css({
					'position': 'absolute',
					'bottom': 'calc(10px + ' + buttonPosition + 'px)',
				});
			} else {
				$('.up').css({
					'position': 'fixed',
					'bottom': '',
				});
			}
		});
	}

	$('.up').click(function () {
		$('body, html').animate({
			scrollTop: 0
		}, 700);
		return false;
	});




	/* Breadcrumb */

	const isTouchDevice = window.matchMedia('(pointer:coarse)');
	if (isTouchDevice.matches) {
		// open/close select
		$('.breadcrumbs__link_select').click(function (e) { 
			const item = $(this).closest('.breadcrumbs__item');
			const otherLinks = item.siblings('.breadcrumbs__item').find('.breadcrumbs__link_select');
			otherLinks.removeClass('breadcrumbs__link_select-open');
			$(this).toggleClass('breadcrumbs__link_select-open');
		});
		
		// Close after click anywhere
		$(document).on('click', function (e) {
		  if ($(e.target).closest('.breadcrumbs__link_select').length === 0) {
			 $('.breadcrumbs__link_select').removeClass('breadcrumbs__link_select-open');
		  }
		});
	}

	// уменьшаем ширину выпадающего списка, если он выходит за границы экрана
	$('.breadcrumbs__link').hover(function () {
			// over
			var $list = $(this).find('.breadcrumbs__list');
			var listOffset = $list.offset();
			var listWidth = $list.outerWidth();
			var viewportWidth = $(window).width();

			if ($list.length > 0 && listOffset.left + listWidth > viewportWidth) {
				 // Calculate the overflow amount
				 var overflowAmount = (listOffset.left + listWidth) - viewportWidth;
				 // Adjust the width of the list
				 $list.css('width', listWidth - overflowAmount - 10);
			}
			
		}, function () {
			// out
			var $list = $(this).find('.breadcrumbs__list');
			setTimeout(function () {
				$list.css('width', '');
			}, 300);
		}
	);



	/* Catalog filter */

	// reset filter
	$('.catalog__filter-reset').click(function (e) { 
		$('.catalog__filter .checkbox__input').prop('checked', false);
	});

	// open filter panel
	$('.catalog__filter-button').click(function (e) { 
		$('.catalog__filter').addClass('catalog__filter_open');
	});

	// close filter panel
	$('.catalog__filter-close').click(function (e) { 
		$('.catalog__filter').removeClass('catalog__filter_open');
	});




	
	/* Product images Slider */

	if ($('.product__bigimage').length > 0) {
		$('.product__bigimage').slick({
			infinite: true,
			slidesToShow: 1,
			slidesToScroll: 1,
			spaceBetweenSlides: 0,
			arrows: false,
			dots: false,
			fade: true,
			asNavFor: '.product__gallery',
		});
	}

	if ($('.product__gallery').length > 0) {
		$('.product__gallery').slick({
			infinite: true,
			slidesToShow: 4,
			slidesToScroll: 1,
			spaceBetweenSlides: 4,
			arrows: true,
			dots: false,
			asNavFor: '.product__bigimage',
			focusOnSelect: true,
		});
	}



	/* Product more button */

	$('.product__morebutton').click(function (e) {
		e.preventDefault();
		$(this).text(function (i, text) {
			return text === "Все характеристики" ? "Свернуть" : "Все характеристики";
		});
		$(this).toggleClass('product__morebutton_hide');
		$('.product__desc').toggleClass('product__desc_excerpt');
	});



	/* Product button show sticky cart */

	$('.product__addtocart').click(function (e) { 
		e.preventDefault();
		$('.stickycart').addClass('stickycart_show');
		if ($('.stickycart__list-item').length > 3) {
			$('.stickycart__list').addClass('stickycart__list_columns');
		}
	});

	$('.stickycart__open').click(function (e) { 
		e.preventDefault();
		$('.stickycart__list').toggleClass('stickycart__list_hide');
		$('.stickycart__title').toggleClass('stickycart__title_hide');
		$('.stickycart__more').toggleClass('stickycart__more_show');
		checkScroll();
	});



	/* Quantity */

	$('.quantity__btn').click(function (event) {
		var n = parseInt($(this).parent().find('.quantity__input').val());
		if ($(this).hasClass('quantity__btn_dwn')) {
			n = n - 1;
			if (n < 1) {n = 1;}
		} else {
			n = n + 1;
		}
		$(this).parent().find('.quantity__input').val(n);
		return false;
	});

	// set value 1 if empty
	$('.quantity__input').blur(function () { 
		var val = $(this).val();
		if (val == '' || val == 0) {
			$(this).val(1);
		}
	});



	/* Scroll overlay */
	
	const scrollList = $('.cart__list_scroll');
	const scrollOverlay = $('.cart__list-overlay');
	const hideOverlay = 'cart__list-overlay_hide';

	function checkScroll() {
		let scrollHeight = scrollList.prop('scrollHeight');
		let clientHeight = scrollList.innerHeight();
		let scrollTop = scrollList.scrollTop();
		let tolerance = 1; // погрешность для проверки

		// прячем overlay при докрутки до конца
		if (scrollTop + clientHeight >= scrollHeight) {
			scrollOverlay.addClass(hideOverlay);
		} else {
			scrollOverlay.removeClass(hideOverlay);
		}
		// прячем overlay если нет скрола
		if (scrollHeight <= clientHeight + tolerance) {
			scrollOverlay.addClass(hideOverlay);
		} 
	}
	checkScroll();
	scrollList.on('scroll', checkScroll);

});