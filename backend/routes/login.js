const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.post('/', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Ingrese correo y contraseña' });
    }

    const query = 'SELECT * FROM usuarios WHERE email = ? OR nombre = ? LIMIT 1';
    db.query(query, [username, username], (err, results) => {
        if (err) {
            console.error('Error al buscar usuario:', err);
            return res.status(500).json({
                message: 'Error interno del servidor',
                details: err.message
            });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        const user = results[0];

        if (user.password !== password) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        const rol = user.rol || 'usuario';

        res.json({
            message: `Bienvenido ${user.nombre}`,
            rol,
            user: {
                id: user.id,
                nombre: user.nombre,
                email: user.email
            }
        });
    });
});

module.exports = router;
