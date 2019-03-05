DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products (
item_id INTEGER NOT NULL AUTO_INCREMENT,
product_name VARCHAR(30) NOT NULL,
department_name VARCHAR(30) NOT NULL,
price INTEGER (10) NOT NULL,
stock_quantity INTEGER (6),
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("socks", "Apparel", 5, 100), ("shoes","Apparel",4, 200), ("paper", "Office Supplies", 10,500), ("Climbing Rope",
"Sports Gear", 20, 50), ("Bike Rack","Sports Gear",76,30),("couch", "Household Items", 250,3),("Lego Set", "Toys", 34,17),("RibEye", "Food",15,10),("Green Beans","Food",2,40),("Windex", "Cleaning Supplies",5,75);
 SELECT*FROM products;