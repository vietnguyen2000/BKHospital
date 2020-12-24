const express = require("express");
const router = express.Router();
const { dbconfigBacSi } = require("../config");
const mysqldb = require("mysql");
const mysql = mysqldb.createConnection(dbconfigBacSi);
const { isAuth } = require("../middlewares/auth.middleware");
const Joi = require("joi");

const KhamBenhBacSiBenhNhan = require("../schemas/KhamBenhBacSiBenhNhan");
const DSBenhNhanBatThuong = require("../schemas/DSBenhNhanBatThuong");
const DSBenhNhanCungBenh = require("../schemas/DSBenhNhanCungBenh");
const DSBenhNhanPhuTrach = require("../schemas/DSBenhNhanPhuTrach");
const DSChanDoanBenh = require("../schemas/DSChanDoanBenh");
const DSChupPhimBacSi = require("../schemas/DSChupPhimBacSi");
const DSXetNghiemBacSi = require("../schemas/DSChupPhimBacSi");
const DuaRaKQBacSiBenhNhan = require("../schemas/DuaRaKQBacSiBenhNhan");
const NhapVien = require("../schemas/NhapVien");
const TaoChiSo = require("../schemas/TaoChiSo");
const TaoChiSoXN = require("../schemas/TaoChiSoXN");
const TaoPhim = require("../schemas/TaoPhim");
const TaoXetNghiem = require("../schemas/TaoXetNghiem");
const ThemBenh = require("../schemas/ThemBenh");
const ThemBenhAn = require("../schemas/ThemBenhAn");
const ThemCDDDuong = require("../schemas/ThemCDDDuong");
const ThemKQBenh = require("../schemas/ThemKQBenh");
const ThemKQCDDDuong = require("../schemas/ThemKQCDDDuong");
const ThemKQThuoc = require("../schemas/ThemKQThuoc");
const ThemThuoc = require("../schemas/ThemThuoc");
const ThemThuocVaoKQ = require("../schemas/ThemThuocVaoKQ");
const XuatVien = require("../schemas/XuatVien");
const DsThuocBacSi = require("../schemas/DSThuocBacSi")

mysql.connect((err) =>
{
  if (err)
  {
    console.log("FAILED TO CONNECT TO DATABASE!");
    throw err;
  } else
  {
    console.log("Database BacSi Connected!");
  }
});
const CATRUC = ["Buổi sáng", "Buổi trưa", "Buổi chiều", "Buổi tối"];
Authenticate = (req, res, next) =>
{
  isAuth(req, res, () =>
  {
    if (req.role == "BacSi")
    {
      // Kiểm tra xem đây có phải là role bác sĩ không, nếu không thì nhảy ra err
      next();
    } else
    {
      res.render("err", { err: "Bạn không có quyền làm việc này" });
    }
  });
};

formatDate = (date) =>
{
  return date.slice(1, 11) + " " + date.slice(12, 20)
}

formatOnlyDate = (date) =>
{
  return date.slice(1, 11)
}


function onlyUnique(value, index, self)
{
  return self.indexOf(value) === index;
}

router.get("/", Authenticate, (req, res) =>
{
  res.render("BacSi/index");
});

router.get("/HoatDongKhac", Authenticate, (req, res) =>
{
  res.render("BacSi/HoatDongKhac");
});
router.post("/HoatDongKhac", Authenticate, (req, res) =>
{
  const { Loai } = req.body;
  if (Loai == "TaoChiSoXN")
  {
    return res.redirect("TaoChiSoXN");
  }
  if (Loai == "TaoChiSo")
  {
    return res.redirect("TaoChiSo");
  }
  if (Loai == "TaoXN")
  {
    return res.redirect("TaoXN")
  }
  if (Loai == "ThemThuoc")
  {
    return res.redirect("Themthuoc")
  }
  if (Loai == "ThemBenh")
  {
    return res.redirect("Thembenh")
  }
  if (Loai == "ThemCDDDuong")
  {
    return res.redirect("ThemCDDDuong")
  }
  return res.redirect("TaoPhim");
});

router.get("/DSBacSi", Authenticate, (req, res) =>
{
  res.render("BacSi/DSBacSi");
});

router.post("/DSBacSi", Authenticate, (req, res) =>
{
  const { Loai } = req.body;
  if (Loai == "DanhSachBenhNhanPhuTrach")
  {
    return res.redirect("DsBenhNhanPhuTrach");
  }
  if (Loai == "DanhSachChanDoanBenh")
  {
    return res.redirect("DsChanDoanBenh");
  }
  if (Loai == "DanhSachThuocBacSi")
  {
    return res.redirect("DsThuocBacSi");
  }
  if (Loai == "DanhSachChanDoanBenh")
  {
    return res.redirect("DsChanDoanBenh");
  }
  if (Loai == "DanhSachXetNghiemBacSi")
  {
    return res.redirect("DsXetNghiemBacSi");
  }
  if (Loai == "DanhSachBenhNhanCungBenh")
  {
    return res.redirect("DSBenhNhanCungBenh");
  }
  if (Loai == "DanhSachBenhNhanXuatVien")
  {
    return res.redirect("DSBenhNhanXV");
  }
  if (Loai == "DanhSachChupPhimBacSi")
  {
    return res.redirect("DSChupPhimBacSi");
  }
  return res.redirect("DSBenhNhanBatThuong");
});


router.get("/ThemKetQuaBenh", Authenticate, (req, res) =>
{
  res.render("BacSi/ThemKetQuaBenh");
});
router.post("/ThemKetQuaBenh", Authenticate, (req, res) =>
{
  const { Loai } = req.body;
  if (Loai == "KhamBenhBSBenhNhan")
  {
    return res.redirect("KhambenhBacSiBenhNhan");
  }
  if (Loai == "DuaRaKQBSBenhNhan")
  {
    return res.redirect("DuaRaKQ");
  }
  if (Loai == "ThemThuocVaoKQ")
  {
    return res.redirect("ThemThuocVaoKQ");
  }
  if (Loai == "ThemKQBenh")
  {
    return res.redirect("ThemKQBenh");
  }
  if (Loai == "ThemCDDDuong")
  {
    return res.redirect("ThemCDDDuong");
  }
  if (Loai == "NhapVien")
  {
    return res.redirect("NhapVien");
  }
  if (Loai == "ThemBenhAn")
  {
    return res.redirect("ThemBenhAn");
  }
  if (Loai == "XuatVien")
  {
    return res.redirect("XuatVien");
  }
  return res.redirect("ThemKQCDDDuong");
});




router.get("/KhambenhBacSiBenhNhan", Authenticate, (req, res) =>
{
  var sql = `select b.MaBenhNhan, n.HoVaTenLot, n.Ten from BenhNhan b join NguoiDung n
  on b.TaiKhoan = n.TaiKhoan`;
  mysql.query(
    sql,
    (err, result) =>
    {
      if (err) return res.render("err", { err: err });
      res.render("BacSi/khambenhBacSiBenhNhan", { Flag: false, ListBenhNhan: result });
    }
  );
});


