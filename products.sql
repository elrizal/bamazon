DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  -- Creates a numeric column called "id" which will automatically increment its default value as we create new rows. --
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(30),
  department_name VARCHAR(30),
  item_price DECIMAL(10, 3),
  stock_quantity INTEGER(0)
  -- Creates a boolean column called "mastered" which will automatically fill --
  -- with true when a new row is made and the value isn't otherwise defined. --
  -- mastered BOOLEAN DEFAULT true,
  PRIMARY KEY (item_id)
);

-- Creates new rows
INSERT INTO products (product_name, department_name, item_price, stock_quantity)
VALUES ("cup", "Dining", 12.50, 100);

INSERT INTO products (product_name, department_name, item_price, stock_quantity)
VALUES ("Massage Chair", "Furniture", 220, 50);

INSERT INTO products (product_name, department_name, item_price, stock_quantity)
VALUES ("Floor Mat", "Home Acc.", 25.90, 100);

INSERT INTO products (product_name, department_name, item_price, stock_quantity)
VALUES ("Blender", "Kitchen", 50, 100);

INSERT INTO products (product_name, department_name, item_price, stock_quantity)
VALUES ("Pillow", "Bedroom", 35, 100);

INSERT INTO products (product_name, department_name, item_price, stock_quantity)
VALUES ("Laptop case", "Tech Acc.", 45.90, 50);

INSERT INTO products (product_name, department_name, item_price, stock_quantity)
VALUES ("Hand Soap", "Home Acc.", 45.90, 100);

INSERT INTO products (product_name, department_name, item_price, stock_quantity)
VALUES ("Scarf", "Clothes Acc.", 15.99, 100);

INSERT INTO products (product_name, department_name, item_price, stock_quantity)
VALUES ("Phone case", "Tech Acc.", 20, 100);

INSERT INTO products (product_name, department_name, item_price, stock_quantity)
VALUES ("Playstation 4", "Gaming", 399.99, 50);
