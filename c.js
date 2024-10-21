(function ($) {
	"use strict";
	var nav = $('nav');
  var navHeight = nav.outerHeight();
  
  $('.navbar-toggler').on('click', function() {
    if( ! $('#mainNav').hasClass('navbar-reduce')) {
      $('#mainNav').addClass('navbar-reduce');
    }
  })
   //  scroll event listener
   window.addEventListener('scroll', function() {
    var navbar = document.getElementById('mainNav');
    
    // Check if the page has been scrolled more than 50px
    if (window.scrollY > 50) {
      navbar.classList.add('navbar-reduce');
      navbar.classList.remove('navbar-trans');
    } else {
      navbar.classList.remove('navbar-reduce');
      navbar.classList.add('navbar-trans');
    }
  });
  // Preloader
  $(window).on('load', function () {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function () {
        $(this).remove();
      });
    }
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function(){
    $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
    return false;
  });

	/*--/ Star ScrollTop /--*/
	$('.scrolltop-mf').on("click", function () {
		$('html, body').animate({
			scrollTop: 0
		}, 1000);
	});

	/*--/ Star Counter /--*/
	$('.counter').counterUp({
		delay: 15,
		time: 2000
	});

	/*--/ Star Scrolling nav /--*/
	$('a.js-scroll[href*="#"]:not([href="#"])').on("click", function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: (target.offset().top - navHeight + 5)
				}, 1000, "easeInOutExpo");
				return false;
			}
		}
	});

	// Closes responsive menu when a scroll trigger link is clicked
	$('.js-scroll').on("click", function () {
		$('.navbar-collapse').collapse('hide');
	});

	// Activate scrollspy to add active class to navbar items on scroll
	$('body').scrollspy({
		target: '#mainNav',
		offset: navHeight
	});
	/*--/ End Scrolling nav /--*/

	/*--/ Navbar Menu Reduce /--*/
	$(window).trigger('scroll');
	$(window).on('scroll', function () {
		var pixels = 50; 
		var top = 1200;
		if ($(window).scrollTop() > pixels) {
			$('.navbar-expand-md').addClass('navbar-reduce');
			$('.navbar-expand-md').removeClass('navbar-trans');
		} else {
			$('.navbar-expand-md').addClass('navbar-trans');
			$('.navbar-expand-md').removeClass('navbar-reduce');
		}
		if ($(window).scrollTop() > top) {
			$('.scrolltop-mf').fadeIn(1000, "easeInOutExpo");
		} else {
			$('.scrolltop-mf').fadeOut(1000, "easeInOutExpo");
		}
	});

	/*--/ Star Typed /--*/
	if ($('.text-slider').length == 1) {
    var typed_strings = $('.text-slider-items').text();
		var typed = new Typed('.text-slider', {
			strings: typed_strings.split(','),
			typeSpeed: 80,
			loop: true,
			backDelay: 1100,
			backSpeed: 30
		});
	}

	/*--/ Testimonials owl /--*/
	$('#testimonial-mf').owlCarousel({
		margin: 20,
		autoplay: true,
		autoplayTimeout: 4000,
		autoplayHoverPause: true,
		responsive: {
			0: {
				items: 1,
			}
		}
	});
   // Add this to your existing JavaScript file (c.js)
$(document).ready(function() {
    // Form submission handling
    $('#cf').submit(function(e) {
        e.preventDefault();
        
        // Get form
        const form = $(this);
        const submitButton = form.find('button[type="submit"]');
        
        // Validate form
        if (!validateForm()) {
            return false;
        }
        
        // Disable submit button and show loading state
        submitButton.prop('disabled', true);
        submitButton.html('Sending...');
        
        // Send form data using Formspree
        $.ajax({
            url: form.attr('action'),
            method: 'POST',
            data: form.serialize(),
            dataType: 'json',
            success: function(response) {
                // Show success message
                $('#sendmessage').fadeIn().html('Thank you! Your message has been sent successfully.');
                
                // Reset the form
                form.trigger('reset');
                
                // Hide error message if it was shown
                $('#errormessage').fadeOut();
                
                // Scroll to success message
                $('html, body').animate({
                    scrollTop: $('#sendmessage').offset().top - 100
                }, 1000);
            },
            error: function(xhr, status, error) {
                // Show error message
                $('#errormessage').fadeIn().html('Oops! There was a problem sending your message. Please try again.');
                
                // Hide success message if it was shown
                $('#sendmessage').fadeOut();
            },
            complete: function() {
                // Re-enable submit button
                submitButton.prop('disabled', false);
                submitButton.html('Send Message');
            }
        });
    });
    
    // Form validation function
    function validateForm() {
        const name = $('#name').val();
        const email = $('#email').val();
        const subject = $('#subject').val();
        const message = $('#message').val();
        
        if (name.length < 4) {
            $('#errormessage').fadeIn().html('Name must be at least 4 characters long');
            return false;
        }
        
        if (!isValidEmail(email)) {
            $('#errormessage').fadeIn().html('Please enter a valid email address');
            return false;
        }
        
        if (subject.length < 4) {
            $('#errormessage').fadeIn().html('Subject must be at least 4 characters long');
            return false;
        }
        
        if (message.length < 10) {
            $('#errormessage').fadeIn().html('Message must be at least 10 characters long');
            return false;
        }
        
        return true;
    }
    
    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Clear error messages on input
    $('#cf input, #cf textarea').on('input', function() {
        $('#errormessage').fadeOut();
        $('#sendmessage').fadeOut();
    });
});

})(jQuery);