router.post("/KhambenhBacSiBenhNhan", Authenticate, (req, res) =>
{
  var sql = "call KhamBenh_BacSi_BenhNhan(?,?,?,?)";
  mysql.query(
    sql,
    [req.user.MaNhanVien, ...Object.values(req.body)],
    (err, result) =>
    {
      if (err) return res.render("err", { err: err });

      sql = `select b.MaBenhNhan, n.HoVaTenLot, n.Ten from BenhNhan b join NguoiDung n
      on b.TaiKhoan = n.TaiKhoan`;
      mysql.query(
        sql,
        (err, result) =>
        {
          if (err) return res.render("err", { err: err });
          res.render("BacSi/khambenhBacSiBenhNhan", { Flag: true, ListBenhNhan: result });
        }
      );
    }
  );
});



router.get("/DuaRaKQ", Authenticate, (req, res) =>
{
  var sql = `select b.MaBenhNhan, n.HoVaTenLot, n.Ten from BenhNhan b join NguoiDung n
  on b.TaiKhoan = n.TaiKhoan`;
  mysql.query(
    sql,
    (err, ListBenhNhan) =>
    {
      if (err) return res.render("err", { err: err });
      sql = "select ThoiGianKhamBenh from KhamBenh";
      mysql.query(sql,
        (err, ListThoiGianKhamBenh) =>
        {
          if (err) return res.render("err", { err: err });
          const convert = ListThoiGianKhamBenh.map((e) => formatDate(JSON.stringify(e.ThoiGianKhamBenh)))
          res.render("BacSi/duaraKQBacSiBenhNhan", {
            ListThoiGianKhamBenh: convert,
            ListBenhNhan,
            Flag: false
          });
        })
    }
  );
});

router.post("/DuaRaKQ", Authenticate, (req, res) =>
{
  var sql = "call DuaRaKQ_BacSi_BenhNhan(?,?,?,?)";
  mysql.query(
    sql,
    [req.user.MaNhanVien, ...Object.values(req.body)],
    (err, result) =>
    {
      if (err) return res.render("err", { err: err });
      var sql = `select b.MaBenhNhan, n.HoVaTenLot, n.Ten from BenhNhan b join NguoiDung n
      on b.TaiKhoan = n.TaiKhoan`;
      mysql.query(
        sql,
        (err, ListBenhNhan) =>
        {
          if (err) return res.render("err", { err: err });
          sql = "select ThoiGianKhamBenh from KhamBenh";
          mysql.query(sql,
            (err, ListThoiGianKhamBenh) =>
            {
              if (err) return res.render("err", { err: err });
              const convert = ListThoiGianKhamBenh.map((e) => formatDate(JSON.stringify(e.ThoiGianKhamBenh)))
              res.render("BacSi/duaraKQBacSiBenhNhan", {
                ListThoiGianKhamBenh: convert,
                ListBenhNhan,
                Flag: true
              });
            })
        }
      );

    }
  );
});



router.get("/Themthuoc", Authenticate, (req, res) =>
{
  res.render("BacSi/ThemThuoc", { Flag: false });
});

router.post("/Themthuoc", Authenticate, (req, res) =>
{
  var sql = "call ThemThuoc(?)";
  mysql.query(sql, [...Object.values(req.body)], (err, result) =>
  {
    if (err) return res.render("err", { err: err });
    res.render("BacSi/ThemThuoc", { Flag: true });
  });
});




router.get("/ThemThuocVaoKQ", Authenticate, (req, res) =>
{
  var sql = `select k.MaBenhNhan, n.HoVaTenLot, n.Ten from KQChanDoan k join BenhNhan b on 
  b.MaBenhNhan = k.MaBenhNhan join NguoiDung n on b.TaiKhoan = n.TaiKhoan`;
  mysql.query(
    sql,
    (err, ListBenhNhan) =>
    {
      if (err) return res.render("err", { err: err });
      sql = "select ThoiGianKhamBenh from KQChanDoan";
      mysql.query(sql,
        (err, ListThoiGianKhamBenh) =>
        {
          if (err) return res.render("err", { err: err });
          const convertA = ListThoiGianKhamBenh.map((e) => formatDate(JSON.stringify(e.ThoiGianKhamBenh)))
          sql = "select ThoiGianRaKQ from KQChanDoan"
          mysql.query(sql, (err, ListThoiGianRaKQ) =>
          {
            if (err) return res.render("err", { err: err });
            const convertB = ListThoiGianRaKQ.map((e) => formatDate(JSON.stringify(e.ThoiGianRaKQ)))
            sql = "select * from Thuoc"
            mysql.query(sql, (err, ListThuoc) =>
            {
              if (err) return res.render("err", { err: err });
              res.render("BacSi/ThemThuocVaoKQ", {
                ListBenhNhan,
                ListThuoc,
                ListThoiGianRaKQ: convertB,
                ListThoiGianKhamBenh: convertA,
                Flag: false
              });
            })
          })
        })
    }
  );
});

router.post("/ThemThuocVaoKQ", Authenticate, (req, res) =>
{
  var sql = "call ThemThuocVaoKQ(?,?,?,?,?,?,?,?)";
  mysql.query(
    sql,
    [req.user.MaNhanVien, ...Object.values(req.body)],
    (err, result) =>
    {
      if (err) return res.render("err", { err: err });
      sql = `select k.MaBenhNhan, n.HoVaTenLot, n.Ten from KQChanDoan k join BenhNhan b on 
      b.MaBenhNhan = k.MaBenhNhan join NguoiDung n on b.TaiKhoan = n.TaiKhoan`;
      mysql.query(
        sql,
        (err, ListBenhNhan) =>
        {
          if (err) return res.render("err", { err: err });
          sql = "select ThoiGianKhamBenh from KQChanDoan";
          mysql.query(sql,
            (err, ListThoiGianKhamBenh) =>
            {
              if (err) return res.render("err", { err: err });
              const convertA = ListThoiGianKhamBenh.map((e) => formatDate(JSON.stringify(e.ThoiGianKhamBenh)))
              sql = "select ThoiGianRaKQ from KQChanDoan"
              mysql.query(sql, (err, ListThoiGianRaKQ) =>
              {
                if (err) return res.render("err", { err: err });
                const convertB = ListThoiGianRaKQ.map((e) => formatDate(JSON.stringify(e.ThoiGianRaKQ)))
                sql = "select * from Thuoc"
                mysql.query(sql, (err, ListThuoc) =>
                {
                  if (err) return res.render("err", { err: err });
                  res.render("BacSi/ThemThuocVaoKQ", {
                    ListBenhNhan,
                    ListThuoc,
                    ListThoiGianRaKQ: convertB,
                    ListThoiGianKhamBenh: convertA,
                    Flag: true
                  });
                })
              })
            })
        }
      );
    }
  );
});

