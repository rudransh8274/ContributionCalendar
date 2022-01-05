const mysql = require('mysql');
const jwt = require('jsonwebtoken');

var bodyParser = require('body-parser');

const async = require('hbs/lib/async');
const wbm = require('wbm');
const { NULL } = require('mysql/lib/protocol/constants/types');


var urlencodedParser = bodyParser.urlencoded({ extended: false });

const db = mysql.createConnection({
    host: process.env.Database_host,
    user: process.env.Database_user,
    password: process.env.Database_password,
    database: process.env.Database
});


exports.viewCalendar = (req,res)=>{
   
    //console.log
    //let finalObj = {};
    let a = new Array(365); 
    for (let i=0; i<365; ++i) 
    {
        a[i] = 0;
    }

    var start = new Date(2022,0,01);
    var end = new Date("12/31/2022");

    var loop = new Date(start);
    var loop2 = new Date();
    //console.log('here');
    // console.log(loop);
    // console.log(start);
    // console.log('end is ',end);
    let j = 0;

    for (let i =0;i<365;i++) 
    {
                var loop2 = loop.getUTCFullYear() + '-' +
                ('00' + (loop.getUTCMonth()+1)).slice(-2) + '-' +
                ('00' + loop.getUTCDate()).slice(-2)
    
            //console.log('in loop date ',loop2);
    
            db.query('SELECT SUM(price) as summ from fruits where date = ?',[loop2],(err,response)=>{
                if(err)
                {
                    console.log(err)
                }else{
                   
                    if(!response[0].summ)
                    {
                        j++;
                        //console.log(j);
                    }else{
                        //console.log(response[0].summ);
                        a[j] = response[0].summ;
                        console.log(j);
                        j++;
                    }
                }
            })
            loop.setDate(loop.getDate() + 1);
           
    }
    console.log(a[14]);
    console.log(a[15]);
    return res.render('viewCalendar', { items : JSON.stringify(a)});
}

// exports.fetchData = (req,res)=>{

// }