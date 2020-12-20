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

mysql.connect((err) => {
  if (err) {
    console.log("FAILED TO CONNECT TO DATABASE!");
    throw err;
  } else {
    console.log("Database BacSi Connected!");
  }
});
const CATRUC = ["Buổi sáng", "Buổi trưa", "Buổi chiều", "Buổi tối"];
Authenticate = (req, res, next) => {
  isAuth(req, res, () => {
    if (req.role == "BacSi") {
      // Kiểm tra xem đây có phải là role bác sĩ không, nếu không thì nhảy ra err
      next();
    } else {
      res.render("err", { err: "Bạn không có quyền làm việc này" });
    }
  });
};

router.get("/", Authenticate, (req, res) => {
  res.render("BacSi/index");
});

router.get("/DSBacSi", Authenticate, (req, res) => {
  res.render("BacSi/DSBacSi");
});
router.post("/DSBacSi", Authenticate, (req, res) => {
  const { Loai } = req.body;
  if (Loai == "DanhSachBenhNhanPhuTrach") {
    res.redirect("DsBenhNhanPhuTrach");
  }
  if (Loai == "DanhSachChanDoanBenh") {
    res.redirect("DsChanDoanBenh");
  }
  if (Loai == "DanhSachThuocBacSi") {
    res.redirect("DsThuocBacSi");
  }
  if (Loai == "DanhSachChanDoanBenh") {
    res.redirect("DsChanDoanBenh");
  }
  if (Loai == "DanhSachXetNghiemBacSi") {
    res.redirect("DsXetNghiemBacSi");
  }
  if (Loai == "DanhSachBenhNhanCungBenh") {
    res.redirect("DSBenhNhanCungBenh");
  }
  if (Loai == "DanhSachBenhNhanXuatVien") {
    res.redirect("DSBenhNhanXV");
  }
  if (Loai == "DanhSachChupPhimBacSi") {
    res.redirect("DSChupPhimBacSi");
  }
  res.redirect("DSBenhNhanBatThuong");
});

router.get("/ThemKetQuaBenh", Authenticate, (req, res) => {
  res.render("BacSi/ThemKetQuaBenh");
});
router.post("/ThemKetQuaBenh", Authenticate, (req, res) => {
  const { Loai } = req.body;
  if (Loai == "KhamBenhBSBenhNhan") {
    res.redirect("KhambenhBacSiBenhNhan");
  }
  if (Loai == "DuaRaKQBSBenhNhan") {
    res.redirect("DuaRaKQ");
  }
  if (Loai == "ThemThuoc") {
    res.redirect("Themthuoc");
  }
  if (Loai == "ThemThuocVaoKQ") {
    res.redirect("ThemThuocVaoKQ");
  }
  if (Loai == "ThemBenh") {
    res.redirect("Thembenh");
  }
  if (Loai == "ThemKQBenh") {
    res.redirect("ThemKQBenh");
  }
  if (Loai == "ThemCDDDuong") {
    res.redirect("ThemCDDDuong");
  }
  res.redirect("ThemKQCDDDuong");
});

router.get("/BenhAn", Authenticate, (req, res) => {
  res.render("BacSi/BenhAn");
});
router.post("/BenhAn", Authenticate, (req, res) => {
  const { Loai } = req.body;
  if (Loai == "ThemBenhAn") {
    res.redirect("ThemBenhAn");
  }
  if (Loai == "NhapVien") {
    res.redirect("NhapVien");
  }
  res.redirect("XuatVien");
});

router.get("/HoatDongKhac", Authenticate, (req, res) => {
  res.render("BacSi/HoatDongKhac");
});
router.post("/HoatDongKhac", Authenticate, (req, res) => {
  const { Loai } = req.body;
  if (Loai == "TaoChiSoXN") {
    res.redirect("TaoChiSoXN");
  }
  if (Loai == "TaoChiSo") {
    res.redirect("TaoChiSo");
  }
  res.redirect("TaoPhim");
});

router.get("/KhambenhBacSiBenhNhan", Authenticate, (req, res) => {
  res.render("BacSi/khambenhBacSiBenhNhan", { Flag: false, Error: false });
});
router.post("/KhambenhBacSiBenhNhan", Authenticate, (req, res) => {
  const { value, error } = Joi.validate(req.body, KhamBenhBacSiBenhNhan);
  if (error) {
    res.render("BacSi/khambenhBacSiBenhNhan", {
      Flag: false,
      Error: error.details[0].message,
    });
  }
  var sql = "call KhamBenh_BacSi_BenhNhan(?,?,?,?)";
  mysql.query(
    sql,
    [req.user.MaNhanVien, ...Object.values(value)],
    (err, result) => {
      if (err) return res.render("err", { err: err });
      res.render("BacSi/khambenhBacSiBenhNhan", { Flag: true, Error: false });
    }
  );
});

