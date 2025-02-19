<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["error" => "User not logged in."]);
    exit;
}

require 'db_connect.php';

$user_id = $_SESSION['user_id'];

$stmt = $conn->prepare("SELECT first_name, last_name, email, day, month, year, middle_name FROM users WHERE id = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["error" => "User not found."]);
} else {
    $user = $result->fetch_assoc();
    $response = [
        "first_name" => $user['first_name'],
        "last_name" => $user['last_name'],
        "email" => $user['email'],
        "day" => $user['day'],
        "month" => $user['month'],
        "year" => $user['year']
    ];

    if (!empty($user['middle_name']) && $user['middle_name'] !== "0") {
        $response["middle_name"] = $user['middle_name'];
    }

    header('Content-Type: application/json');
    echo json_encode($response);
}

$stmt->close();
$conn->close();
?>