require('./config/config');

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');


const app = express();

// library to get the information that is sent in a   JSON package
const bodyParser = require('body-parser');

// MIDELWARES
app.use(morgan());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json
app.use(bodyParser.json());

// ROUTES
app.use(require('./routes/routes'));

// connection to DB 
mongoose.connect('mongodb://localhost:27017/dbstore',
            {useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex:true},
                
            (err,res)=>{
            if (err) throw err;
            console.log('Connected to Db');
});

app.listen(process.env.PORT,()=>{
    console.log(`Port ${process.env.PORT} started`);
});