router.get("/DuaRaKQ", Authenticate, (req, res) => {
  res.render("BacSi/duaraKQBacSiBenhNhan", { Flag: false, Error: false });
});

router.post("/DuaRaKQ", Authenticate, (req, res) => {
  const { value, error } = Joi.validate(req.body, DuaRaKQBacSiBenhNhan);
  if (error) {
    res.render("BacSi/duaraKQBacSiBenhNhan", {
      Flag: false,
      Error: error.details[0].message,
    });
  }

  var sql = "call DuaRaKQ_BacSi_BenhNhan(?,?,?,?)";
  mysql.query(
    sql,
    [req.user.MaNhanVien, ...Object.values(value)],
    (err, result) => {
      if (err) return res.render("err", { err: err });
      res.render("BacSi/duaraKQBacSiBenhNhan", { Flag: true, Error: false });
    }
  );
});

router.get("/Themthuoc", Authenticate, (req, res) => {
  res.render("BacSi/ThemThuoc", { Flag: false, Error: false });
});

router.post("/Themthuoc", Authenticate, (req, res) => {
  const { value, error } = Joi.validate(req.body, ThemThuoc);
  if (error) {
    res.render("BacSi/Themthuoc", {
      Flag: false,
      Error: error.details[0].message,
    });
  }
  var sql = "call ThemThuoc(?)";
  mysql.query(sql, [...Object.values(value)], (err, result) => {
    if (err) return res.render("err", { err: err });
    res.render("BacSi/ThemThuoc", { Flag: true, Error: false });
  });
});

router.get("/ThemThuocVaoKQ", Authenticate, (req, res) => {
  res.render("BacSi/ThemThuocVaoKQ", { Flag: false, Error: false });
});

router.post("/ThemThuocVaoKQ", Authenticate, (req, res) => {
  const { value, error } = Joi.validate(req.body, ThemThuocVaoKQ);
  if (error) {
    res.render("BacSi/ThemThuocVaoKQ", {
      Flag: false,
      Error: error.details[0].message,
    });
  }

  var sql = "call ThemThuocVaoKQ(?,?,?,?,?,?,?,?)";
  mysql.query(
    sql,
    [req.user.MaNhanVien, ...Object.values(value)],
    (err, result) => {
      if (err) return res.render("err", { err: err });
      res.render("BacSi/ThemThuocVaoKQ", { Flag: true, Error: false });
    }
  );
});

router.get("/Thembenh", Authenticate, (req, res) => {
  res.render("BacSi/ThemBenh", { Flag: false, Error: false });
});

router.post("/Thembenh", Authenticate, (req, res) => {
  const { value, error } = Joi.validate(req.body, ThemBenh);
  if (error) {
    res.render("BacSi/ThemBenh", {
      Flag: false,
      Error: error.details[0].message,
    });
  }
  var sql = "call Thembenh(?)";
  mysql.query(sql, [...Object.values(value)], (err, result) => {
    if (err) return res.render("err", { err: err });
    res.render("BacSi/ThemBenh", { Flag: true, Error: false });
  });
});

router.get("/ThemKQBenh", Authenticate, (req, res) => {
  res.render("BacSi/ThemKQBenh", { Flag: false, Error: false });
});

router.post("/ThemKQBenh", Authenticate, (req, res) => {
  const { value, error } = Joi.validate(req.body, ThemKQBenh);
  if (error) {
    res.render("BacSi/ThemKQBenh", {
      Flag: false,
      Error: error.details[0].message,
    });
  }
  var sql = "call ThemKQBenh(?,?,?,?,?)";
  mysql.query(
    sql,
    [req.user.MaNhanVien, ...Object.values(value)],
    (err, result) => {
      if (err) return res.render("err", { err: err });
      res.render("BacSi/ThemKQBenh", { Flag: true, Error: false });
    }
  );
});

router.get("/ThemKQThuoc", Authenticate, (req, res) => {
  res.render("BacSi/ThemKQThuoc", { Flag: false, Error: false });
});

