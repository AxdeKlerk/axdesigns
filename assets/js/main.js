// Handle Bootstrap modal close behaviour when triggered from mobile navbar
document.addEventListener('hidden.bs.modal', function () {
    const navbar = document.getElementById('navbarNav');

    // Ensure navbar is fully closed
    if (navbar && navbar.classList.contains('show')) {
        const collapse = bootstrap.Collapse.getInstance(navbar);
        if (collapse) {
            collapse.hide();
        }
    }

    // Do NOT force focus back to the navbar toggler
});

console.log("main.js loaded");

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector('form');

    if (!form || !form.action.includes("formspree.io")) return;

     form.addEventListener("submit", function () {
        setTimeout(function () {
            window.location.href = "/thank-you.html";
        }, 500);
    });
});


