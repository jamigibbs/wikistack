const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

app.use(morgan('dev'));

const staticMiddleware = express.static(path.join(__dirname, 'public'));
app.use(staticMiddleware);

app.get('/', function (req, res, next) {
    res.send('Hello World');
})

app.listen(3000, function() {
 console.log('Listeting in port 3000');
})

