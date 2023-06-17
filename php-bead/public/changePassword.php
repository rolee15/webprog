<?php

/* New password. */
$password = $_POST['password'];
/* Remember to validate the password. */
/* Create the new password hash. */
$hash = password_hash($password, PASSWORD_BCRYPT, ['cost' => $cost]);


/* Include the database connection script. */
include 'pdo.php';
/* ID of the account to edit. */
$accountId = 1;
/* Update query template. */
$query = 'UPDATE accounts SET account_passwd = :passwd WHERE account_id = :id';
/* Values array for PDO. */
$values = [':passwd' => $hash, ':id' => $accountId];
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
