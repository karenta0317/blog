const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.Promise = Promise;
require('./model/helper.js');

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

// set up view engine
app.engine('html', require('ejs').renderFile);

app.set('views', 'views');
app.set('view engine', 'html');

// set routes
app.use('/', require('./routes/home'));
app.use('/api', require('./routes/api'));


const port = process.env.PORT || 3000;
app.listen(port);

