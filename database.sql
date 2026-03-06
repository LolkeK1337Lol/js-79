CREATE DATABASE office_inventory;

USE office_inventory;


CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);


CREATE TABLE places (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

CREATE TABLE items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category_id INT NOT NULL,
    place_id INT NOT NULL,
    description TEXT,
    photo VARCHAR(255),
    created_at DATE,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (place_id) REFERENCES places(id)
);


INSERT INTO categories (id, name, description) VALUES
(1, 'Мебель', 'Офисная мебель'),
(2, 'Компьютерное оборудование', 'Компьютеры и техника');

INSERT INTO places (id, name, description) VALUES
(1, 'Офис 204', 'Основной офис'),
(2, 'Кабинет директора', 'Рабочее место директора');

INSERT INTO items (id, name, category_id, place_id, description, photo, created_at) VALUES
(1, 'Ноутбук HP Probook 450', 2, 1, 'Рабочий ноутбук', 'hp.jpg', '2024-01-10'),
(2, 'Кресло компьютерное КК-345', 1, 2, 'Кресло директора', 'chair.jpg', '2024-02-01');