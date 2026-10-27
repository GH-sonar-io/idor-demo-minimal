
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
  res.send('logged in as ' + req.params.userId);
});

app.get('/account/:id', (req, res) => {
  if (!req.session.userId) return res.status(401).send('login required');
  res.json(accounts[req.params.id]); // IDOR: returns any account, never checks req.session.userId === req.params.id
});

app.listen(3000, () => console.log('listening on 3000'));

//touched 1