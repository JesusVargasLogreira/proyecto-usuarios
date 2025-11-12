DROP DATABASE IF EXISTS usuarios_app;
CREATE DATABASE usuarios_app;
USE usuarios_app;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    rol ENUM('admin', 'usuario') DEFAULT 'usuario',
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO usuarios (nombre, email, password, telefono, rol) VALUES
('Admin', 'admin@email.com', 'admin', '3000000000', 'admin'),
('Juan Pérez', 'juan.perez@email.com', 'juan123', '3001234567', 'usuario'),
('María García', 'maria.garcia@email.com', 'maria123', '3109876543', 'usuario'),
('Carlos López', 'carlos.lopez@email.com', 'carlos123', '3157654321', 'usuario'),
('Ana Martínez', 'ana.martinez@email.com', 'ana123', '3208765432', 'usuario'),
('Luis Rodríguez', 'luis.rodriguez@email.com', 'luis123', '3156789012', 'usuario');

SELECT * FROM usuarios;
