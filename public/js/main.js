
/*====================================
	* Template Name		: Etherino | NFT HTML Marketplace
	* Author						: themetum
	* Version					: 1.0.0
	* Created					: 30 Oct, 2021
	* File Description		: JS Files
=====================================*/

(function ($) {
	"use strict";
	
	// preloader
	function preloader() {
		$('#preloader').delay(0).fadeOut();
	};

	$(window).on('load', function () {
		preloader();
	});
	 
	$(document).ready(function() {
	  $('.video-play-btn').magnificPopup({
		  type:'video',
		  });		
	});

// ------------------------------------------------------------------------------ //
// Toggle Profile
// ------------------------------------------------------------------------------ //
	
	$(".header-transparent.sticky .action-nav").each(function(){  
		$(".img-otr", this).on("click", function(e){
			e.preventDefault();
			$(".profile-pop-otr").slideToggle();
		});
	});		 
	
//Mobile Menu 

/*=====| 2. Responsive Menu |=====*/

	  // main menu 
	  $('.main-menu-icon').click(function() {
		$('.menu').toggleClass('menu-open');
		$('.main-menu-icon').toggleClass('icon-cross');
		$('.menu ul').slideToggle();
		$('ul ul').css('display', 'none');
	  });
	  // Submenu
	  $('.menu ul li.has-children').click(function() {
		$(this).find('ul').slideToggle();
		$(this).siblings().find('ul').slideUp();
	  });

	  $(window).resize(function() {
		if($(window).width() > 1199) {
			$('ul').removeAttr('style');
		}
	  });



// scroll effect

$(window).on('scroll', function () {
	var scroll = $(window).scrollTop();
	if (scroll < 245) {
		$(".header-transparent").removeClass("sticky-bar");
	} else {
		$(".header-transparent").addClass("sticky-bar");
	}
});


// New Product Carousel	
$('.owl-carousel.new-proslider').owlCarousel({
    loop:true,
    margin:10,
    responsiveClass:true,
    responsive:{
        0:{
            items:1,
            nav:true
        },
        768:{
            items:2,
            nav:true
        },
        1200:{
            items:3,
            loop:true,
            nav:true	
        }
    }
});

// Live Auction Page Carousel	

	$('.owl-carousel.explore_slider').owlCarousel({
		loop:true,
		margin:10,
		dots:true,				
		responsiveClass:true,	
		responsive:{
			0:{
				items:1,
				nav:true
			},
			768:{
				items:1,
				nav:true
			},
			1200:{
				items:1,
				loop:true,
				nav:true	
			}
		}
	});

// Authors Slider
	  
	$('.slick-slider-authors').slick({
		dots: false,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 10000,
		slidesToShow: 4,
		slidesToScroll: 2,
		prevArrow: '<i class="prev-arrow bx bx-left-arrow-alt"></i>',
		nextArrow: '<i class="next-arrow bx bx-right-arrow-alt"></i>',		
		responsive: [
			{
			  breakpoint:1200,
			  settings: {
				slidesToShow: 3,
				slidesToScroll: 2,
				infinite: true,
				dots: false,
				nav: true
			  }
			},
			{
			  breakpoint: 991,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 2
			  }
			},
			{
			  breakpoint: 660,
			  settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			  }
			}
		]
	});  
	
// Collection slider
	  
	$('.slick-slider-area').slick({
		dots: false,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 10000,
		slidesToShow: 3,
		slidesToScroll: 2,
		prevArrow: '<i class="prev-arrow bx bx-left-arrow-alt"></i>',
		nextArrow: '<i class="next-arrow bx bx-right-arrow-alt"></i>',		
		responsive: [
			{
			  breakpoint:1200,
			  settings: {
				slidesToShow: 3,
				slidesToScroll: 2,
				infinite: true,
				dots: false,
				nav: true
			  }
			},
			{
			  breakpoint:1050,
			  settings: {
				slidesToShow: 2,
				slidesToScroll: 1
			  }
			},
			{
			  breakpoint:767,
			  settings: {
				slidesToShow: 1,
				slidesToScroll: 1
			  }
			}
		]
	});  

//Collection popup

	$(".item-popup").magnificPopup({
		type: "image",
		closeOnContentClick: !0,
		mainClass: "mfp-fade",
		gallery: {
			enabled: !0,
			navigateByImgClick: !0,
			preload: [0, 1]
		}
	}),	
	
//counter

	$('.counter_text').appear(function() {
		$('.counter-to').countTo();
	}, {
		accY: -100
	});

	/* ==================================================
		Contact Form Validations
	================================================== */

		$(function() {

			// Get the form.
			var form = $('#contact-form');

			// Get the messages div.
			var formMessages = $('.form-message');

			// Set up an event listener for the contact form.
			$(form).submit(function(e) {
				// Stop the browser from submitting the form.
				e.preventDefault();

				// Serialize the form data.
				var formData = $(form).serialize();

				// Submit the form using AJAX.
				$.ajax({
					type: 'POST',
					url: $(form).attr('action'),
					data: formData
				})
				.done(function(response) {
					// Make sure that the formMessages div has the 'success' class.
					$(formMessages).removeClass('error');
					$(formMessages).addClass('success');

					// Set the message text.
					$(formMessages).text(response);

					// Clear the form.
					$('#contact-form input,#contact-form textarea').val('');
				})
				.fail(function(data) {
					// Make sure that the formMessages div has the 'error' class.
					$(formMessages).removeClass('success');
					$(formMessages).addClass('error');

					// Set the message text.
					if (data.responseText !== '') {
						$(formMessages).text(data.responseText);
					} else {
						$(formMessages).text('Oops! An error occured and your message could not be sent.');
					}
				});
			});

		});		
	
// -----------------------------------------------------
	// ------------------   CURSOR    ----------------------
	// -----------------------------------------------------

	function mim_tm_cursor(){

		var myCursor	= jQuery('.mouse-cursor');

		if(myCursor.length){
			if ($("body")) {
			const e = document.querySelector(".cursor-inner"),
				t = document.querySelector(".cursor-outer");
			let n, i = 0,
				o = !1;
			window.onmousemove = function (s) {
				o || (t.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)"), e.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)", n = s.clientY, i = s.clientX
			}, $("body").on("mouseenter", "a, .cursor-pointer", function () {
				e.classList.add("cursor-hover"), t.classList.add("cursor-hover")
			}), $("body").on("mouseleave", "a, .cursor-pointer", function () {
				$(this).is("a") && $(this).closest(".cursor-pointer").length || (e.classList.remove("cursor-hover"), t.classList.remove("cursor-hover"))
			}), e.style.visibility = "visible", t.style.visibility = "visible"
		}
		}
	};
	mim_tm_cursor()

	/*------------------------
	   Scroll to top
	-------------------------- */
	$(function () {
			$(window).on('scroll', function(){
				if ($(this).scrollTop() > 400) {
					$('#back-to-top').fadeIn();
				} else {
					$('#back-to-top').fadeOut();
				}
			});
			});
			
	$('#back-to-top').on("click", function() {
		$('html, body').animate({scrollTop:0}, 'slow');
		return false;
	});
	

})(jQuery)	

	
	
	
	
	
	
	
	
	