const express = require('express');
const BodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan')
const dotenv = require('dotenv')


// establishing environment variable 
dotenv.config();


// logger for incoming requests
const logger = morgan('dev', {
    // skip: function (req, res) { return res.statusCode < 400 }
})


const app = express();

// middleware
app.use(logger)


app.use(cors());
app.use(BodyParser.json());

// setting static folder to "public"
app.use(express.static('public'));

// view route
// app.use('/', routes);
app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));

// setting port
port = process.env.PORT || 8000;

// establishing server
app.listen(port, () => {
    console.log(`Listening at port ${port}`);
});