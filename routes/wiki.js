const express = require('express');
const router = express.Router();
const addPage = require('../views/addPage');
const { Page } = require("../models");
const util = require('../util');

router.get('/', (req, res, next) => {
  res.send('made it to wiki route')
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
})

router.post('/',  async (req, res, next) => {
  const bodyContent = await res.json(req.body)

  // TODO: Create slug; title
  const slug = util.createSlug(bodyContent.req.body.title);

  const page = new Page({
    title: bodyContent.req.body.title,
    content: bodyContent.req.body.content
  });

  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise.
  try {
    await page.save();
    res.redirect('/');
  } catch (error) { next(error) }

})

module.exports = router;
