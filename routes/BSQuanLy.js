const express = require('express');
const router = express.Router();
const mysql = require ('../conn');

const CATRUC = ['Buổi sáng', 'Buổi trưa', 'Buổi chiều', 'Buổi tối'];

router.get('/', (req, res)=>{
    res.render('BSQuanLy/index');
})

router.get('/schedule', (req,res)=>{
    var sql = "SELECT * FROM nhanvienview;";
    mysql.query(sql, (err,nhanvien)=>{
        if (err) throw err;
        sql = "SELECT * FROM KhoaDieuTri";
        mysql.query(sql,(err,khoa)=>{
            res.render('BSQuanLy/schedule',{doctors: nhanvien, faculties: khoa});
        })
    })
})
router.get('/findDoctor', (req,res)=>{
    var sql = "SELECT * FROM KhoaDieuTri";
    mysql.query(sql,(err,result)=>{
        res.render('BSQuanLy/findDoctor',{Faculty:result, theories:null});
    })
    
})

router.post('/schedule',(req,res)=>{
    const {ID,Date,Shift} = req.body.doctor;
    if (!(CATRUC.includes(Shift))) return render('err', {err:"Ca trực chỉ có thể là" + CATRUC});
    var sql = 'call themCaTruc(?,?,?,?)';
    console.log(ID[1],Date,Shift);
    // chỗ này là có thêm ID của thằng quản lý thêm ca của nó vào nữa mà chưa hiện thực tài khoản nên để sau.
    mysql.query(sql, [Date,Shift,ID[1],1],(err, result)=>{ 
        if (err) {
            console.log(err);
            return res.render('err',{err:err});

        }
        res.redirect('schedule');
    })
})
router.post('/findDoctor', (req,res)=>{
    const {Faculty, Date, Shift} = req.body.shift;
    var sql = "SELECT * FROM KhoaDieuTri";
    mysql.query(sql, (err,result)=>{
        if (err) throw err;
        th = result
        var sql;
        if (Shift != "*" && Faculty != "*") 
            sql = "call DSBacSi_CaTruc_Khoa('" + Date +"', '" + Shift + "', '" + Faculty + "')";
            
        else if (Shift != "*")
            sql = "call DSBacSi_CaTruc( '" + Date + "', '" + Shift + "')";
        else if (Faculty != "*")
            sql = "call DSBacSi_Khoa( '" + Date + "', '" + Faculty + "')";
        else 
            sql = "call DSBacSi_NgayTruc( '" + Date + "')";
        mysql.query(sql, (err, result)=>{
            if (err) return res.render('err',{err:err});
            return res.render('BSQuanLy/findDoctor',{Faculty:th, theories: result[0]});
        })
            
    })
})

module.exports = router;