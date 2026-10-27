const express = require('express');
const session = require('express-session');
const app = express();

app.use(session({ secret: 'demo-secret', resave: false, saveUninitialized: false }));

const accounts = {
  1: { owner: 'alice', balance: 5000 },
  2: { owner: 'bob',   balance: 9000 }
};

app.get('/login/:username', (req, res) => {
  req.session.username = req.params.username;
  res.send('logged in as ' + req.params.username);
});

app.get('/account/:id', (req, res) => {
  if (!req.session.username) return res.status(401).send('login required');

  const account = accounts[req.params.id];
  if (!account) return res.status(404).send('not found');

  res.json(account);
});

app.listen(3000, () => console.log('listening on 3000'));

// mod 1