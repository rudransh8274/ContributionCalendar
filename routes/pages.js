const express=require('express');
var bodyParser= require('body-parser');
const { decodeBase64 } = require('bcryptjs');
const mysql = require('mysql');
var urlencodedParser=bodyParser.urlencoded({extended:false});

const router=express.Router();

const db = mysql.createConnection({
    host: process.env.Database_host,
    user: process.env.Database_user,
    password: process.env.Database_password,
    database: process.env.Database
});


router.get('/',urlencodedParser,(req,res)=>{
    res.render("index");
});
router.get('/viewCalendar',urlencodedParser,(req,res)=>{
    res.render("viewCalender");
});
router.get('/auth/viewCalendar',urlencodedParser,(req,res)=>{
    res.render("viewCalendar");
});
module.exports=router;