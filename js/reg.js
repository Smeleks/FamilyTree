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
        event.preventDefault(); // Остановить стандартную отправку формы

        const password = document.querySelector('input[name="password"]').value;
        const confirmPassword = document.querySelector('input[name="confirm_password"]').value;
        const errorMessage = document.getElementById('input-error');
        errorMessage.classList.add('hidden');

        // Проверка длины пароля
        if (password.length < 8) {
            errorMessage.textContent = "Password must be at least 8 characters long.";
            errorMessage.classList.remove('hidden');
            return; // Останавливаем выполнение, если пароль слишком короткий
        }

        // Проверка на совпадение паролей
        if (password !== confirmPassword) {
            errorMessage.textContent = "Passwords do not match.";
            errorMessage.classList.remove('hidden');
            return; // Останавливаем выполнение, если пароли не совпадают
        }

        const formData = new FormData(form);

        fetch('php/reg.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                errorMessage.textContent = data.error;
                errorMessage.classList.remove('hidden'); // Показываем сообщение об ошибке
            } else if (data.success) {
                alert(data.success); // Можете заменить на что-то другое, например, перенаправление
            }
        })
        .catch(error => {
            console.error('Error:', error);
            errorMessage.textContent = `An error occurred: ${error.message}`;
            errorMessage.classList.remove('hidden'); // Показываем сообщение об ошибке
        });
    });
});