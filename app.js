const express=require('express');
const path=require('path');
const mysql=require('mysql');
const dotenv=require('dotenv');
const cookieParser=require('cookie-parser');
const session=require('express-session');
const wbm = require('wbm');
var bodyParser= require('body-parser');
const schedule = require('node-schedule');
const nodemailer = require('nodemailer');
const cron = require('node-cron');

var urlencodedParser=bodyParser.urlencoded({extended:false});

dotenv.config({path:'./.env'});
const app=express();

app.use(session({
    secret: 'abcdefghijklmnopqr'
}));


const db=mysql.createConnection({
    host: process.env.Database_host,
    user: process.env.Database_user,
    password: process.env.Database_password,
    database: process.env.Database
});

//test Static
    app.use(express.static('public'))
    const staticPath=path.join(__dirname,"public");
    console.log(staticPath);
    app.use('/css',express.static(__dirname + 'public'))
    app.use('/javascript',express.static(__dirname + 'public'))
    app.use('/images',express.static(__dirname + 'public'))


app.use(express.urlencoded({extended:false}));

app.use(express.json());

app.use(cookieParser());


app.set('view engine','hbs');

db.connect((error)=>{
    if(error)
    {
        console.log(error);
    }
    else{
        console.log("MySQL Connected...");
    }
});

//Definign routes
app.use('/',require('./routes/pages'));
app.use('/auth',require('./routes/auth'));

const PORT=process.env.PORT || 3020;

app.listen(PORT,()=>{
    console.log(`Server started at port ${PORT}`);
});