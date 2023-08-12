DROP DATABASE IF EXISTS eatery_management;
CREATE DATABASE eatery_management;
USE eatery_management;


CREATE TABLE IF NOT EXISTS Customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  gender VARCHAR(255),
  birthdate DATE,
  phone_number VARCHAR(255),
  email VARCHAR(255),
  avatar VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Eateries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  state VARCHAR(255),
  city VARCHAR(255),
  suburb VARCHAR(255),
  address VARCHAR(255),
  postcode VARCHAR(255),
  cuisine VARCHAR(255),
  avatar VARCHAR(255),
  phone_number VARCHAR(255),
  start_time TIME,
  end_time TIME,
  email VARCHAR(255),
  menu VARCHAR(255),
  average_rating DOUBLE(2, 1),
  description VARCHAR(1000)
);


CREATE TABLE IF NOT EXISTS favourite_list (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT, /*--FK*/
  eatery_id INT, /*--FK*/
  FOREIGN KEY (customer_id) REFERENCES Customers(id),
  FOREIGN KEY (eatery_id) REFERENCES Eateries(id)
);

CREATE TABLE IF NOT EXISTS Vouchers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  eatery_id INT NOT NULL, /*--FK , provided by eatery*/
  discount_percentage INT,
  weekday VARCHAR(255) DEFAULT NULL, /* from Mon to Sun*/
  start_ DATE, /*--be careful the name  // eg. 2023-6-22 or 2023:06:22*/
  end_ DATE,/*--be careful the name  // eg. 2023-6-22 or 2023:06:22*/
  set_number INT,
  number INT, 
  FOREIGN KEY (eatery_id) REFERENCES Eateries(id)
);


CREATE TABLE IF NOT EXISTS has_vouchers(
id INT AUTO_INCREMENT PRIMARY KEY,
voucher_id INT NOT NULL, /* --FK owned by voucher*/
customer_id INT NOT NULL, /* --FK owned by customer*/
code VARCHAR(255) UNIQUE,
start_ DATE, /*--be careful the name  // eg. 2023-6-22 */
end_ DATE,/*--be careful the name  // eg. 2023-6-22 */
FOREIGN KEY (customer_id) REFERENCES Customers(id)
);

CREATE TABLE IF NOT EXISTS History(
id INT AUTO_INCREMENT PRIMARY KEY,
customer_id INT NOT NULL, /* --FK owned by customer*/
eatery_id INT NOT NULL, /*--FK , provided by eatery*/
discount_percentage INT,
weekday VARCHAR(255), /* from Mon to Sun*/
start_ DATE, /*--be careful the name  // eg. 2023-6-22*/
end_ DATE,/*--be careful the name  // eg. 2023-6-22 */
code VARCHAR(255) UNIQUE,
review VARCHAR(1000),
rating INT, /* 1 to 5 stars*/
use_voucher_time DATETIME, 
review_time DATETIME,
FOREIGN KEY (customer_id) REFERENCES Customers(id),
FOREIGN KEY (eatery_id) REFERENCES Eateries(id)
);


insert into Customers (name,password,gender,birthdate,phone_number,email,avatar) 
values ("Alice", "123456","Female","2000-08-12","0491546133","Alice@gmail.com","Static/Alice.jpg");

insert into Customers (name,password,gender,birthdate,phone_number,email,avatar) 
values ("Allen", "123456","male","1998-07-21","0495671234","Allen@gmail.com","Static/Allen.jpg");

insert into Customers (name,password,gender,birthdate,phone_number,email,avatar) 
values ("Anne", "123456","female","2001-03-21","0494761238","Anne@gmail.com","Static/Anne.jpg");

insert into Customers (name,password,gender,birthdate,phone_number,email,avatar) 
values ("Hellen", "123456","male","1998-07-21","04942698426","Hellen@gmail.com","Static/Hellen.jpg");

insert into Customers (name,password,gender,birthdate,phone_number,email,avatar) 
values ("Jaime", "123456","male","1996-02-02","0494894253","Jaime@gmail.com","Static/Jaime.jpg");

