<?php
session_start();

$link = $_SERVER['REQUEST_URI'] ?? '';
$username = $_SESSION['user'] ?? '';

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

$user = $res->fetch(PDO::FETCH_ASSOC);
if (!is_array($user)) {
    echo 'User doesn\'t exist.';
    die();
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Winampify - Profile</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <div id="topMenuBar">
        <h1><a class="nostyle" href="/">Winampify</a></h1>
        <div>
            <?php
            if (isset($_SESSION['user'])) {
                echo '<span><a href="/profile.php" class="nostyle">' . $_SESSION['user'] . '</a></span>';
                echo '<span><a href="/logout.php?redirect=' . $link . '" class="nostyle">Logout</a></span>';
            } else {
                echo '<span><a href="/login.php?redirect=' . $link . '" class="nostyle">Login</a></span>';
            }
            ?>
        </div>
    </div>

    <span>User <?= $user['username'] ?></span>
</body>

</html>