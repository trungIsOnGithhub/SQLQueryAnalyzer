﻿DROP TABLE IF EXISTS provinces;
DROP TABLE IF EXISTS administrative_units;
DROP TABLE IF EXISTS administrative_regions;

-- CREATE administrative_regions TABLE
CREATE TABLE administrative_regions (
	id integer NOT NULL,
	admin_reg_name varchar(255) NOT NULL,
	name_en varchar(255) NOT NULL,
	code_name varchar(255) NULL,
	code_name_en varchar(255) NULL,
	CONSTRAINT administrative_regions_pkey PRIMARY KEY (id)
);


-- CREATE administrative_units TABLE
CREATE TABLE administrative_units (
	id integer NOT NULL,
	admin_name varchar(255) NULL,
	full_name_en varchar(255) NULL,
	short_name varchar(255) NULL,
	short_name_en varchar(255) NULL,
	code_name varchar(255) NULL,
	code_name_en varchar(255) NULL,
	CONSTRAINT administrative_units_pkey PRIMARY KEY (id)
);


-- CREATE provinces TABLE
CREATE TABLE provinces (
	code varchar(20) NOT NULL,
	"name" varchar(255) NOT NULL,
	name_en varchar(255) NULL,
	full_name varchar(255) NOT NULL,
	full_name_en varchar(255) NULL,
	code_name varchar(255) NULL,
	administrative_unit_id integer NULL,
	administrative_region_id integer NULL,
	CONSTRAINT provinces_pkey PRIMARY KEY (code)
);


-- provinces foreign keys

ALTER TABLE provinces ADD CONSTRAINT provinces_administrative_region_id_fkey FOREIGN KEY (administrative_region_id) REFERENCES administrative_regions(id);
ALTER TABLE provinces ADD CONSTRAINT provinces_administrative_unit_id_fkey FOREIGN KEY (administrative_unit_id) REFERENCES administrative_units(id);

-- DATA for administrative_regions
INSERT INTO administrative_regions (id,admin_reg_name,name_en,code_name,code_name_en) VALUES
	 (1,'Đông Bắc Bộ','Northeast','dong_bac_bo','northest'),
	 (2,'Tây Bắc Bộ','Northwest','tay_bac_bo','northwest'),
	 (3,'Đồng bằng sông Hồng','Red River Delta','dong_bang_song_hong','red_river_delta'),
	 (4,'Bắc Trung Bộ','North Central Coast','bac_trung_bo','north_central_coast'),
	 (5,'Duyên hải Nam Trung Bộ','South Central Coast','duyen_hai_nam_trung_bo','south_central_coast'),
	 (6,'Tây Nguyên','Central Highlands','tay_nguyen','central_highlands'),
	 (7,'Đông Nam Bộ','Southeast','dong_nam_bo','southeast'),
	 (8,'Đồng bằng sông Cửu Long','Mekong River Delta','dong_bang_song_cuu_long','southwest');

-- DATA for administrative_units
INSERT INTO administrative_units (id,admin_name,full_name_en,short_name,short_name_en,code_name,code_name_en) VALUES
	 (1,'Thành phố trực thuộc trung ương','Municipality','Thành phố','City','thanh_pho_truc_thuoc_trung_uong','municipality'),
	 (2,'Tỉnh','Province','Tỉnh','Province','tinh','province'),
	 (3,'Thành phố thuộc thành phố trực thuộc trung ương','Municipal city','Thành phố','City','thanh_pho_thuoc_thanh_pho_truc_thuoc_trung_uong','municipal_city'),
	 (4,'Thành phố thuộc tỉnh','Provincial city','Thành phố','City','thanh_pho_thuoc_tinh','provincial_city'),
	 (5,'Quận','Urban district','Quận','District','quan','urban_district'),
	 (6,'Thị xã','District-level town','Thị xã','Town','thi_xa','district_level_town'),
	 (7,'Huyện','District','Huyện','District','huyen','district'),
	 (8,'Phường','Ward','Phường','Ward','phuong','ward'),
	 (9,'Thị trấn','Commune-level town','Thị trấn','Township','thi_tran','commune_level_town'),
	 (10,'Xã','Commune','Xã','Commune','xa','commune');