insert into Customers (name,password,gender,birthdate,phone_number,email,avatar) 
values ("James", "123456","male","2002-06-18","0493451971","James@gmail.com","Static/James.jpg");

insert into Customers (name,password,gender,birthdate,phone_number,email,avatar) 
values ("Julie", "123456","female","1995-07-11","0499764285","Julie@gmail.com","Static/Julie.jpg");

insert into Customers (name,password,gender,birthdate,phone_number,email,avatar) 
values ("Kevin", "123456","male","1998-03-01","0497648572","Kevin@gmail.com","Static/Kevin.jpg");

insert into Customers (name,password,gender,birthdate,phone_number,email,avatar) 
values ("Lisa", "123456","female","1996-05-21","0493612875","Lisa@gmail.com","Static/Lisa.jpg");

insert into Customers (name,password,gender,birthdate,phone_number,email,avatar) 
values ("Rose", "123456","female","1995-10-25","0491474564","Rose@gmail.com","Static/Rose.jpg");


insert into Eateries (name,password,start_time,end_time,state,city,suburb,address,postcode,cuisine,phone_number,email,description, avatar,average_rating) 
values ("Kfc", "123456","07:00","16:00","New South Wales","Sydney","Mascot","Domestic Precinct 565 Ross Smith Ave","2020","FastFood","1111111","ss1@gmail.com","brabrabra","Static/kfc.png",4.3);

insert into Eateries (name,password,start_time,end_time,state,city,suburb,address,postcode,cuisine,phone_number,email,description, avatar,average_rating) 
values ("Ygf", "123456","07:00","16:00","New South Wales","Sydney","Kingsford","Shop4/438 Anzac Parade","2032","Chinese","1111111","ss2@gmail.com","brabrabra","Static/ygf.png",3.9);

insert into Eateries (name,password,start_time,end_time,state,city,suburb,address,postcode,cuisine,phone_number,email,description, avatar,average_rating) 
values ("Tradewinds", "123456","07:00","16:00","New South Wales","Sydney","Maroubra","3/196-204 Maroubra Rd","2035","Bistro","1111111","ss@gmail.com","brabrabra","Static/tradewinds.png",3.0);

insert into Eateries (name,password,start_time,end_time,state,city,suburb,address,postcode,cuisine,phone_number,email,description, avatar,average_rating) 
values ("SoulOrigin", "123456","07:00","16:00","New South Wales","Sydney","Mascot","Kiosk 2T/443 Keith Smith Ave","2020","FastFood","1111111","ss@gmail.com","brabrabra","Static/soulorigin.png",4.5);

insert into Eateries (name,password,start_time,end_time,state,city,suburb,address,postcode,cuisine,phone_number,email,description, avatar,average_rating) 
values ("WallabiesThai", "123456","07:00","16:00","New South Wales","Sydney","Mascot","2/1-5 Bourke St","2020","Thai","1111111","ss@gmail.com","brabrabra","Static/thai.png",4.0);

insert into Eateries (name,password,start_time,end_time,state,city,suburb,address,postcode,cuisine,phone_number,email,description, avatar,average_rating) 
values ("CurryCraze", "123456","07:00","16:00","New South Wales","Sydney","Mascot","197/201 Coward St","2020","Indian","1111111","ss@gmail.com","brabrabra","Static/curry.png",4.6);

insert into Eateries (name,password,start_time,end_time,state,city,suburb,address,postcode,cuisine,phone_number,email,description, avatar,average_rating) 
values ("Birria", "123456","07:00","16:00","New South Wales","Sydney","Mascot","Shop 1/293 Coward St","2020","Mexican","1111111","ss@gmail.com","brabrabra","Static/birra.png",3.2);

insert into Eateries (name,password,start_time,end_time,state,city,suburb,address,postcode,cuisine,phone_number,email,description, avatar,average_rating) 
values ("Kongfu", "123456","07:00","16:00","New South Wales","Sydney","Zetland","5 Joynton Ave","2017","Chinese","1111111","ss@gmail.com","brabrabra","Static/kongfu.png",3.8);

