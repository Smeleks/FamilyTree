document.addEventListener('DOMContentLoaded', function () {
    const nextStep1Button = document.getElementById('next-step-1');

    if (nextStep1Button) {
        nextStep1Button.addEventListener('click', function (event) {
            const selectedGenderElement = document.querySelector('.gender .selected'); // Элемент, у которого выбранный пол
            const gender = selectedGenderElement ? selectedGenderElement.textContent.trim().toLowerCase() : ''; // Получаем текст выбранного гендера

            const userData = {
                gender: gender,
                first_name: document.querySelector('input[name="first_name"]').value,
                middle_name: document.querySelector('input[name="middle_name"]').value,
                last_name: document.querySelector('input[name="last_name"]').value,
                birth_day: document.querySelector('input[name="day"]').value,
                birth_month: document.querySelector('input[name="month"]').value,
                birth_year: document.querySelector('input[name="year"]').value,
                email: document.querySelector('input[name="email"]').value,
                password: document.querySelector('input[name="password"]').value
            };

            sessionStorage.setItem('userData', JSON.stringify(userData));
        });
    }

    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();

            const userData = JSON.parse(sessionStorage.getItem('userData'));
            const formData = new FormData(form);
            Object.keys(userData).forEach(key => formData.append(key, userData[key]));

            fetch('php/register.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                // console.log(data);
            })
            .catch(error => console.error('Error:', error));
        });
    }
});