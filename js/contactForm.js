document.querySelector(".contact-form").addEventListener("input", function () {
    const name = document.getElementById("contact-name").value;
    const email = document.getElementById("contact-email").value;
    const message = document.getElementById("contact-message").value;
    const submitButton = document.getElementById("contact-submit");

    if (name && email && message) {
        submitButton.removeAttribute("disabled");
    } else {
        submitButton.setAttribute("disabled", "true");
    }
});
