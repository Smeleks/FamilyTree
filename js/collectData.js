document.addEventListener('DOMContentLoaded', function () {
    const nextStep1Button = document.getElementById('next-step-1');
    const nextStep2Button = document.getElementById('next-step-2-1');

    // Шаг 1: Сбор данных о пользователе
    if (nextStep1Button) {
        nextStep1Button.addEventListener('click', function (event) {
            const userData = {
                gender: document.querySelector('.gender .black') ? document.querySelector('.gender .black').textContent : null,
                first_name: document.querySelector('input[name="first_name"]').value,
                middle_name: document.querySelector('input[name="middle_name"]').value,
                last_name: document.querySelector('input[name="last_name"]').value,
                birth_day: document.querySelector('input[name="day"]').value,
                birth_month: document.querySelector('input[name="month"]').value,
                birth_year: document.querySelector('input[name="year"]').value,
                email: document.querySelector('input[name="email"]').value,
                password: document.querySelector('input[name="password"]').value
            };

            // Сохраняем данные в sessionStorage
            sessionStorage.setItem('userData', JSON.stringify(userData));
        });
    }

    // Шаг 2: Сбор данных о родителях
    if (nextStep2Button) {
        nextStep2Button.addEventListener('click', function (event) {
            const parentsData = {
                father: {
                    gender: 'male',
                    first_name: document.querySelectorAll('input[name="first_name"]')[0].value,
                    middle_name: document.querySelectorAll('input[name="middle_name"]')[0].value,
                    last_name: document.querySelectorAll('input[name="last_name"]')[0].value,
                    birth_day: document.querySelectorAll('input[name="day"]')[0].value,
                    birth_month: document.querySelectorAll('input[name="month"]')[0].value,
                    birth_year: document.querySelectorAll('input[name="year"]')[0].value,
                },
                mother: {
                    gender: 'female',
                    first_name: document.querySelectorAll('input[name="first_name"]')[1].value,
                    middle_name: document.querySelectorAll('input[name="middle_name"]')[1].value,
                    last_name: document.querySelectorAll('input[name="last_name"]')[1].value,
                    birth_day: document.querySelectorAll('input[name="day"]')[1].value,
                    birth_month: document.querySelectorAll('input[name="month"]')[1].value,
                    birth_year: document.querySelectorAll('input[name="year"]')[1].value,
                }
            };

            // Сохраняем данные родителей в sessionStorage
            sessionStorage.setItem('parentsData', JSON.stringify(parentsData));
        });
    }
});