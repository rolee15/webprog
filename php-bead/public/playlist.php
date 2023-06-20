<?php
include 'session.php';
include 'database.php';

$id = $_GET['id'];
$playlist = $db->getPlaylistById($id);
$tracks = $db->getPlaylistTracks($playlist);
$duration = $db->getPlaylistDuration($playlist);
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Winampify - <?= $playlist['name'] ?></title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <? include 'components/topMenuBarComponent.php' ?>

    <span>
        <h1><?= $playlist['name'] ?></h1>
    </span>
    <span><?= $playlist['isPublic'] ? 'Public' : 'Private' ?></span>
    <span style="font-weight: bold;"><?= $playlist['username'] ?></span>
    <span><?= count($tracks) . ' tracks' ?></span>
    <span>Duration: <?= $duration['total'] ?></span>

    <table>
        <tr>
            <th>#</th>
            <th>Title</th>
            <th>Artist</th>
            <th>Length</th>
            <th>Release year</th>
            <th>Genres</th>
        </tr>
        <?php
        $count = 1;
        foreach ($tracks as $track) {
            $genres = json_decode($track['genres']);
            echo '<tr>';
            echo '<td>' . $count++ . '</td>';
            echo '<td>' . $track['title'] . '</td>';
            echo '<td>' . $track['artist'] . '</td>';
            echo '<td>' . $track['length'] . '</td>';
            echo '<td>' . $track['year'] . '</td>';
            echo '<td>' . implode(', ', $genres) . '</td>';
            echo '</tr>';
        }
        ?>
    </table>
</body>

</html>