-- DATA for provinces
INSERT INTO provinces (code,"name",name_en,full_name,full_name_en,code_name,administrative_unit_id,administrative_region_id) VALUES
	 ('01','Hà Nội','Ha Noi','Thành phố Hà Nội','Ha Noi City','ha_noi',1,3),
	 ('26','Vĩnh Phúc','Vinh Phuc','Tỉnh Vĩnh Phúc','Vinh Phuc Province','vinh_phuc',2,3),
	 ('27','Bắc Ninh','Bac Ninh','Tỉnh Bắc Ninh','Bac Ninh Province','bac_ninh',2,3),
	 ('30','Hải Dương','Hai Duong','Tỉnh Hải Dương','Hai Duong Province','hai_duong',2,3),
	 ('31','Hải Phòng','Hai Phong','Thành phố Hải Phòng','Hai Phong City','hai_phong',1,3),
	 ('33','Hưng Yên','Hung Yen','Tỉnh Hưng Yên','Hung Yen Province','hung_yen',2,3),
	 ('34','Thái Bình','Thai Binh','Tỉnh Thái Bình','Thai Binh Province','thai_binh',2,3),
	 ('35','Hà Nam','Ha Nam','Tỉnh Hà Nam','Ha Nam Province','ha_nam',2,3),
	 ('96','Cà Mau','Ca Mau','Tỉnh Cà Mau','Ca Mau Province','ca_mau',2,8),
	 ('02','Hà Giang','Ha Giang','Tỉnh Hà Giang','Ha Giang Province','ha_giang',2,1);
INSERT INTO provinces (code,"name",name_en,full_name,full_name_en,code_name,administrative_unit_id,administrative_region_id) VALUES
	 ('04','Cao Bằng','Cao Bang','Tỉnh Cao Bằng','Cao Bang Province','cao_bang',2,1),
	 ('06','Bắc Kạn','Bac Kan','Tỉnh Bắc Kạn','Bac Kan Province','bac_kan',2,1),
	 ('08','Tuyên Quang','Tuyen Quang','Tỉnh Tuyên Quang','Tuyen Quang Province','tuyen_quang',2,1),
	 ('19','Thái Nguyên','Thai Nguyen','Tỉnh Thái Nguyên','Thai Nguyen Province','thai_nguyen',2,1),
	 ('20','Lạng Sơn','Lang Son','Tỉnh Lạng Sơn','Lang Son Province','lang_son',2,1),
	 ('22','Quảng Ninh','Quang Ninh','Tỉnh Quảng Ninh','Quang Ninh Province','quang_ninh',2,1),
	 ('24','Bắc Giang','Bac Giang','Tỉnh Bắc Giang','Bac Giang Province','bac_giang',2,1),
	 ('25','Phú Thọ','Phu Tho','Tỉnh Phú Thọ','Phu Tho Province','phu_tho',2,1),
	 ('10','Lào Cai','Lao Cai','Tỉnh Lào Cai','Lao Cai Province','lao_cai',2,2),
	 ('11','Điện Biên','Dien Bien','Tỉnh Điện Biên','Dien Bien Province','dien_bien',2,2);
INSERT INTO provinces (code,"name",name_en,full_name,full_name_en,code_name,administrative_unit_id,administrative_region_id) VALUES
	 ('12','Lai Châu','Lai Chau','Tỉnh Lai Châu','Lai Chau Province','lai_chau',2,2),
	 ('14','Sơn La','Son La','Tỉnh Sơn La','Son La Province','son_la',2,2),
	 ('15','Yên Bái','Yen Bai','Tỉnh Yên Bái','Yen Bai Province','yen_bai',2,2),
	 ('17','Hoà Bình','Hoa Binh','Tỉnh Hoà Bình','Hoa Binh Province','hoa_binh',2,2),
	 ('70','Bình Phước','Binh Phuoc','Tỉnh Bình Phước','Binh Phuoc Province','binh_phuoc',2,7),
	 ('72','Tây Ninh','Tay Ninh','Tỉnh Tây Ninh','Tay Ninh Province','tay_ninh',2,7),
	 ('74','Bình Dương','Binh Duong','Tỉnh Bình Dương','Binh Duong Province','binh_duong',2,7),
	 ('75','Đồng Nai','Dong Nai','Tỉnh Đồng Nai','Dong Nai Province','dong_nai',2,7),
	 ('79','Hồ Chí Minh','Ho Chi Minh','Thành phố Hồ Chí Minh','Ho Chi Minh City','ho_chi_minh',1,7),
	 ('77','Bà Rịa - Vũng Tàu','Ba Ria - Vung Tau','Tỉnh Bà Rịa - Vũng Tàu','Ba Ria - Vung Tau Province','ba_ria_vung_tau',2,7);
INSERT INTO provinces (code,"name",name_en,full_name,full_name_en,code_name,administrative_unit_id,administrative_region_id) VALUES
	 ('36','Nam Định','Nam Dinh','Tỉnh Nam Định','Nam Dinh Province','nam_dinh',2,3),
	 ('37','Ninh Bình','Ninh Binh','Tỉnh Ninh Bình','Ninh Binh Province','ninh_binh',2,3),
	 ('38','Thanh Hóa','Thanh Hoa','Tỉnh Thanh Hóa','Thanh Hoa Province','thanh_hoa',2,4),
	 ('40','Nghệ An','Nghe An','Tỉnh Nghệ An','Nghe An Province','nghe_an',2,4),
	 ('42','Hà Tĩnh','Ha Tinh','Tỉnh Hà Tĩnh','Ha Tinh Province','ha_tinh',2,4),
	 ('44','Quảng Bình','Quang Binh','Tỉnh Quảng Bình','Quang Binh Province','quang_binh',2,4),
	 ('45','Quảng Trị','Quang Tri','Tỉnh Quảng Trị','Quang Tri Province','quang_tri',2,4),
	 ('46','Thừa Thiên Huế','Thua Thien Hue','Tỉnh Thừa Thiên Huế','Thua Thien Hue Province','thua_thien_hue',2,4),
	 ('48','Đà Nẵng','Da Nang','Thành phố Đà Nẵng','Da Nang City','da_nang',1,5),
	 ('49','Quảng Nam','Quang Nam','Tỉnh Quảng Nam','Quang Nam Province','quang_nam',2,5);
