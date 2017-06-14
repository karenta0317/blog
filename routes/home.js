const express = require('express');

const router = express.Router();

function sendHomePage(req, res) {
  res.render('index', { layout: 'index.html' });
}

router.get('/', sendHomePage);

module.exports = router;