router.get("/Thembenh", Authenticate, (req, res) =>
{
  res.render("BacSi/ThemBenh", { Flag: false });
});

router.post("/Thembenh", Authenticate, (req, res) =>
{
  var sql = "call Thembenh(?)";
  mysql.query(sql, [...Object.values(req.body)], (err, result) =>
  {
    if (err) return res.render("err", { err: err });
    res.render("BacSi/ThemBenh", { Flag: true });
  });
});




router.get("/ThemKQBenh", Authenticate, (req, res) =>
{
  var sql = `select k.MaBenhNhan, n.HoVaTenLot, n.Ten from KQChanDoan k join BenhNhan b on 
  b.MaBenhNhan = k.MaBenhNhan join NguoiDung n on b.TaiKhoan = n.TaiKhoan`;
  mysql.query(
    sql,
    (err, ListBenhNhan) =>
    {
      if (err) return res.render("err", { err: err });
      sql = "select ThoiGianKhamBenh from KQChanDoan";
      mysql.query(sql,
        (err, ListThoiGianKhamBenh) =>
        {
          if (err) return res.render("err", { err: err });
          const convertA = ListThoiGianKhamBenh.map((e) => formatDate(JSON.stringify(e.ThoiGianKhamBenh)))
          sql = "select ThoiGianRaKQ from KQChanDoan"
          mysql.query(sql, (err, ListThoiGianRaKQ) =>
          {
            if (err) return res.render("err", { err: err });
            const convertB = ListThoiGianRaKQ.map((e) => formatDate(JSON.stringify(e.ThoiGianRaKQ)))
            sql = "select * from Benh"
            mysql.query(sql, (err, ListBenh) =>
            {
              if (err) return res.render("err", { err: err });
              res.render("BacSi/ThemKQBenh", {
                ListBenhNhan,
                ListBenh,
                ListThoiGianRaKQ: convertB,
                ListThoiGianKhamBenh: convertA,
                Flag: false
              });
            })
          })
        })
    }
  );
});

router.post("/ThemKQBenh", Authenticate, (req, res) =>
{
  var sql = "call ThemKQBenh(?,?,?,?,?)";
  mysql.query(
    sql,
    [req.user.MaNhanVien, ...Object.values(req.body)],
    (err, result) =>
    {
      if (err) return res.render("err", { err: err });
      var sql = `select BenhNhan.MaBenhNhan, NguoiDung.HoVaTenLot, NguoiDung.Ten from BenhNhan join NguoiDung 
      on BenhNhan.TaiKhoan = NguoiDung.TaiKhoan where BenhNhan.TaiKhoan like 'bn%'`;
      mysql.query(
        sql,
        (err, ListBenhNhan) =>
        {
          if (err) return res.render("err", { err: err });
          sql = "select ThoiGianKhamBenh from KhamBenh";
          mysql.query(sql,
            (err, ListThoiGianKhamBenh) =>
            {
              if (err) return res.render("err", { err: err });
              const convertA = ListThoiGianKhamBenh.map((e) => formatDate(JSON.stringify(e.ThoiGianKhamBenh)))
              sql = "select ThoiGianKhamBenh from KQBenh"
              mysql.query(sql, (err, ListThoiGianRaKQ) =>
              {
                if (err) return res.render("err", { err: err });
                const convertB = ListThoiGianRaKQ.map((e) => formatDate(JSON.stringify(e.ThoiGianKhamBenh)))
                sql = "select * from Benh"
                mysql.query(sql, (err, ListBenh) =>
                {
                  if (err) return res.render("err", { err: err });
                  res.render("BacSi/ThemKQBenh", {
                    ListBenhNhan,
                    ListBenh,
                    ListThoiGianRaKQ: convertB,
                    ListThoiGianKhamBenh: convertA,
                    Flag: true
                  });
                })
              })
            })
        }
      );
    }
  );
});

router.get("/ThemKQThuoc", Authenticate, (req, res) =>
{
  res.render("BacSi/ThemKQThuoc", { Flag: false, Error: false });
});

router.post("/ThemKQThuoc", Authenticate, (req, res) =>
{
  const { value, error } = Joi.validate(req.body, ThemKQThuoc);
  if (error)
  {
    res.render("BacSi/ThemKQThuoc", {
      Flag: false,
      Error: error.details[0].message,
    });
  }
  var sql = "call ThemKQThuoc(?,?,?,?,?,?,?,?)";
  mysql.query(
    sql,
    [req.user.MaNhanVien, ...Object.values(value)],
    (err, result) =>
    {
      if (err) return res.render("err", { err: err });
      sql = `select BenhNhan.MaBenhNhan, NguoiDung.HoVaTenLot, NguoiDung.Ten from BenhNhan join NguoiDung 
      on BenhNhan.TaiKhoan = NguoiDung.TaiKhoan where BenhNhan.TaiKhoan like 'bn%'`;
      mysql.query(
        sql,
        (err, ListBenhNhan) =>
        {
          if (err) return res.render("err", { err: err });
          sql = "select ThoiGianKhamBenh from KhamBenh";
          mysql.query(sql,
            (err, ListThoiGianKhamBenh) =>
            {
              if (err) return res.render("err", { err: err });
              const convertA = ListThoiGianKhamBenh.map((e) => formatDate(JSON.stringify(e.ThoiGianKhamBenh)))
              sql = "select ThoiGianKhamBenh from KQBenh"
              mysql.query(sql, (err, ListThoiGianRaKQ) =>
              {
                if (err) return res.render("err", { err: err });
                const convertB = ListThoiGianRaKQ.map((e) => formatDate(JSON.stringify(e.ThoiGianKhamBenh)))
                sql = "select * from Thuoc"
                mysql.query(sql, (err, ListThuoc) =>
                {
                  if (err) return res.render("err", { err: err });
                  res.render("BacSi/ThemKQThuoc", {
                    ListBenhNhan,
                    ListThuoc,
                    ListThoiGianRaKQ: convertB,
                    ListThoiGianKhamBenh: convertA,
                    Error: false,
                    Flag: true
                  });
                })
              })
            })
        }
      );

      res.render("BacSi/ThemKQThuoc", { Flag: true, Error: false });
    }
  );
});





router.get("/ThemCDDDuong", Authenticate, (req, res) =>
{
  res.render("BacSi/ThemCDDDuong", { Flag: false });
});

router.post("/ThemCDDDuong", Authenticate, (req, res) =>
{
  var sql = "call ThemCDDDuong(?)";
  mysql.query(sql, [...Object.values(req.body)], (err, result) =>
  {
    if (err) return res.render("err", { err: err });
    res.render("BacSi/ThemCDDDuong", { Flag: true });
  });
});







