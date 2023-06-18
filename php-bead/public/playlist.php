<?php
session_start();

$link = $_SERVER['REQUEST_URI'];

$id = $_GET['id'];

include 'pdo.php';

$query = 'SELECT p.id, p.name, u.username, p.tracks, p.isPublic
          FROM playlists AS p LEFT JOIN users AS u ON (p.createdBy = u.id)
          WHERE (p.id = :id)';
$values = [':id' => $id];

try {
    $res = $pdo->prepare($query);
    $res->execute($values);
} catch (PDOException $e) {
    echo 'Query error.';
}

$playlist = $res->fetch(PDO::FETCH_ASSOC);
if (!is_array($playlist)) {
    echo 'Playlist doesn\'t exist.';
    die();
}

$trackIds = json_decode($playlist['tracks']);
$trackIdsCsv = implode(', ', $trackIds);
$query = 'SELECT * FROM tracks WHERE id IN (' . $trackIdsCsv . ')';

try {
    $res = $pdo->prepare($query);
    $res->execute();
} catch (PDOException $e) {
    echo $e;
}

$tracks = $res->fetchAll(PDO::FETCH_ASSOC);

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

    <span><?= $playlist['isPublic'] ? 'Public' : 'Private' ?> playlist</span>
    <span>
        <h1><?= $playlist['name'] ?></h1>
    </span>
    <span style="font-weight: bold;"><?= $playlist['username'] ?></span>

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