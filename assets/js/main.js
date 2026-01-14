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
    const form = document.querySelector("form");

    if (!form || !form.action.includes("formspree.io")) return;

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(form);

        fetch(form.action, {
            method: "POST",
            body: formData,
            headers: {
                "Accept": "application/json"
            }
        }).then(() => {
            window.location.href = "/thank-you.html";
        }).catch(() => {
            alert("There was a problem sending the form. Please try again.");
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const orderForm = document.querySelector('form[action^="mailto:"]');

    if (!orderForm) return;

    orderForm.addEventListener("submit", function () {
        setTimeout(function () {
            window.location.href = "/thank-you.html";
        }, 500);
    });
});


