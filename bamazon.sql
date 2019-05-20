DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(5,2) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Spirit Island", "Board-Games", 69.95, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Assassins Creed: Odyssey", "Video-Games", 59.95, 35);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Raiders of the North Sea", "Board-Games", 39.95, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("God of War", "Video-Games", 69.95, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Avengers: Infitiy War", "Movies", 29.95, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Valeria: Card Kingdoms.", "Board-Games", 29.95, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Wonder Woman", "Movies", 19.95, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Architects of the West Kingdom", "Board-Games", 34.95, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("T'zolkin: The Mayan Temple", "Board-Games", 79.95, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Super Mario Maker 2", "Video-Games", 79.95, 10);











