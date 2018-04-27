const express = require('express');
const router = express.Router();
const addPage = require('../views/addPage');

router.get('/', (req, res, next) => {
  res.send('made it to wiki route')
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
})

router.post('/', (req, res, next) => {
  res.send('something posted on the wiki page');
})

module.exports = router;
