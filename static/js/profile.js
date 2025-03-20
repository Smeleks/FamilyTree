document.addEventListener('DOMContentLoaded', function () {
    fetch('/get_user_info')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
                window.location.href = '/login';
            } else {
                document.getElementById('user-fullname').textContent = `${data.first_name} ${data.middle_name ? data.middle_name + ' ' : ''}${data.last_name}`;
                document.getElementById('user-email').textContent = data.email;
                document.getElementById('user-dob').textContent = `${data.day}/${data.month}/${data.year}`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            window.location.href = '/login';
        });

    const logoutButton = document.getElementById('logout-btn');
    logoutButton.addEventListener('click', function () {
        fetch('/logout', { method: 'POST' })
            .then(response => response.json())
            .then(data => {
                if (data.redirect) {
                    window.location.href = data.redirect;
                } else {
                    alert('Failed to log out.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
});