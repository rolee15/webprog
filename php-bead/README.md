# Running the application

Create a .env environment file from scratch or copy the .env.example and modify that with:

```
cp .env.example .env
```

Once you have Docker and Docker Compose installed, you can get this environment up and running with:

```
docker compose build app
docker compose up -d
```

You can browse the database with the following commands

```
$ docker exec -it winampify-db mysql -u root -p
Enter password: #provide root password from .env file
mysql> connect winampify;
mysql> SELECT * FROM users;
+----+-----------+------------------------+--------------------------------------------------------------+---------+
| id | username  | email                  | password                                                     | isAdmin |
+----+-----------+------------------------+--------------------------------------------------------------+---------+
| 12 | johndoe   | john.doe@example.com   | $2y$12$X/k0UTvWsgrkoSqROurI7unIwdfa7tBgc4tgK12qbzrKMH/siAnSG |       1 |
| 13 | janesmith | jane.smith@example.com | $2y$12$xbYF0i.gvhd0Zjx8E7z54.j/Wyr5mJ6uTp0Of3jJScexn4rdRrXFm |       0 |
+----+-----------+------------------------+--------------------------------------------------------------+---------+
2 rows in set (0.00 sec)
```
