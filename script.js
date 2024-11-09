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
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
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
});
