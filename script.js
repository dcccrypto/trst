document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-links') && !e.target.closest('.mobile-menu-toggle')) {
                navLinks.classList.remove('active');
            }
        });
    }

    // Ticker animation
    const ticker = document.querySelector('.ticker');
    if (ticker) {
        ticker.innerHTML += ticker.innerHTML;
    }
});
