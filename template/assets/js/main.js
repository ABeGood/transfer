document.addEventListener('DOMContentLoaded', function () {
    var header_navbar = document.querySelector(".navbar-area");
    if (header_navbar) {
        header_navbar.classList.add("sticky");
    }
});

(function () {

    /*=====================================
    Sticky
    ======================================= */
    window.onscroll = function () {
        var header_navbar = document.querySelector(".navbar-area");
        var sticky = header_navbar.offsetTop;

        // Always keep sticky class for visibility
        if (!header_navbar.classList.contains("sticky")) {
            header_navbar.classList.add("sticky");
        }

        // show or hide the back-top-top button
        var backToTo = document.querySelector(".scroll-top");
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            backToTo.style.display = "flex";
        } else {
            backToTo.style.display = "none";
        }
    };

    // section menu active
	function onScroll(event) {
		var sections = document.querySelectorAll('.page-scroll');
		var scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;

		for (var i = 0; i < sections.length; i++) {
			var currLink = sections[i];
			var val = currLink.getAttribute('href');
			var refElement = document.querySelector(val);
			var scrollTopMinus = scrollPos + 73;
			if (refElement.offsetTop <= scrollTopMinus && (refElement.offsetTop + refElement.offsetHeight > scrollTopMinus)) {
				document.querySelector('.page-scroll').classList.remove('active');
				currLink.classList.add('active');
			} else {
				currLink.classList.remove('active');
			}
		}
	};

    window.document.addEventListener('scroll', onScroll);
    
    // for menu scroll 
    var pageLink = document.querySelectorAll('.page-scroll');

    pageLink.forEach(elem => {
        elem.addEventListener('click', e => {
            e.preventDefault();

            // Close mobile menu if open
            const navbarCollapse = document.querySelector('.navbar-collapse');
            const navbarToggler = document.querySelector('.navbar-toggler');
            if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
                if (navbarToggler) {
                    navbarToggler.classList.remove('active');
                }
            }

            const targetId = elem.getAttribute('href');
            const targetElement = document.querySelector(targetId);


            if (targetElement) {
                // Get navbar height
                const navbar = document.querySelector('.navbar-area');
                const navbarHeight = navbar.offsetHeight - 70;

                // Adjust offset based on section - contact needs less offset
                let offset = navbarHeight;
                if (targetId === '#contact') {
                    offset = navbarHeight + 70; // Less offset for contact
                }

                // Calculate target position
                const targetPosition = targetElement.offsetTop - offset;

                // Smooth scroll to position
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    "use strict";

}) ();
