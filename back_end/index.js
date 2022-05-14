const express = require('express')
const cors = require('cors')
const router = require('./LocationRouter')
const bodyParser = require("body-parser");


const app = express();

 app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(cors());
app.use('/locations', router);


const port = process.env.PORT || 8080



app.listen(port,() => {
    console.log('App is listening')
});
