<?php

$username = $_POST['username'];
$email = $_POST['email'];
$password = $_POST['password'];
$confirmPassword = $_POST['confirm_password'];
$isAdmin = $_POST['is_admin'];

if (strcmp($password, $confirmPassword) !== 0) {
  echo 'Password doesn\'t match.';
  die();
}

$hash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);

include 'pdo.php';

$query = 'INSERT INTO users (username, email, password, isAdmin) VALUES (:username, :email, :password, :isAdmin)';
$values = [':username' => $username, ':email' => $email, ':password' => $hash, ':isAdmin' => $isAdmin];

try {
  $res = $pdo->prepare($query);
  $res->execute($values);
} catch (PDOException $e) {
  echo 'Query error';
  die();
}

echo 'Success.';
