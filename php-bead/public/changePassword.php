<?php

/* Username. */
$username = $_GET['username'];
/* New password. */
$newPassword = $_GET['new_password'];
/* Confirm password. */
$confirmPassword = $_GET['confirm_password'];
if (strcmp($newPassword, $confirmPassword) !== 0) {
  echo 'Password doesn\'t match.';
  die();
}
/* Secure password hash. */
$hash = password_hash($newPassword, PASSWORD_BCRYPT, ['cost' => 12]);

/* Include the database connection script. */
include 'pdo.php';
/* Get id of user */
$query = 'SELECT * FROM users WHERE (username = :username)';
/* Values array for PDO. */
$values = [':username' => $username];
/* Execute the query */
try
{
  $res = $pdo->prepare($query);
  $res->execute($values);
}
catch (PDOException $e)
{
  /* Query error. */
  echo 'Query error.';
  die();
}
$row = $res->fetch(PDO::FETCH_ASSOC);
/* If there is a result, check if the password matches using password_verify(). */
if (!is_array($row))
{
  echo 'User doesn\'t exist.';
  die();
}
$id = $row['id'];

/* Update query template. */
$query = 'UPDATE users SET password = :password WHERE id = :id';
/* Values array for PDO. */
$values = [':password' => $hash, ':id' => $id];
/* Execute the query. */
try
{
  $res = $pdo->prepare($query);
  $res->execute($values);
}
catch (PDOException $e)
{
  /* Query error. */
  echo 'Query error.';
  die();
}

?>