router.post("/ThemKQThuoc", Authenticate, (req, res) => {
  const { value, error } = Joi.validate(req.body, ThemKQThuoc);
  if (error) {
    res.render("BacSi/ThemKQThuoc", {
      Flag: false,
      Error: error.details[0].message,
    });
  }
  var sql = "call ThemKQThuoc(?,?,?,?,?,?,?,?)";
  mysql.query(
    sql,
    [req.user.MaNhanVien, ...Object.values(value)],
    (err, result) => {
      if (err) return res.render("err", { err: err });
      res.render("BacSi/ThemKQThuoc", { Flag: true, Error: false });
    }
  );
});

router.get("/ThemCDDDuong", Authenticate, (req, res) => {
  res.render("BacSi/ThemCDDDuong", { Flag: false, Error: false });
});

router.post("/ThemCDDDuong", Authenticate, (req, res) => {
  const { value, error } = Joi.validate(req.body, ThemCDDDuong);
  if (error) {
    res.render("BacSi/ThemCDDDuong", {
      Flag: false,
      Error: error.details[0].message,
    });
  }
  var sql = "call ThemCDDDuong(?)";
  mysql.query(sql, [...Object.values(value)], (err, result) => {
    if (err) return res.render("err", { err: err });
    res.render("BacSi/ThemCDDDuong", { Flag: true, Error: false });
  });
});

router.get("/ThemKQCDDDuong", Authenticate, (req, res) => {
  res.render("BacSi/ThemKQCDDDuong", { Flag: false, Error: false });
});

router.post("/ThemKQCDDDuong", Authenticate, (req, res) => {
  const { value, error } = Joi.validate(req.body, ThemKQCDDDuong);
  if (error) {
    res.render("BacSi/ThemKQCDDDuong", {
      Flag: false,
      Error: error.details[0].message,
    });
  }
  var sql = "call ThemKQCDDDuong(?,?,?,?,?)";
  mysql.query(
    sql,
    [req.user.MaNhanVien, ...Object.values(value)],
    (err, result) => {
      if (err) return res.render("err", { err: err });
      res.render("BacSi/ThemKQCDDDuong", { Flag: true, Error: false });
    }
  );
});

router.get("/ThemBenhAn", Authenticate, (req, res) => {
  res.render("BacSi/ThemBenhAn", { Flag: false, Error: false });
});

router.post("/ThemBenhAn", Authenticate, (req, res) => {
  const { value, error } = Joi.validate(req.body, ThemBenhAn);
  if (error) {
    res.render("BacSi/ThemBenhAn", {
      Flag: false,
      Error: error.details[0].message,
    });
  }
  var sql = "call ThemBenhAn(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  mysql.query(sql, [...Object.values(value)], (err, result) => {
    if (err) return res.render("err", { err: err });
    res.render("BacSi/ThemBenhAn", { Flag: true, Error: false });
  });
});

router.get("/NhapVien", Authenticate, (req, res) => {
  res.render("BacSi/NhapVien", { Flag: false, Error: false });
});

router.post("/NhapVien", Authenticate, (req, res) => {
  const { value, error } = Joi.validate(req.body, NhapVien);
  if (error) {
    res.render("BacSi/NhapVien", {
      Flag: false,
      Error: error.details[0].message,
    });
  }
  var sql = "call NhapVien(?,?,?,?,?,?,?,?)";
  mysql.query(
    sql,
    [req.user.MaNhanVien, ...Object.values(value)],
    (err, result) => {
      if (err) return res.render("err", { err: err });
      res.render("BacSi/NhapVien", { Flag: true, Error: false });
    }
  );
});

router.get("/XuatVien", Authenticate, (req, res) => {
  res.render("BacSi/XuatVien", { Flag: false, Error: false });
});

router.post("/XuatVien", Authenticate, (req, res) => {
  const { value, error } = Joi.validate(req.body, XuatVien);
  if (error) {
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
    (err, result) => {
      if (err) return res.render("err", { err: err });
      res.render("BacSi/XuatVien", { Flag: true, Error: false });
    }
  );
});

router.get("/DsBenhNhanPhuTrach", Authenticate, (req, res) => {
  res.render("BacSi/DsBenhNhanPhuTrach", {
    Error: false,
    DsBenhNhanPhuTrach: null,
  });
});

router.post("/DsBenhNhanPhuTrach", Authenticate, (req, res) => {
  const { value, error } = Joi.validate(req.body, DSBenhNhanPhuTrach);
  if (error) {
    res.render("BacSi/DsBenhNhanPhuTrach", {
      Flag: false,
      Error: error.details[0].message,
    });
  }
  var sql = "call DSBenhNhan_PhuTrach(?,?)";
  mysql.query(
    sql,
    [req.user.MaNhanVien, ...Object.values(value)],
    (err, result) => {
      if (err) return res.render("err", { err: err });
      res.render("BacSi/DsBenhNhanPhuTrach", {
        DsBenhNhanPhuTrach: result,
        Error: false,
      });
    }
  );
});