router.get("/ThemKQCDDDuong", Authenticate, (req, res) =>
{
  var sql = `select k.MaBenhNhan, n.HoVaTenLot, n.Ten from KQChanDoan k join BenhNhan b on 
  b.MaBenhNhan = k.MaBenhNhan join NguoiDung n on b.TaiKhoan = n.TaiKhoan`;
  mysql.query(
    sql,
    (err, ListBenhNhan) =>
    {
      if (err) return res.render("err", { err: err });
      sql = "select ThoiGianKhamBenh from KQChanDoan";
      mysql.query(sql,
        (err, ListThoiGianKhamBenh) =>
        {
          if (err) return res.render("err", { err: err });
          const convertA = ListThoiGianKhamBenh.map((e) => formatDate(JSON.stringify(e.ThoiGianKhamBenh)))
          sql = "select ThoiGianRaKQ from KQChanDoan"
          mysql.query(sql, (err, ListThoiGianRaKQ) =>
          {
            if (err) return res.render("err", { err: err });
            const convertB = ListThoiGianRaKQ.map((e) => formatDate(JSON.stringify(e.ThoiGianRaKQ)))
            sql = "select * from CDDDuong"
            mysql.query(sql, (err, ListCDDDuong) =>
            {
              if (err) return res.render("err", { err: err });
              res.render("BacSi/ThemKQCDDDuong", {
                ListBenhNhan,
                ListCDDDuong,
                ListThoiGianRaKQ: convertB,
                ListThoiGianKhamBenh: convertA,
                Flag: false
              });
            })
          })
        })
    }
  );
});

router.post("/ThemKQCDDDuong", Authenticate, (req, res) =>
{
  var sql = "call ThemKQCDDDuong(?,?,?,?,?)";
  mysql.query(
    sql,
    [req.user.MaNhanVien, ...Object.values(req.body)],
    (err, result) =>
    {
      if (err) return res.render("err", { err: err });
      var sql = `select k.MaBenhNhan, n.HoVaTenLot, n.Ten from KQChanDoan k join BenhNhan b on 
      b.MaBenhNhan = k.MaBenhNhan join NguoiDung n on b.TaiKhoan = n.TaiKhoan`;
      mysql.query(
        sql,
        (err, ListBenhNhan) =>
        {
          if (err) return res.render("err", { err: err });
          sql = "select ThoiGianKhamBenh from KQChanDoan";
          mysql.query(sql,
            (err, ListThoiGianKhamBenh) =>
            {
              if (err) return res.render("err", { err: err });
              const convertA = ListThoiGianKhamBenh.map((e) => formatDate(JSON.stringify(e.ThoiGianKhamBenh)))
              sql = "select ThoiGianRaKQ from KQChanDoan"
              mysql.query(sql, (err, ListThoiGianRaKQ) =>
              {
                if (err) return res.render("err", { err: err });
                const convertB = ListThoiGianRaKQ.map((e) => formatDate(JSON.stringify(e.ThoiGianRaKQ)))
                sql = "select * from CDDDuong"
                mysql.query(sql, (err, ListCDDDuong) =>
                {
                  if (err) return res.render("err", { err: err });
                  res.render("BacSi/ThemKQCDDDuong", {
                    ListBenhNhan,
                    ListCDDDuong,
                    ListThoiGianRaKQ: convertB,
                    ListThoiGianKhamBenh: convertA,
                    Flag: true
                  });
                })
              })
            })
        }
      );
    }
  );
});















router.get("/ThemBenhAn", Authenticate, (req, res) =>
{

  var sql = `select k.MaBenhNhan, n.HoVaTenLot, n.Ten from KQChanDoan k join BenhNhan b on 
  b.MaBenhNhan = k.MaBenhNhan join NguoiDung n on b.TaiKhoan = n.TaiKhoan`;
  mysql.query(
    sql,
    (err, ListBenhNhan) =>
    {
      if (err) return res.render("err", { err: err });
      sql = "select ThoiGianKhamBenh from KQChanDoan";
      mysql.query(sql,
        (err, ListThoiGianKhamBenh) =>
        {
          if (err) return res.render("err", { err: err });
          const convertA = ListThoiGianKhamBenh.map((e) => formatDate(JSON.stringify(e.ThoiGianKhamBenh)))
          sql = "select ThoiGianRaKQ from KQChanDoan"
          mysql.query(sql, (err, ListThoiGianRaKQ) =>
          {
            if (err) return res.render("err", { err: err });
            const convertB = ListThoiGianRaKQ.map((e) => formatDate(JSON.stringify(e.ThoiGianRaKQ)))
            sql = `select k.MaNhanVien, n.HoVaTenLot, n.Ten from KQChanDoan k join NhanVien v on 
              v.MaNhanVien = k.MaNhanVien join NguoiDung n on v.TaiKhoan = n.TaiKhoan`;
            mysql.query(sql, (err, ListNhanVien) =>
            {
              if (err) return res.render("err", { err: err });
              res.render("BacSi/ThemBenhAn", {
                ListNhanVien,
                ListBenhNhan,
                ListThoiGianRaKQ: convertB,
                ListThoiGianKhamBenh: convertA,
                Flag: false
              });
            })

          })
        })
    })

});

router.post("/ThemBenhAn", Authenticate, (req, res) =>
{
  var sql = "call ThemBenhAn(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  mysql.query(sql, [...Object.values(req.body)], (err, result) =>
  {
    if (err) return res.render("err", { err: err });
    var sql = `select k.MaBenhNhan, n.HoVaTenLot, n.Ten from KQChanDoan k join BenhNhan b on 
    b.MaBenhNhan = k.MaBenhNhan join NguoiDung n on b.TaiKhoan = n.TaiKhoan`;
    mysql.query(
      sql,
      (err, ListBenhNhan) =>
      {
        if (err) return res.render("err", { err: err });
        sql = "select ThoiGianKhamBenh from KQChanDoan";
        mysql.query(sql,
          (err, ListThoiGianKhamBenh) =>
          {
            if (err) return res.render("err", { err: err });
            const convertA = ListThoiGianKhamBenh.map((e) => formatDate(JSON.stringify(e.ThoiGianKhamBenh)))
            sql = "select ThoiGianRaKQ from KQChanDoan"
            mysql.query(sql, (err, ListThoiGianRaKQ) =>
            {
              if (err) return res.render("err", { err: err });
              const convertB = ListThoiGianRaKQ.map((e) => formatDate(JSON.stringify(e.ThoiGianRaKQ)))
              sql = `select k.MaNhanVien, n.HoVaTenLot, n.Ten from KQChanDoan k join NhanVien v on 
                v.MaNhanVien = k.MaNhanVien join NguoiDung n on v.TaiKhoan = n.TaiKhoan`;
              mysql.query(sql, (err, ListNhanVien) =>
              {
                if (err) return res.render("err", { err: err });
                res.render("BacSi/ThemBenhAn", {
                  ListNhanVien,
                  ListBenhNhan,
                  ListThoiGianRaKQ: convertB,
                  ListThoiGianKhamBenh: convertA,
                  Flag: true
                });
              })

            })
          })
      })

  });
});

