document.addEventListener('DOMContentLoaded', function() {
    // Demo Button Call Functionality for the main demo button
    const demoButton = document.getElementById('demo-button');
    if (demoButton) {
        demoButton.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor behavior
            // Initiate a phone call using the tel: URI scheme
            window.location.href = 'tel:+4974768959987';
            
            // Optional: Add analytics or tracking here if needed
            console.log('Call initiated to +4974768959987 from main demo button'); 
        });
    }
    
    // Demo Button Call Functionality for the "Demo anfordern" button in the next-steps section
    const nextStepsContainer = document.querySelector('.next-steps-cta-container');
    if (nextStepsContainer) {
        const demoRequestButton = nextStepsContainer.querySelector('.cta-button');
        if (demoRequestButton) {
            demoRequestButton.addEventListener('click', function(e) {
                e.preventDefault(); // Prevent default anchor behavior
                // Initiate a phone call using the tel: URI scheme
                window.location.href = 'tel:+4974768959987';
                
                // Optional: Add analytics or tracking here if needed
                console.log('Call initiated to +4974768959987 from Demo anfordern button'); 
            });
        }
    }

    // Burger Menu Logic
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            // Toggle Nav
            nav.classList.toggle('nav-active');

            // Animate Links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });

            // Burger Animation
            burger.classList.toggle('toggle');
        });
    }

    // Close nav when a link is clicked (optional, good for SPA feel)
    if (navLinks.length > 0 && nav && burger) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                    navLinks.forEach(innerLink => {
                        innerLink.style.animation = ''; // Reset animation
                    });
                }
            });
        });
    }

});
