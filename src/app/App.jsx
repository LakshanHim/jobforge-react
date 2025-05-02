import { useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Login from '../pages/Login/Login';
import Home from '../pages/Home/Home';
import Register from '../pages/Register/Register';
import Company from '../pages/Company/Company';
import Profile from '../pages/Profile/Profile';
import Course from '../pages/Course/Course';
import UpdateJob from '../pages/UpdateJob/UpdateJob';
import AddJob from '../pages/AddJob/AddJob';
import AddCourse from '../pages/AddCourse/AddCourse';
import UpdateCourse from '../pages/UpdateCourse/UpdateCourse';

function App() {
    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/company" element={<Company/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/course' element={<Course/>}/>
            <Route path='/updateJob/:jobId' element={<UpdateJob/>}/>
            <Route path='/addJob' element={<AddJob/>}/>
            <Route path='/addCourse' element={<AddCourse/>}/>
            <Route path='/update-course/:courseId' element={<UpdateCourse />} />

        </Routes>
    );
}

export default App;
