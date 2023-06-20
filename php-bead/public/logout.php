<?php
session_start();

$link = $_GET['redirect'] ?? '/';

session_destroy();
header('Location: ' . $link);
