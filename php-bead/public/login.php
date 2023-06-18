<?php
session_start();
$link = $_GET['redirect'];
include 'loginUser.php';
if (isset($_SESSION['user'])) {
    header('Location: ' . $link);
}

?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Winampify - Login</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <div id="topMenuBar">
        <h1><a class="nostyle" href="/">Winampify</a></h1>
    </div>

    <form action="login.php?redirect=<?= $link ?>" method="post">
        <div>
            <span>Username: </span>
            <input type="text" name="username" id="usernameInput">
        </div>
        <div>
            <span>Password: </span>
            <input type="password" name="password" id="passwordInput">
        </div>
        <button type="submit">Login</button>

    </form>
    <?php if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        echo '<span style="color: red">Incorrect username or password!</span>';
    }
    ?>

</body>

</html>