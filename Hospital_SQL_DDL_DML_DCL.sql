DROP SCHEMA IF EXISTS hospital;
CREATE SCHEMA hospital;
CREATE TABLE `hospital`.`NguoiDung`(
	TaiKhoan 	VARCHAR(15), 
	MatKhau 	VARCHAR(100),
	HoVaTenLot 	VARCHAR(30),
	Ten			VARCHAR(15),
	Email 	 	VARCHAR(50),
	SDT			VARCHAR(15),
	GioiTinh 	BOOLEAN,  	-- 1: Nam, 0: Nu
	NgaySinh	DATE,
	PRIMARY KEY(TaiKhoan)
);

CREATE TABLE `hospital`.`NhanVien`(
	MaNhanVien	MEDIUMINT AUTO_INCREMENT,
    TaiKhoan	VARCHAR(15),
	PRIMARY KEY(MaNhanVien),
    UNIQUE(TaiKhoan),
    FOREIGN KEY(TaiKhoan) REFERENCES nguoidung(TaiKhoan)
							ON UPDATE CASCADE ON DELETE CASCADE
);
CREATE TABLE `hospital`.`BacSi`(
	MaNhanVien	MEDIUMINT AUTO_INCREMENT,
	PRIMARY KEY (MaNhanVien),
    FOREIGN KEY(MaNhanVien) REFERENCES NhanVien(MaNhanVien)
						ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE `hospital`.`BSQuanLy`(
	MaNhanVien	MEDIUMINT AUTO_INCREMENT,
	PRIMARY KEY (MaNhanVien),
    FOREIGN KEY(MaNhanVien) REFERENCES NhanVien(MaNhanVien)
						ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE `hospital`.`BenhNhan`(
	MaBenhNhan	MEDIUMINT AUTO_INCREMENT,
	DanToc		VARCHAR(15),
    TaiKhoan	VARCHAR(15),
    Loai 		ENUM("Không", "Nội Trú", "Ngoại Trú") DEFAULT "Không",
	PRIMARY KEY(MaBenhNhan),
    FOREIGN KEY(TaiKhoan) REFERENCES nguoidung(TaiKhoan)
					ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE `hospital`.`KhoaDieuTri`(
	MaKhoaDieuTri	MEDIUMINT AUTO_INCREMENT,
	TenKhoa			VARCHAR(30) UNIQUE,
	PRIMARY KEY(MaKhoaDieuTri)
);

CREATE TABLE `hospital`.`BHYTe`(
	MaTheBHYTe		VARCHAR(15),
	NgayDangKy			DATE,
	NgayHetHan			DATE,
	PRIMARY KEY(MaTheBHYTe)
);

CREATE TABLE `hospital`.`Benh`(
	MaBenh	MEDIUMINT AUTO_INCREMENT,
	TenBenh	VARCHAR(15),
	PRIMARY KEY(MaBenh)
);

CREATE TABLE `hospital`.`CDDDuong`(
	MaCDDDuong	MEDIUMINT AUTO_INCREMENT,
	CheDoAnUong	VARCHAR(255),
    PRIMARY KEY(MaCDDDuong)
);

CREATE TABLE `hospital`.`Thuoc`(
	MaThuoc		MEDIUMINT AUTO_INCREMENT,
	TenThuoc	VARCHAR(255),
	PRIMARY KEY(MaThuoc)
);

CREATE TABLE `hospital`.`ChiSoXN`(
	MaChiSoXetNghiem	MEDIUMINT AUTO_INCREMENT,
	NguongMin			DOUBLE,
	NguongMax			DOUBLE,
	PRIMARY KEY(MaChiSoXetNghiem)
);

CREATE TABLE `hospital`.`KhamBenh`(
	ThoiGianKhamBenh	DATETIME,
    MaNhanVien			MEDIUMINT,
    MaBenhNhan			MEDIUMINT,
	PRIMARY KEY(ThoiGianKhamBenh, MaNhanVien, MaBenhNhan),
    FOREIGN KEY(MaNhanVien) REFERENCES BacSi(MaNhanVien)
					ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY(MaBenhNhan) REFERENCES BenhNhan(MaBenhNhan)
					ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE `hospital`.`KQChanDoan`(
	ThoiGianRaKQ		DATETIME,
	ThoiGianKhamBenh	DATETIME,
    MaNhanVien			MEDIUMINT,
    MaBenhNhan			MEDIUMINT,    
	PRIMARY KEY(ThoiGianRaKQ, ThoiGianKhamBenh, MaNhanVien, MaBenhNhan),
    FOREIGN KEY(ThoiGianKhamBenh, MaNhanVien, MaBenhNhan) REFERENCES KhamBenh(ThoiGianKhamBenh, MaNhanVien, MaBenhNhan)
						ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE `hospital`.`BenhAn`(
	ThoiGianNhapVien	DATETIME,
    NVThoiGianRaKQ		DATETIME,
    NVThoiGianKhamBenh	DATETIME,
    NVMaNhanVien		MEDIUMINT,
    NVMaBenhNhan		MEDIUMINT,
	SoGiuong			INT,
	SoBuong				INT,
	TinhTrangNhapVien	VARCHAR(255),
    ThoiGianXuatVien	DATETIME,
    TinHTrangXuatVien	VARCHAR(255),
    GhiChuXuatVien		VARCHAR(255),
	PRIMARY KEY(ThoiGianNhapVien, NVThoiGianRaKQ, NVThoiGianKhamBenh, NVMaNhanVien, NVMaBenhNhan),
    FOREIGN KEY(NVThoiGianRaKQ, NVThoiGianKhamBenh, NVMaNhanVien, NVMaBenhNhan) REFERENCES KQChanDoan(ThoiGianRaKQ, ThoiGianKhamBenh, MaNhanVien, MaBenhNhan)
						ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT Check(ThoiGianXuatVien >= ThoiGianNhapVien or ThoiGianXuatVien IS NULL)
);

CREATE TABLE `hospital`.`XetNghiem`(
	TenXetNghiem		VARCHAR(15),
    ThoiGianKhamBenh	DATETIME,
    MaNhanVien			MEDIUMINT,
    MaBenhNhan			MEDIUMINT,
	PRIMARY KEY(TenXetNghiem, ThoiGianKhamBenh, MaNhanVien, MaBenhNhan),
    FOREIGN KEY(ThoiGianKhamBenh, MaNhanVien, MaBenhNhan) REFERENCES KhamBenh(ThoiGianKhamBenh, MaNhanVien, MaBenhNhan)
						ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE `hospital`.`Phim`(
	KetQua		VARCHAR(15),
	ThoiGianKhamBenh	DATETIME,
    MaNhanVien			MEDIUMINT,
    MaBenhNhan			MEDIUMINT,
	PRIMARY KEY(KetQua, ThoiGianKhamBenh, MaNhanVien, MaBenhNhan),
    FOREIGN KEY(ThoiGianKhamBenh, MaNhanVien, MaBenhNhan) REFERENCES KhamBenh(ThoiGianKhamBenh, MaNhanVien, MaBenhNhan)
						ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE `hospital`.`ChiSo`(
	TenChiSo			VARCHAR(15),
	TenXetNghiem		VARCHAR(15),
    ThoiGianKhamBenh	DATETIME,
    MaNhanVien			MEDIUMINT,
    MaBenhNhan			MEDIUMINT,
	KetQua				DOUBLE,
	PRIMARY KEY(TenChiSo,TenXetNghiem,ThoiGianKhamBenh,MaNhanVien,MaBenhNhan),
    FOREIGN KEY(TenXetNghiem,ThoiGianKhamBenh,MaNhanVien,MaBenhNhan) REFERENCES XetNghiem(TenXetNghiem,ThoiGianKhamBenh,MaNhanVien,MaBenhNhan)
						ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE `hospital`.`CaTruc`(
	NgayTruc	DATE,
    CaTruc		ENUM("Buổi sáng", "Buổi trưa", "Buổi chiều", "Buổi tối"),
    MaBacSi		MEDIUMINT,
	PRIMARY KEY(NgayTruc,CaTruc,MaBacSi),
    FOREIGN KEY(MaBacSi) REFERENCES BacSi(MaNhanVien)
						ON UPDATE CASCADE ON DELETE CASCADE
);

ALTER TABLE `hospital`.`BHYTE` ADD(
	MaBenhNhan	MEDIUMINT,
    FOREIGN KEY(MaBenhNhan) REFERENCES BenhNhan(MaBenhNhan)
							ON UPDATE CASCADE ON DELETE CASCADE
);

ALTER TABLE `hospital`.`BenhAn` ADD(
	XVThoiGianRaKQ		DATETIME,
    XVThoiGianKhamBenh	DATETIME,
    XVMaNhanVien		MEDIUMINT,
    XVMaBenhNhan		MEDIUMINT,
    FOREIGN KEY(XVThoiGianRaKQ, XVThoiGianKhamBenh, XVMaNhanVien, XVMaBenhNhan) REFERENCES KQChanDoan(ThoiGianRaKQ, ThoiGianKhamBenh, MaNhanVien, MaBenhNhan)
						ON UPDATE CASCADE ON DELETE CASCADE
);
    
ALTER TABLE `hospital`.`NhanVien` ADD(
	MaKhoaDieuTri		MEDIUMINT,
    FOREIGN KEY(MaKhoaDieuTri) REFERENCES KhoaDieuTri(MaKhoaDieuTri)
						ON UPDATE CASCADE ON DELETE CASCADE
);

ALTER TABLE `hospital`.`CaTruc` ADD(
	MaQuanLy 		MEDIUMINT,
    FOREIGN KEY(MaQuanLy) REFERENCES BSQuanly(MaNhanVien)
						ON UPDATE CASCADE ON DELETE CASCADE
);

ALTER TABLE `hospital`.`ChiSo` ADD(
	MaChiSoXetNghiem	MEDIUMINT,
    FOREIGN KEY(MaChiSoXetNghiem) REFERENCES ChiSoXN(MaChiSoXetNghiem)
						ON UPDATE CASCADE ON DELETE CASCADE
);


ALTER TABLE `hospital`.`Phim` ADD(
	MaNhanVienThucHien	MEDIUMINT,
    ThoiGianThucHien	DATETIME,
    FOREIGN KEY(MaNhanVienThucHien) REFERENCES BacSi(MaNhanVien)	
						ON UPDATE CASCADE ON DELETE CASCADE
	-- CONSTRAINT CHECK(ThoiGianThucHien >= ThoiGianKhamBenh or ThoiGianThucHien IS NULL)
);
ALTER TABLE `hospital`.`XetNghiem` ADD(
	MaNhanVienThucHien	MEDIUMINT,
    ThoiGianThucHien	DATETIME,
    FOREIGN KEY(MaNhanVienThucHien) REFERENCES BacSi(MaNhanVien)
						ON UPDATE CASCADE ON DELETE CASCADE
-- 	CONSTRAINT CHECK(ThoiGianThucHien >= ThoiGianKhamBenh or ThoiGianThucHien IS NULL),
--     CONSTRAINT CHECK(MaNhanVienChiDinh != MaNhanVienThucHien)
);
CREATE TABLE `hospital`.`KQCDDDuong`(
	ThoiGianRaKQ		DATETIME,
	ThoiGianKhamBenh  	DATETIME,
	MaNhanVien 			MEDIUMINT, 
	MaBenhNhan			MEDIUMINT,
	MaCDDDuong			MEDIUMINT,
    PRIMARY KEY(ThoiGianRaKQ,ThoiGianKhamBenh,MaNhanVien,MaBenhNhan, MaCDDDuong),
    FOREIGN KEY(ThoiGianRaKQ,ThoiGianKhamBenh,MaNhanVien,MaBenhNhan)
				REFERENCES KQChanDoan(ThoiGianRaKQ,ThoiGianKhamBenh,MaNhanVien,MaBenhNhan)
						ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(MaCDDDuong) REFERENCES cddduong(MaCDDDuong)
						ON UPDATE CASCADE ON DELETE CASCADE
);
CREATE TABLE `hospital`.`KQThuoc`(
	ThoiGianRaKQ		DATETIME,
	ThoiGianKhamBenh  	DATETIME,
	MaNhanVien 			MEDIUMINT, 
	MaBenhNhan			MEDIUMINT,
	MaThuoc				MEDIUMINT,
	LieuDung			INT,
	CachDung			VARCHAR(100),
	ThoiGianDung	 	INT,
	PRIMARY KEY(ThoiGianRaKQ,ThoiGianKhamBenh,MaNhanVien,MaBenhNhan, MaThuoc),
	FOREIGN KEY(ThoiGianRaKQ, ThoiGianKhamBenh, MaNhanVien, MaBenhNhan) 
			REFERENCES KQChanDoan(ThoiGianRaKQ, ThoiGianKhamBenh, MaNhanVien, MaBenhNhan)
						ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(MaThuoc) REFERENCES Thuoc(MaThuoc)
						ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE `hospital`.`KQBenh`(
	ThoiGianRaKQ	DATETIME,
	ThoiGianKhamBenh  DATETIME,
	MaNhanVien 	MEDIUMINT, 
	MaBenhNhan	MEDIUMINT,
	MaBenh		MEDIUMINT,
	PRIMARY KEY(ThoiGianRaKQ,ThoiGianKhamBenh,MaNhanVien,MaBenhNhan, MaBenh),
	FOREIGN KEY(ThoiGianRaKQ, ThoiGianKhamBenh, MaNhanVien, MaBenhNhan) 
			REFERENCES KQChanDoan(ThoiGianRaKQ, ThoiGianKhamBenh, MaNhanVien, MaBenhNhan)
						ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(MaBenh) REFERENCES Benh(MaBenh)
						ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE `hospital`.`ThoiGianThamKham`(
	MaBenhNhan		MEDIUMINT,
    NgayGio			DATETIME,
    FOREIGN KEY(MaBenhNhan) REFERENCES BenhNhan(MaBenhNhan)
						ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE `hospital`.`ThoiGianTaiKham`(
	MaBenhNhan		MEDIUMINT,
    NgayGio			DATETIME,
    FOREIGN KEY(MaBenhNhan) REFERENCES BenhNhan(MaBenhNhan)
						ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE `hospital`.`TrieuChung`(
	ThoiGianKhamBenh datetime, 
    MaNhanVien MEDIUMINT, 
    MaBenhNhan MEDIUMINT,
    TrieuChung varchar(15),
    Primary key (ThoiGianKhamBenh, MaNhanVien, MaBenhNhan,TrieuChung),
    Foreign key(ThoiGianKhamBenh, MaNhanVien, MaBenhNhan) references KhamBenh(ThoiGianKhamBenh, MaNhanVien, MaBenhNhan)
													ON UPDATE CASCADE ON DELETE CASCADE
);

-- ii). Bác sĩ @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

-- (ii.1). Cập nhật hoạt động khám/ chữa bệnh cho bệnh nhân ngoại trú trong một ca trực.
DROP PROCEDURE IF EXISTS KhamBenh_BacSi_BenhNhan;
DELIMITER //
Create PROCEDURE KhamBenh_BacSi_BenhNhan (MaNhanVien MEDIUMINT , MaBenhNhan MEDIUMINT, TrieuChung_Array varchar(1000), thoigianKhamBenh DATETIME)								
BEGIN  
	DECLARE TrieuChung_array_local VARCHAR(1000);
    DECLARE start_pos SMALLINT;
    DECLARE comma_pos SMALLINT;
    DECLARE current_TrieuChung VARCHAR(1000);
    DECLARE end_loop TINYINT;
	INSERT INTO KhamBenh (ThoiGianKhamBenh, MaNhanVien, MaBenhNhan)
				VALUES (thoigianKhamBenh, MaNhanVien, MaBenhNhan);
    SET TrieuChung_array_local = TrieuChung_array;
    SET start_pos = 1;
    SET comma_pos = locate(',', TrieuChung_array);

    REPEAT
        IF comma_pos > 0 THEN
            SET current_TrieuChung = substring(TrieuChung_array_local, start_pos, comma_pos - start_pos);
            SET end_loop = 0;
        ELSE
            SET current_TrieuChung = substring(TrieuChung_array_local, start_pos);
            SET end_loop = 1;
        END IF;
        
			INSERT INTO TrieuChung (ThoiGianKhamBenh, MaNhanVien, MaBenhNhan, TrieuChung)
							VALUES (thoigianKhamBenh, MaNhanVien, MaBenhNhan, current_TrieuChung);
        IF end_loop = 0 THEN
            SET TrieuChung_array_local = substring(TrieuChung_array_local, comma_pos + 1);
            SET comma_pos = locate(',', TrieuChung_array_local);
        END IF;
    UNTIL end_loop = 1

    END REPEAT;
END
// 
DELIMITER ;

-- TEST OKE (2 - 59)

DROP PROCEDURE IF EXISTS DuaRaKQ_BacSi_BenhNhan;
DELIMITER //
Create PROCEDURE DuaRaKQ_BacSi_BenhNhan (MaNhanVien MEDIUMINT , MaBenhNhan MEDIUMINT, ThoiGianKhamBenh DateTime, ThoiGianRaKQ DateTime)
BEGIN
	INSERT INTO KQChanDoan(ThoiGianRaKQ, ThoiGianKhamBenh, MaNhanVien, MaBenhNhan)
				Values (ThoiGianRaKQ, ThoiGianKhamBenh, MaNhanVien, MaBenhNhan);
END

//
DELIMITER ;

-- TEST OKE (62 - 86)

DROP PROCEDURE IF EXISTS ThemThuoc;
DELIMITER //
Create PROCEDURE ThemThuoc(TenThuoc VARCHAR(255))
BEGIN
	INSERT INTO thuoc(TenThuoc) VALUES (TenThuoc);
END
//
DELIMITER ;
-- TEST OKE (89 - 108)

DROP PROCEDURE IF EXISTS ThemThuocVaoKQ;
DELIMITER //
Create PROCEDURE ThemThuocVaoKQ (MaNhanVien MEDIUMINT , MaBenhNhan MEDIUMINT, ThoiGianKhamBenh DateTime, ThoiGianRaKQ DateTime, MaThuoc MediumInt, LieuDung int, CachDung VARCHAR(100), NgayDung int)
BEGIN
	INSERT INTO kqthuoc(ThoiGianRaKQ, ThoiGianKhamBenh, MaNhanVien, MaBenhNhan, MaThuoc, LieuDung, CachDung, ThoiGianDung)
				Values (ThoiGianRaKQ, ThoiGianKhamBenh, MaNhanVien, MaBenhNhan, MaThuoc, LieuDung, CachDung, NgayDung);
END

//
DELIMITER ;

-- TEST OKE (110 - 129)

DROP PROCEDURE IF EXISTS ThemBenh;
DELIMITER //
Create PROCEDURE ThemBenh(TenBenh	VARCHAR(15))
BEGIN
	INSERT INTO benh(TenBenh)
				Values (TenBenh);
END
//
DELIMITER ;

-- TEST OKE (131 - 149) PROCUDURE NAY TUI THEM VO

DROP PROCEDURE IF EXISTS ThemKQBenh;
DELIMITER //
Create PROCEDURE ThemKQBenh (MaNhanVien MEDIUMINT , MaBenhNhan MEDIUMINT, ThoiGianKhamBenh DateTime, ThoiGianRaKQ DateTime, MaBenh MEDIUMINT)
BEGIN
	INSERT INTO KQBenh(ThoiGianRaKQ, ThoiGianKhamBenh, MaNhanVien, MaBenhNhan, MaBenh)
				Values (ThoiGianRaKQ, ThoiGianKhamBenh, MaNhanVien, MaBenhNhan, MaBenh);
END

//
DELIMITER ;
-- TEST OKE (151 - 170) 


                                     -- TUI KHONG HIEU LOI - TUI KHONG BIET CO CAN PROCEDURE NAY KO (ERROR CODE: DUPPLICATE ....)
DROP PROCEDURE IF EXISTS ThemKQThuoc;    
DELIMITER //
Create PROCEDURE ThemKQThuoc (MaNhanVien MEDIUMINT , MaBenhNhan MEDIUMINT, ThoiGianKhamBenh DateTime, ThoiGianRaKQ DateTime, MaThuoc MEDIUMINT, LieuDung Int, CachDung varchar(100), ThoiGianDung int)
BEGIN
	INSERT INTO KQThuoc(ThoiGianRaKQ, ThoiGianKhamBenh, MaNhanVien, MaBenhNhan, MaThuoc, LieuDung, CachDung, ThoiGianDung)
				Values (ThoiGianRaKQ, ThoiGianKhamBenh, MaNhanVien, MaBenhNhan, MaThuoc, LieuDung, CachDung, ThoiGianDung);
END

//
DELIMITER ;

-- call ThemKQThuoc (2,1,'2020-12-05 12:26:52', '2020-12-04 23:22:19', 1, 1, 'Uong ngay 3 bua', 1 );
-- call ThemKQThuoc (2,2,'2020-12-05 12:29:37', '2020-12-05 23:22:19',2, 2, 'Uong ngay 3 bua', 2 );
-- call ThemKQThuoc (2,3,'2020-12-05 12:29:37', '2020-12-06 23:22:19',3, 3, 'Uong ngay 3 bua', 3 );
-- call ThemKQThuoc (3,4,'2020-12-05 12:29:37', '2020-12-07 23:22:19',4, 4, 'Uong ngay 3 bua', 4 );
-- call ThemKQThuoc (3,5,'2020-12-05 12:29:38', '2020-12-08 23:22:19',5, 5, 'Uong ngay 3 bua', 5 );
-- call ThemKQThuoc (4,6,'2020-12-05 12:29:38', '2020-12-09 23:22:19',6, 6, 'Uong ngay 3 bua', 6 );
-- call ThemKQThuoc (4,7,'2020-12-05 12:29:38', '2020-12-10 23:22:19',7, 7, 'Uong ngay 3 bua', 7 );
-- call ThemKQThuoc (5,8,'2020-12-05 12:29:38', '2020-12-11 23:22:19',8, 8, 'Uong ngay 3 bua', 8 );
-- call ThemKQThuoc (5,9,'2020-12-05 12:29:38', '2020-12-12 23:22:19',9, 9, 'Uong ngay 3 bua', 9 );
-- call ThemKQThuoc (6,10,'2020-12-05 12:29:38', '2020-12-13 23:22:19',10, 10, 'Uong ngay 3 bua', 10 );
-- call ThemKQThuoc (6,11,'2020-12-05 12:29:38', '2020-12-14 23:22:19',11, 11, 'Uong ngay 3 bua', 11 );
-- call ThemKQThuoc (7,12,'2020-12-05 12:29:38', '2020-12-15 23:22:19',12, 12, 'Uong ngay 3 bua', 12 );
-- call ThemKQThuoc (7,13,'2020-12-05 12:29:38', '2020-12-16 23:22:19',13, 13, 'Uong ngay 3 bua', 13 );
-- call ThemKQThuoc (8,14,'2020-12-05 12:29:38', '2020-12-17 23:22:19',14, 14, 'Uong ngay 3 bua', 14 );
-- call ThemKQThuoc (8,15,'2020-12-05 12:29:38', '2020-12-18 23:22:19',15, 15, 'Uong ngay 3 bua', 15 );
-- call ThemKQThuoc (9,16,'2020-12-05 12:29:38', '2020-12-19 23:22:19',16, 16, 'Uong ngay 3 bua', 16);
-- call ThemKQThuoc (9,17,'2020-12-05 12:29:38', '2020-12-20 23:22:19',17, 17, 'Uong ngay 3 bua', 17 );
-- call ThemKQThuoc (10,18,'2020-12-05 12:29:38', '2020-12-21 23:22:19',18, 18, 'Uong ngay 3 bua', 18 );
-- call ThemKQThuoc (10,19,'2020-12-05 12:29:38', '2020-12-22 23:22:19',19, 19, 'Uong ngay 3 bua', 19 );
-- call ThemKQThuoc (10,20,'2020-12-05 12:29:38', '2020-12-23 23:22:19',20, 20, 'Uong ngay 3 bua', 20 );


DROP PROCEDURE IF EXISTS ThemCDDDuong;
DELIMITER //
Create PROCEDURE ThemCDDDuong(CheDoAnUong VARCHAR(255))
BEGIN
	INSERT INTO CDDDuong(CheDoAnUong)
				Values (CheDoAnUong);
END
//
DELIMITER ;

-- TEST OKE (172 - 191) PROCUDURE NAY TUI THEM VO

DROP PROCEDURE IF EXISTS ThemKQCDDDuong;
DELIMITER //
Create PROCEDURE ThemKQCDDDuong (MaNhanVien MEDIUMINT , MaBenhNhan MEDIUMINT, ThoiGianKhamBenh DateTime, ThoiGianRaKQ DateTime, MaCDDDuong MEDIUMINT)
BEGIN
	INSERT INTO KQCDDDUONG(ThoiGianRaKQ, ThoiGianKhamBenh, MaNhanVien, MaBenhNhan, MaCDDDuong)
				Values (ThoiGianRaKQ, ThoiGianKhamBenh, MaNhanVien, MaBenhNhan, MaCDDDuong);
END

//
DELIMITER ;

-- TEST OKE (193 - 212) 

DROP PROCEDURE IF EXISTS ThemBenhAn;  
DELIMITER //
Create PROCEDURE ThemBenhAn (ThoiGianNhapVien DATETIME, NVThoiGianRaKQ DATETIME, NVThoiGianKhamBenh	DATETIME, NVMaNhanVien MEDIUMINT, NVMaBenhNhan MEDIUMINT, 
				 SoGiuong INT, SoBuong INT, TinhTrangNhapVien VARCHAR(255), ThoiGianXuatVien DATETIME, TinHTrangXuatVien VARCHAR(255), GhiChuXuatVien VARCHAR(255),
				 XVThoiGianRaKQ DATETIME, XVThoiGianKhamBenh DATETIME, XVMaNhanVien MEDIUMINT, XVMaBenhNhan MEDIUMINT)
BEGIN
	INSERT INTO BENHAN(ThoiGianNhapVien,NVThoiGianRaKQ, NVThoiGianKhamBenh, NVMaNhanVien,NVMaBenhNhan, SoGiuong	, SoBuong, TinhTrangNhapVien, ThoiGianXuatVien,
    TinHTrangXuatVien, GhiChuXuatVien, XVThoiGianRaKQ, XVThoiGianKhamBenh, XVMaNhanVien, XVMaBenhNhan )
				Values (ThoiGianNhapVien,NVThoiGianRaKQ, NVThoiGianKhamBenh, NVMaNhanVien,NVMaBenhNhan, SoGiuong	, SoBuong, TinhTrangNhapVien, ThoiGianXuatVien, 
                TinHTrangXuatVien, GhiChuXuatVien, XVThoiGianRaKQ, XVThoiGianKhamBenh, XVMaNhanVien, XVMaBenhNhan);
END

//
DELIMITER ;
-- TEST OKE (214 - 222) 
-- (ii.2). Cập nhật hoạt động khám/ chữa bệnh cho bệnh nhân nội trú trong một ca trực.

DROP PROCEDURE IF EXISTS NhapVien;
DELIMITER //
Create PROCEDURE NhapVien (MaNhanVien MEDIUMINT , MaBenhNhan MEDIUMINT, ThoiGianKhamBenh DateTime, ThoiGianRaKQ DateTime,
							ThoiGianNhapVien Datetime, SoGiuong int, SoBuong int, TinhTrangNhapVien varchar(255))
BEGIN
	INSERT INTO BenhAn(NVThoiGianRaKQ, NVThoiGianKhamBenh, NVMaNhanVien, NVMaBenhNhan, ThoiGianNhapVien, SoGiuong, SoBuong, TinhTrangNhapVien)
				Values (ThoiGianRaKQ, ThoiGianKhamBenh, MaNhanVien, MaBenhNhan, ThoiGianNhapVien, SoGiuong, SoBuong, TinhTrangNhapVien);
END

//
DELIMITER ;
-- TEST OKE (224 - 228) 


DROP PROCEDURE IF EXISTS XuatVien;
DELIMITER //
Create PROCEDURE XuatVien (NVMaNhanVien MEDIUMINT , NVMaBenhNhan MEDIUMINT, NVThoiGianKhamBenh DateTime, NVThoiGianRaKQ DateTime,
							ThoiGianNhapVien Datetime, ThoiGianXuatVien Datetime, TinhTrangXuatVien varchar(255), GhiChuXuatVien varchar(255),
                            MaNhanVien MEDIUMINT , MaBenhNhan MEDIUMINT, ThoiGianKhamBenh DateTime, ThoiGianRaKQ DateTime)
BEGIN
	UPDATE BenhAn as ba
    SET ba.ThoiGianXuatVien = ThoiGianXuatVien ,
		ba.TinhTrangXuatVien = TinhTrangXuatVien,
        ba.GhiChuXuatVien = GhiChuXuatVien,
        ba.XVMaNhanVien = MaNhanVien,
        ba.XVMaBenhNhan = MaBenhNhan,
        ba.XVThoiGianKhamBenh = ThoiGianKhamBenh,
        ba.XVThoiGianRaKQ = ThoiGianRaKQ 
	WHERE ba.NVMaNhanVien = NVMaNhanVien and
		  ba.NVMaBenhNhan = NVMaBenhNhan and
          ba.NVThoiGianKhamBenh = NVThoiGianKhamBenh and
          ba.NVThoiGianRaKQ = NVThoiGianRaKQ and
          ba.ThoiGianNhapVien = ThoiGianNhapVien;
END;
//
DELIMITER ;

-- TEST OKE (231 - 235) 

//
DELIMITER ;
-- (ii.3). Xem danh sách bệnh nhân trong một ngày mà mình đã phụ trách.

DROP PROCEDURE IF EXISTS DSBenhNhan_PhuTrach;
DELIMITER //
CREATE PROCEDURE DSBenhNhan_PhuTrach (MaNhanVien MEDIUMINT, Ngay Date)
BEGIN
	SELECT *
    FROM BenhNhan 
    WHERE MaBenhNhan IN (SELECT kb.MaBenhNhan FROM KhamBenh kb
						WHERE kb.MaNhanVien = MaNhanVien and
								Date(ThoiGianKhamBenh) = Ngay);
END
//
DELIMITER ;

-- TEST OKE (237 - 245) 

-- (ii.4). Xem các chẩn đoán bệnh của một bệnh nhân mà mình đã phụ trách.

DROP PROCEDURE IF EXISTS DSChanDoan_Benh;
DELIMITER //
CREATE PROCEDURE DSChanDoan_Benh (MaNhanVien MEDIUMINT, MaBenhNhan MEDIUMINT, MaBenh MEDIUMINT)
BEGIN
	SELECT *
    FROM KQChanDoan kq
    WHERE 	kq.MaNhanVien = MaNhanVien and
			kq.MaBenhNhan = MaBenhNhan and
			(kq.ThoiGianRaKQ, kq.ThoiGianKhamBenh, kq.MaNhanVien, kq.MaBenhNhan) IN
					(SELECT kqb.ThoiGianRaKQ, kqb.ThoiGianKhamBenh, kqb.MaNhanVien, kqb.MaBenhNhan 
						FROM KQBenh kqb WHERE kqb.MaBenh = MaBenh)
	;
END
//
DELIMITER ;
-- TEST OKE (247 - 256) 


-- (ii.5). Xem các thuốc đã được dùng qua các ngày của một bệnh nhân nội trú mà mình đã phụ trách.
-- SAI

-- DROP PROCEDURE IF EXISTS DSThuoc_BacSi;  
-- DELIMITER //
-- CREATE PROCEDURE DSThuoc_BacSi (MaNhanVien MEDIUMINT, MaBenhNhan MEDIUMINT, FromDate Date, ToDate Date)
-- BEGIN
-- 	SELECT *
--     FROM Thuoc 
--     WHERE MaThuoc IN (SELECT kqt.MaThuoc FROM KQThuoc kqt
-- 						WHERE 	kqt.MaNhanVien = MaNhanVien and
-- 								kqt.MaBenhNhan = MaBenhNhan and
-- 								(kqt.ThoiGianRaKQ, kqt.ThoiGianKhamBenh, kqt.MaNhanVien, kqt.MaBenhNhan) IN (SELECT (ThoiGianRaKQ, ThoiGianKhamBenh, MaNhanVien, MaBenhNhan) FROM BenhAn) and
--                                 kqt.ThoiGianRaKQ >= FromDate and kqt.ThoiGianRaKQ <= ToDate)
--                                 
-- 	;
-- END
-- //
-- DELIMITER ;

DROP PROCEDURE IF EXISTS DSThuoc_BacSi;  
DELIMITER //
CREATE PROCEDURE DSThuoc_BacSi (MaNhanVien MEDIUMINT, MaBenhNhan MEDIUMINT, FromDate Date, ToDate Date)
BEGIN
	SELECT *
    FROM Thuoc 
    WHERE MaThuoc IN (SELECT kqt.MaThuoc FROM KQThuoc kqt
						WHERE 	kqt.MaNhanVien = MaNhanVien and
								kqt.MaBenhNhan = MaBenhNhan and
								kqt.ThoiGianRaKQ IN (SELECT ThoiGianRaKQ FROM BenhAn) and
                                kqt.ThoiGianKhamBenh IN (SELECT ThoiGianKhamBenh FROM BenhAn) and
                                kqt.MaNhanVien IN (SELECT MaNhanVien FROM BenhAn) and
                                kqt.MaBenhNhan IN (SELECT MaBenhNhan FROM BenhAn) and
                                kqt.ThoiGianRaKQ >= FromDate and kqt.ThoiGianRaKQ <= ToDate)
                                
	;
END
//
DELIMITER ;

-- TEST OKE (258 - 267) 

-- (ii.6). Xem các chỉ định xét nghiệm đã làm qua các ngày của một bệnh nhân nội trú mà mình đã phụ trách.
DROP PROCEDURE IF EXISTS taoXetNghiem;
DELIMITER //
create PROCEDURE taoXetNghiem( MaNhanVien MEDIUMINT, MaBenhNhan MEDIUMINT, ThoiGianKhamBenh DATETIME, TenXetNghiem VARCHAR(15), MaNhanVienThucHien MEDIUMINT,ThoiGianThucHien DATETIME)
BEGIN
	INSERT INTO XetNghiem(TenXetNghiem, ThoiGianKhamBenh, MaNhanVien, MaBenhNhan, MaNhanVienThucHien,ThoiGianThucHien) 
    VALUES (TenXetNghiem, ThoiGianKhamBenh, MaNhanVien, MaBenhNhan, MaNhanVienThucHien,ThoiGianThucHien);
END //
DELIMITER ;

-- TEST OKE (269 - 278) CAI NAY TUI THEM VAO

DROP PROCEDURE IF EXISTS taoChiSoXN;
DELIMITER //
create PROCEDURE taoChiSoXN(NguongMin DOUBLE, NguongMax DOUBLE)
BEGIN
	INSERT INTO ChiSoXN(NguongMin, NguongMax) 
    VALUES (NguongMin, NguongMax) ;
END //
DELIMITER ;

-- TEST OKE (280 - 289) CAI NAY TUI THEM VAO

DROP PROCEDURE IF EXISTS taoChiSo;
DELIMITER //
create PROCEDURE taoChiSo(TenChiSo VARCHAR(15), TenXetNghiem VARCHAR(15), ThoiGianKhamBenh DATETIME, MaNhanVien MEDIUMINT, MaBenhNhan MEDIUMINT, KetQua DOUBLE, MaChiSoXetNghiem MEDIUMINT)
BEGIN
	INSERT INTO ChiSo(TenChiSo, TenXetNghiem, ThoiGianKhamBenh, MaNhanVien, MaBenhNhan, KetQua, MaChiSoXetNghiem)
    VALUES (TenChiSo, TenXetNghiem, ThoiGianKhamBenh, MaNhanVien, MaBenhNhan, KetQua, MaChiSoXetNghiem);
END //
DELIMITER ;

-- TEST OKE (291 - 300) 

DROP PROCEDURE IF EXISTS DSXetNghiem_BacSi;  
DELIMITER //
CREATE PROCEDURE DSXetNghiem_BacSi (MaNhanVien MEDIUMINT, MaBenhNhan MEDIUMINT, FromDate Date, ToDate Date)
BEGIN
	SELECT *
    FROM XetNghiem xn
    WHERE xn.MaNhanVienThucHien = MaNhanVien and
			xn.MaBenhNhan = MaBenhNhan and
            xn.ThoiGianThucHien >= FromDate and xn.ThoiGianThucHien <= ToDate and
            (xn.ThoiGianKhamBenh, xn.MaNhanVien, xn.MaBenhNhan) in (SELECT NVThoiGianKhamBenh, NVMaNhanVien, NVMaBenhNhan FROM BenhAn)
            
	;
END
//
DELIMITER ; 
 -- SUA LAI THANH NV
-- TEST OKE (302 - 310) 

-- (ii.7). Xem các chỉ định chụp phim đã làm qua các ngày của một bệnh nhân nội trú mà mình đã phụ trách.

DROP PROCEDURE IF EXISTS taoPhim;
DELIMITER //
create PROCEDURE taoPhim(MaNhanVien MEDIUMINT, MaBenhNhan MEDIUMINT, ThoiGianKhamBenh DATETIME, KetQua VARCHAR(15),  
		MaNhanVienThucHien MEDIUMINT, ThoiGianThucHien DATETIME)
BEGIN
	INSERT INTO phim(KetQua, ThoiGianKhamBenh, MaNhanVien, MaBenhNhan, MaNhanVienThucHien, ThoiGianThucHien)
    VALUES (KetQua, ThoiGianKhamBenh, MaNhanVien, MaBenhNhan, MaNhanVienThucHien, ThoiGianThucHien);
END //
DELIMITER ;

-- OKE , CAI NAY TUI TAO THEM (312 -320)


DROP PROCEDURE IF EXISTS DSChupPhim_BacSi;  
DELIMITER //
CREATE PROCEDURE DSChupPhim_BacSi (MaNhanVien MEDIUMINT, MaBenhNhan MEDIUMINT, FromDate Date, ToDate Date)
BEGIN
	SELECT *
    FROM Phim xn
    WHERE xn.MaNhanVienThucHien = MaNhanVien and
			xn.MaBenhNhan = MaBenhNhan and
            xn.ThoiGianThucHien >= FromDate and xn.ThoiGianThucHien <= ToDate and
            (xn.ThoiGianKhamBenh, xn.MaNhanVien, xn.MaBenhNhan) in (SELECT NVThoiGianKhamBenh, NVMaNhanVien, NVMaBenhNhan FROM BenhAn) 
	;
END
//
DELIMITER ;
  -- SUA LAI THANH NV
-- OKE (322 - 331)

-- (ii.8). Xem các bệnh nhân của cùng một bệnh mà mình đã chẩn đoán.

DROP PROCEDURE IF EXISTS DSBenhNhan_CungBenhBenhNhan_CungBenh; 
DELIMITER //
CREATE PROCEDURE DSBenhNhan_CungBenhBenhNhan_CungBenh (MaNhanVien MEDIUMINT, MaBenhNhan MEDIUMINT, MaBenh MEDIUMINT)
BEGIN
	SELECT *
    FROM BenhNhan bn
    WHERE bn.MaBenhNhan in (SELECT kq.MaBenhNhan FROM KQChanDoan kq
							WHERE kq.MaNhanVien = MaNhanVien and
									(kq.ThoiGianRaKQ, kq.ThoiGianKhamBenh, kq.MaNhanVien, kq.MaBenhNhan) IN (SELECT kqb.ThoiGianRaKQ, kqb.ThoiGianKhamBenh, kqb.MaNhanVien, kqb.MaBenhNhan FROM KQBENH kqb WHERE kqb.MaBenh = MaBenh)
							)
	;
END
//
DELIMITER ;

-- OKE (333 - 342) 

-- (ii.9). Xem các bệnh nhân có ghi chú “bất thường” trong kết quả xét nghiệm của cùng một bệnh mà mình đã chẩn đoán.

DROP FUNCTION IF EXISTS TinhGhiChu;
DELIMITER //

CREATE FUNCTION TinhGhiChu (ChiSo DOUBLE, NguongMax Double, NguongMin Double)
returns Enum("Bình Thường", "Bất Thường") DETERMINISTIC
BEGIN
	Declare kq Enum("Bình Thường", "Bất Thường") ;
	If ChiSo <= NguongMax and ChiSo >= NguongMin THEN
		SET kq = "Bình Thường";
	ELSE
		SET kq = "Bất Thường";
	END IF;
    return kq;
END
//
DELIMITER ;

DROP VIEW IF EXISTS view_GhiChu_ChiSo;
CREATE VIEW view_GhiChu_ChiSo as
	SELECT *, TinhGhiChu(cs.KetQua, csxn.NguongMax, csxn.NguongMIn) as GhiChu
	FROM ChiSo cs natural join ChiSoXn csxn;
 

DROP PROCEDURE IF EXISTS DSBenhNhan_BatThuong;  
DELIMITER //
CREATE PROCEDURE DSBenhNhan_BatThuong(MaNhanVien MEDIUMINT, MaBenh MEDIUMINT)
BEGIN
	SELECT *
    FROM BenhNhan bn
    WHERE bn.MaBenhNhan IN (SELECT v.MaBenhNhan FROM view_GhiChu_ChiSo v
							WHERE (v.ThoiGianKhamBenh, v.MaNhanVien, v.MaBenhNhan) IN (SELECT kq.ThoiGianKhamBenh, kq.MaNhanVien, kq.MaBenhNhan 
																						FROM KQBenh kq
                                                                                        WHERE kq.MaBenh = MaBenh)
									and v.MaNhanVien =  MaNhanVien)
	;
												
END
//
DELIMITER ;

--  TEST OKE (344 - 352)



-- (ii.10). Xem các bệnh nhân đã xuất viện mà mình đã phụ trách.  -- TEST

DROP PROCEDURE IF EXISTS DSBenhNhan_XV;
DELIMITER //
CREATE PROCEDURE DSBenhNhan_XV(MaNhanVien MEDIUMINT)
BEGIN
	SELECT *
    From BenhNhan bn
    WHERE bn.MaBenhNhan IN (SELECT ba.XVMaBenhNhan  -- tui sua lai thanh XVMaBenhNhan
							FROM BenhAn ba
							WHERE ba.XVMaNhanVien = MaNhanVien  -- tui sua lai thanh XVMaNhanVien
									and ThoiGianXuatVien IS NOT NULL);
END
//
DELIMITER ;

-- OKE (354 - 362)



-- (ii.11). Xem các bệnh nhân nội trú có số lượng dùng của một loại thuốc giảm dần trong 3 lần dùng thuốc liên tiếp mà mình đã phụ trách.
--  Chưa biết làm
-- (ii.12). Xem các bệnh nhân có ghi chú “bình thường” của một chỉ số xét nghiệm trong kết quả xét nghiệm gần nhất nhưng có ghi chú “bất thường” của cùng một chỉ số xét nghiệm trong kết quả xét nghiệm trước đó mà mình đã phụ trách.
-- Chua biết làm


DROP USER IF EXISTS 'BacSi'@'localhost';
CREATE USER 'BacSi'@'localhost' IDENTIFIED BY 'BacSi';
GRANT EXECUTE ON PROCEDURE hospital.KhamBenh_BacSi_BenhNhan TO 'BacSi'@'localhost';
GRANT EXECUTE ON PROCEDURE hospital.DuaRaKQ_BacSi_BenhNhan TO 'BacSi'@'localhost';
GRANT EXECUTE ON PROCEDURE hospital.ThemThuoc TO 'BacSi'@'localhost';
GRANT EXECUTE ON PROCEDURE hospital.ThemThuocVaoKQ TO 'BacSi'@'localhost';
GRANT EXECUTE ON PROCEDURE hospital.ThemBenh TO 'BacSi'@'localhost';
GRANT EXECUTE ON PROCEDURE hospital.ThemKQBenh TO 'BacSi'@'localhost';  
GRANT EXECUTE ON PROCEDURE hospital.ThemKQThuoc TO 'BacSi'@'localhost'; -- ???
GRANT EXECUTE ON PROCEDURE hospital.ThemCDDDuong TO 'BacSi'@'localhost';
GRANT EXECUTE ON PROCEDURE hospital.ThemKQCDDDuong TO 'BacSi'@'localhost';
GRANT EXECUTE ON PROCEDURE hospital.ThemBenhAn TO 'BacSi'@'localhost';
GRANT EXECUTE ON PROCEDURE hospital.NhapVien TO 'BacSi'@'localhost';
GRANT EXECUTE ON PROCEDURE hospital.XuatVien TO 'BacSi'@'localhost';
GRANT EXECUTE ON PROCEDURE hospital.DSBenhNhan_PhuTrach TO 'BacSi'@'localhost';
GRANT EXECUTE ON PROCEDURE hospital.DSChanDoan_Benh TO 'BacSi'@'localhost';
GRANT EXECUTE ON PROCEDURE hospital.DSThuoc_BacSi TO 'BacSi'@'localhost';
GRANT EXECUTE ON PROCEDURE hospital.taoXetNghiem TO 'BacSi'@'localhost';
GRANT EXECUTE ON PROCEDURE hospital.taoChiSoXN TO 'BacSi'@'localhost';
GRANT EXECUTE ON PROCEDURE hospital.taoChiSo TO 'BacSi'@'localhost';
GRANT EXECUTE ON PROCEDURE hospital.DSXetNghiem_BacSi TO 'BacSi'@'localhost'; 
GRANT EXECUTE ON PROCEDURE hospital.taoPhim TO 'BacSi'@'localhost';
GRANT EXECUTE ON PROCEDURE hospital.DSChupPhim_BacSi TO 'BacSi'@'localhost';
GRANT EXECUTE ON PROCEDURE hospital.DSBenhNhan_CungBenhBenhNhan_CungBenh TO 'BacSi'@'localhost';
GRANT EXECUTE ON FUNCTION hospital.TinhGhiChu TO 'BacSi'@'localhost';
GRANT SELECT ON hospital.view_GhiChu_ChiSo TO 'BacSi'@'localhost';
GRANT EXECUTE ON PROCEDURE hospital.DSBenhNhan_BatThuong TO 'BacSi'@'localhost';
GRANT EXECUTE ON PROCEDURE hospital.DSBenhNhan_XV TO 'BacSi'@'localhost';


-- (iii). Bệnh nhân @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
-- (iii.1). Cập nhật thông tin nhân khẩu học và thông tin bảo hiểm y tế.

/*Checked*/
DROP PROCEDURE IF EXISTS taoBenhNhan;
DELIMITER //
CREATE PROCEDURE taoBenhNhan(TaiKhoan 	VARCHAR(15), 
							MatKhau 	VARCHAR(100),
							HoVaTenLot 	VARCHAR(30),
							Ten			VARCHAR(15),
							Email 	 	VARCHAR(50),
							SDT			VARCHAR(15),
							GioiTinh 	BOOLEAN,  	-- 1: Nam, 0: Nu
							NgaySinh	DATE,
                            DanToc 		Varchar(15))
	Begin
		START TRANSACTION;
		INSERT INTO NguoiDung(TaiKhoan, MatKhau, HoVaTenLot, Ten, Email, SDT, GioiTinh, NgaySinh)
					VALUES (TaiKhoan, MatKhau, HoVaTenLot, Ten, Email, SDT, GioiTinh, NgaySinh);
		INSERT INTO BenhNhan(TaiKhoan, Loai, DanToc)
					Values (TaiKhoan, "Không", DanToc);
		COMMIT;
	end //
DELIMITER ;
/*
Drop view if exists BenhNhanView;
Create View BenhNhanView as
	SELECT HoVaTenLot, Ten, Email, SDT, (case WHEN GioiTinh = True Then "Nam" ELSE "Nữ" END) as GioiTinh, NgaySinh, MaBenhNhan FROM BenhNhan Natural Join NguoiDung;
*/

/*Checked*/
DROP PROCEDURE IF EXISTS themBHYTe_BenhNhan;
DELIMITER //
CREATE PROCEDURE themBHYTe_BenhNhan(MaBenhNhan MEDIUMINT, MaTheBHYTe Varchar(15), NgayDangKy Date, NgayHetHan Date)
	BEGIN
		INSERT INTO BHYTe(MaBenhNhan, MaTheBHYTe, NgayDangKy, NgayHetHan)
					Values (MaBenhNhan, MaTheBHYte, NgayDangKy, NgayHetHan);
	END
//
DELIMITER ;

/*Checked*/
DROP PROCEDURE IF EXISTS CapNhatNhanKhauHoc;
DELIMITER //
CREATE PROCEDURE CapNhatNhanKhauHoc(MaBenhNhan MEDIUMINT, 
							HoVaTenLot 	VARCHAR(30),
							Ten			VARCHAR(15),
							SDT			VARCHAR(15),
							NgaySinh	DATE,
                            DanToc 		Varchar(15))
	BEGIN
		UPDATE NguoiDung nd
        SET nd.HoVaTenLot = HoVaTenLot,
			nd.Ten = Ten,
            nd.SDT = SDT,
            nd.NgaySinh = NgaySinh
        WHERE nd.TaiKhoan = (SELECT TaiKhoan FROM BenhNhan bn WHERE bn.MaBenhNhan = MaBenhNhan)
        ;

        UPDATE BenhNhan bn
        SET bn.DanToc = DanToc
        WHERE bn.MaBenhNhan = MaBenhNhan
    	;
	END
//
DELIMITER ;


-- (iii.2). Xem danh sách các thuốc mà mình đã dùng trong lần điều trị gần nhất.
/*Checked*/
DROP PROCEDURE IF EXISTS DSThuoc_GanNhat;
DELIMITER //
CREATE PROCEDURE DSThuoc_GanNhat(MaBenhNhan MEDIUMINT)
	BEGIN
		SELECT *
        FROM KQThuoc kqt
        WHERE kqt.MaBenhNhan = MaBenhNhan
			and kqt.ThoiGianRaKQ = (SELECT MAX(x.ThoiGianRaKQ) FROM KQThuoc x WHERE x.MaBenhNhan = MaBenhNhan)
        ;
	END
//
DELIMITER ;



-- (iii.3). Xem danh sách các thuốc mà mình đã dùng trong tất cả các lần điều trị.
/*Checked*/
DROP PROCEDURE IF EXISTS DSThuoc;
DELIMITER //
CREATE PROCEDURE DSThuoc(MaBenhNhan MEDIUMINT)
	BEGIN
		SELECT *
        FROM Thuoc t Natural Join KQThuoc kqt
        WHERE kqt.MaBenhNhan = MaBenhNhan
        ;
	END
//
DELIMITER ;



-- (iii.4). Xem kết quả xét nghiệm trong lần điều trị gần nhất.
/*Checked*/
DROP PROCEDURE IF EXISTS DSXetNghiemGanNhat;
DELIMITER //
CREATE PROCEDURE DSXetNghiemGanNhat(MaBenhNhan MEDIUMINT)
	BEGIN
		SELECT *
        FROM view_ghichu_chiso cs 
        WHERE cs.MaBenhNhan = MaBenhNhan
			and (cs.TenXetNghiem, cs.ThoiGianKhamBenh, cs.MaNhanVien, cs.MaBenhNhan)
				IN (SELECT xn.TenXetNghiem, xn.ThoiGianKhamBenh, xn.MaNhanVien, xn.MaBenhNhan FROM XetNghiem xn
					WHERE xn.MaBenhNhan = MaBenhNhan
                    and xn.ThoiGianKhamBenh = (SELECT MAX(m.ThoiGianKhamBenh)
												FROM XetNghiem m
												WHERE m.MaBenhNhan = MaBenhNhan)
                    )
		;
	END
//
DELIMITER ;



-- (iii.5). Xem danh sách tất cả các xét nghiệm mà mình đã làm.
/*Checked*/
DROP PROCEDURE IF EXISTS DSXetNghiem;
DELIMITER //
CREATE PROCEDURE DSXetNghiem(MaBenhNhan MEDIUMINT)
	BEGIN
		SELECT *
        FROM XetNghiem  xn
        WHERE xn.MaBenhNhan = MaBenhNhan
        ;
	END
//
DELIMITER ;



-- (iii.6). Xem danh sách tất cả các xét nghiệm có ghi chú “bất thường” của một chỉ số xét nghiệm mà mình đã làm.
/*Checked*/
DROP PROCEDURE IF EXISTS DSXetNghiem_BatThuong;
DELIMITER //
CREATE PROCEDURE DSXetNghiem_BatThuong(MaBenhNhan MEDIUMINT)
	BEGIN
		SELECT *
        FROM XetNghiem xn
        WHERE xn.MaBenhNhan = MaBenhNhan
			and (xn.TenXetNghiem, xn.ThoiGianKhamBenh, xn.MaNhanVien, xn.MaBenhNhan)
            IN (SELECT cs.TenXetNghiem, cs.ThoiGianKhamBenh, cs.MaNhanVien, cs.MaBenhNhan
				FROM view_GhiChu_ChiSo cs
                WHERE cs.MaBenhNhan = MaBenHnhan
					and cs.GhiChu = "Bất Thường"
                )
		;
	END
//
DELIMITER ;


-- (iii.7). Xem danh sách bác sĩ đã điều trị trong lần điều trị gần nhất.
/*Checked*/
DROP PROCEDURE IF EXISTS DSBacSi_DieuTriBenhNhanGanNhat;
DELIMITER //
CREATE PROCEDURE DSBacSi_DieuTriBenhNhanGanNhat(MaBenhNhan MEDIUMINT)
	BEGIN
		SELECT HoVaTenLot, Ten, MaNhanVien
        FROM BacSi bs natural join NhanVien natural join NguoiDung
        WHERE bs.MaNhanVien IN (SELECT kb.MaNhanVien
								FROM KhamBenh kb
                                WHERE kb.MaBenhNhan = MaBenhNhan
								and kb.ThoiGianKhamBenh = (SELECT MAX(xn.ThoiGianKhamBenh)
															FROM KhamBenh xn
															WHERE xn.MaBenhNhan = MaBenhNhan)
                            )
		;
	END
//
DELIMITER ;



-- (iii.8). Xem danh sách bác sĩ đã điều trị trong tất cả các lần điều trị.
/*Checked*/
DROP PROCEDURE IF EXISTS DSBacSi_DieuTriBenhNhan;
DELIMITER //
CREATE PROCEDURE DSBacSi_DieuTriBenhNhan(MaBenhNhan MEDIUMINT)
	BEGIN
		SELECT HoVaTenLot, Ten, MaNhanVien
        FROM BacSi bs natural join NhanVien natural join NguoiDung
        WHERE bs.MaNhanVien IN (SELECT kb.MaNhanVien
								FROM KhamBenh kb
                                WHERE kb.MaBenhNhan = MaBenhNhan)
		;
	END
//
DELIMITER ;


-- (iii.9). Xem chế độ dinh dưỡng nếu được chỉ định trong lần điều trị gần nhất.
/*Checked*/
DROP PROCEDURE IF EXISTS DSCDDDuongGanNhat;
DELIMITER //
CREATE PROCEDURE DSCDDDuongGanNhat(MaBenhNhan MEDIUMINT)
	BEGIN   
		SELECT *
        FROM kqcddduong kq natural join CDDDUONG cd
        WHERE kq.MaBenhNhan = MaBenhNhan
				and kq.ThoiGianRaKQ = (SELECT MAX(m.ThoiGianRaKQ)
							FROM KQCDDDUONG m
							WHERE m.MaBenhNhan = MaBenhNhan)
		;
	END
//
DELIMITER ;


-- (iii.10). Xem danh sách chế độ dinh dưỡng nếu được chỉ định trong tất cả các lần điều trị.
/*Checked*/
DROP PROCEDURE IF EXISTS DSCDDDuong;
DELIMITER //
CREATE PROCEDURE DSCDDDuong(MaBenhNhan MEDIUMINT)
	BEGIN
		SELECT *
        FROM kqcddduong kq natural join CDDDUONG cd
        WHERE kq.MaBenhNhan = MaBenhNhan
        ;
	END
//
DELIMITER ;

-- drop user 'BenhNhan'@'localhost';
-- flush privileges;
DROP USER IF EXISTS 'BenhNhan'@'localhost';
CREATE USER 'BenhNhan'@'localhost' IDENTIFIED BY 'BenhNhan';
GRANT EXECUTE ON PROCEDURE hospital.taoBenhNhan TO 'BenhNhan'@'localhost';
GRANT EXECUTE ON PROCEDURE hospital.themBHYTe_BenhNhan TO 'BenhNhan'@'localhost';
GRANT EXECUTE ON PROCEDURE hospital.CapNhatNhanKhauHoc TO 'BenhNhan'@'localhost';
GRANT EXECUTE ON PROCEDURE hospital.DSThuoc_GanNhat TO 'BenhNhan'@'localhost';
GRANT EXECUTE ON PROCEDURE hospital.DSThuoc TO 'BenhNhan'@'localhost';
GRANT EXECUTE ON PROCEDURE hospital.DSXetNghiemGanNhat TO 'BenhNhan'@'localhost';
GRANT EXECUTE ON PROCEDURE hospital.DSXetNghiem TO 'BenhNhan'@'localhost';
GRANT EXECUTE ON PROCEDURE hospital.DSXetNghiem_BatThuong TO 'BenhNhan'@'localhost';
GRANT EXECUTE ON PROCEDURE hospital.DSBacSi_DieuTriBenhNhanGanNhat TO 'BenhNhan'@'localhost';
GRANT EXECUTE ON PROCEDURE hospital.DSBacSi_DieuTriBenhNhan TO 'BenhNhan'@'localhost';
GRANT EXECUTE ON PROCEDURE hospital.DSCDDDuongGanNhat TO 'BenhNhan'@'localhost';
GRANT EXECUTE ON PROCEDURE hospital.DSCDDDuong TO 'BenhNhan'@'localhost';


-- (i). Ban quản lý bệnh viện @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
-- @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

Drop view if exists NhanVienView;
Create View NhanVienView as
	SELECT HoVaTenLot, Ten, Email, SDT, (case WHEN GioiTinh = True Then "Nam" ELSE "Nữ" END) as GioiTinh, NgaySinh, MaNhanVien, TenKhoa, MaKhoaDieuTri FROM NhanVien Natural Join NguoiDung NATURAL JOIN KhoaDieuTri
    ORDER BY MaNhanVien;
    
/*Checked*/
DROP PROCEDURE IF EXISTS themKhoaMoi;
DELIMITER //
-- Ban quản lý tạo tài khoản cho Bác sĩ
create PROCEDURE themKhoaMoi(TenKhoa VARCHAR(30))
	BEGIN
		INSERT INTO KhoaDieuTri(TenKhoa) VALUES (TenKhoa);
	END //
DELIMITER ;


/*Checked*/
DROP PROCEDURE IF EXISTS taoBacSi;
DELIMITER //
CREATE PROCEDURE taoBacSi(TaiKhoan 	VARCHAR(15), 
							MatKhau 	VARCHAR(100),
							HoVaTenLot 	VARCHAR(30),
							Ten			VARCHAR(15),
							Email 	 	VARCHAR(50),
							SDT			VARCHAR(15),
							GioiTinh 	BOOLEAN,  	-- 1: Nam, 0: Nu
							NgaySinh	DATE,
                            MaKhoaDieuTri MEDIUMINT)
	Begin
		START TRANSACTION;
		INSERT INTO NguoiDung(TaiKhoan, MatKhau, HoVaTenLot, Ten, Email, SDT, GioiTinh, NgaySinh)
					VALUES (TaiKhoan, MatKhau, HoVaTenLot, Ten, Email, SDT, GioiTinh, NgaySinh);
		INSERT INTO NhanVien(TaiKhoan, MaKhoaDieuTri)
					Values (TaiKhoan, MaKhoaDieuTri);
		INSERT INTO BacSi(MaNhanVien)
					SELECT MaNhanVien From NhanVien nv WHERE nv.TaiKhoan = TaiKhoan;
		COMMIT;
	end //
DELIMITER ;


/*Checked*/
DROP PROCEDURE IF EXISTS taoBSQuanly;
DELIMITER //
CREATE PROCEDURE taoBSQuanly(MaNhanVien	MEDIUMINT)
Begin
	INSERT INTO BSQuanLy(MaNhanVien)
		Values (MaNhanVien);
end //
DELIMITER ;


/*Checked*/
DROP PROCEDURE IF EXISTS themCaTruc;
DELIMITER //
-- Ban quản lý thêm ca trực cho bác sĩ
CREATE PROCEDURE themCaTruc(NgayTruc	DATE,
							CaTruc		ENUM("Buổi sáng", "Buổi trưa", "Buổi chiều", "Buổi tối"),
							MaBacSi		MEDIUMINT,
                            MaQuanLy 	MEDIUMINT)
	Begin
		INSERT INTO CaTruc (NgayTruc, CaTruc, MaBacSi, MaQuanLy) 
					values (NgayTruc, CaTruc, MaBacSi, MaQuanLy) ;
	end //
DELIMITER ;

DROP Function IF EXISTS TinhThoiGianBatDauCa;
DELIMITER //
-- Tinh thoi gian bat dau ca va ket thuc ca
CREATE Function TinhThoiGianBatDauCa(NgayTruc	DATE,
									CaTruc		ENUM("Buổi sáng", "Buổi trưa", "Buổi chiều", "Buổi tối"))
returns DateTime DETERMINISTIC
	Begin
		Declare startTime datetime;
        IF CaTruc = "Buổi sáng" THEN
			SET startTime = CONCAT(NgayTruc, ' ', '04:00:00');
		ELSEIF CaTruc = "Buổi Trưa" THEN
			SET startTime = CONCAT(NgayTruc, ' ', '10:00:00');
		ELSEIF CaTruc = "Buổi Chiều" THEN
			SET startTime = CONCAT(NgayTruc, ' ', '16:00:00');
		ELSEIF CaTruc = "Buổi Tối" THEN
			SET startTime = CONCAT(NgayTruc, ' ', '22:00:00');
		END IF;
        return startTime;
	end //
DELIMITER ;

DROP Function IF EXISTS TinhThoiGianKetThucCa;
DELIMITER //
CREATE Function TinhThoiGianKetThucCa(NgayTruc	DATE,
									CaTruc		ENUM("Buổi sáng", "Buổi trưa", "Buổi chiều", "Buổi tối"))
returns DateTime DETERMINISTIC
	Begin
		Declare endTime datetime;
        IF CaTruc = "Buổi sáng" THEN
			SET endTime = CONCAT(NgayTruc, ' ', '10:00:00');
		ELSEIF CaTruc = "Buổi Trưa" THEN
			SET endTime = CONCAT(NgayTruc, ' ', '16:00:00');
		ELSEIF CaTruc = "Buổi Chiều" THEN
			SET endTime = CONCAT(NgayTruc, ' ', '22:00:00');
		ELSEIF CaTruc = "Buổi Tối" THEN
			SET endTime = CONCAT(ADDDATE(NgayTruc,1), ' ', '04:00:00');
		END IF;
        return endTime;
	end //
DELIMITER ;

-- (i.1-4) Tạo view cho các yêu cầu dữ liệu từ i1 - i4
Drop view if exists BacSi_CaTruc_View;
Create View BacSi_CaTruc_View as
	SELECT *
    FROM nhanvienview
		join CaTruc on MaBacSi = MaNhanVien;

/*Checked*/
DROP PROCEDURE IF EXISTS DSBacSi_CaTruc_Khoa;
DELIMITER //
-- (i.1). Xem danh sách bác sĩ trực tại một ca trong một ngày ở một khoa.
Create PROCEDURE DSBacSi_CaTruc_Khoa (NgayTruc Date, 
									CaTruc ENUM("Buổi sáng", "Buổi trưa", "Buổi chiều", "Buổi tối"),
                                    MaKhoaDieuTri MEDIUMINT) 
BEGIN  
   SELECT bsv.* FROM bacsi_catruc_view bsv
     -- add where condition if required
    WHERE bsv.NgayTruc = NgayTruc and
			bsv.CaTruc = CaTruc and
            bsv.MaKhoaDieuTri = MaKhoaDieuTri
   ;  
END //
DELIMITER ;

/*Checked*/
DROP PROCEDURE IF EXISTS DSBacSi_Khoa;
DELIMITER //
-- (i.2). Xem danh sách bác sĩ trực trong một ngày ở một khoa.
Create PROCEDURE DSBacSi_Khoa (NgayTruc Date, 
                                    MaKhoaDieuTri MEDIUMINT) 
BEGIN  
   SELECT bsv.*FROM bacsi_catruc_view bsv
    WHERE bsv.NgayTruc = NgayTruc and
            bsv.MaKhoaDieuTri = MaKhoaDieuTri
   ;  
END 
//
DELIMITER ;

/*Checked*/
DROP PROCEDURE IF EXISTS DSBacSi_CaTruc;
DELIMITER //
-- (i.3). Xem danh sách bác sĩ trực tại một ca trong một ngày ở tất cả các khoa.
Create PROCEDURE DSBacSi_CaTruc (NgayTruc Date, 
									CaTruc ENUM("Buổi sáng", "Buổi trưa", "Buổi chiều", "Buổi tối"))
BEGIN  
   SELECT bsv.* FROM bacsi_catruc_view bsv
     -- add where condition if required
    WHERE bsv.NgayTruc = NgayTruc and
			bsv.CaTruc = CaTruc
   ;  
END 
//
DELIMITER ;

/*Checked*/
DROP PROCEDURE IF EXISTS DSBacSi_NgayTruc;
DELIMITER //
-- (i.4). Xem danh sách bác sĩ trực trong một ở tất cả các khoa.
Create PROCEDURE DSBacSi_NgayTruc (NgayTruc Date)
									
BEGIN  
   SELECT bsv.* FROM bacsi_catruc_view bsv
     -- add where condition if required
    WHERE bsv.NgayTruc = NgayTruc 
   ;  
END 
//
DELIMITER ;

/*Checked*/
DROP PROCEDURE IF EXISTS TongBenhNhan_CaTruc;
DELIMITER //
-- (i.5). Xem tổng số bệnh nhân tại một ca trong một ngày ở một khoa.
-- tổng số bệnh nhân tại một ca được tính bằng tổng số bệnh nhân đang được điều trị tại bệnh viện + số bệnh nhân ngoại trú được khám trong ca đó.
Create PROCEDURE TongBenhNhan_CaTruc (NgayTruc Date,
										CaTruc ENUM("Buổi sáng", "Buổi trưa", "Buổi chiều", "Buổi tối"))								
BEGIN  
	Declare startTime datetime;
    Declare endTime datetime;
    SET startTime = TinhThoiGianBatDauCa(NgayTruc, CaTruc);
    SET endTime = TinhThoiGianKetThucCa(NgayTruc, CaTruc);
	SELECT Count(MaBenhNhan)
	FROM ( SELECT MaBenhNhan FROM KHAMBENH
							WHERE ThoiGianKhamBenh >= startTime and ThoiGianKhamBenh < endTime
			union
            SELECT NVMaBenhNhan as MaBenhNhan FROM BenhAn
							WHERE ThoiGianNhapVien <= endTime and ( ThoiGianXuatVien IS NULL OR ThoiGianXuatVien >= startTime)
			) as TongBenhNhan;
END
//
DELIMITER ;


/*Checked*/
DROP PROCEDURE IF EXISTS TongBenhNhanNhapVien_CaTruc_Khoa;
DELIMITER //
-- (i.6). Xem tổng số bệnh nhân nội trú nhập viện trong một ca trong một ngày ở một khoa.
Create PROCEDURE TongBenhNhanNhapVien_CaTruc_Khoa (NgayTruc Date,
										CaTruc ENUM("Buổi sáng", "Buổi trưa", "Buổi chiều", "Buổi tối"),
                                        MaKhoaDieuTri MEDIUMINT)	
BEGIN  
	Declare startTime datetime;
    Declare endTime datetime;
    SET startTime = TinhThoiGianBatDauCa(NgayTruc, CaTruc);
    SET endTime = TinhThoiGianKetThucCa(NgayTruc, CaTruc);
	SELECT Count(NVMaBenhNhan) as TongBenhNhan
	FROM ( 	SELECT * FROM BenhAn
							WHERE ThoiGianNhapVien >= startTime and ThoiGianNhapVien < endTime
			) as TongBenhNhan
	WHERE NVMaNhanVien IN (SELECT MaNhanVien FROM BacSi NATURAL JOIN NhanVien nv WHERE nv.MaKhoaDieuTri = MaKhoaDieuTri);
END
//
DELIMITER ;

/*Checked*/
DROP PROCEDURE IF EXISTS TongBenhNhanNgoaiTru_CaTruc_Khoa;
DELIMITER //
-- (i.7). Xem tổng số bệnh nhân ngoại trú trong một ca trong một ngày ở một khoa.
Create PROCEDURE TongBenhNhanNgoaiTru_CaTruc_Khoa (NgayTruc Date,
													CaTruc ENUM("Buổi sáng", "Buổi trưa", "Buổi chiều", "Buổi tối"),
                                                    MaKhoaDieuTri MEDIUMINT)
BEGIN  
	Declare startTime datetime;
    Declare endTime datetime;
    SET startTime = TinhThoiGianBatDauCa(NgayTruc, CaTruc);
    SET endTime = TinhThoiGianKetThucCa(NgayTruc, CaTruc);
	SELECT Count(MaBenhNhan)
	FROM ( SELECT * FROM KHAMBENH
							WHERE ThoiGianKhamBenh >= startTime and ThoiGianKhamBenh < endTime
								and MaBenhNhan NOT IN (SELECT NVMaBenhNhan FROM BenhAn
														WHERE ThoiGianNhapVien <= endTime and 
															( ThoiGianXuatVien IS NULL OR ThoiGianXuatVien >= startTime)
														)
			) as BenhNhanNgoaiTru
		WHERE MaNhanVien IN (SELECT MaNhanVien FROM BacSi NATURAL JOIN NhanVien nv WHERE nv.MaKhoaDieuTri = MaKhoaDieuTri);
END
//

/*Checked*/
DELIMITER ;
DROP PROCEDURE IF EXISTS TongBenhNhan_CaTruc_Khoa;
DELIMITER //
-- (i.8). Xem tổng số bệnh nhân tại một ca trong một ngày ở một khoa.
-- tổng số bệnh nhân tại một ca được tính bằng tổng số bệnh nhân đang được điều trị tại bệnh viện + số bệnh nhân ngoại trú được khám trong ca đó.
Create PROCEDURE TongBenhNhan_CaTruc_Khoa (NgayTruc Date,
										CaTruc ENUM("Buổi sáng", "Buổi trưa", "Buổi chiều", "Buổi tối"),
                                         MaKhoaDieuTri MEDIUMINT)									
BEGIN  
	Declare startTime datetime;
    Declare endTime datetime;
    SET startTime = TinhThoiGianBatDauCa(NgayTruc, CaTruc);
    SET endTime = TinhThoiGianKetThucCa(NgayTruc, CaTruc);
	SELECT Count(MaBenhNhan) as TongBenhNhan
	FROM ( SELECT MaBenhNhan, MaNhanVien FROM KHAMBENH
							WHERE ThoiGianKhamBenh >= startTime and ThoiGianKhamBenh < endTime
			union
			
            SELECT NVMaBenhNhan, NVMaNhanVien FROM BenhAn
							WHERE ThoiGianNhapVien <= endTime and ( ThoiGianXuatVien IS NULL OR ThoiGianXuatVien >= startTime)
							and NVMaBenhNhan in (SELECT MaBenhNhan FROM KHAMBENH
																	WHERE ThoiGianKhamBenh >= startTime and ThoiGianKhamBenh < endTime)
			) as TongBenhNhan
	WHERE MaNhanVien IN (SELECT MaNhanVien FROM BacSi NATURAL JOIN NhanVien nv WHERE nv.MaKhoaDieuTri = MaKhoaDieuTri);
END
//
DELIMITER ;

DROP PROCEDURE IF EXISTS TongBenhNhanNhapVien_CaTruc;
DELIMITER //
-- (i.9). Xem tổng số bệnh nhân nội trú nhập viện trong một ca trong một ngày ở tất cả các khoa.
Create PROCEDURE TongBenhNhanNhapVien_CaTruc (NgayTruc Date,
										CaTruc ENUM("Buổi sáng", "Buổi trưa", "Buổi chiều", "Buổi tối"))									
BEGIN  
	Declare startTime datetime;
    Declare endTime datetime;
    SET startTime = TinhThoiGianBatDauCa(NgayTruc, CaTruc);
    SET endTime = TinhThoiGianKetThucCa(NgayTruc, CaTruc);
	SELECT Count(NVMaBenhNhan)
	FROM ( 	SELECT NVMaBenhNhan FROM BenhAn
							WHERE ThoiGianNhapVien >= startTime and ThoiGianNhapVien < endTime
			) as TongBenhNhan;
END
//
DELIMITER ;

DROP PROCEDURE IF EXISTS TongBenhNhanNgoaiTru_CaTruc;
DELIMITER //
-- (i.10). Xem tổng số bệnh nhân ngoại trú trong một ca trong một ngày ở tất cả các khoa.
Create PROCEDURE TongBenhNhanNgoaiTru_CaTruc (NgayTruc Date,
										CaTruc ENUM("Buổi sáng", "Buổi trưa", "Buổi chiều", "Buổi tối"))									
BEGIN  
	Declare startTime datetime;
    Declare endTime datetime;
    SET startTime = TinhThoiGianBatDauCa(NgayTruc, CaTruc);
    SET endTime = TinhThoiGianKetThucCa(NgayTruc, CaTruc);
	SELECT Count(MaBenhNhan)
	FROM ( SELECT MaBenhNhan FROM KHAMBENH
							WHERE ThoiGianKhamBenh >= startTime and ThoiGianKhamBenh < endTime
								and MaBenhNhan NOT IN (SELECT MaBenhNhan FROM BenhAn
														WHERE (NVThoiGianKhamBenh, NVMaNhanVien, NVMaBenhNhan ) = (ThoiGianKhamBenh, MaNhanVien, MaBenhNhan)
														)
			) as BenhNhanNgoaiTru;
END
//
DELIMITER ;

/*Checked*/
DROP PROCEDURE IF EXISTS TongXetNghiem_Ngay_Khoa;
DELIMITER //
-- (i.11). Xem tổng số xét nghiệm được làm trong một ngày ở một khoa.
Create PROCEDURE TongXetNghiem_Ngay_Khoa (Ngay Date,
										MaKhoaDieuTri MEDIUMINT)								
BEGIN  
	SELECT Count(*)
    FROM XetNghiem 
    WHERE DATE(ThoiGianThucHien) = Ngay
		and MaNhanVien IN (SELECT MaNhanVien FROM BacSi NATURAL JOIN NhanVien nv WHERE nv.MaKhoaDieuTri = MaKhoaDieuTri);
END
//
DELIMITER ;

/*Checked*/
DROP PROCEDURE IF EXISTS TongXetNghiem_Ngay;
DELIMITER //
-- (i.12). Xem tổng số xét nghiệm được làm trong một ngày ở tất cả các khoa.
Create PROCEDURE TongXetNghiem_Ngay (Ngay Date)								
BEGIN  
	SELECT Count(*)
    FROM XetNghiem 
    WHERE DATE(ThoiGianThucHien) = Ngay;
END
//
DELIMITER ;

DROP USER IF EXISTS 'BSQuanLy'@'localhost';
CREATE USER 'BSQuanLy'@'localhost' IDENTIFIED BY 'BSQuanLy';
GRANT SELECT ON nhanvienview to 'BSQuanLy'@'localhost';
GRANT EXECUTE ON PROCEDURE hospital.taoBacSi TO 'BSQuanLy'@'localhost';
GRANT EXECUTE ON PROCEDURE hospital.themCaTruc TO 'BSQuanLy'@'localhost';
GRANT EXECUTE ON PROCEDURE hospital.DSBacSi_CaTruc_Khoa TO 'BSQuanLy'@'localhost';
GRANT EXECUTE ON PROCEDURE hospital.DSBacSi_Khoa TO 'BSQuanLy'@'localhost';
GRANT EXECUTE ON PROCEDURE hospital.DSBacSi_CaTruc TO 'BSQuanLy'@'localhost';
GRANT EXECUTE ON PROCEDURE hospital.DSBacSi_NgayTruc TO 'BSQuanLy'@'localhost';
GRANT EXECUTE ON PROCEDURE hospital.TongBenhNhan_CaTruc_Khoa TO 'BSQuanLy'@'localhost';
GRANT EXECUTE ON PROCEDURE hospital.TongBenhNhanNhapVien_CaTruc_Khoa TO 'BSQuanLy'@'localhost';
GRANT EXECUTE ON PROCEDURE hospital.TongBenhNhanNgoaiTru_CaTruc_Khoa TO 'BSQuanLy'@'localhost';
GRANT EXECUTE ON PROCEDURE hospital.TongBenhNhan_CaTruc TO 'BSQuanLy'@'localhost';
GRANT EXECUTE ON PROCEDURE hospital.TongBenhNhanNhapVien_CaTruc TO 'BSQuanLy'@'localhost';
GRANT EXECUTE ON PROCEDURE hospital.TongBenhNhanNgoaiTru_CaTruc TO 'BSQuanLy'@'localhost';
GRANT EXECUTE ON PROCEDURE hospital.TongXetNghiem_Ngay_Khoa TO 'BSQuanLy'@'localhost';
GRANT EXECUTE ON PROCEDURE hospital.TongXetNghiem_Ngay TO 'BSQuanLy'@'localhost';

DROP PROCEDURE IF EXISTS TimTaiKhoan;
DELIMITER //
create procedure TimTaiKhoan( username VARCHAR(15), password VARCHAR(100))
BEGIN
	SELECT *, bsquanly.MaNhanVien as MaQuanLy
	FROM nguoidung natural left join nhanvien natural left join benhnhan 
					natural left join bsquanly natural left join khoadieutri
    WHERE TaiKhoan = username and
			MatKhau = password
	;
End
//
DELIMITER ;
DROP USER IF EXISTS 'AnDanh'@'localhost';
CREATE USER 'AnDanh'@'localhost' IDENTIFIED BY 'AnDanh';
Grant EXECUTE ON PROCEDURE hospital.TimTaiKHoan TO 'AnDanh'@'localhost';
Grant EXECUTE ON PROCEDURE hospital.TaoBenhNhan TO 'AnDanh'@'localhost';


ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '';
ALTER USER 'AnDanh'@'localhost' IDENTIFIED WITH mysql_native_password BY 'AnDanh';
ALTER USER 'BacSi'@'localhost' IDENTIFIED WITH mysql_native_password BY 'BacSi';
ALTER USER 'BenhNhan'@'localhost' IDENTIFIED WITH mysql_native_password BY 'BenhNhan';
ALTER USER 'BSQuanLy'@'localhost' IDENTIFIED WITH mysql_native_password BY 'BSQuanLy';
flush privileges;