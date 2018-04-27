
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const {db, Page, User} = require('./models');
const layout = require('./views/layout');

const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');

app.use(morgan('dev'));

const staticMiddleware = express.static(path.join(__dirname, 'public'));
app.use(staticMiddleware);

db.authenticate().
then( () => {
  console.log('Connected to the database');
})

app.get('/', function (req, res, next) {
  res.send(layout('We got it working!!'));
});

app.use('/wiki', wikiRouter);
app.use('/user', userRouter);

async function modelsSync(){
  try {
    await Page.sync({force: true});
    await User.sync({force: true});
  } catch (e){
    console.log('An error happened:', e.message);
  }

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, function() {
   console.log('Listeting in port 3000');
  })
}

modelsSync();
