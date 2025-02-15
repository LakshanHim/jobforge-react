import React from 'react';
import Login from '../../../pages/Login/Login';
import Register from '../../../pages/Register/Register';


const routes =[
    {
        name: 'Login',
        path: '/login',
        element: <Login/>,
        key: 'login'
    },
    {
        name: 'Register',
        path: '/register',
        element: <Register/>,
        key: 'register'
    },

];

export default routes;