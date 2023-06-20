<?php
include 'session.php';
include 'database.php';

unset($_SESSION['error_message']);
$username = $_SESSION['user'] ?? '';
$oldPassword = $_POST['oldPassword'] ?? '';
$newPassword = $_POST['newPassword'] ?? '';
$confirmPassword = $_POST['confirmPassword'] ?? '';
$justRegistered = $_GET['registerSuccess'] ?? '';

if (empty($newPassword) || strlen($newPassword) < 6) {
    $_SESSION['error_message'] = 'New password must be at least 6 characters long.';
} else if (strcmp($newPassword, $confirmPassword) !== 0) {
    $_SESSION['error_message'] = "New password doesn't match.";
}

if (!isset($_SESSION['error_message'])) {
    $db->changePassword($username, $oldPassword, $newPassword);
}
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
    <? include 'components/topMenuBarComponent.php' ?>

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
        } else if ($_SERVER['REQUEST_METHOD'] === 'GET' && $justRegistered) {
            echo '<span>Registration successful. Log in with your new credentials.</span>';
        }
    }
    ?>

    <?php if (!isset($_SESSION['user'])) {
        echo '<p>Log in to change your password.</p>';
    }
    ?>

</body>

</html>