router.get("/NhapVien", Authenticate, (req, res) =>
{
  var sql = `select k.MaBenhNhan, n.HoVaTenLot, n.Ten from KQChanDoan k join BenhNhan b on 
  b.MaBenhNhan = k.MaBenhNhan join NguoiDung n on b.TaiKhoan = n.TaiKhoan`;
  mysql.query(
    sql,
    (err, ListBenhNhan) =>
    {
      if (err) return res.render("err", { err: err });
      sql = "select ThoiGianKhamBenh from KQChanDoan";
      mysql.query(sql,
        (err, ListThoiGianKhamBenh) =>
        {
          if (err) return res.render("err", { err: err });
          const convertA = ListThoiGianKhamBenh.map((e) => formatDate(JSON.stringify(e.ThoiGianKhamBenh)))
          sql = "select ThoiGianRaKQ from KQChanDoan"
          mysql.query(sql, (err, ListThoiGianRaKQ) =>
          {
            if (err) return res.render("err", { err: err });
            const convertB = ListThoiGianRaKQ.map((e) => formatDate(JSON.stringify(e.ThoiGianRaKQ)))
            res.render("BacSi/NhapVien", {
              ListBenhNhan,
              ListThoiGianRaKQ: convertB,
              ListThoiGianKhamBenh: convertA,
              Flag: false
            });
          })
        })
    })
}
);


router.post("/NhapVien", Authenticate, (req, res) =>
{
  var sql = "call NhapVien(?,?,?,?,?,?,?,?)";
  mysql.query(
    sql,
    [req.user.MaNhanVien, ...Object.values(req.body)],
    (err, result) =>
    {
      if (err) return res.render("err", { err: err });
      var sql = `select k.MaBenhNhan, n.HoVaTenLot, n.Ten from KQChanDoan k join BenhNhan b on 
      b.MaBenhNhan = k.MaBenhNhan join NguoiDung n on b.TaiKhoan = n.TaiKhoan`;
      mysql.query(
        sql,
        (err, ListBenhNhan) =>
        {
          if (err) return res.render("err", { err: err });
          sql = "select ThoiGianKhamBenh from KQChanDoan";
          mysql.query(sql,
            (err, ListThoiGianKhamBenh) =>
            {
              if (err) return res.render("err", { err: err });
              const convertA = ListThoiGianKhamBenh.map((e) => formatDate(JSON.stringify(e.ThoiGianKhamBenh)))
              sql = "select ThoiGianRaKQ from KQChanDoan"
              mysql.query(sql, (err, ListThoiGianRaKQ) =>
              {
                if (err) return res.render("err", { err: err });
                const convertB = ListThoiGianRaKQ.map((e) => formatDate(JSON.stringify(e.ThoiGianRaKQ)))
                res.render("BacSi/NhapVien", {
                  ListBenhNhan,
                  ListThoiGianRaKQ: convertB,
                  ListThoiGianKhamBenh: convertA,
                  Flag: true
                });
              })
            })
        })
    }
  );
});

router.get("/XuatVien", Authenticate, (req, res) =>
{
  res.render("BacSi/XuatVien", { Flag: false, Error: false });
});

router.post("/XuatVien", Authenticate, (req, res) =>
{
  const { value, error } = Joi.validate(req.body, XuatVien);
  if (error)
  {
    res.render("BacSi/XuatVien", {
      Flag: false,
      Error: error.details[0].message,
    });
  }
  const {
    NVMaNhanVien,
    NVMaBenhNhan,
    NVThoiGianKhamBenh,
    NVThoiGianRaKQ,
    ThoiGianNhapVien,
    ThoiGianXuatVien,
    TinHTrangXuatVien,
    GhiChuXuatVien,
    MaBenhNhan,
    ThoiGianKhamBenh,
    ThoiGianRaKQ,
  } = value;
  var sql = "call XuatVien(?,?,?,?,?,?,?,?,?,?,?,?)";
  mysql.query(
    sql,
    [
      NVMaNhanVien,
      NVMaBenhNhan,
      NVThoiGianKhamBenh,
      NVThoiGianRaKQ,
      ThoiGianNhapVien,
      ThoiGianXuatVien,
      TinHTrangXuatVien,
      GhiChuXuatVien,
      req.user.MaNhanVien,
      MaBenhNhan,
      ThoiGianKhamBenh,
      ThoiGianRaKQ,
    ],
    (err, result) =>
    {
      if (err) return res.render("err", { err: err });
      res.render("BacSi/XuatVien", { Flag: true, Error: false });
    }
  );
});



router.get("/DsBenhNhanPhuTrach", Authenticate, (req, res) =>
{
  var sql = "select Distinct Date(ThoiGianKhamBenh) as ThoiGianKhamBenh from KhamBenh where MaNhanVien = ?"
  res.render("BacSi/DsBenhNhanPhuTrach", {
    DsBenhNhanPhuTrach: null,
    Ngay: null
  });
})

router.post("/DsBenhNhanPhuTrach", Authenticate, (req, res) =>
{
  var sql = "call DSBenhNhan_PhuTrach(?,?)";
  mysql.query(
    sql,
    [req.user.MaNhanVien, ...Object.values(req.body)],
    (err, result) =>
    {
      console.log(Object.assign({
        DsBenhNhanPhuTrach: result
      }, req.body))
      if (err) return res.render("err", { err: err });
      res.render("BacSi/DsBenhNhanPhuTrach", Object.assign({
        DsBenhNhanPhuTrach: result
      }, req.body));
    })
});


router.get("/DsChanDoanBenh", Authenticate, (req, res) =>
{
  sql = 'call DSBenhNhan_PhuTrach_All(?)';
  mysql.query(sql, [req.user.MaNhanVien],
    (err, ListBenhNhan) =>
    {
      if (err) return res.render("err", { err: err });
      res.render("BacSi/DsChanDoanBenh", {
        ListBenhNhan: ListBenhNhan[0],
        DsChanDoanBenh: null,
        MaBenhNhan: null
      });
    })
}
);

router.post("/DsChanDoanBenh", Authenticate, (req, res) =>
{
  var sql = "call DSChanDoan_Benh(?,?)";
  mysql.query(
    sql,
    [req.user.MaNhanVien, ...Object.values(req.body)],
    (err, result) =>
    {
      if (err) return res.render("err", { err: err });
      sql = 'call DSBenhNhan_PhuTrach_All(?)';
      mysql.query(sql, [req.user.MaNhanVien],
        (err, ListBenhNhan) =>
        {
          if (err) return res.render("err", { err: err });
          console.log(result);
          res.render("BacSi/DsChanDoanBenh", Object.assign({
            ListBenhNhan: ListBenhNhan[0],
            DsChanDoanBenh: result[0],
          }, req.body));
        })
}
)})

