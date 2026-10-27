const express = require('express');
const session = require('express-session');
const app = express();

app.use(session({ secret: 'demo-secret', resave: false, saveUninitialized: true }));

const accounts = {
  1: { owner: 'alice', balance: 5000 },
  2: { owner: 'bob', balance: 9000 }
};

app.get('/login/:userId', (req, res) => {
  req.session.userId = req.params.userId;
  res.set('Content-Type', 'text/plain');
  res.send('logged in as ' + req.params.userId);
});

app.get('/account/:id', (req, res) => {
  if (!req.session.userId) return res.status(401).send('login required');
  const account = accounts[req.params.id];
  if (!account) return res.status(404).send('not found');
  if (account.owner !== req.session.userId) return res.status(403).send('forbidden');
  res.json(account);
});

app.listen(3000, () => console.log('listening on 3000'));
