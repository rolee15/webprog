<?php

$username = $_POST['username'];
$newPassword = $_POST['new_password'];
$confirmPassword = $_POST['confirm_password'];

if (strcmp($newPassword, $confirmPassword) !== 0) {
  echo 'Password doesn\'t match.';
  die();
}

$hash = password_hash($newPassword, PASSWORD_BCRYPT, ['cost' => 12]);

include 'pdo.php';

$query = 'SELECT * FROM users WHERE (username = :username)';
$values = [':username' => $username];

try {
  $res = $pdo->prepare($query);
  $res->execute($values);
} catch (PDOException $e) {
  echo 'Query error.';
  die();
}

$row = $res->fetch(PDO::FETCH_ASSOC);
if (!is_array($row)) {
  echo 'User doesn\'t exist.';
  die();
}

$id = $row['id'];
$query = 'UPDATE users SET password = :password WHERE id = :id';
$values = [':password' => $hash, ':id' => $id];

try {
  $res = $pdo->prepare($query);
  $res->execute($values);
} catch (PDOException $e) {
  echo 'Query error.';
  die();
}
