// Add this function at the top
function handleScriptError(error) {
    console.error('Script loading error:', error);
    // Show error message in UI
    document.body.innerHTML += `
        <div style="position: fixed; bottom: 20px; right: 20px; background: #ff4444; color: white; padding: 10px; border-radius: 5px; z-index: 9999;">
            Failed to load some resources. Please refresh the page.
        </div>
    `;
}

// Add structured data for SEO
function addStructuredData() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "$ucky Panther",
        "alternateName": "$uckyP",
        "url": "https://yourwebsite.com",
        "logo": "https://yourwebsite.com/images/suckypanther_Logo-removebg-preview.png",
        "sameAs": [
            "https://x.com/SuckySOLPanther",
            "https://t.me/sukypantherportal",
            "https://tiktok.com/graspingcrypto"
        ],
        "description": "Join the $ucky Panther ($uckyP) community on Solana blockchain. Exclusive rewards, viral memes, massive gains potential."
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);
}

// Update script loading
document.addEventListener('DOMContentLoaded', function() {
    addStructuredData();
    Promise.all([
        loadComponent('header', 'components/header.html'),
        loadComponent('footer', 'components/footer.html')
    ]).catch(handleScriptError);
});

// Function to load HTML components
async function loadComponent(elementId, componentPath) {
    try {
        console.log(`Loading component: ${componentPath}`); // Debug log
        
        // Remove window.location.origin from URL construction since componentPath is relative
        const url = `${componentPath}?v=${new Date().getTime()}`;
        const response = await fetch(url, {
            headers: {
                'Accept': 'text/html',
                'Cache-Control': 'no-cache'
            }
            // Remove credentials since we're loading local files
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const html = await response.text();
        const targetElement = document.getElementById(elementId);
        
        if (!targetElement) {
            throw new Error(`Element with id "${elementId}" not found`);
        }
        
        // Remove component-loading class before setting innerHTML
        targetElement.classList.remove('component-loading');
        targetElement.innerHTML = html;
        
        // Reinitialize any necessary JavaScript for the component
        if (elementId === 'header') {
            initializeHeader();
        } else if (elementId === 'footer') {
            initializeFooter();
        }
        
        console.log(`Successfully loaded component: ${componentPath}`); // Debug log
    } catch (error) {
        console.error(`Error loading component: ${componentPath}`, error);
        // Show error in the UI and remove loading state
        const targetElement = document.getElementById(elementId);
        if (targetElement) {
            targetElement.classList.remove('component-loading');
            if (elementId === 'header') {
                targetElement.innerHTML = `
                    <nav class="navbar">
                        <div class="nav-left">
                            <div class="logo">$uckyP</div>
                        </div>
                        <div class="nav-links">
                            <a href="index.html">Home</a>
                        </div>
                    </nav>`;
            } else if (elementId === 'footer') {
                targetElement.innerHTML = '<footer class="contact"><p>© 2024 $ucky Panther</p></footer>';
            }
        }
    }
}

// Header specific initialization
function initializeHeader() {
    console.log('Initializing header...'); // Debug log
    
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
    
    console.log('Header initialized'); // Debug log
}

// Footer specific initialization
function initializeFooter() {
    console.log('Footer initialized'); // Debug log
} 