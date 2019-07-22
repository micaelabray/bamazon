DROP DATABASE IF EXISTS bamazon_db;
CREATE database bamazon_db;

USE bamazon_db;

CREATE TABLE products (
    item_id INT(10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    department_name VARCHAR(255),
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(10) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("track pants", "Athleasure", 30, 15),
("crop top", "Cuteness", 10, 2),
("PopSocket", "Accessibility", 9.99, 42),
("Apple Watch", "Technology", 279, 7),
("Computer", "Technology", 999, 4),
("jokes", "hilarity", 0.00, 1000000),
("glasses", "eyeware", 25, 5),
("sunglasses", "eyeware", 17, 3),
("mustache comb", "mustache attire", 22.22, 2),
("mouse", "technology", 42.42, 42);