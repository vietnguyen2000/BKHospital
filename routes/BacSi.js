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
  if (Loai == "DSBenhNhanThuocGiamDan"){
    return res.redirect("DSBenhNhanThuocGiamDan")
  }
  if (Loai == "DSBenhNhanCoGhiChuBinhThuong"){
    return res.redirect("DSBenhNhanCoGhiChuBinhThuong")
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
  var sql = `select * from BenhNhanView`;
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

      sql = `select * from BenhNhanView`;
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
  var sql = 'call DSBenhNhan_PhuTrach_All(?)';
  mysql.query(
    sql, [req.user.MaNhanVien],
    (err, ListBenhNhan) =>
    {
      if (err) return res.render("err", { err: err });
      sql = "select * from KhamBenhView WHERE (ThoiGianKhamBenh,MaNhanVien,MaBenhNhan) NOT IN (SELECT ThoiGianKhamBenh,MaNhanVien,MaBenhNhan FROM kqchandoan)";
      mysql.query(sql,
        (err, KhamBenh) =>
        {
          if (err) return res.render("err", { err: err });
          sql = "SELECT * FROM Thuoc;";
          mysql.query(sql, (err, Thuoc) =>
          {
            if (err) return res.render("err", { err: err });
            sql = "SELECT * FROM CDDDUONG;";
            mysql.query(sql, (err, CDDDuong) =>
            {
              if (err) return res.render("err", { err: err });
              sql = "SELECT * FROM Benh;";
              mysql.query(sql, (err, Benh) =>
              {
                if (err) return res.render("err", { err: err });
                sql = "SELECT * FROM NhanVienView;";
                mysql.query(sql, (err, NhanVien) =>
                {
                  if (err) return res.render("err", { err: err });
                  res.render("BacSi/duaraKQBacSiBenhNhan", {
                    KhamBenh,
                    ListBenhNhan: ListBenhNhan[0],
                    Thuoc,
                    CDDDuong,
                    Benh,
                    NhanVien,
                    Flag: false
                  });
                });
              })
            })
          })

        })
    }
  );
});

