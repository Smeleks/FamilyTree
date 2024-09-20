document.addEventListener('DOMContentLoaded', function () {
    // Gender Unselect Function
    function GenderUnselect(genderLabels) {
        genderLabels.forEach(label => {
            label.querySelector('i').classList.remove('black', 'red-text');
            label.querySelector('span').classList.remove('black', 'red-text');
        });
    }

    // Gender Selection Function
    function GenderSelect(label) {
        label.querySelector('i').classList.add('black');
        label.querySelector('span').classList.add('black');
    }

    // Gender Selection Click Handler
    const forms = document.querySelectorAll('.form');

    forms.forEach(form => {
        const genderLabels = form.querySelectorAll('.gender label');

        genderLabels.forEach(label => {
            label.addEventListener('click', function () {
                const isSelected = label.querySelector('i').classList.contains('black');

                // Reset Selection for current form only
                GenderUnselect(genderLabels);

                if (!isSelected) {
                    // New Gender Selection
                    GenderSelect(label);
                }

            });
        });

        // Deceased Checkbox Handler
        // const deceasedCheckbox = form.querySelector('.deceased input[type="checkbox"]');
        // const deathDateDiv = form.querySelector('.death-date');
        // const deathDateInputs = deathDateDiv ? deathDateDiv.querySelectorAll('input') : [];

        // if (deceasedCheckbox && deathDateDiv) {
        //     deceasedCheckbox.addEventListener('change', function () {
        //         if (this.checked) {
        //             deathDateDiv.classList.remove('hidden');
        //             // Mark death date inputs as required
        //             deathDateInputs.forEach(input => {
        //                 input.setAttribute('required', 'required');
        //             });
        //         } else {
        //             deathDateDiv.classList.add('hidden');
        //             // Remove required attribute from death date inputs
        //             deathDateInputs.forEach(input => {
        //                 input.removeAttribute('required');
        //             });
        //         }
        //     });
        // }
    });

    // "Next" Buttons Handler
    document.querySelectorAll('.next-btn').forEach(button => {
        button.addEventListener('click', function (event) {
            let forms = document.querySelectorAll('.form');
            let allValid = true;

            forms.forEach(function (form) {
                if (form.hasAttribute('data-optional')) {
                    return;
                }

                let inputs = form.querySelectorAll('input[required]');
                let genderSelected = form.querySelector('.gender .black');
                // const deceasedCheckbox = form.querySelector('.deceased input[type="checkbox"]');
                // const deathDateInputs = form.querySelectorAll('.death-date input');

                inputs.forEach(function (input) {
                    if (!input.value) {
                        input.classList.add('red');
                        allValid = false;
                    } else {
                        input.classList.remove('red');
                    }
                });

                // Validate birth date inputs
                validateDateInputs(form, '.b-day', '.b-month', '.b-year');

                // Validate death date inputs if the deceased checkbox is checked
                // if (deceasedCheckbox && deceasedCheckbox.checked) {
                //     validateDateInputs(form, '.d-day', '.d-month', '.d-year', true);
                // }

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

            const passwordInput = document.querySelector('input[name="password"]');
            const confirmPasswordInput = document.querySelector('input[name="confirm_password"]');
            const errorSpan = document.querySelector('.input-error');
            let passwordsMatch = true;

            if (passwordInput && confirmPasswordInput) {
                if (passwordInput.value !== confirmPasswordInput.value) {
                    errorSpan.classList.remove('hidden');
                    errorSpan.textContent = "Passwords don't match!";
                    passwordsMatch = false;
                } else {
                    errorSpan.classList.add('hidden');
                    errorSpan.textContent = "";
                }
            }

            if (!allValid || !passwordsMatch) {
                event.preventDefault();
            }
        });
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            const nextButton = document.querySelector('.next-btn');
            if (nextButton) {
                nextButton.click();
            }
        }
    });

    // Password Switch Handler  
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

    // Function to validate date inputs (birth date and death date)
    function validateDateInputs(form, daySelector, monthSelector, yearSelector, isDeathDate = false) {
        let dayInput = form.querySelector(daySelector);
        let monthInput = form.querySelector(monthSelector);
        let yearInput = form.querySelector(yearSelector);

        if (dayInput && monthInput && yearInput) {
            const day = parseInt(dayInput.value, 10);
            const month = parseInt(monthInput.value, 10);
            const year = parseInt(yearInput.value, 10);

            if (isNaN(day) || day < 1 || day > 31 || dayInput.value.match(/\D/)) {
                dayInput.classList.add('red');
                allValid = false;
            } else {
                dayInput.classList.remove('red');
            }

            if (isNaN(month) || month < 1 || month > 12 || monthInput.value.match(/\D/)) {
                monthInput.classList.add('red');
                allValid = false;
            } else {
                monthInput.classList.remove('red');
            }

            if (isNaN(year) || year > 2025 || yearInput.value.match(/\D/)) {
                yearInput.classList.add('red');
                allValid = false;
            } else {
                yearInput.classList.remove('red');
            }

            // Additional checks for day limits based on month and leap year
            if (month === 2 && day > 29) {
                dayInput.classList.add('red');
                allValid = false;
            } else if ([4, 6, 9, 11].includes(month) && day > 30) {
                dayInput.classList.add('red');
                allValid = false;
            } else if (day > 31) {
                dayInput.classList.add('red');
                allValid = false;
            }
        }
    }
});