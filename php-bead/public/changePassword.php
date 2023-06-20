<?php

$username = $_SESSION['user'] ?? '';
$oldPassword = $_POST['oldPassword'] ?? '';
$newPassword = $_POST['newPassword'] ?? '';
$confirmPassword = $_POST['confirmPassword'] ?? '';

if (empty($newPassword) || strlen($newPassword) < 6) {
  $_SESSION['error_message'] = 'New password must be at least 6 characters long.';
} else if (!password_verify($oldPassword, $user['password'])) {
  $_SESSION['error_message'] = 'Old password is incorrect.';
} else if (strcmp($newPassword, $confirmPassword) !== 0) {
  $_SESSION['error_message'] = "New password doesn't match.";
} else {

  $hash = password_hash($newPassword, PASSWORD_BCRYPT, ['cost' => 12]);

  $id = $user['id'];
  $query = 'UPDATE users SET password = :password WHERE id = :id';
  $values = [':password' => $hash, ':id' => $id];

  try {
    $res = $pdo->prepare($query);
    $res->execute($values);
  } catch (PDOException $e) {
    echo 'Error during updating password.';
    die();
  }
}
