<?php
include 'session.php';
include 'database.php';

$link = $_SERVER['REQUEST_URI'] ?? '';
$username = $_SESSION['user'] ?? '';

$myPlaylists = $db->getUserPlaylists($username);

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
    <? include 'components/topMenuBarComponent.php' ?>

    <?php if (isset($_SESSION['user'])) {
        echo '<h2>User ' . $_SESSION['user'] . '</h2>';
        echo '<p><a href="/password.php">Change password</a></p>';

        echo '<div id="myPlaylists">
                <h2>My playlists</h2>
                <table>
                    <tr>
                        <th>Name</th>
                        <th>Number of tracks</th>
                        <th>Visibility</th>
                        <th>Link</th>
                    </tr>';

        foreach ($myPlaylists as $playlist) {
            $tracks = json_decode($playlist['tracks']);
            $link = '<a href="/playlist.php?id=' . $playlist['id'] . '">Link</a>';

            echo '<tr>';
            echo '<td>' . $playlist['name'] . '</td>';
            echo '<td>' . count($tracks) . '</td>';
            echo '<td>' . ($playlist['isPublic'] ? 'Public' : 'Private') . '</td>';
            echo '<td>' . $link . '</td>';
            echo '</tr>';
        }
        echo '</table>
            </div>';
    }
    ?>

    <?php if (!isset($_SESSION['user'])) echo '<p>Log in to see your profile page.</p>'; ?>
</body>

</html>