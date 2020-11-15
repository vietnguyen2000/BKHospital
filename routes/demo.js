const express = require('express');
const router = express.Router();
const mysql = require('../conn');
const config = require('../config');
const dbconfig = config.dbconfig;
const { check, validationResult } = require('express-validator');
const { reset } = require('nodemon');

router.get('/', (req, res)=>{
    res.render('demo/index');
})

router.get('/create', (req,res)=>{
    res.render('demo/create')
})
router.get('/allDoctor', (req,res)=>{
    var sql = "SELECT * FROM doctor;";
    mysql.query(sql, (err,result)=>{
        if (err) throw err;
        res.render('demo/allDoctor',{doctors: result})
    })

})
router.get('/schedule', (req,res)=>{
    var sql = "SELECT * FROM doctor;";
    mysql.query(sql, (err,result)=>{
        if (err) throw err;
        res.render('demo/schedule',{doctors: result})
    })

})
router.get('/findDoctor', (req,res)=>{
    var sql = "SELECT DISTINCT Faculty FROM doctor";
    mysql.query(sql,(err,result)=>{
        console.log(result);
        res.render('demo/findDoctor',{Faculty:result, theories:null});
    })
    
})


router.post('/create', (req,res)=>{
    const {Name, Faculty} = req.body.doctor;
    console.log(Name,Faculty);
    var sql = "INSERT INTO doctor (Name, Faculty) VALUES (?,?);";
    mysql.query(sql,[Name, Faculty], (err, result)=>{
        if(err){
            console.log(sql + "Failed");
            throw err;
        }
        console.log(sql + "SUCCESSFUL");
    })
    res.redirect('create');
})

router.post('/schedule',(req,res)=>{
    const {ID,Date,Shift} = req.body.doctor;
    console.log(ID,Date,Shift);
    var sql = "INSERT INTO shifts (DoctorID, Date, Shift) VALUES (?,?,?);";
    mysql.query(sql,[ID,Date,Shift],(err,result)=>{
        if(err){
            console.log(sql + "Failed");
            throw err;
        }
        console.log(sql + "SUCCESSFUL");
    })
    res.redirect('schedule');
})
router.post('/findDoctor', (req,res)=>{
    const {Faculty, Date, Shift} = req.body.shift;
    var sql = "SELECT * FROM doctor join shifts on ID=DoctorID WHERE Date=?";
    if (Faculty != "*") {
        sql += " and Faculty=?";
        if (Shift != "*")sql += " and Shift=?";
        mysql.query(sql,[Date,Faculty,Shift], (err,result)=>{
            if (err) throw err;
            var sql = "SELECT DISTINCT Faculty FROM doctor";
            th = result
            mysql.query(sql,(err,result)=>{
                console.log(result);
                res.render('demo/findDoctor',{Faculty:result, theories: th})
            })
        })
    }
    else {
        if (Shift != "*")sql += " and Shift=?";
        mysql.query(sql,[Date,Shift], (err,result)=>{
            if (err) throw err;
            var sql = "SELECT DISTINCT Faculty FROM doctor";
            th = result
            mysql.query(sql,(err,result)=>{
                console.log(result);
                res.render('demo/findDoctor',{Faculty:result, theories: th})
            })
        })
    }
    

})

module.exports = router;