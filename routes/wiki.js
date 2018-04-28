const express = require('express');
const router = express.Router();
const { addPage } = require('../views');
const { Page } = require('../models');

router.get('/', (req, res, next) => {
  res.send('made it to wiki route')
});

router.post('/',  async (req, res, next) => {
  const bodyContent = await res.json(req.body);

  const page = new Page({
    title: bodyContent.req.body.title,
    content: bodyContent.req.body.content,
    slug: bodyContent.req.body.title,
    status: bodyContent.req.body.status
  });

  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise.
  try {
    const newPost = await page.save();

    console.log('Post Submitted: ', newPost.dataValues);

    res.redirect('/');
    res.end();
  } catch (error) { next(error); }

});

router.get('/add', (req, res, next) => {
  res.send(addPage());
});

module.exports = router;
