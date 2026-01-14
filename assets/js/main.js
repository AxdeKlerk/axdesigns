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
    const forms = document.querySelectorAll("form[action*='formspree.io']");

    forms.forEach(function (form) {
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
                if (form.id === "order-form") {
                    window.location.href = "/order-confirmation.html";
                } else {
                    window.location.href = "/thank-you.html";
                }
            }).catch(() => {
                alert("There was a problem sending the form. Please try again.");
            });
        });
    });
});




