import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TaskList from './components/task/TaskList';
import Login from './components/user/Login';
import Register from './components/user/Register';

function App() {
  useEffect(() => {
    document.body.style.margin = '0';
  }, []);
  return (
    <Router>
      <main>
        <Routes>
          <Route path='/' element={<Login />}  />
          <Route path='/register' element={<Register />}  />
          <Route path='/task' element={<TaskList />}  />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
