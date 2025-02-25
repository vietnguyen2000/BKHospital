const express = require('express');
const router = express.Router();
const mysql = require ('../conn');
const session = require('express-session');
const { generateToken, verifyToken} = require('../middlewares/helper.middleware');
const { isAuth} = require('../middlewares/auth.middleware');

router.get('/login', isAuth, (req, res) =>
{
  // console.log(req.user);
  res.render('Authentication/login');
});
router.get('/logout', isAuth,(req,res)=>{
  console.log(session.jwt);
  if(req.isLoged){
    session.jwt = '';
    res.redirect('/');
  }
  else{
    res.redirect('/');
  }
})
router.post('/login', isAuth, (req,res)=>{
  const { TaiKhoan,MatKhau } = req.body;
  const user = req.user;
  if (!(req.isLoged)){
    var sql = "call TimTaiKhoan(?,?)";
    mysql.query(sql, [TaiKhoan, MatKhau], (err, result) =>
    {
      if (err)
      {
        // console.log(err);
        return res.render('err', { err: err });
      }
      if(result[0][0]){
        let taikhoan = result[0][0]
        // console.log(taikhoan);
        generateToken(taikhoan,process.env.ACCESS_TOKEN_SECRET);
        res.redirect('/');
      }
      else{
        return res.render('Authentication/login',{err: "Bạn đã nhập sai tài khoản!"});
      }
      
    })


  }
  else{
    res.render('/err',"Bạn chưa đăng xuất!");
  }

})

router.get("/taoBenhNhan", isAuth, (req, res) => {
  res.render("Authentication/taoBenhNhan", { Flag: false, Error: false });
});

router.post("/taoBenhNhan", isAuth, (req, res) => {
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
  } = req.body;
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

      res.render("Authentication/taoBenhNhan", { Flag: true, Error: false });
    }
  );
});
module.exports = router;