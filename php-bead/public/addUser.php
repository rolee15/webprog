<?php

/* Include the database connection script. */
include 'pdo.php';
/* Username. */
$username = $_POST['username'];
/* Email. */
$email = $_POST['email'];
/* Password. */
$password = $_POST['password'];
/* Confirm password. */
$confirmPassword = $_POST['confirm_password'];
if (strcmp($password, $confirmPassword) !== 0) {
  echo 'Password doesn\'t match.';
  die();
}
/* Is admin? */
$isAdmin = $_POST['is_admin'];
/* Secure password hash. */
$hash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);
/* Insert query template. */
$query = 'INSERT INTO users (username, email, password, isAdmin) VALUES (:username, :email, :password, :isAdmin)';
/* Values array for PDO. */
$values = [':username' => $username, ':email' => $email, ':password' => $hash, ':isAdmin' => $isAdmin];
/* Execute the query. */
try
{
  $res = $pdo->prepare($query);
  $res->execute($values);
}
catch (PDOException $e)
{
  /* Query error. */
  echo $e;
  die();
}

echo 'Success.';

?>