<?php

$host = $_ENV['DB_HOST'];
$port = $_ENV['DB_PORT'];
$schema = $_ENV['DB_DATABASE'];
$user = $_ENV['DB_USERNAME'];
$passwd = $_ENV['DB_PASSWORD'];

$pdo = NULL;
$dsn = 'mysql:host=' . $host . ';port=' . $port . ';dbname=' . $schema;

try {
   $pdo = new PDO($dsn, $user,  $passwd);
   $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
   echo 'Database connection failed.';
   die();
}
