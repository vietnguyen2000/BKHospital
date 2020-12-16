const jwt = require( "jsonwebtoken");
const session = require('express-session');
module.exports = { 
generateToken: async (user, secretSignature) => {
  return new Promise((resolve, reject) => {
    userData = {
      Taikhoan: user.Taikhoan,
      HoVaTenLot: user.HoVaTenLot,
      Ten: user.Ten,
      Email: user.Email,
      SDT: user.SDT,
      GioiTinh: user.GioiTinh? "Nam": "Nữ",
      NgaySinh: user.NgaySinh,
      DanToc: user.DanToc
    };
    if (user.MaBenhNhan){
      userData.MaBenhNhan = user.MaBenhNhan;
      userData.Loai = user.Loai;
      userData.Role = "BenhNhan";
    }
    else if(user.MaQuanLy){
      userData.MaQuanLy = user.MaQuanLy;
      userData.MaNhanVien = user.MaNhanVien;
      userData.MaKhoaDieuTri = user.MaKhoaDieuTri;
      userData.TenKhoa = user.TenKhoa;
      userData.Role = "QuanLy";
      userData.QWEQWs = user.Taikhoan;
    }
    else{
      userData.MaNhanVien = user.MaNhanVien;
      userData.MaKhoaDieuTri = user.MaKhoaDieuTri;
      userData.TenKhoa = user.TenKhoa;
      userData.Role = "BacSi";
    }
    jwt.sign(
      userData,
      secretSignature,
      { 
        algorithm: "HS256",
      },
      (error, token) => {
        if (error) {
          return reject(error);
        }
        
        session.jwt = token;
        resolve(token);
      }
    );
  });
},

verifyToken: (token, secretKey) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (error, decoded) => {
      if (error) {
        return reject(error);
      }
      resolve(decoded);
    });
  });
}}

