const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const { db } = require('./models');
const layout = require('./views/layout');

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

app.listen(5432, function() {
 console.log('Listeting in port 5432');
})

