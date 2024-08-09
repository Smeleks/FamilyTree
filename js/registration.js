document.querySelector('.next-btn').addEventListener('click', function (event) {
    let forms = document.querySelectorAll('.form');
    let allValid = true;

    forms.forEach(function (form) {
        // Если форма помечена как необязательная, пропускаем её проверку
        if (form.hasAttribute('data-optional')) {
            return;
        }

        let inputs = form.querySelectorAll('input[required]');
        let genderSelected = form.querySelector('.gender .black');

        // Проверка всех обязательных полей ввода
        inputs.forEach(function (input) {
            if (!input.value) {
                input.classList.add('red');
                allValid = false;
            } else {
                input.classList.remove('red');
            }
        });

        // Проверка выбора пола
        if (!genderSelected) {
            form.querySelectorAll('.gender i, .gender span').forEach(el => {
                el.classList.add('red-text');
            });
            allValid = false;
        } else {
            form.querySelectorAll('.gender i, .gender span').forEach(el => {
                el.classList.remove('red-text');
            });
        }
    });

    if (!allValid) {
        event.preventDefault(); 
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('.form');

    forms.forEach(form => {
        const genderLabels = form.querySelectorAll('.gender label');

        genderLabels.forEach(label => {
            label.addEventListener('click', function() {
                genderLabels.forEach(l => {
                    l.querySelector('i').classList.remove('black', 'red-text');
                    l.querySelector('span').classList.remove('black', 'red-text');
                });

                label.querySelector('i').classList.add('black');
                label.querySelector('span').classList.add('black');

                console.log('Selected gender:', label.querySelector('span').textContent);
            });
        });
    });
});
