<?php
include 'session.php';
include 'database.php';

$publicPlaylists = $db->getPublicPlaylists();
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Winampify</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <? include 'components/indexTopMenuBarComponent.php' ?>

    <? include 'components/searchComponent.php' ?>

    <div id="publicPlaylists">
        <h2>Public playlists</h2>
        <table>
            <tr>
                <th>Name</th>
                <th>Number of tracks</th>
                <th>Created by</th>
                <th>Link</th>
            </tr>
            <?php
            foreach ($publicPlaylists as $playlist) {
                $tracks = json_decode($playlist['tracks']);
                $link = '<a href="/playlist.php?id=' . $playlist['id'] . '">Link</a>';

                echo '<tr>';
                echo '<td>' . $playlist['name'] . '</td>';
                echo '<td>' . count($tracks) . '</td>';
                echo '<td>' . $playlist['username'] . '</td>';
                echo '<td>' . $link . '</td>';
                echo '</tr>';
            }
            ?>
        </table>
    </div>
</body>

</html>