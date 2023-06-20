<?php
session_start();

$link = $_SERVER['REQUEST_URI'] ?? '';
$username = $_SESSION['user'] ?? '';
unset($_SESSION['error_message']);

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
    $_SESSION['error_message'] = 'User not found.';
}

include 'changePassword.php';

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Winampify - Change password</title>
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


    <?php
    if (isset($_SESSION['user'])) {
        echo
        '<form action="password.php" method="post">
            <div>
                <span>Old password: </span>
                <input type="password" name="oldPassword" id="oldPasswordInput">
            </div>
            <div>
                <span>New password: </span>
                <input type="password" name="newPassword" id="newPasswordInput">
            </div>
            <div>
                <span>Confirm password: </span>
                <input type="password" name="confirmPassword" id="confirmPasswordInput">
            </div>
            <button type="submit">Change password</button>
        </form>';
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            if (isset($_SESSION['error_message'])) {
                echo '<span style="color: red">' . $_SESSION['error_message'] . '</span>';
            } else {
                echo '<span style="color: green">Password changed successfully.</span>';
            }
        }
    }
    ?>

    <?php if (!isset($_SESSION['user'])) {
        echo '<p>Log in to change your password.</p>';
    }
    ?>

</body>

</html>