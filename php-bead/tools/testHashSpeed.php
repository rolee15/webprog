<?php

/* 100 ms. */
$time = 0.1;
/* Initial cost. */
$cost = 10;
/* Loop until the time required is more than 100ms. */
do
{
  /* Increase the cost. */
  $cost++;

  /* Check how much time we need to create the hash. */
  $start = microtime(true);
  password_hash('test', PASSWORD_BCRYPT, ['cost' => $cost]);
  $end = microtime(true);
}
while (($end - $start) < $time);
echo 'Cost found: ' . $cost . "\n";