insert into Eateries (name,password,start_time,end_time,state,city,suburb,address,postcode,cuisine,phone_number,email,description, avatar,average_rating) 
values ("Treetop", "123456","07:00","16:00","New South Wales","Sydney","Zetland","58 O'Dea Ave","2017","Cafe","1111111","ss@gmail.com","brabrabra","Static/treetop.png",4.4);

insert into Eateries (name,password,start_time,end_time,state,city,suburb,address,postcode,cuisine,phone_number,email,description, avatar,average_rating) 
values ("TakeSushi", "123456","07:00","16:00","New South Wales","Sydney","Waterloo","R1/8 Allen St","2017 ","Japanese","1111111","ss@gmail.com","brabrabra","Static/takesushi.png",4.0);

insert into Eateries (name,password,start_time,end_time,state,city,suburb,address,postcode,cuisine,phone_number,email,description, avatar,average_rating) 
values ("YummyPepperHouse", "123456","07:00","16:00","New South Wales","Sydney","Kingsford","317 Anzac Parade","2032","Chinese","1111111","ss@gmail.com","brabrabra","Static/yummypepperhouse.png",2.9);

insert into Eateries (name,password,start_time,end_time,state,city,suburb,address,postcode,cuisine,phone_number,email,description, avatar,average_rating) 
values ("Macca", "123456","07:00","16:00","New South Wales","Sydney","Kingsford","10 Barker St","2032","FastFood","1111111","ss@gmail.com","brabrabra","Static/macca.png",5.0);

insert into Eateries (name,password,start_time,end_time,state,city,suburb,address,postcode,cuisine,phone_number,email,description, avatar,average_rating) 
values ("BanhMiCoBa", "123456","07:00","16:00","New South Wales","Sydney","Kingsford","6/372 Anzac Parade","2032","Vietnamese","1111111","ss@gmail.com","brabrabra","Static/banhmicoba.png",3.4);

insert into Eateries (name,password,start_time,end_time,state,city,suburb,address,postcode,cuisine,phone_number,email,description, avatar,average_rating) 
values ("CornerstoneCafeUTS", "123456","07:00","16:00","New South Wales","Sydney","Ultimo","638 Jones St","2007","Cafe","1111111","ss@gmail.com","brabrabra","Static/cafeuts.png",4.9);

insert into Eateries (name,password,start_time,end_time,state,city,suburb,address,postcode,cuisine,phone_number,email,description, avatar,average_rating) 
values ("Subway", "123456","07:00","16:00","New South Wales","Sydney","Ultimo","10/167 Broadway","2007","FastFood","1111111","ss@gmail.com","brabrabra","Static/subway.png",3.8);





insert into Vouchers (eatery_id,discount_percentage,weekday,start_,end_,set_number,number) 
values (1, 30,"Tuesday","2023-07-18","2023-07-18",50,50);


insert into Vouchers (eatery_id,discount_percentage,weekday,start_,end_,set_number,number) 
values (2, 20,"Monday","2023-07-17","2023-07-17",20,19);

insert into Vouchers (eatery_id,discount_percentage,start_,end_,set_number,number) 
values (2, 50,"2023-07-16","2023-07-30",30,30);

insert into Vouchers (eatery_id,discount_percentage,start_,end_,set_number,number) 
values (1, 50,"2023-07-16","2023-07-30",30,29);

insert into Vouchers (eatery_id,discount_percentage,start_,end_,set_number,number) 
values (3, 50,"2023-08-01","2023-08-30",30,30);

insert into Vouchers (eatery_id,discount_percentage,start_,end_,set_number,number) 
values (4, 50,"2023-08-01","2023-08-30",30,30);

insert into Vouchers (eatery_id,discount_percentage,start_,end_,set_number,number) 
values (5, 50,"2023-08-01","2023-08-30",30,30);

insert into Vouchers (eatery_id,discount_percentage,start_,end_,set_number,number) 
values (6, 50,"2023-08-01","2023-08-30",30,30);

insert into Vouchers (eatery_id,discount_percentage,start_,end_,set_number,number) 
values (7, 50,"2023-08-01","2023-08-30",30,30);

insert into Vouchers (eatery_id,discount_percentage,start_,end_,set_number,number) 
values (8, 50,"2023-08-01","2023-08-30",30,30);