router.get("/DsChanDoanBenh", Authenticate, (req, res) => {
  res.render("BacSi/DsChanDoanBenh", { Error: false, DsChanDoanBenh: null });
});

router.post("/DsChanDoanBenh", Authenticate, (req, res) => {
  const { value, error } = Joi.validate(req.body, DSChanDoanBenh);
  if (error) {
    res.render("BacSi/DsChanDoanBenh", {
      Flag: false,
      Error: error.details[0].message,
    });
  }
  var sql = "call DSChanDoan_Benh(?,?,?)";
  mysql.query(
    sql,
    [req.user.MaNhanVien, ...Object.values(value)],
    (err, result) => {
      if (err) return res.render("err", { err: err });

      res.render("BacSi/DsChanDoanBenh", {
        DsChanDoanBenh: result,
        Error: false,
      });
    }
  );
});

router.get("/DsThuocBacSi", Authenticate, (req, res) => {
  res.render("BacSi/DsThuocBacSi", { Error: false, DsThuocBacSi: null });
});

router.post("/DsThuocBacSi", Authenticate, (req, res) => {
  const { value, error } = Joi.validate(req.body, DsThuocBacSi);
  if (error) {
    res.render("BacSi/DsThuocBacSi", {
      Flag: false,
      Error: error.details[0].message,
    });
  }
  var sql = "call DSThuoc_BacSi(?,?,?,?)";
  mysql.query(
    sql,
    [req.user.MaNhanVien, ...Object.values(value)],
    (err, result) => {
      if (err) return res.render("err", { err: err });
      console.log("====ress===", result);

      res.render("BacSi/DsThuocBacSi", { DsThuocBacSi: result, Error: false });
    }
  );
});

router.get("/TaoXN", Authenticate, (req, res) => {
  res.render("BacSi/TaoXN", { Flag: false, Error: false });
});

router.post("/TaoXN", Authenticate, (req, res) => {
  const { value, error } = Joi.validate(req.body, TaoXetNghiem);
  if (error) {
    res.render("BacSi/TaoXN", { Flag: false, Error: error.details[0].message });
  }
  var sql = "call taoXetNghiem(?,?,?,?,?,?)";
  mysql.query(sql, [...Object.values(value)], (err, result) => {
    if (err) return res.render("err", { err: err });

    res.render("BacSi/TaoXN", { Flag: true, Error: false });
  });
});

router.get("/TaoChiSoXN", Authenticate, (req, res) => {
  res.render("BacSi/TaoChiSoXN", { Flag: false, Error: false });
});

router.post("/TaoChiSoXN", Authenticate, (req, res) => {
  const { value, error } = Joi.validate(req.body, TaoChiSoXN);
  if (error) {
    res.render("BacSi/TaoChiSoXN", {
      Flag: false,
      Error: error.details[0].message,
    });
  }
  var sql = "call taoChiSoXN(?,?)";
  mysql.query(sql, [...Object.values(value)], (err, result) => {
    if (err) return res.render("err", { err: err });

    res.render("BacSi/TaoChiSoXN", { Flag: true, Error: false });
  });
});

router.get("/TaoChiSo", Authenticate, (req, res) => {
  res.render("BacSi/TaoChiSo", { Flag: false, Error: false });
});

router.post("/TaoChiSo", Authenticate, (req, res) => {
  const { value, error } = Joi.validate(req.body, TaoChiSo);
  if (error) {
    res.render("BacSi/TaoChiSo", {
      Flag: false,
      Error: error.details[0].message,
    });
  }
  const {
    TenChiSo,
    TenXetNghiem,
    ThoiGianKhamBenh,
    MaBenhNhan,
    KetQua,
    MaChiSoXetNghiem,
  } = value;
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
    (err, result) => {
      if (err) return res.render("err", { err: err });

      res.render("BacSi/TaoChiSo", { Flag: true, Error: false });
    }
  );
});

router.get("/DsXetNghiemBacSi", Authenticate, (req, res) => {
  res.render("BacSi/DsXetNghiemBacSi", {
    Error: false,
    DsXetNghiemBacSi: null,
  });
});