router.get("/DsThuocBacSi", Authenticate, (req, res) =>
{
  var sql = `select k.MaBenhNhan, n.HoVaTenLot, n.Ten from KQThuoc k join BenhNhan b on 
  b.MaBenhNhan = k.MaBenhNhan join NguoiDung n on b.TaiKhoan = n.TaiKhoan`;
  mysql.query(sql,
    (err, ListBenhNhan) =>
    {
      if (err) return res.render("err", { err: err });
      res.render("BacSi/DsThuocBacSi", {
        Error: false,
        ListBenhNhan,
        DsThuocBacSi: null,
      });
    })
})

router.post("/DsThuocBacSi", Authenticate, (req, res) =>
{
  const { value, error } = Joi.validate(req.body, DsThuocBacSi);
  if (error)
  {
    res.render("BacSi/DsThuocBacSi", {
      Flag: false,
      Error: error.details[0].message,
    });
  }
  var sql = "call DSThuoc_BacSi(?,?,?,?)";
  mysql.query(
    sql,
    [req.user.MaNhanVien, ...Object.values(value)],
    (err, result) =>
    {
      if (err) return res.render("err", { err: err });
      var sql = `select k.MaBenhNhan, n.HoVaTenLot, n.Ten from KQThuoc k join BenhNhan b on 
      b.MaBenhNhan = k.MaBenhNhan join NguoiDung n on b.TaiKhoan = n.TaiKhoan`;
      mysql.query(sql,
        (err, ListBenhNhan) =>
        {
          if (err) return res.render("err", { err: err });
          res.render("BacSi/DsThuocBacSi", {
            Error: false,
            ListBenhNhan,
            DsThuocBacSi: result,
          });
        })
    })
})


router.get("/TaoXN", Authenticate, (req, res) =>
{
  var sql = `select k.MaBenhNhan, n.HoVaTenLot, n.Ten from KhamBenh k join BenhNhan b on 
  b.MaBenhNhan = k.MaBenhNhan join NguoiDung n on b.TaiKhoan = n.TaiKhoan`;
  mysql.query(sql, (err, MaBenhNhan) =>
  {
    if (err) return res.render("err", { err: err });
    sql = "select ThoiGianKhamBenh from KhamBenh"
    mysql.query(sql, (err, ThoiGianKhamBenh) =>
    {
      const convert = ThoiGianKhamBenh.map((e) => formatDate(JSON.stringify(e.ThoiGianKhamBenh)))
      if (err) return res.render("err", { err: err });
      sql = `select k.MaNhanVien, n.HoVaTenLot, n.Ten from KhamBenh k join NhanVien v on 
      v.MaNhanVien = k.MaNhanVien join NguoiDung n on v.TaiKhoan = n.TaiKhoan`;
      mysql.query(sql, (err, MaNhanVien) =>
      {
        if (err) return res.render("err", { err: err });
        sql = `select b.MaNhanVien, n.HoVaTenLot, n.Ten from BacSi b join NhanVien v on 
        v.MaNhanVien = b.MaNhanVien join NguoiDung n on v.TaiKhoan = n.TaiKhoan`;
        mysql.query(sql, (err, MaNhanVienThucHien) =>
        {
          if (err) return res.render("err", { err: err });
          res.render("BacSi/TaoPhim", {
            Flag: false,
            ThoiGianKhamBenh: convert,
            MaBenhNhan,
            MaNhanVien,
            MaNhanVienThucHien
          });
        })

      })
    })
  })
})



router.post("/TaoXN", Authenticate, (req, res) =>
{
  const { value, error } = Joi.validate(req.body, TaoXetNghiem);

  if (error)
  {
    res.render("BacSi/TaoXN", { Flag: false, Error: error.details[0].message });
  }
  var sql = "call taoXetNghiem(?,?,?,?,?,?)";
  mysql.query(sql, [...Object.values(value)], (err, result) =>
  {
    if (err) return res.render("err", { err: err });

    var sql = `select k.MaBenhNhan, n.HoVaTenLot, n.Ten from KhamBenh k join BenhNhan b on 
    b.MaBenhNhan = k.MaBenhNhan join NguoiDung n on b.TaiKhoan = n.TaiKhoan`;
    mysql.query(sql, (err, MaBenhNhan) =>
    {
      if (err) return res.render("err", { err: err });
      sql = "select ThoiGianKhamBenh from KhamBenh"
      mysql.query(sql, (err, ThoiGianKhamBenh) =>
      {
        const convert = ThoiGianKhamBenh.map((e) => formatDate(JSON.stringify(e.ThoiGianKhamBenh)))
        if (err) return res.render("err", { err: err });
        sql = `select k.MaNhanVien, n.HoVaTenLot, n.Ten from KhamBenh k join NhanVien v on 
        v.MaNhanVien = k.MaNhanVien join NguoiDung n on v.TaiKhoan = n.TaiKhoan`;
        mysql.query(sql, (err, MaNhanVien) =>
        {
          if (err) return res.render("err", { err: err });
          sql = `select b.MaNhanVien, n.HoVaTenLot, n.Ten from BacSi b join NhanVien v on 
          v.MaNhanVien = b.MaNhanVien join NguoiDung n on v.TaiKhoan = n.TaiKhoan`;
          mysql.query(sql, (err, MaNhanVienThucHien) =>
          {
            if (err) return res.render("err", { err: err });
            res.render("BacSi/TaoPhim", {
              Flag: true,
              ThoiGianKhamBenh: convert,
              MaBenhNhan,
              MaNhanVien,
              MaNhanVienThucHien
            });
          })

        })
      })
    })
  });
});

router.get("/TaoChiSoXN", Authenticate, (req, res) =>
{
  res.render("BacSi/TaoChiSoXN", { Flag: false, Error: false });
});

router.post("/TaoChiSoXN", Authenticate, (req, res) =>
{
  var sql = "call taoChiSoXN(?,?)";
  mysql.query(sql, [...Object.values(req.body)], (err, result) =>
  {
    if (err) return res.render("err", { err: err });

    res.render("BacSi/TaoChiSoXN", { Flag: true });
  });
});


