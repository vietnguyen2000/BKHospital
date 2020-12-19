const express = require('express');
const router = express.Router();
const {dbconfigBenhNhan} = require('../config');
const mysqldb = require('mysql');
const mysql = mysqldb.createConnection(dbconfigBenhNhan);
const { isAuth} = require('../middlewares/auth.middleware');
const Joi = require("joi");

const taoBenhNhan = require("../schemas/taoBenhNhan");
const CapNhatNhanKhauHoc = require("../schemas/CapNhatNhanKhauHoc");


mysql.connect(err=>{
    if (err){
        console.log("FAILED TO CONNECT TO DATABASE!");
        throw(err);
    }
    else{
        console.log("Database Benh nhan Connected!");
    }
})
const CATRUC = ['Buổi sáng', 'Buổi trưa', 'Buổi chiều', 'Buổi tối'];
Authenticate = (req,res,next)=>{
  isAuth(req,res, ()=>{
    if (req.role == "BenhNhan"){
      next();
    }
    else{
      res.render('err',{err: "Bạn không có quyền làm việc này"});
    }
  })
}

router.get('/',Authenticate , (req, res) =>{
  res.render('BenhNhan/index');
})

// (iii.2,iii.3) Xem danh sách các thuốc (gần nhất và tất cả các lần)
router.get('/DSThuoc', Authenticate, (req,res)=>{
  res.render('BenhNhan/DSThuoc', {kq: null});
})
router.post('/DSThuoc', Authenticate, (req,res)=>{
  const {Loai} = req.body;
  const MaBenhNhan = req.user.MaBenhNhan;
  if (Loai == "All")
    var sql = "call DSThuoc(?)";
  else
    var sql = "call DSThuoc_GanNhat(?)";
  mysql.query(sql,[MaBenhNhan],(err,result)=>{
    if (err) throw err;
    console.log(result[0]);
    res.render('BenhNhan/DSThuoc', {kq: result[0]});
  })
})

// (iii.4, iii.5, iii.6). Xem kết quả xét nghiệm (gần nhất và tất cả các lần)
router.get('/DSXetNghiem', Authenticate, (req,res)=>{
  res.render('BenhNhan/DSXetNghiem', {kq: null});
})
router.post('/DSXetNghiem', Authenticate, (req,res)=>{
  const {Loai} = req.body;
  const MaBenhNhan = req.user.MaBenhNhan;
  if (Loai == "All")
    var sql = "call DSXetNghiem(?)";
  else if (Loai == "Last")
    var sql = "call DSXetNghiemGanNhat(?)";
  else
  var sql = "call DSXetNghiem_BatThuong(?)";
  mysql.query(sql,[MaBenhNhan],(err,result)=>{
    if (err) throw err;
    console.log(result[0]);
    res.render('BenhNhan/DSXetNghiem', {kq: result[0]});
  })
})

// (iii.7, iii.8). Xem danh sách bác sĩ điều trị (gần nhất và tất cả các lần)
router.get('/DSBacSi', Authenticate, (req,res)=>{
  res.render('BenhNhan/DSBacSi', {kq: null});
})
router.post('/DSBacSi', Authenticate, (req,res)=>{
  const {Loai} = req.body;
  const MaBenhNhan = req.user.MaBenhNhan;
  if (Loai == "All")
    var sql = "call DSBacSi_DieuTriBenhNhan(?)";
  else
    var sql = "call DSBacSi_DieuTriBenhNhanGanNhat(?)";
  mysql.query(sql,[MaBenhNhan],(err,result)=>{
    if (err) throw err;
    console.log(result[0]);
    res.render('BenhNhan/DSBacSi', {kq: result[0]});
  })
})

// (iii.9, iii.10). Xem danh sách chế độ dinh dượng (gần nhất và tất cả các lần)
router.get('/DSCDDDuong', Authenticate, (req,res)=>{
  res.render('BenhNhan/DSCDDDuong', {kq: null});
})
router.post('/DSCDDDuong', Authenticate, (req,res)=>{
  const {Loai} = req.body;
  const MaBenhNhan = req.user.MaBenhNhan;
  if (Loai == "All")
    var sql = "call DSCDDDuong(?)";
  else
    var sql = "call DSCDDDuongGanNhat(?)";
  mysql.query(sql,[MaBenhNhan],(err,result)=>{
    if (err) throw err;
    console.log(result[0]);
    res.render('BenhNhan/DSCDDDuong', {kq: result[0]});
  })
})

