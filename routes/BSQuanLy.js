const express = require('express');
const router = express.Router();
const {dbconfigQuanLy} = require('../config');
const mysqldb = require('mysql');
const mysql = mysqldb.createConnection(dbconfigQuanLy);
const { isAuth} = require('../middlewares/auth.middleware');
const Joi = require("joi");

// const TongBenhNhan_CaTruc = require("../schemas/TongBenhNhan_CaTruc");
const themKhoaMoi = require("../schemas/themKhoaMoi");
const taoBacSi = require("../schemas/taoBacSi");
const taoBSQuanly = require("../schemas/taoBSQuanly");



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

// (i.5). Xem tổng số bệnh nhân tại một ca trong một ngày ở một khoa.
router.get('/tongSoBenhNhan',Authenticate , (req, res) =>
{
sql = "SELECT DISTINCT TenKhoa,MaKhoaDieuTri FROM hospital.nhanvienview;";
  mysql.query(sql,(err,khoa)=>{
    if (err) throw err;
    res.render('BSQuanLy/tongSoBenhNhan', { KhoaDieuTri: khoa, TongSoBenhNhan: null });
  })
})

router.post('/tongSoBenhNhan',Authenticate , (req, res) =>
{
const { KhoaDieuTri, NgayTruc, CaTruc } = req.body.CaTruc;
var sql = "call TongBenhNhan_CaTruc_Khoa('" + NgayTruc + "', '" + CaTruc + "', '" + KhoaDieuTri + "')";
mysql.query(sql, (err, result) =>
{
  if (err) return res.render('err', { err: err });
  return res.render('BSQuanLy/tongSoBenhNhan', {KhoaDieuTri: req.KhoaDieuTri, TongSoBenhNhan: result[0]});
})
})

// (i.6) (i.9) Xem tổng số bệnh nhân nội trú nhập viện trong một ca trong một ngày ở một khoa/ tất cả các khoa
router.get('/tongSoBenhNhanNoiTru',Authenticate , (req, res) =>
{
sql = "SELECT DISTINCT TenKhoa,MaKhoaDieuTri FROM hospital.nhanvienview;";
  mysql.query(sql,(err,khoa)=>{
    if (err) throw err;
    res.render('BSQuanLy/tongSoBenhNhanNoiTru', { KhoaDieuTri: khoa, tongSoBenhNhanNoiTru: null });
  })

})

router.post('/tongSoBenhNhanNoiTru',Authenticate , (req, res) =>
{
const { KhoaDieuTri, NgayTruc, CaTruc } = req.body.CaTruc;
var sql;
if (KhoaDieuTri != "c")
  sql = "call TongBenhNhanNhapVien_CaTruc_Khoa('" + NgayTruc + "', '" + CaTruc + "', '" + KhoaDieuTri + "')";
else 
  sql = "call TongBenhNhanNhapVien_CaTruc( '" + NgayTruc + "', '" + CaTruc + "')";
mysql.query(sql, (err, result) =>
{
  if (err) return res.render('err', { err: err });
  return res.render('BSQuanLy/tongSoBenhNhanNoiTru', {KhoaDieuTri: req.KhoaDieuTri, tongSoBenhNhanNoiTru: result[0]});
})
})

// (i.7) (i.10) Xem tổng số bệnh nhân ngoại trú trong một ca trong một ngày ở một khoa/ tất cả các khoa
router.get('/tongSoBenhNhanNgoaiTru',Authenticate , (req, res) =>
{
sql = "SELECT DISTINCT TenKhoa,MaKhoaDieuTri FROM hospital.nhanvienview;";
  mysql.query(sql,(err,khoa)=>{
    if (err) throw err;
    res.render('BSQuanLy/tongSoBenhNhanNgoaiTru', { KhoaDieuTri: khoa, tongSoBenhNhanNgoaiTru: null });
  })

})

router.post('/tongSoBenhNhanNgoaiTru',Authenticate , (req, res) =>
{
const { KhoaDieuTri, NgayTruc, CaTruc } = req.body.CaTruc;
var sql;
if (KhoaDieuTri != "**")
  sql = "call TongBenhNhanNgoaiTru_CaTruc_Khoa('" + NgayTruc + "', '" + CaTruc + "', '" + KhoaDieuTri + "')";
else 
  sql = "call TongBenhNhanNgoaiTru_CaTruc( '" + NgayTruc + "', '" + CaTruc + "')";
mysql.query(sql, (err, result) =>
{
  if (err) return res.render('err', { err: err });
  return res.render('BSQuanLy/tongSoBenhNhanNgoaiTru', {KhoaDieuTri: req.KhoaDieuTri, tongSoBenhNhanNgoaiTru: result[0]});
})
})

// (i.11) (i.12). Xem tổng số xét nghiệm được làm trong một ngày ở một khoa/ tất cả các khoa

