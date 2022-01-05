const express=require('express');
var bodyParser= require('body-parser');
const session=require('express-session');

var urlencodedParser=bodyParser.urlencoded({extended:false});

const authController=require('../controllers/auth');
const router=express.Router();

router.post('/viewCalendar', authController.viewCalendar); 


module.exports=router;