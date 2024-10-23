<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["error" => "User not logged in."]);
    exit;
}

require 'db_connect.php';

$user_id = $_SESSION['user_id'];

$stmt = $conn->prepare("SELECT * FROM users WHERE id = ?");
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["error" => "User not found."]);
} else {
    $user = $result->fetch_assoc();
    echo json_encode([
        "first_name" => $user['first_name'],
        "middle_name" => $user['middle_name'],
        "last_name" => $user['last_name'],
        "email" => $user['email'],
        "day" => $user['day'],
        "month" => $user['month'],
        "year" => $user['year']
    ]);
}

$stmt->close();
$conn->close();
?>