INSERT INTO provinces (code,"name",name_en,full_name,full_name_en,code_name,administrative_unit_id,administrative_region_id) VALUES
	 ('51','Quảng Ngãi','Quang Ngai','Tỉnh Quảng Ngãi','Quang Ngai Province','quang_ngai',2,5),
	 ('52','Bình Định','Binh Dinh','Tỉnh Bình Định','Binh Dinh Province','binh_dinh',2,5),
	 ('54','Phú Yên','Phu Yen','Tỉnh Phú Yên','Phu Yen Province','phu_yen',2,5),
	 ('56','Khánh Hòa','Khanh Hoa','Tỉnh Khánh Hòa','Khanh Hoa Province','khanh_hoa',2,5),
	 ('58','Ninh Thuận','Ninh Thuan','Tỉnh Ninh Thuận','Ninh Thuan Province','ninh_thuan',2,5),
	 ('60','Bình Thuận','Binh Thuan','Tỉnh Bình Thuận','Binh Thuan Province','binh_thuan',2,5),
	 ('62','Kon Tum','Kon Tum','Tỉnh Kon Tum','Kon Tum Province','kon_tum',2,6),
	 ('64','Gia Lai','Gia Lai','Tỉnh Gia Lai','Gia Lai Province','gia_lai',2,6),
	 ('66','Đắk Lắk','Dak Lak','Tỉnh Đắk Lắk','Dak Lak Province','dak_lak',2,6),
	 ('67','Đắk Nông','Dak Nong','Tỉnh Đắk Nông','Dak Nong Province','dak_nong',2,6);
INSERT INTO provinces (code,"name",name_en,full_name,full_name_en,code_name,administrative_unit_id,administrative_region_id) VALUES
	 ('68','Lâm Đồng','Lam Dong','Tỉnh Lâm Đồng','Lam Dong Province','lam_dong',2,6),
	 ('80','Long An','Long An','Tỉnh Long An','Long An Province','long_an',2,8),
	 ('82','Tiền Giang','Tien Giang','Tỉnh Tiền Giang','Tien Giang Province','tien_giang',2,8),
	 ('83','Bến Tre','Ben Tre','Tỉnh Bến Tre','Ben Tre Province','ben_tre',2,8),
	 ('84','Trà Vinh','Tra Vinh','Tỉnh Trà Vinh','Tra Vinh Province','tra_vinh',2,8),
	 ('86','Vĩnh Long','Vinh Long','Tỉnh Vĩnh Long','Vinh Long Province','vinh_long',2,8),
	 ('87','Đồng Tháp','Dong Thap','Tỉnh Đồng Tháp','Dong Thap Province','dong_thap',2,8),
	 ('89','An Giang','An Giang','Tỉnh An Giang','An Giang Province','an_giang',2,8),
	 ('91','Kiên Giang','Kien Giang','Tỉnh Kiên Giang','Kien Giang Province','kien_giang',2,8),
	 ('92','Cần Thơ','Can Tho','Thành phố Cần Thơ','Can Tho City','can_tho',1,8);
INSERT INTO provinces (code,"name",name_en,full_name,full_name_en,code_name,administrative_unit_id,administrative_region_id) VALUES
	 ('93','Hậu Giang','Hau Giang','Tỉnh Hậu Giang','Hau Giang Province','hau_giang',2,8),
	 ('94','Sóc Trăng','Soc Trang','Tỉnh Sóc Trăng','Soc Trang Province','soc_trang',2,8),
	 ('95','Bạc Liêu','Bac Lieu','Tỉnh Bạc Liêu','Bac Lieu Province','bac_lieu',2,8);


CREATE INDEX idx_provinces_region ON provinces(administrative_region_id);
CREATE INDEX idx_provinces_unit ON provinces(administrative_unit_id);

CREATE OR REPLACE FUNCTION get_all_provinces()
RETURNS TABLE (
	code varchar(20),
	"name" varchar(255),
	full_name varchar(255)
)
AS $$
BEGIN
	SELECT code, "name", full_name FROM provinces;
END;
$$ LANGUAGE SQL;

CREATE OR REPLACE FUNCTION get_num_provinces() RETURNS @res INTEGER
AS $$
BEGIN
	SELECT COUNT(*) INTO @res FROM provinces;
	RETURN
END;
$$ LANGUAGE SQL;
