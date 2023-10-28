require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');  //to get all the data in body(postman)
const db = require('./config/connection');
const router = require('./routes/user');


const PORT = process.env.PORT || 9000; 

app.use(bodyParser.json());  //to convert data from body into Json form
app.use(express.static('public'));  //statically using the public library of express

app.use('/user',router); // givig main path to routers routes

app.listen(PORT,()=>{
    console.log(`PORT is listening at http://localhost:${PORT}`);
})



