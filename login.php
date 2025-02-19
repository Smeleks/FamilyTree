<?php
session_start();

if (isset($_SESSION['user_id'])) {

    header("Location: map.html");
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/x-icon" href="img/FamilyTreeLogo.ico">
    <title>Family Tree | Sign In</title>
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/reg.css">
    <link href="https://cdn.jsdelivr.net/npm/remixicon@3.2.0/fonts/remixicon.css" rel="stylesheet">
</head>

<body>
    <section class="reg-container">
        <div>
            <img class="reg-logo" src="img/FamilyTreeLogo.png" alt="Family Tree Logo" style="margin-bottom: 20px;">
        </div>

        <!-- <div class="steps" style="margin-top: 30px;">
            <p class="steps-text"> <span class="black">Sign In</span></p>
        </div> -->

        <form class="form">
            <h3>Log In</h3>
            <div class="name">
                <input type="email" name="email" placeholder="Email" class="people-input last-name" required> <br>
                <div class="password-container">
                    <input type="password" name="password" placeholder="Password" class="people-input last-name" required>
                    <i class="ri-eye-line password-toggle"></i>
                </div>
                <span class="input-error hidden"></span>
            </div>
            <button type="submit" class="next-btn">Sign In</button>
        </form>
        
    </section>

    <script src="js/login.js"></script>
</body>

</html>