document.addEventListener('DOMContentLoaded', function () {
    // Function to check if any field in the form is filled
    function isAnyFieldFilled(form) {
        const inputs = form.querySelectorAll('input');
        const genderSelected = form.querySelector('.gender .black');

        return Array.from(inputs).some(input => input.value.trim() !== '') || genderSelected;
    }

    // Function to toggle 'required' attribute for all inputs in a form
    function toggleRequiredAttributes(form, shouldRequire) {
        const inputs = form.querySelectorAll('input');

        inputs.forEach(input => {
            if (input.name === 'middle_name') {
                input.removeAttribute('required');
            } else if (shouldRequire) {
                input.setAttribute('required', 'required');
            } else {
                input.removeAttribute('required');
            }
        });
    }

    // Handle forms with data-optional attribute
    const optionalForms = document.querySelectorAll('.form[data-optional]');
    optionalForms.forEach(form => {
        const inputs = form.querySelectorAll('input');
        const genderLabels = form.querySelectorAll('.gender label');

        inputs.forEach(input => {
            input.addEventListener('input', function () {
                if (isAnyFieldFilled(form)) {
                    toggleRequiredAttributes(form, true);
                } else {
                    toggleRequiredAttributes(form, false);
                }
            });
        });

        genderLabels.forEach(label => {
            label.addEventListener('click', function () {
                if (isAnyFieldFilled(form)) {
                    toggleRequiredAttributes(form, true);
                } else {
                    toggleRequiredAttributes(form, false);
                }
            });
        });
    });

    // Additional code for the "Next" button to validate the forms
    document.querySelectorAll('.next-btn').forEach(button => {
        button.addEventListener('click', function (event) {
            let allValid = true;

            optionalForms.forEach(function (form) {
                const inputs = form.querySelectorAll('input[required]');
                const genderIcons = form.querySelectorAll('.gender i, .gender span');

                inputs.forEach(function (input) {
                    if (!input.value) {
                        input.classList.add('red');
                        allValid = false;
                    } else {
                        input.classList.remove('red');
                    }
                });

                // Check gender selection
                const genderSelected = form.querySelector('.gender .black');
                if (!genderSelected && isAnyFieldFilled(form)) {
                    genderIcons.forEach(el => {
                        el.classList.add('red-text');
                    });
                    allValid = false;
                } else {
                    genderIcons.forEach(el => {
                        el.classList.remove('red-text');
                    });
                }
            });

            if (!allValid) {
                event.preventDefault(); // Prevent form submission if not valid
            }
        });
    });
});
