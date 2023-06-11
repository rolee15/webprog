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