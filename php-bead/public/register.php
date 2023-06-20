<?php
include 'session.php';
include 'database.php';

unset($_SESSION['error_message']);
$username = $_POST['username'] ?? '';
$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';
$confirmPassword = $_POST['confirmPassword'] ?? '';

if (empty($username)) {
    $_SESSION['error_message'] = 'Username must not be empty.';
} else if (!preg_match('/^.+\@.+\..+/i', $email)) {
    $_SESSION['error_message'] = 'Email must be in valid format.';
} else if (strlen($password) < 6) {
    $_SESSION['error_message'] = 'Password must be at least 6 long.';
} else if (strcmp($password, $confirmPassword) !== 0) {
    $_SESSION['error_message'] = "Password doesn't match.";
}

if (!isset($_SESSION['error_message'])) {
    $db->register($username, $email, $password);
    header('Location: login.php?registerSuccess=true');
}
?>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Winampify - Register</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <? include 'components/titleComponent.php' ?>
    <span><a class="nostyle" href="login.php">Login</a></span>

    <?php
    if (!isset($_SESSION['user'])) {
        echo
        '<form action="register.php" method="post">
                <div>
                    <span>Username: </span>
                    <input type="text" name="username" id="usernameInput" value="' . $username . '" />
                </div>
                <div>
                    <span>Email: </span>
                    <input type="text" name="email" id="emailInput" value="' . $email . '" />
                </div>
                <div>
                    <span>Password: </span>
                    <input type="password" name="password" id="passwordInput">
                </div>
                <div>
                    <span>Confirm password: </span>
                    <input type="password" name="confirmPassword" id="confirmPasswordInput">
                </div>
                <button type="submit">Register</button>
            </form>';
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            if (isset($_SESSION['error_message'])) {
                echo '<span style="color: red">' . $_SESSION['error_message'] . '</span>';
            }
        }
    }
    ?>

    <?php if (isset($_SESSION['user'])) {
        echo '<p>Log out to register a new user.</p>';
    }
    ?>
</body>

</html>