router.post("/DuaRaKQ", Authenticate, (req, res) =>
{
  const {
    ListBenh,
    ListCDDDuong,
    ListThuoc,
    MaBenhNhan,
    KhamBenh,
    ThoiGianRaKQ,
    Thuoc,
    BenhAn,
    BenhAnCheck,
    XetNghiem,
    ChupPhim,
    ListXetNghiem,
    ListChupPhim
  } = req.body
  console.log(req.body);
  if (ListBenh != '')
    listMaBenh = ListBenh.split(',');
  else listMaBenh = [];
  if (ListCDDDuong != '')
    listMaCDDDuong = ListCDDDuong.split(',');
  else listMaCDDDuong = [];
  if (ListThuoc != '')
    listMaThuoc = ListThuoc.split(',');
  else listMaThuoc = [];
  if (ListXetNghiem != '')
    listXetNghiem = ListXetNghiem.split(',');
  else listXetNghiem = [];
  if (ListChupPhim != '')
    listChupPhim = ListChupPhim.split(',');
  else listChupPhim = [];
  ThongTinKhamBenh = JSON.parse(KhamBenh);
  BenhAnInfor = BenhAn;
  BenhNhan = JSON.parse(MaBenhNhan);

  sql = 'Call DuaRaKQ_BacSi_BenhNhan(?,?,?,?)';
  mysql.query(sql, [ThongTinKhamBenh.MaNhanVien, ThongTinKhamBenh.MaBenhNhan, ThongTinKhamBenh.ThoiGianKhamBenh, ThoiGianRaKQ], (err, result) =>
  {
    if (err) return res.render("err", { err: err });
  })
  console.log(listMaBenh, listMaCDDDuong, listMaThuoc, ThongTinKhamBenh, BenhAnInfor, BenhNhan);
  sql = 'call ThemKQBenh(?,?,?,?,?);'
  listMaBenh.forEach(MaBenh =>
  {
    mysql.query(sql, [
      ThongTinKhamBenh.MaNhanVien,
      ThongTinKhamBenh.MaBenhNhan,
      ThongTinKhamBenh.ThoiGianKhamBenh,
      ThoiGianRaKQ,
      MaBenh],
      (err, result) =>
      {
        if (err) return res.render("err", { err: err });
      })
  });

  sql = 'call ThemKQCDDDuong(?,?,?,?,?);'
  listMaCDDDuong.forEach(MaCDDDuong =>
  {
    mysql.query(sql,
      [ThongTinKhamBenh.MaNhanVien,
      ThongTinKhamBenh.MaBenhNhan,
      ThongTinKhamBenh.ThoiGianKhamBenh,
        ThoiGianRaKQ, MaCDDDuong],
      (err, result) =>
      {
        if (err) return res.render("err", { err: err });
      })
  });

  sql = 'call ThemKQThuoc(?,?,?,?,?,?,?,?);'
  listMaThuoc.forEach((MaThuoc, index) =>
  {
    mysql.query(sql,
      [ThongTinKhamBenh.MaNhanVien,
      ThongTinKhamBenh.MaBenhNhan,
      ThongTinKhamBenh.ThoiGianKhamBenh,
        ThoiGianRaKQ,
        MaThuoc,
      Thuoc[index].LieuDung,
      Thuoc[index].CachDung,
      Thuoc[index].ThoiGianDung],
      (err, result) =>
      {
        if (err) return res.render("err", { err: err });
      })
  });
  sql = 'call TaoXetNghiem(?,?,?,?,?,?);'
  listXetNghiem.forEach((xn, index) =>
  {
    mysql.query(sql,
      [ThongTinKhamBenh.MaNhanVien,
      ThongTinKhamBenh.MaBenhNhan,
      ThongTinKhamBenh.ThoiGianKhamBenh,
        xn,
      XetNghiem[xn].NVThucHien,
        ThoiGianRaKQ
      ],
      (err, result) =>
      {
        if (err) return res.render("err", { err: err });
      })
  });

  sql = 'call TaoPhim(?,?,?,?,?,?);'
  listChupPhim.forEach((cp, index) =>
  {
    mysql.query(sql,
      [ThongTinKhamBenh.MaNhanVien,
      ThongTinKhamBenh.MaBenhNhan,
      ThongTinKhamBenh.ThoiGianKhamBenh,
      ChupPhim[cp].NVThucHien,
        cp,
        ThoiGianRaKQ
      ],
      (err, result) =>
      {
        if (err) return res.render("err", { err: err });
      })
  });
  if (BenhAnCheck == 'on')
  {
    if (BenhNhan.Loai == "Nội Trú")
    {
      // Xuất viện
      sql = 'call XuatVien(?,?,?,?,?,?,?,?);';
      mysql.query(sql,
        [
          ThongTinKhamBenh.MaBenhNhan,
          ThoiGianRaKQ,
          BenhAnInfor.TinhTrangXuatVien,
          BenhAnInfor.GhiChuXuatVien,
          ThongTinKhamBenh.MaNhanVien,
          ThongTinKhamBenh.MaBenhNhan,
          ThongTinKhamBenh.ThoiGianKhamBenh,
          ThoiGianRaKQ
        ],
        (err, result) =>
        {
          if (err) return res.render("err", { err: err });
        })
    }
    else
    {
      // Nhập viện
      sql = 'call NhapVien(?,?,?,?,?,?,?,?);'
      mysql.query(sql,
        [ThongTinKhamBenh.MaNhanVien,
        ThongTinKhamBenh.MaBenhNhan,
        ThongTinKhamBenh.ThoiGianKhamBenh,
          ThoiGianRaKQ,
          ThoiGianRaKQ,
        BenhAnInfor.SoGiuong,
        BenhAnInfor.SoBuong,
        BenhAnInfor.TinhTrangNhapVien
        ],
        (err, result) =>
        {
          if (err) return res.render("err", { err: err });
        })
    }
  }
  sql = 'call DSBenhNhan_PhuTrach_All(?)';
  mysql.query(
    sql, [req.user.MaNhanVien],
    (err, ListBenhNhan) =>
    {
      if (err) return res.render("err", { err: err });
      sql = "select * from KhamBenhView WHERE (ThoiGianKhamBenh,MaNhanVien,MaBenhNhan) NOT IN (SELECT ThoiGianKhamBenh,MaNhanVien,MaBenhNhan FROM kqchandoan)";
      mysql.query(sql,
        (err, KhamBenh) =>
        {
          if (err) return res.render("err", { err: err });
          sql = "SELECT * FROM Thuoc;";
          mysql.query(sql, (err, Thuoc) =>
          {
            if (err) return res.render("err", { err: err });
            sql = "SELECT * FROM CDDDUONG;";
            mysql.query(sql, (err, CDDDuong) =>
            {
              if (err) return res.render("err", { err: err });
              sql = "SELECT * FROM Benh;";
              mysql.query(sql, (err, Benh) =>
              {
                if (err) return res.render("err", { err: err });
                sql = "SELECT * FROM NhanVienView;";
                mysql.query(sql, (err, NhanVien) =>
                {
                  if (err) return res.render("err", { err: err });
                  res.render("BacSi/duaraKQBacSiBenhNhan", {
                    KhamBenh,
                    ListBenhNhan: ListBenhNhan[0],
                    Thuoc,
                    CDDDuong,
                    Benh,
                    NhanVien,
                    Flag: true
                  });
                });
              })
            })
          })

        })
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

router.get("/DsBenhNhanPhuTrach", Authenticate, (req, res) =>
{
  var sql = "select Distinct Date(ThoiGianKhamBenh) as ThoiGianKhamBenh from KhamBenhView where MaNhanVien = ?"
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
  )
})

router.get("/DsThuocBacSi", Authenticate, (req, res) =>
{
  var sql = 'CALL DSBenhNhan_PhuTrach_All(?)';
  mysql.query(sql, [req.user.MaNhanVien],
    (err, ListBenhNhan) =>
    {
      if (err) return res.render("err", { err: err });
      res.render("BacSi/DsThuocBacSi", {
        Error: false,
        ListBenhNhan: ListBenhNhan[0],
        DsThuocBacSi: null,
        MaBenhNhan: null,
        FromDate: null,
        ToDate: null,
      });
    })
})

router.post("/DsThuocBacSi", Authenticate, (req, res) =>
{
  // const { value, error } = Joi.validate(req.body, DsThuocBacSi);
  // if (error)
  // {
  //   res.render("BacSi/DsThuocBacSi", {
  //     Flag: false,
  //     Error: error.details[0].message,
  //   });
  // }
  var sql = "call DSThuoc_BacSi(?,?,?,?)";
  mysql.query(
    sql,
    [req.user.MaNhanVien, ...Object.values(req.body)],
    (err, result) =>
    {
      if (err) return res.render("err", { err: err });
      var sql = `CALL DSBenhNhan_PhuTrach_All(?)`;
      mysql.query(sql, [req.user.MaNhanVien],
        (err, ListBenhNhan) =>
        {
          if (err) return res.render("err", { err: err });
          res.render("BacSi/DsThuocBacSi", Object.assign({
            Error: false,
            ListBenhNhan: ListBenhNhan[0],
            DsThuocBacSi: result,
          }, req.body));
        })
    })
})

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
  var sql = "select * from XetNghiem Where MaNhanVienThucHien = ?";
  mysql.query(sql, [req.user.MaNhanVien], (err, result) =>
  {
    if (err) return res.render("err", { err: err });
    sql = "select * from ChiSoXN ORDER BY MaChiSoXetNghiem";
    mysql.query(sql, (err, MaChiSoXetNghiem) =>
    {
      if (err) return res.render("err", { err: err });

      res.render("BacSi/TaoChiSo", {
        Flag: false,
        XetNghiem: result,
        MaChiSoXetNghiem,
      });
    })
  })

});


router.post("/TaoChiSo", Authenticate, (req, res) =>
{
  const {
    TenChiSo,
    XetNghiem,
    KetQua,
    MaChiSoXetNghiem,
  } = req.body;
  var sql = "call taoChiSo(?,?,?,?,?,?,?)";
  xn = JSON.parse(XetNghiem)
  mysql.query(
    sql,
    [
      TenChiSo,
      xn.TenXetNghiem,
      xn.ThoiGianKhamBenh,
      req.user.MaNhanVien,
      xn.MaBenhNhan,
      KetQua,
      MaChiSoXetNghiem,
    ],
    (err) =>
    {
      var sql = "select * from XetNghiem Where MaNhanVienThucHien = ?";
      mysql.query(sql, [req.user.MaNhanVien], (err, result) =>
      {
        if (err) return res.render("err", { err: err });
        sql = "select * from ChiSoXN ORDER BY MaChiSoXetNghiem";
        mysql.query(sql, (err, MaChiSoXetNghiem) =>
        {
          if (err) return res.render("err", { err: err });
          res.render("BacSi/TaoChiSo", {
            Flag: true,
            XetNghiem: result,
            MaChiSoXetNghiem,
          });
        })
      })
    })
});

router.get("/DsXetNghiemBacSi", Authenticate, (req, res) =>
{
  sql = "call DSBenhNhanNoiTru_PhuTrach_All(?)"
  mysql.query(sql, [req.user.MaNhanVien], (err, ListBenhNhan) =>
  {
    if (err) return res.render("err", { err: err });
    res.render("BacSi/DsXetNghiemBacSi", {
      DsXetNghiemBacSi: null,
      ListBenhNhan: ListBenhNhan[0],
      MaBenhNhan: null,
      FromDate: null,
      ToDate: null,
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
      sql = "call DSBenhNhanNoiTru_PhuTrach_All(?)"
      mysql.query(sql, [req.user.MaNhanVien], (err, ListBenhNhan) =>
      {
        if (err) return res.render("err", { err: err });
        res.render("BacSi/DsXetNghiemBacSi", Object.assign({
          DsXetNghiemBacSi: result,
          ListBenhNhan: ListBenhNhan[0],
        }, req.body));
      })
    })
}
);



router.get("/TaoPhim", Authenticate, (req, res) =>
{
  var sql = 'SELECT * FROM KhamBenhView WHERE MaNhanVien = ? ORDER BY ThoiGianKhamBenh DESC'
  mysql.query(sql, [req.user.MaNhanVien], (err, KhamBenh) =>
  {
    if (err) return res.render("err", { err: err });
    var sql = "SELECT * FROM NhanVienView";
    mysql.query(sql, (err, ListNhanVien) =>
    {
      if (err) return res.render("err", { err: err });
      res.render("BacSi/TaoPhim", {
        Error: false,
        Flag: false,
        KhamBenh,
        ListNhanVien
      })
    })
  })
});

router.post("/TaoPhim", Authenticate, (req, res) =>
{
  const {
    KhamBenh,
    MaNhanVienThucHien,
    ThoiGianThucHien
  } = req.body;
  console.log(req.body);
  kb = JSON.parse(KhamBenh);
  var sql = "call taoPhim(?,?,?,?,?)";
  mysql.query(sql, [kb.MaNhanVien, kb.MaBenhNhan, kb.ThoiGianKhamBenh, MaNhanVienThucHien, ThoiGianThucHien], (err, a) =>
  {
    if (err) return res.render("err", { err: err });
    var sql = 'SELECT * FROM KhamBenhView WHERE MaNhanVien = ? ORDER BY ThoiGianKhamBenh DESC'
    mysql.query(sql, [req.user.MaNhanVien], (err, KhamBenh) =>
    {
      if (err) return res.render("err", { err: err });
      var sql = "SELECT * FROM NhanVienView";
      mysql.query(sql, (err, ListNhanVien) =>
      {
        if (err) return res.render("err", { err: err });
        res.render("BacSi/TaoPhim", {
          Error: false,
          Flag: true,
          KhamBenh,
          ListNhanVien
        })
      })
    })
  })
});




router.get("/DSChupPhimBacSi", Authenticate, (req, res) =>
{
  sql = "call DSBenhNhanNoiTru_PhuTrach_All(?)"
  mysql.query(sql, [req.user.MaNhanVien], (err, ListBenhNhan) =>
  {
    if (err) return res.render("err", { err: err });
    res.render("BacSi/DSChupPhimBacSi", {
      DSChupPhimBacSi: null,
      ListBenhNhan: ListBenhNhan[0],
      MaBenhNhan: null,
      FromDate: null,
      ToDate: null,
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
      var sql = `call DSBenhNhanNoiTru_PhuTrach_All(?)`;
      mysql.query(
        sql, [req.user.MaNhanVien],
        (err, ListBenhNhan) =>
        {
          if (err) return res.render("err", { err: err });
          res.render("BacSi/DSChupPhimBacSi", Object.assign({
            ListBenhNhan: ListBenhNhan[0],
            DSChupPhimBacSi: result,
          }, req.body));
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
      res.render("BacSi/DSBenhNhanCungBenh", {
        ListMaBenh,
        DSBenhNhanCungBenh: null,
        MaBenh: null
      });
    })
});

router.post("/DSBenhNhanCungBenh", Authenticate, (req, res) =>
{

  var sql = "call DSBenhNhan_CungBenhBenhNhan_CungBenh(?, ?)";
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
          res.render("BacSi/DSBenhNhanCungBenh", Object.assign({
            ListMaBenh,
            DSBenhNhanCungBenh: result,
          }, req.body));
        })
    }
  );
}
);



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
router.get("/DSBenhNhanThuocGiamDan", Authenticate, (req, res) =>
{
  var sql = " SELECT * FROM Thuoc";
  mysql.query(sql,(err,Thuoc)=>{
    res.render('BacSi/DSBenhNhanThuocGiamDan',{
      DSThuoc: Thuoc,
      MaThuoc: null,
      DSBenhNhan: null,
    })
  })
});
router.post("/DSBenhNhanThuocGiamDan", Authenticate, (req, res) =>
{
  const{
    MaThuoc
  } = req.body
  var sql = "call DSBenhNhan_PhuTrach_All(?)"
  var accepts = []
  mysql.query(
    sql, [req.user.MaNhanVien], (err, BenhNhan) =>
    {
      if (err) return res.render("err", { err: err });
      BenhNhan[0].forEach((bn,index,array) =>
      {
        sql = "SELECT *, (LieuDung*ThoiGianDung) as LuongDung FROM kqThuoc natural join benhnhanview natural join thuoc WHERE MaBenhNhan = ? and MaThuoc = ? ORDER BY ThoiGianRaKQ"
        mysql.query(sql, [bn.MaBenhNhan, MaThuoc], (err, kqthuoc) =>
        {
          
          if (err) return res.render("err", { err: err });
          for( let i = 0 ; i < kqthuoc.length-2; i++){
            if (kqthuoc[i+2].LuongDung < kqthuoc[i+1].LuongDung < kqthuoc[i].LuongDung){
              accepts.push(bn.MaBenhNhan)
              break;
            }
          }
          if (index == array.length-1){
            var sql = " SELECT * FROM Thuoc";
            mysql.query(sql,(err,Thuoc)=>{
              return res.render('BacSi/DSBenhNhanThuocGiamDan',{
                DSThuoc: Thuoc,
                MaThuoc: MaThuoc,
                BenhNhanThoa: accepts,
                DSBenhNhan: BenhNhan[0],
              })
            })
          }
        });
        
      })
      
    }
  )
  
})

router.get("/DSBenhNhanCoGhiChuBinhThuong", Authenticate, (req, res) =>
{
  var sql = "SELECT * FROM ChiSoXN;";
  mysql.query(sql,(err,ChiSo)=>{
    res.render('BacSi/DSBenhNhanCoGhiChuBinhThuong',{
      DSChiSo: ChiSo,
      MaChiSo: null,
      DSBenhNhan: null,
    })
  })
});
router.post("/DSBenhNhanCoGhiChuBinhThuong", Authenticate, (req, res) =>
{
  const{
    MaChiSo
  } = req.body
  var sql = "call DSBenhNhan_PhuTrach_All(?)"
  var accepts = []
  mysql.query(
    sql, [req.user.MaNhanVien], (err, BenhNhan) =>
    {
      if (err) return res.render("err", { err: err });
      BenhNhan[0].forEach((bn,index,array) =>
      {
        sql = "SELECT * FROM hospital.view_ghichu_chiso WHERE MaBenhNhan = ? and MaChiSoXetNghiem = ? ORDER BY ThoiGianKhamBenh;"
        mysql.query(sql, [bn.MaBenhNhan, MaChiSo], (err, ChiSo) =>
        {
          
          if (err) return res.render("err", { err: err });
          flag = false;
          for( let i = 0 ; i < ChiSo.length; i++){
            
            if(ChiSo[i].GhiChu == "Bất Thường"){
              flag = true;
            }
            if (flag && i == ChiSo.length-1 && ChiSo[i].GhiChu == "Bình Thường"){
              accepts.push(bn.MaBenhNhan);
            }
          }
          if (index == array.length-1){
            var sql = "SELECT * FROM ChiSoXN;";
            mysql.query(sql,(err,ChiSo)=>{
              res.render('BacSi/DSBenhNhanCoGhiChuBinhThuong',{
                DSChiSo: ChiSo,
                MaChiSo: null,
                DSBenhNhan: BenhNhan[0],
                BenhNhanThoa: accepts
              })
            })
          }
        });
        
      })
      
    }
  )
  
})

router.get("/ThemKQPhim", Authenticate, (req, res) =>
{
  var sql = "SELECT * FROM Phim natural join BenhNhanView WHERE MaNhanVienThucHien = ?;";
  mysql.query(sql,[req.user.MaNhanVien],(err,Phim)=>{
    if (err) return res.render("err", { err: err });
    res.render('BacSi/ThemKQPhim',{
      DSPhim: Phim,
      MaPhim: null,
      DSBenhNhan: null,
      Flag: false,
    })
  })
});
router.post("/ThemKQPhim", Authenticate, (req,res)=>{
  const{
    Phim,
    KetQua
  } = req.body
  PhimInfor = JSON.parse(Phim)
  console.log(PhimInfor)
  var sql = 'call ThucHienChupPhim(?,?,?,?,?)'
  mysql.query(sql, 
    [
      KetQua,
      PhimInfor.MaNhanVien,
      PhimInfor.MaBenhNhan,
      PhimInfor.ThoiGianKhamBenh,
      PhimInfor.GhiChuChupPhim
    ],(err,result)=>{
      if (err) return res.render("err", { err: err });
      var sql = "SELECT * FROM Phim natural join BenhNhanView WHERE MaNhanVienThucHien = ?;";
      mysql.query(sql,[req.user.MaNhanVien],(err,Phim)=>{
        if (err) return res.render("err", { err: err });
        res.render('BacSi/ThemKQPhim',{
          DSPhim: Phim,
          MaPhim: null,
          DSBenhNhan: null,
          Flag: true,
        })
      })

    })
})

// TODO: Viết router.get và router.post mỗi chức năng mà đề yêu cầu, vui lòng đọc qua hết các chức năng cần hiện thực và gom nhóm các chức năng lại một cách gọn gàng nhất.
// ! Có một số chức năng nhỏ nằm trong 1 chức năng lớn, thì có thể gom thành 1 route và nhiều post để thực thi
module.exports = router;