router.get('/tongSoXetNghiem',Authenticate , (req, res) =>
{
sql = "SELECT DISTINCT TenKhoa,MaKhoaDieuTri FROM hospital.nhanvienview;";
  mysql.query(sql,(err,khoa)=>{
    if (err) throw err;
    res.render('BSQuanLy/tongSoXetNghiem', { KhoaDieuTri: khoa, tongSoXetNghiem: null });
  })

})

router.post('/tongSoXetNghiem',Authenticate , (req, res) =>
{
const { KhoaDieuTri, Ngay } = req.body.Ngay;
var sql;
if (KhoaDieuTri != "a")
  sql = "call TongXetNghiem_Ngay_Khoa('" + Ngay + "', '" + KhoaDieuTri + "')";
else if (KhoaDieuTri != "all")
  sql = "call TongXetNghiem_Ngay( '" + Ngay + "')";
mysql.query(sql, (err, result) =>
{
  if (err) return res.render('err', { err: err });
  return res.render('BSQuanLy/tongSoXetNghiem', {KhoaDieuTri: req.KhoaDieuTri, tongSoXetNghiem: result[0]});
})
})


// (iii.0a). Thêm khoa mới
router.get("/themKhoaMoi", Authenticate, (req, res) => {
  res.render("BSQuanLy/themKhoaMoi", { Flag: false, Error: false });
});

router.post("/themKhoaMoi", Authenticate, (req, res) => {
  const { value, error } = Joi.validate(req.body, themKhoaMoi);
  if (error) {
    res.render("BSQuanLy/themKhoaMoi", {
      Flag: false,
      Error: error.details[0].message,
    });
  }
  const {
    TenKhoa,
  } = value;
  var sql = "call themKhoaMoi(?)";
  mysql.query(
    sql,
    [
      TenKhoa,
    ],
    (err, result) => {
      if (err) return res.render("err", { err: err });

      res.render("BSQuanLy/themKhoaMoi", { Flag: true, Error: false });
    }
  );
});

// (iii.0b). Thêm tài khoản bác sĩ
router.get("/taoBacSi", Authenticate, (req, res) => {
  var sql = 'SELECT * FROM KhoaDieuTri'
  mysql.query(sql,(err,result)=>{
    res.render("BSQuanLy/taoBacSi", { Flag: false, Error: false, Khoa:result });
  })
  
});

router.post("/taoBacSi", Authenticate, (req, res) => {
  const { value, error } = Joi.validate(req.body, taoBacSi);
  if (error) {
    res.render("BSQuanLy/taoBacSi", {
      Flag: false,
      Error: error.details[0].message,
    });
  }
  const {
    TaiKhoan,
    MatKhau,
    HoVaTenLot,
    Ten,
    Email,
    SDT,
    GioiTinh,
    NgaySinh,
    MaKhoaDieuTri,
  } = value;
  var sql = "call taoBacSi(?,?,?,?,?,?,?,?,?)";
  mysql.query(
    sql,
    [
      TaiKhoan,
      MatKhau,
      HoVaTenLot,
      Ten,
      Email,
      SDT,
      GioiTinh,
      NgaySinh,
      MaKhoaDieuTri,
    ],
    (err, result) => {
      if (err) return res.render("err", { err: err });

      var sql = 'SELECT * FROM KhoaDieuTri'
  mysql.query(sql,(err,result)=>{
    res.render("BSQuanLy/taoBacSi", { Flag: true, Error: false, Khoa:result });
  })
    }
  );
});

// (iii.0c). chuyển 1 tài khoản bác sĩ thành bác sĩ quản lý
router.get("/taoBSQuanly", Authenticate, (req, res) => {
  res.render("BSQuanLy/taoBSQuanly", { Flag: false, Error: false });
});

router.post("/taoBSQuanly", Authenticate, (req, res) => {
  const { value, error } = Joi.validate(req.body, taoBSQuanly);
  if (error) {
    res.render("BSQuanLy/taoBSQuanly", {
      Flag: false,
      Error: error.details[0].message,
    });
  }
  const {
    MaNhanVien,
  } = value;
  var sql = "call taoBSQuanly(?)";
  mysql.query(
    sql,
    [
      MaNhanVien,
    ],
    (err, result) => {
      if (err) return res.render("err", { err: err });

      res.render("BSQuanLy/taoBSQuanly", { Flag: true, Error: false });
    }
  );
});


// TODO: Viết router.get và router.post mỗi chức năng mà đề yêu cầu, vui lòng đọc qua hết các chức năng cần hiện thực và gom nhóm các chức năng lại một cách gọn gàng nhất.
// ! Có một số chức năng nhỏ nằm trong 1 chức năng lớn, thì có thể gom thành 1 route và nhiều post để thực thi 
module.exports = router;