<?php

/* Include the database connection script. */
include 'pdo.php';
/* Username. */
$username = 'John';
/* Password. */
$password = 'my secret password';
/* Secure password hash. */
$hash = password_hash($password, PASSWORD_BCRYPT, ['cost' => 12]);
/* Insert query template. */
$query = 'INSERT INTO accounts (account_name, account_passwd) VALUES (:name, :passwd)';
/* Values array for PDO. */
$values = [':name' => $username, ':passwd' => $hash];
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