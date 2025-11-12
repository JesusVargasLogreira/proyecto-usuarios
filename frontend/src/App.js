import React, { useState } from 'react';
import './App.css';
import UserList from './components/userList';
import AgregarUsuarios from './components/AgregarUsuarios';
import ActualizarUsuarios from './components/ActualizarUsuarios';
import EliminarUsuarios from './components/EliminarUsuarios';
import Login from './components/loginUsuarios';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      {user ? (
        <UserList />
      ) : (
        <Login onLoginSuccess={setUser} />
      )}
    </div>
  );
}
export default App;
