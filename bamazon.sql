DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	id INTEGER AUTO_INCREMENT,
    product_name VARCHAR (255) NOT NULL,
    department_name VARCHAR (255),
    price INTEGER (10),
    stock_quantity INTEGER (10),
    primary key (id)
);

INSERT INTO products 
(product_name, department_name, price, stock_quantity)
VALUE
("Pampers Diapers", "Baby", 21.99, 20),
("Macbook Pro 15", "Computers", 2799.99, 10),
("iPad Pro 10.5", "Computers", 929.99, 15),
("Apple Magic Mouse", "Computer Accessories", 59.99, 40),
("Munchkin Milk Bottle", "Baby", 8.99, 50),
("Organic, Non-GMO, BPA-Free, Vitamin-Infused Baby Wipes", "Baby", 79.99, 100),
("Wilson Evolution Basketball", "Sports", 59.99, 37),
("Grand Slam Baseball Bat", "Sports", 15.99, 25),
("Nalgene Water Bottle", "Outdoor", 16.99, 87),
("Camping Stove", "Outdoor", 39.99, 13),
("Bear with it Beary-Flavored Bear Spray", "Outdoor", 9.99, 140);