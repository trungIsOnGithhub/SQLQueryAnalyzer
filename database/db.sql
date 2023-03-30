-- CREATE administrative_regions TABLE
CREATE TABLE administrative_regions (
	id integer NOT NULL,
	"name" varchar(255) NOT NULL,
	name_en varchar(255) NOT NULL,
	CONSTRAINT administrative_regions_pkey PRIMARY KEY (id)
);


-- CREATE administrative_units TABLE
CREATE TABLE administrative_units (
	id integer NOT NULL,
	full_name varchar(255) NULL,
	full_name_en varchar(255) NULL,
	CONSTRAINT administrative_units_pkey PRIMARY KEY (id)
);


-- CREATE provinces TABLE
CREATE TABLE provinces (
	code varchar(20) NOT NULL,
	"name" varchar(255) NOT NULL,
	name_en varchar(255) NOT NULL,
	full_name varchar(255) NOT NULL,
	administrative_unit_id integer NULL,
	administrative_region_id integer NULL,
	CONSTRAINT provinces_pkey PRIMARY KEY (code)
);


-- provinces foreign keys
ALTER TABLE provinces ADD CONSTRAINT provinces_administrative_region_id_fkey FOREIGN KEY (administrative_region_id) REFERENCES administrative_regions(id);
ALTER TABLE provinces ADD CONSTRAINT provinces_administrative_unit_id_fkey FOREIGN KEY (administrative_unit_id) REFERENCES administrative_units(id);


-- CREATE wards TABLE
CREATE TABLE wards (
	code varchar(20) NOT NULL,
	"name" varchar(255) NOT NULL,
	full_name varchar(255) NULL,
	code_name varchar(255) NULL,
	district_code varchar(20) NULL,
	administrative_unit_id integer NULL,
	CONSTRAINT wards_pkey PRIMARY KEY (code)
);


-- wards foreign keys
ALTER TABLE wards ADD CONSTRAINT wards_administrative_unit_id_fkey FOREIGN KEY (administrative_unit_id) REFERENCES administrative_units(id);
ALTER TABLE wards ADD CONSTRAINT wards_district_code_fkey FOREIGN KEY (district_code) REFERENCES districts(code);

-- DATA for administrative_regions
INSERT INTO administrative_regions (id,"name",name_en) VALUES
	 (1,'Đông Bắc Bộ','Northeast'),
	 (2,'Tây Bắc Bộ','Northwest'),
	 (3,'Đồng bằng sông Hồng','Red River Delta'),
	 (4,'Bắc Trung Bộ','North Central Coast'),
	 (5,'Duyên hải Nam Trung Bộ','South Central Coast'),
	 (6,'Tây Nguyên','Central Highlands'),
	 (7,'Đông Nam Bộ','Southeast'),
	 (8,'Đồng bằng sông Cửu Long','Mekong River Delta');

-- DATA for administrative_units
INSERT INTO administrative_units (id,full_name,full_name_en) VALUES
	 (1,'Thành phố trực thuộc trung ương','Municipality'),
	 (2,'Tỉnh','Province'),
	 (3,'Thành phố thuộc thành phố trực thuộc trung ương','Municipal city'),
	 (4,'Thành phố thuộc tỉnh','Provincial city'),
	 (5,'Quận','Urban district');

-- DATA for provinces
INSERT INTO provinces (code,"name",name_en,full_name,administrative_unit_id,administrative_region_id) VALUES
	 ('01','Hà Nội','Ha Noi','Thành phố Hà Nội',1,3),
	 ('26','Vĩnh Phúc','Vinh Phuc','Tỉnh Vĩnh Phúc',2,3),
	 ('27','Bắc Ninh','Bac Ninh','Tỉnh Bắc Ninh',2,3),
	 ('30','Hải Dương','Hai Duong','Tỉnh Hải Dương',2,3),
	 ('31','Hải Phòng','Hai Phong','Thành phố Hải Phòng',1,3),
	 ('33','Hưng Yên','Hung Yen','Tỉnh Hưng Yên',2,3),
	 ('34','Thái Bình','Thai Binh','Tỉnh Thái Bình',2,3),
	 ('35','Hà Nam','Ha Nam','Tỉnh Hà Nam',2,3),
	 ('96','Cà Mau','Ca Mau','Tỉnh Cà Mau',2,8),
	 ('02','Hà Giang','Ha Giang','Tỉnh Hà Giang',2,1);
INSERT INTO provinces (code,"name",name_en,full_name,administrative_unit_id,administrative_region_id) VALUES
	 ('04','Cao Bằng','Cao Bang','Tỉnh Cao Bằng',2,1),
	 ('06','Bắc Kạn','Bac Kan','Tỉnh Bắc Kạn',2,1),
	 ('08','Tuyên Quang','Tuyen Quang','Tỉnh Tuyên Quang',2,1),
	 ('19','Thái Nguyên','Thai Nguyen','Tỉnh Thái Nguyên',2,1),
	 ('20','Lạng Sơn','Lang Son','Tỉnh Lạng Sơn',2,1),
	 ('22','Quảng Ninh','Quang Ninh','Tỉnh Quảng Ninh',2,1),
	 ('24','Bắc Giang','Bac Giang','Tỉnh Bắc Giang',2,1),
	 ('25','Phú Thọ','Phu Tho','Tỉnh Phú Thọ',2,1),
	 ('10','Lào Cai','Lao Cai','Tỉnh Lào Cai',2,2),
	 ('11','Điện Biên','Dien Bien','Tỉnh Điện Biên',2,2);
