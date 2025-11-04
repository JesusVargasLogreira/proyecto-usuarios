import React from 'react';
import UserList from './components/userList';
import AgregarUsuarios from './components/AgregarUsuarios';

function App() {
  return (
    <div>
      <h1>React + MySQL Example</h1>
      <UserList />
      <AgregarUsuarios />
    </div>
  );
}
export default App;