router.post("/DsXetNghiemBacSi", Authenticate, (req, res) => {
  const { value, error } = Joi.validate(req.body, DSXetNghiemBacSi);
  if (error) {
    res.render("BacSi/DsXetNghiemBacSi", {
      Flag: false,
      Error: error.details[0].message,
    });
  }
  var sql = "call DSXetNghiem_BacSi(?,?,?,?)";
  mysql.query(
    sql,
    [req.user.MaNhanVien, ...Object.values(value)],
    (err, result) => {
      if (err) return res.render("err", { err: err });

      res.render("BacSi/DsXetNghiemBacSi", {
        DsXetNghiemBacSi: result,
        Error: false,
      });
    }
  );
});

router.get("/TaoPhim", Authenticate, (req, res) => {
  res.render("BacSi/TaoPhim", { Error: false, Flag: false });
});

router.post("/TaoPhim", Authenticate, (req, res) => {
  const { value, error } = Joi.validate(req.body, TaoPhim);
  if (error) {
    res.render("BacSi/TaoPhim", {
      Flag: false,
      Error: error.details[0].message,
    });
  }
  var sql = "call taoPhim(?,?)";
  mysql.query(sql, [...Object.values(value)], (err, result) => {
    if (err) return res.render("err", { err: err });

    res.render("BacSi/TaoPhim", { Flag: true, Error: false });
  });
});

router.get("/DSChupPhimBacSi", Authenticate, (req, res) => {
  res.render("BacSi/DSChupPhimBacSi", { Error: false, DSChupPhimBacSi: null });
});

router.post("/DSChupPhimBacSi", Authenticate, (req, res) => {
  console.log("123");
  const { value, error } = Joi.validate(req.body, DSChupPhimBacSi);
  if (error) {
    res.render("BacSi/DSChupPhimBacSi", {
      Flag: false,
      Error: error.details[0].message,
    });
  }
  var sql = "call DSChupPhim_BacSi(?,?,?,?)";
  mysql.query(
    sql,
    [req.user.MaNhanVien, ...Object.values(value)],
    (err, result) => {
      if (err) return res.render("err", { err: err });

      res.render("BacSi/DSChupPhimBacSi", {
        DSChupPhimBacSi: result,
        Error: false,
      });
    }
  );
});

router.get("/DSBenhNhanCungBenh", Authenticate, (req, res) => {
  res.render("BacSi/DSBenhNhanCungBenh", {
    Error: false,
    DSBenhNhanCungBenh: null,
  });
});

router.post("/DSBenhNhanCungBenh", Authenticate, (req, res) => {
  const { value, error } = Joi.validate(req.body, DSBenhNhanCungBenh);
  if (error) {
    res.render("BacSi/DSBenhNhanCungBenh", {
      Flag: false,
      Error: error.details[0].message,
    });
  }
  var sql = "call DSBenhNhan_CungBenhBenhNhan_CungBenh(?,?,?)";
  mysql.query(
    sql,
    [req.user.MaNhanVien, ...Object.values(value)],
    (err, result) => {
      if (err) return res.render("err", { err: err });

      res.render("BacSi/DSBenhNhanCungBenh", {
        DSBenhNhanCungBenh: result,
        Error: false,
      });
    }
  );
});

router.get("/DSBenhNhanXV", Authenticate, (req, res) => {
  var sql = "call DSBenhNhan_XV(?)";
  mysql.query(sql, [req.user.MaNhanVien], (err, result) => {
    if (err) return res.render("err", { err: err });
    res.render("BacSi/DSBenhNhanXV", { DSBenhNhanXV: result });
  });
});

router.get("/DSBenhNhanBatThuong", Authenticate, (req, res) => {
  res.render("BacSi/DSBenhNhanBatThuong", {
    Error: false,
    DSBenhNhanBatThuong: null,
  });
});

router.post("/DSBenhNhanBatThuong", Authenticate, (req, res) => {
  const { value, error } = Joi.validate(req.body, DSBenhNhanBatThuong);
  if (error) {
    res.render("BacSi/DSBenhNhanBatThuong", {
      Flag: false,
      Error: error.details[0].message,
    });
  }
  var sql = "call DSBenhNhan_BatThuong(?, ?)";
  mysql.query(
    sql,
    [req.user.MaNhanVien, ...Object.values(value)],
    (err, result) => {
      if (err) return res.render("err", { err: err });

      res.render("BacSi/DSBenhNhanBatThuong", {
        DSBenhNhanBatThuong: result,
        Error: false,
      });
    }
  );
});

// TODO: Viết router.get và router.post mỗi chức năng mà đề yêu cầu, vui lòng đọc qua hết các chức năng cần hiện thực và gom nhóm các chức năng lại một cách gọn gàng nhất.
// ! Có một số chức năng nhỏ nằm trong 1 chức năng lớn, thì có thể gom thành 1 route và nhiều post để thực thi
module.exports = router;
