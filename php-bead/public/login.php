<?php

/* Include the database connection script. */
include 'pdo.php';
/* Login status: false = not authenticated, true = authenticated. */
$login = FALSE;
/* Username from the login form. */
$username = $_GET['username'];
/* Password from the login form. */
$password = $_GET['password'];
/* Remember to validate $username and $password. */
/* Look for the username in the database. */
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
if (is_array($row))
{
  if (password_verify($password, $row['password']))
  {
    /* The password is correct. */
    $login = TRUE;
  }
}

var_dump($login);