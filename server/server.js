const express = require('express');

const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
require('dotenv').config();
const path = require('path');

//Initializing app
const app = express();

//settingup database

mongoose
  .connect(
    'mongodb+srv://huzaifa51581:Khanum16@cluster0.qufyi.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => console.log('Databse connected'))
  .catch((err) => {
    console.log(err);
  });

// middlewares

app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '2mb' }));
app.use(cors());

app.use(
  cors({
    origin: ['http://localhost:8000', 'https://checkout.stripe.com'],
  })
);

// Routes middleware

app.use(express.static(path.join(__dirname, '/../client/build')));

app.get('/', (req, res) => {
  try {
    res.sendFile(path.join(`${__dirname}/../client/build/index.html`));
  } catch (e) {
    res.send('Error occured');
  }
});

fs.readdirSync('./routes').map((r) =>
  app.use('/api', require('./routes/' + r))
);

// server listening

app.listen(process.env.PORT, () => [console.log('Listening to port 8000')]);
