const express = require('express');
const router = express.Router();
const {dbconfigQuanLy} = require('../config');
const mysqldb = require('mysql');
const mysql = mysqldb.createConnection(dbconfigQuanLy);
const { isAuth} = require('../middlewares/auth.middleware');
const Joi = require("joi");

const TongBenhNhan_CaTruc = require("../schemas/TongBenhNhan_CaTruc");
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
      res.render('err',{err: "Bạn không có quyền làm việc này"} );
    }
  })
}
// get index
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

// i.11 i.12
router.get("/TongBenhNhan_CaTruc", Authenticate, (req, res) => {
  res.render("BSQuanLy/TongBenhNhan_CaTruc", { Flag: false, Error: false });
});

router.post("/TongBenhNhan_CaTruc", Authenticate, (req, res) => {
  const { value, error } = Joi.validate(req.body, TongBenhNhan_CaTruc);
  if (error) {
    res.render("BSQuanLy/TongBenhNhan_CaTruc", {
      Flag: false,
      Error: error.details[0].message,
    });
  }

  var sql = "call TongBenhNhan_CaTruc(?,?)";
  mysql.query(
    sql,
    [req.user.MaBenhNhan, ...Object.values(value)],
    (err, result) => {
      if (err) return res.render("err", { err: err });
      res.render("\BSQuanLy/TongBenhNhan_CaTruc", {
        TongBenhNhan_CaTruc: result,
        Error: false,
      });
    }
  );
});
// ````````````````~~~~~~~~~~~~~~~~~~~~~~~~~


router.get('/TongBenhNhan_CaTruc_Khoa',Authenticate , (req, res) => {
  res.render('BSQuanLy/TongBenhNhan_CaTruc_Khoa', { Flag: false, Error: false });
});

router.post("/TongBenhNhan_CaTruc_Khoa", Authenticate, (req, res) => {
  const { value, error } = Joi.validate(req.body, TongBenhNhan);
  if (error) {
    res.render("BSQuanLy/TongBenhNhan_CaTruc_Khoa", {
      Flag: false,
      Error: error.details[0].message,
    });
  }

  var sql = "call TongBenhNhan_CaTruc_Khoa(?,?,?)";
  mysql.query(
    sql,
    [req.user.TongBenhNhan, ...Object.values(value)],
    (err, result) => {
      if (err) return res.render("err", { err: err });
      res.render("\BSQuanLy/TongBenhNhan_CaTruc_Khoa", {
        TongBenhNhan: result,
        Error: false,
      });
    }
  );
});

// TODO: Viết router.get và router.post mỗi chức năng mà đề yêu cầu, vui lòng đọc qua hết các chức năng cần hiện thực và gom nhóm các chức năng lại một cách gọn gàng nhất.
// ! Có một số chức năng nhỏ nằm trong 1 chức năng lớn, thì có thể gom thành 1 route và nhiều post để thực thi 
module.exports = router;