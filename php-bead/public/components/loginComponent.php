<div>
    <?php
    $link = $_SERVER['REQUEST_URI'] ?? '/';
    if (isset($_SESSION['user'])) {
        echo '<span><a href="/profile.php" class="nostyle">' . $_SESSION['user'] . '</a></span>';
        echo '<span><a href="/logout.php?redirect=' . $link . '" class="nostyle">Logout</a></span>';
    } else {
        echo '<span><a href="/login.php?redirect=' . $link . '" class="nostyle">Login</a></span>';
    }
    ?>
</div>