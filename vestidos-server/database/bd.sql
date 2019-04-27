CREATE DATABASE vestidosDB;

USE vestidosDB;

CREATE TABLE users(
    id INT(11) NOT NULL,
    nombre VARCHAR(16) NOT NULL,
    tipo ENUM('ADMIN', 'NORMAL') NOT NULL DEFAULT 'NORMAL';
    password VARCHAR(60) NOT NULL
);

ALTER TABLE users
    ADD PRIMARY KEY (id);

ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;


DESCRIBE users;

CREATE TABLE vestidos(
     id INT(11) NOT NULL,
     modelo VARCHAR(15) NOT NULL,
     color VARCHAR(15) NOT NULL,
     tela VARCHAR(15) NOT NULL,
     talla ENUM('Xs', 's', 'M', 'G','XL','XXL') NOT NULL,
     complementos VARCHAR(60),
     estado VARCHAR(50) NOT NULL,     
     observaciones TEXT
);

ALTER TABLE vestidos
    ADD PRIMARY KEY (id);

  ALTER TABLE vestidos
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;  

 ALTER TABLE vestidos
    MODIFY complementos VARCHAR(60); 

DESCRIBE vestidos;

CREATE TABLE cliente(
     id INT(11) NOT NULL,
     id_vestido INT(11),
     nombre VARCHAR(15) NOT NULL,
     apellidos VARCHAR(50) NOT NULL,
     telefono VARCHAR(12) NOT NULL,
     CONSTRAINT fk_vestido FOREIGN KEY (id_vestido) REFERENCES vestidos (id)
);

ALTER TABLE cliente
    ADD PRIMARY KEY (id);

  ALTER TABLE cliente
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;  

DESCRIBE cliente;


CREATE TABLE pago(
     id INT(11) NOT NULL,
     id_cliente INT(11),
     fecha DATE NOT NULL,
     monto int(8) NOT NULL,
     total int(10) NOT NULL,
     estado VARCHAR(10) NOT NULL,
     CONSTRAINT fk_cliente FOREIGN KEY (id_cliente) REFERENCES cliente (id)
);

ALTER TABLE pago
    ADD PRIMARY KEY (id);

  ALTER TABLE pago
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;  

  ALTER TABLE pago
    MODIFY  fecha DATE NOT NULL;  

DESCRIBE pago;

CREATE TABLE cita(
     id INT(11) NOT NULL,
     id_cliente INT(11),
     fecha timestamp NOT NULL,
     hora VARCHAR(15) NOT NULL,
     CONSTRAINT fk_clienteCita FOREIGN KEY (id_cliente) REFERENCES cliente (id)
);

ALTER TABLE cita
    ADD PRIMARY KEY (id);

  ALTER TABLE cita
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;  

ALTER TABLE cita
    ADD tipo_cita ENUM('Presupuesto', 'Prueba', 'Entrega') NOT NULL  ;

  ALTER TABLE cita
    ADD hora VARCHAR(15) NOT NULL;

DESCRIBE cita;