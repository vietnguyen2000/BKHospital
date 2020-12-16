const express = require('express');
const router = express.Router();
const {dbconfigBacSi} = require('../config');
const mysqldb = require('mysql');
const mysql = mysqldb.createConnection(dbconfigBacSi);
const { isAuth} = require('../middlewares/auth.middleware');

mysql.connect(err=>{
    if (err){
        console.log("FAILED TO CONNECT TO DATABASE!");
        throw(err);
    }
    else{
        console.log("Database BacSi Connected!");
    }
})
const CATRUC = ['Buổi sáng', 'Buổi trưa', 'Buổi chiều', 'Buổi tối'];
Authenticate = (req,res,next)=>{
  isAuth(req,res, ()=>{
    if (req.role == "BacSi"){ // Kiểm tra xem đây có phải là role bác sĩ không, nếu không thì nhảy ra err
      next();
    }
    else{
      res.render('err',{err: "Bạn không có quyền làm việc này"});
    }
  })
}

router.get('/',Authenticate , (req, res) =>{
  res.render('BacSi/index');
})
// TODO: Viết router.get và router.post mỗi chức năng mà đề yêu cầu, vui lòng đọc qua hết các chức năng cần hiện thực và gom nhóm các chức năng lại một cách gọn gàng nhất.
// ! Có một số chức năng nhỏ nằm trong 1 chức năng lớn, thì có thể gom thành 1 route và nhiều post để thực thi 
module.exports = router;