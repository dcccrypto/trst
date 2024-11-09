document.addEventListener('DOMContentLoaded', function() {
    // Ticker animation
    const ticker = document.querySelector('.ticker');
    if (ticker) {
        ticker.innerHTML += ticker.innerHTML;
        ticker.addEventListener('animationend', () => {
            ticker.style.animation = 'none';
            ticker.offsetHeight;
            ticker.style.animation = null;
        });
    }

    // Mobile menu functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            const isExpanded = mobileMenuToggle.getAttribute('aria-expanded') === 'true';
            mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
            navLinks.classList.toggle('active');
        });
    }

    // Add active state to current page nav link
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentPath === linkPath || 
            (currentPath === '/' && linkPath === '/') || 
            (currentPath.endsWith(linkPath) && linkPath !== '/')) {
            link.classList.add('active');
        }
    });

    // Copy functionality
    window.copyContractAddress = function() {
        const address = document.getElementById('contract-address').textContent;
        navigator.clipboard.writeText(address).then(() => {
            const copyBtn = document.querySelector('.copy-btn');
            const copyText = copyBtn.querySelector('.copy-text');
            copyText.textContent = 'Copied!';
            setTimeout(() => {
                copyText.textContent = 'Copy';
            }, 2000);
        });
    };

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !e.target.closest('.nav-links') && 
            !e.target.closest('.mobile-menu-toggle')) {
            navLinks.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }
    });
});
