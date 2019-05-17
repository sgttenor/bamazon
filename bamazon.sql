DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  item_name VARCHAR(50) NOT NULL,
  department VARCHAR(45) NOT NULL,
  price DECIMAL(7,2) NOT NULL,
  stock INT default 1,
  PRIMARY KEY (id)
);

INSERT INTO products (item_name, department, price, stock)
VALUES ("Spirit Island", "Board-Games", 69.95, 10);

INSERT INTO products (item_name, department, price, stock)
VALUES ("Assassins Creed: Odyssey", "Video-Games", 59.95, 35);

INSERT INTO products (item_name, department, price, stock)
VALUES ("Raiders of the North Sea", "Board-Games", 39.95, 50);

INSERT INTO products (item_name, department, price, stock)
VALUES ("God of War", "Video-Games", 69.95, 25);

INSERT INTO products (item_name, department, price, stock)
VALUES ("Avengers: Infitiy War", "Movies", 29.95, 30);

INSERT INTO products (item_name, department, price, stock)
VALUES ("Valeria: Card Kingdoms.", "Board-Games", 29.95, 15);

INSERT INTO products (item_name, department, price, stock)
VALUES ("Wonder Woman", "Movies", 19.95, 20);

INSERT INTO products (item_name, department, price, stock)
VALUES ("Architects of the West Kingdom", "Board-Games", 34.95, 25);

INSERT INTO products (item_name, department, price, stock)
VALUES ("T'zolkin: The Mayan Temple", "Board-Games", 79.95, 10);

INSERT INTO products (item_name, department, price, stock)
VALUES ("Super Mario Maker 2", "Video-Games", 79.95, 10);











