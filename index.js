const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
const mysql = require('mysql');

// Configurando o body parser para pegar POSTS
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'ok' }));

// ===== Rotas users ===== //
// Rota users raiz
app.use('/', router);
router.get('/users', (req, res) => {
  execSQLQuery('SELECT * FROM users', res);
})

// Rota users especifico GET
router.get('/users/:username?', (req, res) => {
  let filter = '';
  if (req.params.username) filter = ' WHERE username =\'' + req.params.username + '\'';
  execSQLQuery('SELECT * FROM users' + filter, res);
})

// Rota users POST, insert
router.post('/users', (req, res) => {
  const username = req.body.username.substring(0, 40);
  execSQLQuery(`INSERT INTO users(username) VALUES('${username}')`, res);
});

// Rota para update
router.patch('/users/:username', (req, res) => {
  const username = req.params.username;
  const newusername = req.body.username.substring(0, 40);
  execSQLQuery(`UPDATE users SET username = '${newusername}' WHERE username = '${username}'`, res);
})

// Rota users DELETE
router.delete('/users/:username', (req, res) => {
  execSQLQuery('DELETE FROM users WHERE username = \'' + req.params.username + '\'', res);
})

// ===== Rotas post_its ===== //
// Rota post_its raiz
app.use('/', router);
router.get('/post_its', (req, res) => {
  execSQLQuery('SELECT * FROM post_its', res);
})

// Rota post_its especifico GET
router.get('/post_its/:id?', (req, res) => {
  let filter = '';
  if (req.params.id) filter = ' WHERE id =\'' + parseInt(req.params.id) + '\'';
  execSQLQuery('SELECT * FROM post_its' + filter, res);
})

// Rota post_its POST, insert
router.post('/post_its', (req, res) => {
  const content = req.body.content.substring(0, 100);
  const progress = parseInt(req.body.progress);
  const username = req.body.username.substring(0, 40);
  execSQLQuery(`INSERT INTO post_its(content, progress, username) 
                VALUES('${content}','${progress}','${username}')`, res);
});

// Rota para update
router.patch('/post_its/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const content = req.body.content.substring(0, 100);
  const progress = parseInt(req.body.progress);
  const username = req.body.username.substring(0, 40);
  execSQLQuery(`UPDATE post_its SET content='${content}',progress='${progress}', username='${username}'
                WHERE id=${id}`, res);
})

// Rota post_its DELETE
router.delete('/post_its/:id', (req, res) => {
  execSQLQuery('DELETE FROM post_its WHERE id = ' + parseInt(req.params.id), res);
})

// Inicia o servidor
app.listen(port);
console.log('API funcionando!');

function execSQLQuery(sqlQry, res) {
  const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'phpmyadmin',
    password: 'root',
    database: 'kanban'
  });

  connection.query(sqlQry, function (error, results, fields) {
    if (error)
      res.json(error);
    else
      res.json(results);
    connection.end();
    console.log('executou!');
  });
}