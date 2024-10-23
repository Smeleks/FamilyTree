document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.form');
    const errorMessage = document.querySelector('.input-error');
    const passwordToggle = document.querySelector('.password-toggle');
    const passwordInput = document.querySelector('input[name="password"]');

    passwordToggle.addEventListener('click', function () {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            passwordToggle.classList.remove('ri-eye-line');
            passwordToggle.classList.add('ri-eye-close-line');
        } else {
            passwordInput.type = "password";
            passwordToggle.classList.remove('ri-eye-close-line');
            passwordToggle.classList.add('ri-eye-line');
        }
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(form);

        fetch('php/login.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                errorMessage.textContent = data.error;
                errorMessage.classList.remove('hidden');
            } else if (data.success) {
                window.location.href = 'user_info.html';
            }
        })
        .catch(error => {
            errorMessage.textContent = 'An error occurred: ' + error.message;
            errorMessage.classList.remove('hidden');
        });
    });
});