router.get("/TaoChiSo", Authenticate, (req, res) =>
{
  var sql = "select TenXetNghiem from XetNghiem";
  mysql.query(sql, (err, result) =>
  {
    if (err) return res.render("err", { err: err });
    sql = "select ThoiGianKhamBenh from XetNghiem";
    mysql.query(sql, (err, ThoiGianKhamBenh) =>
    {
      if (err) return res.render("err", { err: err });
      const convert = ThoiGianKhamBenh.map((e) => formatDate(JSON.stringify(e.ThoiGianKhamBenh)))
      sql = "select MaChiSoXetNghiem from ChiSoXN";
      mysql.query(sql, (err, MaChiSoXetNghiem) =>
      {
        if (err) return res.render("err", { err: err });
        sql = `select x.MaBenhNhan, n.HoVaTenLot, n.Ten from XetNghiem x join BenhNhan b on 
        b.MaBenhNhan = x.MaBenhNhan join NguoiDung n on b.TaiKhoan = n.TaiKhoan`;
        mysql.query(sql, (err, BenhNhan) =>
        {
          if (err) return res.render("err", { err: err });
          res.render("BacSi/TaoChiSo", {
            Flag: false,
            result,
            ThoiGianKhamBenh: convert,
            MaChiSoXetNghiem,
            BenhNhan
          });
        })
      })
    })
  })

});


router.post("/TaoChiSo", Authenticate, (req, res) =>
{
  const {
    TenChiSo,
    TenXetNghiem,
    ThoiGianKhamBenh,
    MaBenhNhan,
    KetQua,
    MaChiSoXetNghiem,
  } = req.body;
  var sql = "call taoChiSo(?,?,?,?,?,?,?)";
  mysql.query(
    sql,
    [
      TenChiSo,
      TenXetNghiem,
      ThoiGianKhamBenh,
      req.user.MaNhanVien,
      MaBenhNhan,
      KetQua,
      MaChiSoXetNghiem,
    ],
    (err) =>
    {
      var sql = "select TenXetNghiem from XetNghiem";
      mysql.query(sql, (err, result) =>
      {
        if (err) return res.render("err", { err: err });
        sql = "select ThoiGianKhamBenh from XetNghiem";
        mysql.query(sql, (err, ThoiGianKhamBenh) =>
        {
          if (err) return res.render("err", { err: err });
          const convert = ThoiGianKhamBenh.map((e) => formatDate(JSON.stringify(e.ThoiGianKhamBenh)))
          sql = "select MaChiSoXetNghiem from ChiSoXN";
          mysql.query(sql, (err, MaChiSoXetNghiem) =>
          {
            if (err) return res.render("err", { err: err });
            sql = `select x.MaBenhNhan, n.HoVaTenLot, n.Ten from XetNghiem x join BenhNhan b on 
            b.MaBenhNhan = x.MaBenhNhan join NguoiDung n on b.TaiKhoan = n.TaiKhoan`;
            mysql.query(sql, (err, BenhNhan) =>
            {
              if (err) return res.render("err", { err: err });
              res.render("BacSi/TaoChiSo", {
                Flag: true,
                result,
                ThoiGianKhamBenh: convert,
                MaChiSoXetNghiem,
                BenhNhan
              });
            })
          })
        })
      })
    }
  );
});

router.get("/DsXetNghiemBacSi", Authenticate, (req, res) =>
{
  sql = "select MaBenhNhan from XetNghiem"
  mysql.query(sql, (err, ListBenhNhan) =>
  {
    if (err) return res.render("err", { err: err });
    res.render("BacSi/DsXetNghiemBacSi", {
      DsXetNghiemBacSi: null,
      ListBenhNhan,
    });
  })
})


router.post("/DsXetNghiemBacSi", Authenticate, (req, res) =>
{
  var sql = "call DSXetNghiem_BacSi(?,?,?,?)";
  mysql.query(
    sql,
    [req.user.MaNhanVien, ...Object.values(req.body)],
    (err, result) =>
    {
      if (err) return res.render("err", { err: err });
      sql = "select MaBenhNhan from XetNghiem"
      mysql.query(sql, (err, ListBenhNhan) =>
      {
        if (err) return res.render("err", { err: err });
        res.render("BacSi/DsXetNghiemBacSi", {
          DsXetNghiemBacSi: result,
          ListBenhNhan,
        });
      })
    })
}
);



router.get("/TaoPhim", Authenticate, (req, res) =>
{
  var sql = `select k.MaBenhNhan, n.HoVaTenLot, n.Ten from KhamBenh k join BenhNhan b on 
  b.MaBenhNhan = k.MaBenhNhan join NguoiDung n on b.TaiKhoan = n.TaiKhoan`;
  mysql.query(sql, (err, MaBenhNhan) =>
  {
    if (err) return res.render("err", { err: err });
    sql = "select ThoiGianKhamBenh from KhamBenh"
    mysql.query(sql, (err, ThoiGianKhamBenh) =>
    {
      const convert = ThoiGianKhamBenh.map((e) => formatDate(JSON.stringify(e.ThoiGianKhamBenh)))
      if (err) return res.render("err", { err: err });
      sql = `select k.MaNhanVien, n.HoVaTenLot, n.Ten from KhamBenh k join NhanVien v on 
      v.MaNhanVien = k.MaNhanVien join NguoiDung n on v.TaiKhoan = n.TaiKhoan`;
      mysql.query(sql, (err, MaNhanVien) =>
      {
        if (err) return res.render("err", { err: err });
        sql = `select b.MaNhanVien, n.HoVaTenLot, n.Ten from BacSi b join NhanVien v on 
        v.MaNhanVien = b.MaNhanVien join NguoiDung n on v.TaiKhoan = n.TaiKhoan`;
        mysql.query(sql, (err, MaNhanVienThucHien) =>
        {
          if (err) return res.render("err", { err: err });
          res.render("BacSi/TaoPhim", {
            Error: false,
            Flag: false,
            ThoiGianKhamBenh: convert,
            MaBenhNhan,
            MaNhanVien,
            MaNhanVienThucHien
          });

        })

      })
    })
  })
});

router.post("/TaoPhim", Authenticate, (req, res) =>
{
  var sql = "call taoPhim(?,?,?,?,?,?)";
  mysql.query(sql, [...Object.values(req.body)], (err, a) =>
  {
    if (err) return res.render("err", { err: err });
    var sql = `select k.MaBenhNhan, n.HoVaTenLot, n.Ten from KhamBenh k join BenhNhan b on 
    b.MaBenhNhan = k.MaBenhNhan join NguoiDung n on b.TaiKhoan = n.TaiKhoan`;
    mysql.query(sql, (err, MaBenhNhan) =>
    {
      if (err) return res.render("err", { err: err });
      sql = "select ThoiGianKhamBenh from KhamBenh"
      mysql.query(sql, (err, ThoiGianKhamBenh) =>
      {
        const convert = ThoiGianKhamBenh.map((e) => formatDate(JSON.stringify(e.ThoiGianKhamBenh)))
        if (err) return res.render("err", { err: err });
        sql = `select k.MaNhanVien, n.HoVaTenLot, n.Ten from KhamBenh k join NhanVien v on 
        v.MaNhanVien = k.MaNhanVien join NguoiDung n on v.TaiKhoan = n.TaiKhoan`;
        mysql.query(sql, (err, MaNhanVien) =>
        {
          if (err) return res.render("err", { err: err });
          sql = `select b.MaNhanVien, n.HoVaTenLot, n.Ten from BacSi b join NhanVien v on 
          v.MaNhanVien = b.MaNhanVien join NguoiDung n on v.TaiKhoan = n.TaiKhoan`;
          mysql.query(sql, (err, MaNhanVienThucHien) =>
          {
            if (err) return res.render("err", { err: err });
            res.render("BacSi/TaoPhim", {
              Error: false,
              Flag: true,
              ThoiGianKhamBenh: convert,
              MaBenhNhan,
              MaNhanVien,
              MaNhanVienThucHien
            });

          })

        })
      })
    })
  });
});




