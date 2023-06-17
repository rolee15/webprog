# Running the application

## Step 1 - Creating an environment file
Create an .env environment file by copying the .env.example:
```
cp .env.example .env
```
Change the values in .env to whatever you want to use.

## Step 2 - Install docker
If you don't have Docker installed, install it first. Refer to your choice of AI assistant for help. :robot:

## Step 3 - Running the application
Once you have Docker installed, you can get this environment up and running with:
```
docker compose up -d
```

## Step 4 - Profit
That's it! :+1:

You can reach the application at `http://localhost:8000`. :shipit:


# Testing the application

## Database

You can browse the database with the following commands:
```
docker exec -it winampify-db mysql -u root -p
```

The command will prompt you for the root password of the mysql database. Use the value of `DB_PASSWORD` variable from the .env file.
> Enter password:

Connect to the database used by the app:
```
CONNECT winampify;
```

You can query what tables are available in the database with:
```
SHOW tables;
```

Get all rows from i.e. the `users` table:
```
SELECT * FROM users;
```

```
+----+-----------+------------------------+--------------------------------------------------------------+---------+
| id | username  | email                  | password                                                     | isAdmin |
+----+-----------+------------------------+--------------------------------------------------------------+---------+
| 12 | johndoe   | john.doe@example.com   | $2y$12$X/k0UTvWsgrkoSqROurI7unIwdfa7tBgc4tgK12qbzrKMH/siAnSG |       1 |
| 13 | janesmith | jane.smith@example.com | $2y$12$xbYF0i.gvhd0Zjx8E7z54.j/Wyr5mJ6uTp0Of3jJScexn4rdRrXFm |       0 |
+----+-----------+------------------------+--------------------------------------------------------------+---------+
2 rows in set (0.00 sec)
```

## Web

If you have *curl* installed, there are some example commands in the `test_curls.txt`
