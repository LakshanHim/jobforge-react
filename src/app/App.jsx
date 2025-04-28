import { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Login from '../pages/Login/Login';
import Home from '../pages/Home/Home';
import Register from '../pages/Register/Register';
import Company from '../pages/Company/Company';
import Profile from '../pages/Profile/Profile';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/company" element={<Company/>}/>
            <Route path='/profile' element={<Profile/>}/>
        </Routes>
    );
}

export default App;