router.get("/DSChupPhimBacSi", Authenticate, (req, res) =>
{
  var sql = `select p.MaBenhNhan, n.HoVaTenLot, n.Ten from Phim p join BenhNhan b on 
  b.MaBenhNhan = p.MaBenhNhan join NguoiDung n on b.TaiKhoan = n.TaiKhoan`;
  mysql.query(sql, (err, ListBenhNhan) =>
  {
    if (err) return res.render("err", { err: err });
    res.render("BacSi/DSChupPhimBacSi", {
      ListBenhNhan,
      DSChupPhimBacSi: null,
    });
  })
})

router.post("/DSChupPhimBacSi", Authenticate, (req, res) =>
{
  var sql = "call DSChupPhim_BacSi(?, ?, ?, ?)";
  mysql.query(
    sql,
    [req.user.MaNhanVien, ...Object.values(req.body)],
    (err, result) =>
    {
      if (err) return res.render("err", { err: err });
      var sql = `select p.MaBenhNhan, n.HoVaTenLot, n.Ten from Phim p join BenhNhan b on 
  b.MaBenhNhan = p.MaBenhNhan join NguoiDung n on b.TaiKhoan = n.TaiKhoan`;
      mysql.query(
        sql,
        (err, ListBenhNhan) =>
        {
          if (err) return res.render("err", { err: err });
          res.render("BacSi/DSChupPhimBacSi", {
            ListBenhNhan,
            DSChupPhimBacSi: result,
          });
        })
    }
  );
}
);


// router.get("/DSChupPhimBacSi", Authenticate, (req, res) => {
//   res.render("BacSi/DSChupPhimBacSi", { Error: false, DSChupPhimBacSi: null });
// });

// router.post("/DSChupPhimBacSi", Authenticate, (req, res) => {
//   const { value, error } = Joi.validate(req.body, DSChupPhimBacSi);
//   if (error) {
//     res.render("BacSi/DSChupPhimBacSi", {
//       Flag: false,
//       Error: error.details[0].message,
//     });
//   }
//   var sql = "call DSChupPhim_BacSi(?,?,?,?)";
//   mysql.query(
//     sql,
//     [req.user.MaNhanVien, ...Object.values(value)],
//     (err, result) => {
//       if (err) return res.render("err", { err: err });

//       res.render("BacSi/DSChupPhimBacSi", {
//         DSChupPhimBacSi: result,
//         Error: false,
//       });
//     }
//   );
// });





router.get("/DSBenhNhanCungBenh", Authenticate, (req, res) =>
{
  var sql = "select * from Benh";
  mysql.query(
    sql,
    (err, ListMaBenh) =>
    {
      if (err) return res.render("err", { err: err });
      sql = `select b.MaBenhNhan, n.HoVaTenLot, n.Ten from BenhNhan b join NguoiDung n
      on b.TaiKhoan = n.TaiKhoan`;
      mysql.query(sql,
        (err, ListBenhNhan) =>
        {
          if (err) return res.render("err", { err: err });
          res.render("BacSi/DSBenhNhanCungBenh", {
            ListMaBenh,
            ListBenhNhan,
            DSBenhNhanCungBenh: null,
          });
        })
    }
  );
});

router.post("/DSBenhNhanCungBenh", Authenticate, (req, res) =>
{
  const { value, error } = Joi.validate(req.body, DSBenhNhanCungBenh);
  if (error)
  {
    res.render("BacSi/DSBenhNhanCungBenh", {
      Flag: false,
      Error: error.details[0].message,
    });
  }
  var sql = "call DSBenhNhan_CungBenhBenhNhan_CungBenh(?, ?, ?)";
  mysql.query(
    sql,
    [req.user.MaNhanVien, ...Object.values(value)],
    (err, result) =>
    {
      if (err) return res.render("err", { err: err });
      var sql = "select * from Benh";
      mysql.query(
        sql,
        (err, ListMaBenh) =>
        {
          if (err) return res.render("err", { err: err });
          sql = `select b.MaBenhNhan, n.HoVaTenLot, n.Ten from BenhNhan b join NguoiDung n
          on b.TaiKhoan = n.TaiKhoan`;
          mysql.query(sql, (err, ListBenhNhan) =>
          {
            if (err) return res.render("err", { err: err });
            res.render("BacSi/DSBenhNhanCungBenh", {
              ListMaBenh,
              ListBenhNhan,
              DSBenhNhanCungBenh: result,
            });
          })
        }
      );
    }
  );
});



router.get("/DSBenhNhanXV", Authenticate, (req, res) =>
{
  var sql = "call DSBenhNhan_XV(?)";
  mysql.query(sql, [req.user.MaNhanVien], (err, result) =>
  {
    if (err) return res.render("err", { err: err });
    res.render("BacSi/DSBenhNhanXV", { DSBenhNhanXV: result });
  });
});

router.get("/DSBenhNhanBatThuong", Authenticate, (req, res) =>
{
  var sql = "select * from Benh";
  mysql.query(
    sql,
    (err, ListMaBenh) =>
    {
      if (err) return res.render("err", { err: err });
      res.render("BacSi/DSBenhNhanBatThuong", {
        ListMaBenh,
        DSBenhNhanBatThuong: null,
      });
    }
  );
});

router.post("/DSBenhNhanBatThuong", Authenticate, (req, res) =>
{
  var sql = "call DSBenhNhan_BatThuong(?, ?)";
  mysql.query(
    sql,
    [req.user.MaNhanVien, ...Object.values(req.body)],
    (err, result) =>
    {
      if (err) return res.render("err", { err: err });
      var sql = "select * from Benh";
      mysql.query(
        sql,
        (err, ListMaBenh) =>
        {
          if (err) return res.render("err", { err: err });
          res.render("BacSi/DSBenhNhanBatThuong", {
            ListMaBenh,
            DSBenhNhanBatThuong: result,
          });
        }
      );
    }
  );
});

// TODO: Viết router.get và router.post mỗi chức năng mà đề yêu cầu, vui lòng đọc qua hết các chức năng cần hiện thực và gom nhóm các chức năng lại một cách gọn gàng nhất.
// ! Có một số chức năng nhỏ nằm trong 1 chức năng lớn, thì có thể gom thành 1 route và nhiều post để thực thi
module.exports = router;