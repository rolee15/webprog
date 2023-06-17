<?php

$login = FALSE;

$username = $_POST['username'];
$password = $_POST['password'];

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
if (is_array($row)) {
  if (password_verify($password, $row['password'])) {
    $login = TRUE;
  }
}

echo '$login=' . ($login ? 'TRUE' : 'FALSE');