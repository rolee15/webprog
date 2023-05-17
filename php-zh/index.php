<?php
$games = [
    [
        "name" => "The Witcher 3",
        "releaseYear" => 2015,
        "sales" => 40000000,
        "publisher" => "CD Projekt",
    ],
    [
        "name" => "Minecraft",
        "releaseYear" => 2011,
        "sales" => 238000000,
        "publisher" => "Xbox Game Studios",
    ],
    [
        "name" => "Tetris (EA)",
        "releaseYear" => 2006,
        "sales" => 100000000,
        "publisher" => "Electronic Arts",
    ],
    [
        "name" => "The Legend of Zelda: Breath of the Wild",
        "releaseYear" => 2017,
        "sales" => 31510000,
        "publisher" => "Nintendo",
    ],
    [
        "name" => "Tetris (EA)",
        "releaseYear" => 2006,
        "sales" => 100000000,
        "publisher" => "Electronic Arts",
    ],
];

if (isset($_GET["sort"]) && ($_GET["sort"] === "name" || $_GET["sort"] === "release")) {
    $sortArray = array();
    foreach ($games as $game) {
        foreach ($game as $key => $value) {
            if (!isset($sortArray[$key])) {
                $sortArray[$key] = array();
            }
            $sortArray[$key][] = $value;
        }
    }
    $orderby = $_GET["sort"] === "release" ? "releaseYear" : "name";
    array_multisort($sortArray[$orderby], SORT_ASC, $games);
}

$form_success = false;
if (isset($_POST["name"]) && $_POST["name"] !== "" && isset($_POST["releaseYear"]) && $_POST["releaseYear"] !== "") {
    array_push(
        $games,
        array(
            "name" => $_POST["name"],
            "releaseYear" => $_POST["releaseYear"],
            "sales" => isset($_POST["sales"]) ? $_POST["sales"] : "",
            "publisher" => isset($_POST["publisher"]) ? $_POST["publisher"] : ""
        )
    );
    $form_success = true;
}

?>

<!DOCTYPE html>
<meta charset="UTF-8">
<title>Game Inventory</title>
<link rel="stylesheet" href="style.css" />

<table>
    <caption>
        An Absolutely Non-Exhaustive Game Inventory
    </caption>
    <thead>
        <tr>
            <th>Name</th>
            <th>Release Year</th>
            <th>Publisher</th>
            <th>Number of Copies Sold</th>
        </tr>
    </thead>
    <tbody>
        <?php
        foreach ($games as $game) {
            echo "<tr>";
            echo "<td>{$game['name']}</td>";
            echo "<td>{$game['releaseYear']}</td>";
            echo "<td>{$game['sales']}</td>";
            echo "<td>{$game['publisher']}</td>";
            echo "</tr>\n";
        }
        ?>
    </tbody>
</table>

<form action="" method="POST">
    Name: <input type="text" name="name"><br>
    Release Year: <input type="number" name="releaseYear"><br>
    Publisher: <input type="text" name="publisher"><br>
    Number of Copies Sold: <input type="number" name="sales"><br>
    <button type="submit">Send</button>
</form>
<?php if (!$form_success)
    echo "Please provide name and release year." ?>

    <form action="">
        <button type="submit" name="load">Load Data</button>
        <button type="submit" name="export">Save Data</button>
    </form>