# Informações do Projeto

## Script MySQL

```sql
CREATE DATABASE IF NOT EXISTS kanban;
USE kanban;

CREATE TABLE post_its (
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    content TEXT,
    progress INTEGER,
    username VARCHAR(40)
);

CREATE TABLE users (
    username VARCHAR(40) PRIMARY KEY
);

ALTER TABLE post_its ADD CONSTRAINT FK_post_it_2
    FOREIGN KEY (username)
    REFERENCES users (username)
    ON DELETE RESTRICT;
```

## Comandos do npm usados

```bash
npm init
npm install -S mysql
npm install -S express body-parser
```

## API

### Requisições

```bash
# users
curl -X POST -d "username=Golia4s" http://localhost:3000/users #insert
curl -X POST -d "username=Pivato" http://localhost:3000/users #insert
curl -X POST -d "username=Etoo" http://localhost:3000/users #insert
curl -X PATCH -d "username=Gogo" http://localhost:3000/users/Golia4s #update
curl -X DELETE http://localhost:3000/users/Etoo #delete

# post_its
curl -X POST -d "content=Tarefa1&progress=0&username=Gogo" http://localhost:3000/post_its #insert
curl -X POST -d "content=Tarefa2&progress=1&username=Pivato" http://localhost:3000/post_its #insert
curl -X POST -d "content=Tarefa3&progress=2&username=Gogo" http://localhost:3000/post_its #insert
curl -X PATCH -d "content=TarefaX&progress=2&username=Pivato" http://localhost:3000/post_its/1 #update
curl -X DELETE http://localhost:3000/post_its/3 #delete
```

### Rotas

[http://localhost:3000/users](http://localhost:3000/users)  
[http://localhost:3000/post_its](http://localhost:3000/post_its)

## Rodar

```bash
npm install
node index.js
```