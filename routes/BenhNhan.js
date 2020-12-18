const express = require('express');
const router = express.Router();
const {dbconfigBenhNhan} = require('../config');
const mysqldb = require('mysql');
const mysql = mysqldb.createConnection(dbconfigBenhNhan);
const { isAuth} = require('../middlewares/auth.middleware');

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

// (iii.4, iii.5). Xem kết quả xét nghiệm (gần nhất và tất cả các lần)
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




// TODO: Viết router.get và router.post mỗi chức năng mà đề yêu cầu, vui lòng đọc qua hết các chức năng cần hiện thực và gom nhóm các chức năng lại một cách gọn gàng nhất.
// ! Có một số chức năng nhỏ nằm trong 1 chức năng lớn, thì có thể gom thành 1 route và nhiều post để thực thi 
module.exports = router;