insert into Vouchers (eatery_id,discount_percentage,start_,end_,set_number,number) 
values (9, 50,"2023-08-01","2023-08-30",30,30);

insert into Vouchers (eatery_id,discount_percentage,start_,end_,set_number,number) 
values (10, 50,"2023-08-01","2023-08-30",30,30);

insert into Vouchers (eatery_id,discount_percentage,start_,end_,set_number,number) 
values (11, 50,"2023-08-01","2023-08-30",30,30);

insert into Vouchers (eatery_id,discount_percentage,start_,end_,set_number,number) 
values (12, 50,"2023-08-01","2023-08-30",30,30);

insert into Vouchers (eatery_id,discount_percentage,start_,end_,set_number,number) 
values (13, 50,"2023-08-01","2023-08-30",30,30);

insert into Vouchers (eatery_id,discount_percentage,start_,end_,set_number,number) 
values (14, 50,"2023-08-01","2023-08-30",30,30);

insert into Vouchers (eatery_id,discount_percentage,start_,end_,set_number,number) 
values (15, 50,"2023-08-01","2023-08-30",30,30);



insert into has_vouchers (voucher_id,customer_id,code,start_,end_) 
values (1, 1,"qwer12","2023-07-16","2023-07-30");

insert into has_vouchers (voucher_id,customer_id,code,start_,end_) 
values (2, 1,"qwerdf","2023-07-17","2023-07-17");


insert into History (customer_id,eatery_id,discount_percentage,weekday,start_,end_,code,use_voucher_time,review,rating,review_time) 
values (1, 1,50,"MON","2023-07-16","2023-07-30","wweerr","2023-01-20 10:00:00","I love it",4,"2023-07-22 10:01:00");

insert into History (customer_id,eatery_id,discount_percentage,weekday,start_,end_,code,use_voucher_time,review,rating,review_time) 
values (1, 1,100,"MON","2023-07-16","2023-07-30","hhhhhh","2023-02-22 10:00:00","good",5,"2023-07-22 10:01:00");

insert into History (customer_id,eatery_id,discount_percentage,weekday,start_,end_,code,use_voucher_time,review,rating,review_time) 
values (10, 2,50,"MON","2023-07-16","2023-07-30","whg335","2023-03-20 10:00:00","Perfect taste!",5,"2023-07-22 10:01:00");

insert into History (customer_id,eatery_id,discount_percentage,weekday,start_,end_,code,use_voucher_time,review,rating,review_time) 
values (9, 2,50,"MON","2023-07-16","2023-07-30","ty8578","2023-03-20 10:00:00","just so so",2,"2023-07-22 10:01:00");

insert into History (customer_id,eatery_id,discount_percentage,weekday,start_,end_,code,use_voucher_time,review,rating,review_time) 
values (2, 2,50,"MON","2023-07-16","2023-07-30","dddddd","2023-03-20 10:00:00","not good",1,"2023-07-22 10:01:00");

insert into History (customer_id,eatery_id,discount_percentage,weekday,start_,end_,code,use_voucher_time,review,rating,review_time) 
values (1, 1,50,"MON","2023-07-16","2023-07-30","oooooo","2023-04-20 10:00:00","great",4,"2023-07-22 10:01:00");

insert into History (customer_id,eatery_id,discount_percentage,weekday,start_,end_,code,use_voucher_time,review,rating,review_time) 
values (2, 1,50,"MON","2023-07-16","2023-07-30","vvvvvv","2023-05-20 10:00:00","it is good but I don't like it",3,"2023-07-22 10:01:00");

insert into History (customer_id,eatery_id,discount_percentage,weekday,start_,end_,code,use_voucher_time,review,rating,review_time) 
values (3, 2,50,"MON","2023-07-16","2023-07-30","nnnnnn","2023-06-20 10:00:00","good, would come next time",4,"2023-07-22 10:01:00");

insert into History (customer_id,eatery_id,discount_percentage,weekday,start_,end_,code,use_voucher_time,review,rating,review_time) 
values (7, 3,50,"MON","2023-07-16","2023-07-30","24hh45","2023-06-20 10:00:00","good, thank you",4,"2023-08-01 10:01:00");

