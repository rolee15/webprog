<?php
include 'session.php';
include 'database.php';

$link = $_SERVER['REQUEST_URI'] ?? '';
$search = $_GET['search'] ?? '';

$tracks = $db->searchTracks($search);
?>

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Winampify - Search Tracks</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <? include 'components/topMenuBarComponent.php' ?>

    <table>
        <tr>
            <th>Title</th>
            <th>Artist</th>
            <th>Length</th>
            <th>Release year</th>
            <th>Genres</th>
        </tr>
        <?php
        foreach ($tracks as $track) {
            $genres = json_decode($track['genres']);
            echo '<tr>';
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