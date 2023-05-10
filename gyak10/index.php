<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>

    <style>
        body {
            background-color: powderblue;
        }

        form {
            display: block;
            width: 140px;
        }

        form.label {
            margin: 12px;
        }

        .container {
            align-items: center;
            justify-content: center;
        }

        .wrapper {
            display: block;
            width: 70px;
        }
    </style>
</head>

<body>

    <div class="container">
        <form method="POST" action="index.php">
            <label for="color">Name:</label>
            <input type="text" name="color" id="color" />
            <button type="submit">Submit</button>
        </form>

        <div class="wrapper">
            <a href="?color=blue">Blue</a>
            <a href="?color=yellow">Yellow</a>
            <a href="?color=red">Red</a>
        </div>
    </div>

</body>

</html>