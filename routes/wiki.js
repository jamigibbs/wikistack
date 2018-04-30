const express = require('express');
const router = express.Router();
const { addPage, main } = require('../views');
const { Page, User } = require('../models');
const wikiPageView = require('../views/wikipage');

router.get('/', async (req, res, next) => {
  try {
    const pages = await Page.findAll();
    res.send(main(pages));
  } catch (err) {
    next(err);
  }
});

router.post('/',  async (req, res, next) => {
  const page = new Page(req.body);

  try {
    const arr = await User.findOrCreate({
      where: {
        name: req.body.name,
        email: req.body.email
      }
    });

    const user = arr[0]; // {id: 1, name: 'Cody', etc...}
    const wasCreated = arr[1]; // bool

    await page.save();
    page.setAuthor(user);
    res.redirect(`/wiki/${page.slug}`);
  } catch (err) { next(err); }
});

router.get('/add', (req, res, next) => {
  res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    });
    const author = await page.getAuthor();

    res.send(wikiPageView(page, author));
  } catch (err){
    next(err);
  }

});

module.exports = router;
