const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();

const staticMiddleware = express.static(path.join(__dirname, 'public'));
app.use(staticMiddleware);

app.listen(3000, function() {
 console.log('Listeting in port 3000');
})