insert into History (customer_id,eatery_id,discount_percentage,weekday,start_,end_,code,use_voucher_time,review,rating,review_time) 
values (3, 3,50,"MON","2023-07-16","2023-07-30","adsads","2023-06-20 10:00:00","good, would come next time",4,"2023-08-01 10:01:00");

insert into History (customer_id,eatery_id,discount_percentage,weekday,start_,end_,code,use_voucher_time,review,rating,review_time) 
values (4, 4,50,"MON","2023-07-16","2023-07-30","vvbbaa","2023-06-20 10:00:00","good, would come next time",4,"2023-08-01 10:01:00");

insert into History (customer_id,eatery_id,discount_percentage,weekday,start_,end_,code,use_voucher_time,review,rating,review_time) 
values (4, 5,50,"MON","2023-07-16","2023-07-30","fgaags","2023-06-20 10:00:00","good, would come next time",4,"2023-08-01 10:01:00");

insert into History (customer_id,eatery_id,discount_percentage,weekday,start_,end_,code,use_voucher_time,review,rating,review_time) 
values (5, 6,50,"MON","2023-07-16","2023-07-30","qttywe","2023-06-20 10:00:00","good, would come next time",4,"2023-08-01 10:01:00");

insert into History (customer_id,eatery_id,discount_percentage,weekday,start_,end_,code,use_voucher_time,review,rating,review_time) 
values (8, 7,50,"MON","2023-07-16","2023-07-30","fghrte","2023-06-20 10:00:00","good, would come next time",4,"2023-08-01 10:01:00");

insert into History (customer_id,eatery_id,discount_percentage,weekday,start_,end_,code,use_voucher_time,review,rating,review_time) 
values (8, 8,50,"MON","2023-07-16","2023-07-30","21gawt","2023-06-20 10:00:00","good, would come next time",4,"2023-08-01 10:01:00");

insert into History (customer_id,eatery_id,discount_percentage,weekday,start_,end_,code,use_voucher_time,review,rating,review_time) 
values (6, 9,50,"MON","2023-07-16","2023-07-30","vvzsww","2023-06-20 10:00:00","good, would come next time",4,"2023-08-01 10:01:00");

insert into History (customer_id,eatery_id,discount_percentage,weekday,start_,end_,code,use_voucher_time,review,rating,review_time) 
values (7, 10,50,"MON","2023-07-16","2023-07-30","4445hs","2023-06-20 10:00:00","good, would come next time",4,"2023-08-01 10:01:00");

insert into History (customer_id,eatery_id,discount_percentage,weekday,start_,end_,code,use_voucher_time,review,rating,review_time) 
values (7, 11,50,"MON","2023-07-16","2023-07-30","scbb44","2023-06-20 10:00:00","good, would come next time",4,"2023-08-01 10:01:00");

insert into History (customer_id,eatery_id,discount_percentage,weekday,start_,end_,code,use_voucher_time,review,rating,review_time) 
values (9, 12,50,"MON","2023-07-16","2023-07-30","jwe335","2023-06-20 10:00:00","good, would come next time",4,"2023-08-01 10:01:00");

insert into History (customer_id,eatery_id,discount_percentage,weekday,start_,end_,code,use_voucher_time,review,rating,review_time) 
values (10, 13,50,"MON","2023-07-16","2023-07-30","3hh35e","2023-06-20 10:00:00","good, would come next time",4,"2023-08-01 10:01:00");

insert into History (customer_id,eatery_id,discount_percentage,weekday,start_,end_,code,use_voucher_time,review,rating,review_time) 
values (3, 14,50,"MON","2023-07-16","2023-07-30","hhawws","2023-06-20 10:00:00","good, would come next time",4,"2023-08-01 10:01:00");

insert into History (customer_id,eatery_id,discount_percentage,weekday,start_,end_,code,use_voucher_time,review,rating,review_time) 
values (2, 15,50,"MON","2023-07-16","2023-07-30","hq33hh","2023-06-20 10:00:00","good, would come next time",4,"2023-08-01 10:01:00");
