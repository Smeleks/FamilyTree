document.addEventListener('DOMContentLoaded', function () {
    fetch('php/get_user_info.php')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
                window.location.href = 'login.php';
            } else {
                document.getElementById('user-fullname').textContent = `${data.first_name} ${data.middle_name ? data.middle_name + ' ' : ''}${data.last_name}`;
                document.getElementById('user-email').textContent = data.email;
                document.getElementById('user-dob').textContent = `${data.day}/${data.month}/${data.year}`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            window.location.href = 'login.php';
        });

    const logoutButton = document.getElementById('logout-btn');
    logoutButton.addEventListener('click', function () {
        fetch('php/logout.php', { method: 'POST' })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = 'login.php';
                } else {
                    alert('Failed to log out.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
});