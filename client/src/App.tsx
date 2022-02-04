import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Collections from './Collections';
import Dashboard, { Main } from './Dashboard';

const Login = () => <div>Login page</div>;
const Favorites = () => <div>Favorites</div>;
const Preferences = () => <div>Preferences</div>;

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />}>
          <Route index element={<Main />} />
          <Route path='collections' element={<Collections />} />
          <Route path='/favorites' element={<Favorites />} />
          <Route path='/preferences' element={<Preferences />} />
        </Route>
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
