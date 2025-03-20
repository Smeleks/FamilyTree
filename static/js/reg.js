function selectGender(gender, label) {
    function unselectAllGenders() {
        document.querySelectorAll('.gender label').forEach(label => {
            label.querySelector('i').classList.remove('black');
            label.querySelector('span').classList.remove('black');
        });
    }

    unselectAllGenders();
    label.querySelector('i').classList.add('black');
    label.querySelector('span').classList.add('black');

    const genderInput = document.getElementById('gender-input');
    genderInput.value = gender;
}

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registration-form');
    const hiddenGenderInput = document.createElement('input');
    hiddenGenderInput.type = 'hidden';
    hiddenGenderInput.name = 'gender';
    hiddenGenderInput.id = 'gender-input';
    form.appendChild(hiddenGenderInput);

    document.querySelectorAll('.password-toggle').forEach(toggle => {
        toggle.addEventListener('click', function () {
            const passwordInput = this.previousElementSibling;

            if (passwordInput.type === "password") {
                passwordInput.type = "text";
                this.classList.remove('ri-eye-line');
                this.classList.add('ri-eye-close-line');
            } else {
                passwordInput.type = "password";
                this.classList.remove('ri-eye-close-line');
                this.classList.add('ri-eye-line');
            }
        });
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const password = document.querySelector('input[name="password"]').value;
        const confirmPassword = document.querySelector('input[name="confirm_password"]').value;
        const errorMessage = document.getElementById('input-error');
        errorMessage.classList.add('hidden');

        if (password.length < 8) {
            errorMessage.textContent = "Password must be at least 8 characters long.";
            errorMessage.classList.remove('hidden');
            return;
        }

        if (password !== confirmPassword) {
            errorMessage.textContent = "Passwords do not match.";
            errorMessage.classList.remove('hidden');
            return;
        }

        const formData = {
            first_name: document.querySelector('input[name="first_name"]').value,
            last_name: document.querySelector('input[name="last_name"]').value,
            middle_name: document.querySelector('input[name="middle_name"]').value || "",
            day: parseInt(document.querySelector('input[name="day"]').value),
            month: parseInt(document.querySelector('input[name="month"]').value),
            year: parseInt(document.querySelector('input[name="year"]').value),
            email: document.querySelector('input[name="email"]').value,
            password: password,
            gender: document.getElementById('gender-input').value
        };

        fetch('/register', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                errorMessage.textContent = data.error;
                errorMessage.classList.remove('hidden');
            } else if (data.redirect) {
                window.location.href = data.redirect;
            }
        })
        .catch(error => {
            console.error("An error occurred:", error);
            errorMessage.textContent = `An error occurred: ${error.message}`;
            errorMessage.classList.remove('hidden');
        });
    });
});