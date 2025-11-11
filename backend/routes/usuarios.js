const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get('/', (req, res) => {
    const query = 'SELECT * FROM usuarios ORDER BY id ASC';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener usuarios:', err);
            return res.status(500).json({
                error: 'Error al obtener usuarios',
                details: err.message
            });
        }
        res.json(results);
    });
});

// Agregar Usuarios
router.post('/', (req, res) => {
    const { nombre, email, telefono } = req.body;
    if (!nombre || !email || !telefono) {
        return res.status(400).json({ error: 'Rellene todos los campos' });
    }

    const query = 'INSERT INTO usuarios (nombre, email, telefono) VALUES (?, ?, ?)';
    db.query(query, [nombre, email, telefono], (err, result) => {
        if (err) {
            console.error('Error al agregar usuario:', err);
            return res.status(500).json({
                error: 'Error al agregar usuario',
                details: err.message
            });
        }

        const newUser = { id: result.insertId, nombre, email, telefono };
        res.status(201).json(newUser);
    });
});

// Actualizar Usuarios
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, email, telefono } = req.body;
    if (!nombre || !email || !telefono) {
        return res.status(400).json({ error: 'Rellene todos los campos' });
    }

    const query = 'UPDATE usuarios SET nombre = ?, email = ?, telefono = ? WHERE id = ?';
    db.query(query, [nombre, email, telefono, id], (err, results) => {
        if (err) {
            console.error('Error al actualizar usuario:', err);
            return res.status(500).json({
                error: 'Error al actualizar usuario',
                details: err.message
            });
        }

        const updatedUser = { id, nombre, email, telefono };
        res.json(updatedUser);
    });
});

// Eliminar Usuario
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: 'Ingrese un ID valido' });
    }

    const query = 'DELETE FROM usuarios WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar usuario:', err);
            return res.status(500).json({
                error: 'Error al eliminar usuario',
                details: err.message
            });
        }

        res.json({ mensaje: `Usuario con ID ${id} eliminado correctamente` });
    });
});


module.exports = router;
