const express = require('express');
const router = express.Router();

router.get('/', async (req, res, next) => {
  res.send('made it to user route')
});

module.exports = router;
