<?php
session_start();

$link = $_SERVER['REQUEST_URI'];

include 'pdo.php';

$query = 'SELECT p.id, p.name, u.username, p.tracks
          FROM playlists AS p LEFT JOIN users AS u ON (p.createdBy = u.id)
          WHERE (p.isPublic = :isPublic)';
$values = [':isPublic' => 1];

try {
    $res = $pdo->prepare($query);
    $res->execute($values);
} catch (PDOException $e) {
    echo 'Query error.';
}

$publicPlaylists = $res->fetchAll(PDO::FETCH_ASSOC);

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
    <div id="topMenuBar">
        <h1><a class="nostyle" href="/">Winampify</a></h1>
        <span>A web app to create and share playlists</span>
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

    <div id="searchDiv">
        <input type="search" name="search" id="searchInput">
        <button type="button">Search</button>
    </div>

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