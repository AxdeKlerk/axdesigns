console.log('Formspree interceptor loaded');


// Close mobile navbar after clicking same-page anchor and drop-down item links links
document.querySelectorAll('#navbarNav a').forEach(link => {
    link.addEventListener('click', function () {

        const navbar = document.getElementById('navbarNav');
        if (!navbar || !navbar.classList.contains('show')) return;

        // Do nothing for dropdown toggles
        if (this.classList.contains('dropdown-toggle')) {
            return;
        }

        // Same-page anchors: scroll first, then close
        if (this.getAttribute('href')?.startsWith('#')) {
            setTimeout(() => {
                const collapse = bootstrap.Collapse.getInstance(navbar);
                if (collapse) collapse.hide();
            }, 50);
            return;
        }

        // All other links: close immediately
        const collapse = bootstrap.Collapse.getInstance(navbar);
        if (collapse) collapse.hide();
    });
});

document.addEventListener('submit', async event => {
    const form = event.target.closest('form');

    if (!form || !form.hasAttribute('data-formspree')) return;

    event.preventDefault();

    try {
        const response = await fetch(form.action, {
            method: form.method || 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            window.location.href = '/thank-you.html';
        } else {
            alert('Something went wrong. Please try again.');
        }
    } catch (error) {
        console.error('Form submission failed:', error);
        alert('Network error. Please try again.');
    }
});


