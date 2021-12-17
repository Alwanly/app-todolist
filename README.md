# Backend API Aplikasi Todolist

## How to setup

1. clone repo from github.
2. copy file `.env.example` to `.env`
3. input `MYSQL_HOST`, `MYSQL_PORT` ,`MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_DBNAME`.
4. in CLI run command

```
npm install
```

## How to run  App
1. setup Project
2. install `nodemon`.
```
npm install --save-dev nodemon@latest 
```
3. run command
```
npm run dev
```

## How to run App withd Docker
1. pull docker with url.
```
dev/alwanltest:v5
```
2. run docker with command and input your database.
```
docker run -d -p 3030:3030
-e MYSQL_HOST=  
-e MYSQL_PORT=
-e MYSQL_USER=
-e MYSQL_PASSWORD=
-e MYSQL_DBNAME=
```