const express = require('express');
const router = express.Router();
const {dbconfigQuanLy} = require('../config');
const mysqldb = require('mysql');
const mysql = mysqldb.createConnection(dbconfigQuanLy);
const { isAuth} = require('../middlewares/auth.middleware');

mysql.connect(err=>{
    if (err){
        console.log("FAILED TO CONNECT TO DATABASE!");
        throw(err);
    }
    else{
        console.log("Database Quan Ly Connected!");
    }
})

const CATRUC = ['Buổi sáng', 'Buổi trưa', 'Buổi chiều', 'Buổi tối'];
Authenticate = (req,res,next)=>{
  isAuth(req,res, ()=>{
    if (req.role == "QuanLy"){
      next();
    }
    else{
      res.redirect('err',"Bạn không có quyền làm việc này");
    }
  })
}
router.get('/',Authenticate , (req, res) =>
{
  res.render('BSQuanLy/index');
})

router.get('/schedule',Authenticate , (req, res) =>
{
  var sql = "SELECT * FROM nhanvienview;";
  mysql.query(sql, (err, nhanvien) =>
  {
    if (err) throw err;
    sql = "SELECT DISTINCT TenKhoa,MaKhoaDieuTri FROM hospital.nhanvienview;";
    mysql.query(sql,(err,khoa)=>{
      if (err) throw err;
      res.render('BSQuanLy/schedule', { DSBacSi: nhanvien, Khoa:khoa});
    })
    
  })

})
router.get('/findDoctor',Authenticate , (req, res) =>
{
  sql = "SELECT DISTINCT TenKhoa,MaKhoaDieuTri FROM hospital.nhanvienview;";
    mysql.query(sql,(err,khoa)=>{
      if (err) throw err;
      res.render('BSQuanLy/findDoctor', { KhoaDieuTri: khoa, DSBacSi: null });
    })
  
})

router.post('/schedule',Authenticate , (req, res) =>
{
  const {MaNhanVien,NgayTruc, CaTruc } = req.body.doctor;
  if (!(CATRUC.includes(CaTruc))) return render('err', { err: "Ca trực chỉ có thể là" + CATRUC });
  var sql = 'call themCaTruc(?,?,?,?)';
  console.log(MaNhanVien, NgayTruc, CaTruc);
  // chỗ này là có thêm ID của thằng quản lý thêm ca của nó vào nữa mà chưa hiện thực tài khoản nên để sau.
  mysql.query(sql, [NgayTruc, CaTruc, MaNhanVien, req.user.MaNhanVien], (err, result) =>
  {
    if (err)
    {
      console.log(err);
      return res.render('err', { err: err });

    }
    res.redirect('schedule');
  })
})
router.post('/findDoctor',Authenticate , (req, res) =>
{
  const { KhoaDieuTri, NgayTruc, CaTruc } = req.body.CaTruc;
  var sql;
  if (CaTruc != "*" && KhoaDieuTri != "*")
    sql = "call DSBacSi_CaTruc_Khoa('" + NgayTruc + "', '" + CaTruc + "', '" + KhoaDieuTri + "')";

  else if (CaTruc != "*")
    sql = "call DSBacSi_CaTruc( '" + NgayTruc + "', '" + CaTruc + "')";
  else if (KhoaDieuTri != "*")
    sql = "call DSBacSi_Khoa( '" + NgayTruc + "', '" + KhoaDieuTri + "')";
  else
    sql = "call DSBacSi_NgayTruc( '" + NgayTruc + "')";
  mysql.query(sql, (err, result) =>
  {
    if (err) return res.render('err', { err: err });
    return res.render('BSQuanLy/findDoctor', {KhoaDieuTri: req.KhoaDieuTri, DSBacSi: result[0]});
  })
})

module.exports = router;