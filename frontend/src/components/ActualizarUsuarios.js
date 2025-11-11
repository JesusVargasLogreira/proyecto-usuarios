import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ActualizarUsuarios() {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios.get('http://localhost:5001/api/usuarios')
            .then(res => setUsers(res.data))
            .catch(err => console.error(err));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSelectedUser({ ...selectedUser, [name]: value });
    };

    // Actualizar usuario
    const updateUser = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5001/api/usuarios/${selectedUser.id}`, selectedUser)
            .then(res => {
                const updatedUsers = users.map(u =>
                    u.id === selectedUser.id ? res.data : u
                );
                setUsers(updatedUsers);
                setSelectedUser(null);
            })
            .catch(err => console.error(err));
    };

    // Cancelar edición
    const cancelEdit = () => {
        setSelectedUser(null);
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Actualizar Usuarios</h2>

            <table border="1" cellPadding="10" >
                <thead>
                    <tr>
                        <th>ID</th><th>Nombre</th><th>Email</th><th>Telefono</th><th>Actualizar</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => (
                        <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.nombre}</td>
                            <td>{u.email}</td>
                            <td>{u.telefono}</td>
                            <td>
                                <button onClick={() => setSelectedUser(u)}>Editar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedUser && (
                <div style={{ marginTop: '20px' }}>
                    <h3>Editar Usuario</h3>
                    <form onSubmit={updateUser}>
                        <label>
                            Nombre:
                            <input
                                type="text"
                                name="nombre"
                                placeholder="Nombre"
                                value={selectedUser.nombre}
                                onChange={handleInputChange}
                            />
                        </label>
                        <br />


                        <label>
                            Email:
                            <input
                                type="text"
                                name="email"
                                placeholder="Email"
                                value={selectedUser.email}
                                onChange={handleInputChange}
                            />
                        </label>
                        <br />


                        <label>
                            Telefono:
                            <input
                                type="text"
                                name="telefono"
                                placeholder="Teléfono"
                                value={selectedUser.telefono}
                                onChange={handleInputChange}
                            />
                        </label>

                        <br />

                        <label style={{ marginTop: '10px' }}>
                            <button type="submit">Guardar cambios</button>
                            <button type="button" onClick={cancelEdit}>Cancelar</button>
                        </label>
                    </form>
                </div>
            )}
        </div>
    );
}

export default ActualizarUsuarios;