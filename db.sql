CREATE DATABASE office_inventory;

USE office_inventory;

CREATE TABLE categories (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100) NOT NULL,
description TEXT
);

CREATE TABLE places (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100) NOT NULL,
description TEXT
);

CREATE TABLE items (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(150) NOT NULL,
category_id INT NOT NULL,
place_id INT NOT NULL,
description TEXT,
photo VARCHAR(255),
date_added DATE,
FOREIGN KEY (category_id) REFERENCES categories(id),
FOREIGN KEY (place_id) REFERENCES places(id)
);

INSERT INTO categories VALUES
(1,'Мебель','Офисная мебель'),
(2,'Компьютерное оборудование','Техника');

INSERT INTO places VALUES
(1,'Офис 101','Основной офис'),
(2,'Кабинет директора','Рабочий кабинет');

INSERT INTO items VALUES
(1,'Ноутбук HP Probook 450',2,1,'Рабочий ноутбук',NULL,'2026-03-01'),
(2,'Кресло компьютерное',1,2,'Кресло директора',NULL,'2026-03-02');