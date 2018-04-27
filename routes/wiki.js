const express = require('express');
const router = express.Router();
const addPage = require('../views/addPage');

router.get('/', (req, res, next) => {
  res.send('made it to wiki route')
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
})

router.post('/',  async (req, res, next) => {
 const bodyContent = await req.body
//  res.send(bodyContent);
console.log(bodyContent.title)


})

module.exports = router;