// (iii.9, iii.10). Xem danh sách chế độ dinh dượng (gần nhất và tất cả các lần)
router.get('/DSCDDDuong', Authenticate, (req,res)=>{
  res.render('BenhNhan/DSCDDDuong', {kq: null});
})
router.post('/DSCDDDuong', Authenticate, (req,res)=>{
  const {Loai} = req.body;
  const MaBenhNhan = req.user.MaBenhNhan;
  if (Loai == "All")
    var sql = "call DSCDDDuong(?)";
  else
    var sql = "call DSCDDDuongGanNhat(?)";
  mysql.query(sql,[MaBenhNhan],(err,result)=>{
    if (err) throw err;
    console.log(result[0]);
    res.render('BenhNhan/DSCDDDuong', {kq: result[0]});
  })
})

// (iii.0). Thêm tài khoản
router.get("/taoBenhNhan", Authenticate, (req, res) => {
  res.render("BenhNhan/taoBenhNhan", { Flag: false, Error: false });
});

router.post("/taoBenhNhan", Authenticate, (req, res) => {
  const { value, error } = Joi.validate(req.body, taoBenhNhan);
  if (error) {
    res.render("BenhNhan/taoBenhNhan", {
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
    DanToc,
  } = value;
  var sql = "call taoBenhNhan(?,?,?,?,?,?,?,?,?)";
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
      DanToc,
    ],
    (err, result) => {
      if (err) return res.render("err", { err: err });

      res.render("BenhNhan/taoBenhNhan", { Flag: true, Error: false });
    }
  );
});


// (iii.1a). Cập nhật thông tin nhân khẩu học
router.get("/CapNhatNhanKhauHoc", Authenticate, (req, res) => {
  res.render("BenhNhan/CapNhatNhanKhauHoc", { Flag: false, Error: false });
});

router.post("/CapNhatNhanKhauHoc", Authenticate, (req, res) => {
  const { value, error } = Joi.validate(req.body, CapNhatNhanKhauHoc);
  if (error) {
    res.render("BenhNhan/CapNhatNhanKhauHoc", {
      Flag: false,
      Error: error.details[0].message,
    });
  }
  const {
    MaBenhNhan,
    HoVaTenLot,
    Ten,
    SDT,
    NgaySinh,
    DanToc,
  } = value;
  var sql = "call CapNhatNhanKhauHoc(?,?,?,?,?,?)";
  mysql.query(
    sql,
    [
      MaBenhNhan,
      HoVaTenLot,
      Ten,
      SDT,
      NgaySinh,
      DanToc,
    ],
    (err, result) => {
      if (err) return res.render("err", { err: err });

      res.render("BenhNhan/CapNhatNhanKhauHoc", { Flag: true, Error: false });
    }
  );
});

// (iii.1b). Cập nhật thông tin bảo hiểm y tế
router.get("/themBHYTe_BenhNhan", Authenticate, (req, res) => {
  res.render("BenhNhan/themBHYTe_BenhNhan", { Flag: false, Error: false });
});

router.post("/themBHYTe_BenhNhan", Authenticate, (req, res) => {
  const { value, error } = Joi.validate(req.body, themBHYTe_BenhNhan);
  if (error) {
    res.render("BenhNhan/themBHYTe_BenhNhan", {
      Flag: false,
      Error: error.details[0].message,
    });
  }
  const {
    MaBenhNhan,
    MaTheBHYTe,
    NgayDangKy,
    NgayHetHan
  } = value;
  var sql = "call themBHYTe_BenhNhan(?,?,?,?)";
  mysql.query(
    sql,
    [
      MaBenhNhan,
      MaTheBHYTe,
      NgayDangKy,
      NgayHetHan
    ],
    (err, result) => {
      if (err) return res.render("err", { err: err });

      res.render("BenhNhan/themBHYTe_BenhNhan", { Flag: true, Error: false });
    }
  );
});


module.exports = router;