INSERT INTO provinces (code,"name",name_en,full_name,administrative_unit_id,administrative_region_id) VALUES
	 ('12','Lai Châu','Lai Chau','Tỉnh Lai Châu',2,2),
	 ('14','Sơn La','Son La','Tỉnh Sơn La',2,2),
	 ('15','Yên Bái','Yen Bai','Tỉnh Yên Bái',2,2),
	 ('17','Hoà Bình','Hoa Binh','Tỉnh Hoà Bình',2,2),
	 ('70','Bình Phước','Binh Phuoc','Tỉnh Bình Phước',2,7),
	 ('72','Tây Ninh','Tay Ninh','Tỉnh Tây Ninh',2,7),
	 ('74','Bình Dương','Binh Duong','Tỉnh Bình Dương',2,7),
	 ('75','Đồng Nai','Dong Nai','Tỉnh Đồng Nai',2,7),
	 ('79','Hồ Chí Minh','Ho Chi Minh','Thành phố Hồ Chí Minh',1,7),
	 ('77','Bà Rịa - Vũng Tàu','Ba Ria - Vung Tau','Tỉnh Bà Rịa - Vũng Tàu',2,7);
INSERT INTO provinces (code,"name",name_en,full_name,administrative_unit_id,administrative_region_id) VALUES
	 ('36','Nam Định','Nam Dinh','Tỉnh Nam Định',2,3),
	 ('37','Ninh Bình','Ninh Binh','Tỉnh Ninh Bình',2,3),
	 ('38','Thanh Hóa','Thanh Hoa','Tỉnh Thanh Hóa',2,4),
	 ('40','Nghệ An','Nghe An','Tỉnh Nghệ An',2,4),
	 ('42','Hà Tĩnh','Ha Tinh','Tỉnh Hà Tĩnh',2,4),
	 ('44','Quảng Bình','Quang Binh','Tỉnh Quảng Bình',2,4),
	 ('45','Quảng Trị','Quang Tri','Tỉnh Quảng Trị',2,4),
	 ('46','Thừa Thiên Huế','Thua Thien Hue','Tỉnh Thừa Thiên Huế',2,4),
	 ('48','Đà Nẵng','Da Nang','Thành phố Đà Nẵng',1,5),
	 ('49','Quảng Nam','Quang Nam','Tỉnh Quảng Nam',2,5);
INSERT INTO provinces (code,"name",name_en,full_name,administrative_unit_id,administrative_region_id) VALUES
	 ('51','Quảng Ngãi','Quang Ngai','Tỉnh Quảng Ngãi',2,5),
	 ('52','Bình Định','Binh Dinh','Tỉnh Bình Định',2,5),
	 ('54','Phú Yên','Phu Yen','Tỉnh Phú Yên',2,5),
	 ('56','Khánh Hòa','Khanh Hoa','Tỉnh Khánh Hòa',2,5),
	 ('58','Ninh Thuận','Ninh Thuan','Tỉnh Ninh Thuận',2,5),
	 ('60','Bình Thuận','Binh Thuan','Tỉnh Bình Thuận',2,5),
	 ('62','Kon Tum','Kon Tum','Tỉnh Kon Tum',2,6),
	 ('64','Gia Lai','Gia Lai','Tỉnh Gia Lai',2,6),
	 ('66','Đắk Lắk','Dak Lak','Tỉnh Đắk Lắk',2,6),
	 ('67','Đắk Nông','Dak Nong','Tỉnh Đắk Nông',2,6);
INSERT INTO provinces (code,"name",name_en,full_name,administrative_unit_id,administrative_region_id) VALUES
	 ('68','Lâm Đồng','Lam Dong','Tỉnh Lâm Đồng',2,6),
	 ('80','Long An','Long An','Tỉnh Long An',2,8),
	 ('82','Tiền Giang','Tien Giang','Tỉnh Tiền Giang',2,8),
	 ('83','Bến Tre','Ben Tre','Tỉnh Bến Tre',2,8),
	 ('84','Trà Vinh','Tra Vinh','Tỉnh Trà Vinh',2,8),
	 ('86','Vĩnh Long','Vinh Long','Tỉnh Vĩnh Long',2,8),
	 ('87','Đồng Tháp','Dong Thap','Tỉnh Đồng Tháp',2,8),
	 ('89','An Giang','An Giang','Tỉnh An Giang',2,8),
	 ('91','Kiên Giang','Kien Giang','Tỉnh Kiên Giang',2,8),
	 ('92','Cần Thơ','Can Tho','Thành phố Cần Thơ',1,8);
INSERT INTO provinces (code,"name",name_en,full_name,administrative_unit_id,administrative_region_id) VALUES
	 ('93','Hậu Giang','Hau Giang','Tỉnh Hậu Giang',2,8),
	 ('94','Sóc Trăng','Soc Trang','Tỉnh Sóc Trăng',2,8),
	 ('95','Bạc Liêu','Bac Lieu','Tỉnh Bạc Liêu',2,8);