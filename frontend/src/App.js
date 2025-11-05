import React from 'react';
import UserList from './components/userList';
import AgregarUsuarios from './components/AgregarUsuarios';
import ActualizarUsuarios from './components/ActualizarUsuarios';

function App() {
  return (
    <div>
      <h1>React + MySQL Example</h1>
      <UserList />
      <AgregarUsuarios />
      <ActualizarUsuarios />
    </div>
  );
}
export default App;
