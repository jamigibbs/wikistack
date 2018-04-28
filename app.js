const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const models = require('./models');
const layout = require('./views/layout');

const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');

app.use(morgan('dev'));

const staticMiddleware = express.static(path.join(__dirname, 'public'));
app.use(staticMiddleware);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

models.db.authenticate().
  then( () => {
    console.log('Connected to the database');
  });

app.get('/', function (req, res, next) {
  res.redirect('/wiki');
});

app.use('/wiki', wikiRouter);
app.use('/user', userRouter);

async function init(){
  try {
    await models.db.sync({force: false});
  } catch (e){
    console.log('An error happened:', e.message);
  }

  const PORT = process.env.PORT || 3000;

  app.listen(PORT, function() {
   console.log(`Listening on port ${PORT}`);
  });
}

init();
