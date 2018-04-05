DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INTEGER AUTO_INCREMENT,
    product_name VARCHAR (255) NOT NULL,
    department_name VARCHAR (255),
    price INTEGER (10),
    stock_quantity INTEGER (10),
    primary key (item_id)
);