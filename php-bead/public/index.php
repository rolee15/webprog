<?php

include 'pdo.php';

$query = 'SELECT * FROM playlists WHERE (isPublic = :isPublic)';
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
</head>

<body>
    <h1>Winampify</h1>
    <h2>A web app to create and share playlists</h2>

    <div id="searchDiv">
        <input type="search" name="search" id="searchInput">
        <button type="button">Search</button>
    </div>

    <div id="publicPlaylists">
        <ul>
            <?php
            foreach ($publicPlaylists as $playlist) {
                echo '<li>';
                echo $playlist['name'];
                echo '</li>';
            }
            ?>
        </ul>
    </div>
</body>

</html>