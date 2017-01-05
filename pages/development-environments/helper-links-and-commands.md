# Helpers

## Docker

- Inside project laradock-* folder, to start server:
```cmd
docker-compose up -d apache2 mysql phpmyadmin
```

- To stop the server:
```cmd
docker-compose stop
```

- To list all running docker containers:
```cmd
docker ps
```

- To ssh/bash in to a container (replace CONTAINER_ID_ID with first 3 characters of container id from docker ps):
```cmd
docker exec -it CONTAINER_ID bash
```

## Links

- Drumeo Dev Website
```html
http://dev.drumeo.com/
```

- Pianote Dev Website
```html
http://dev.pianote.com/
```

- Drumeo PhpMyAdmin (server: *leave empty* | username: root | password: root)
```html
http://localhost:8080/
```

- Pianote PhpMyAdmin (server: *leave empty* | username: root | password: root)
```html
http://localhost:8081/
```

## Docker Advanced

- To stop ALL docker containers:
```cmd
FOR /f "tokens=*" %i IN ('docker ps -q') DO docker stop %i
```

- To delete ALL docker containers:
```cmd
FOR /f "tokens=*" %i IN ('docker ps -a -q') DO docker rm %i
```

- To delete ALL docker images:
```cmd
FOR /f "tokens=*" %i IN ('docker images -q') DO docker rmi %i
```

- To delete ALL docker volumes (databases and stuff):
```cmd
FOR /f "tokens=*" %i IN ('docker volume ls -q') DO docker volume remove %i
```