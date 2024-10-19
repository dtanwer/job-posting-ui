import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../image/logo.png';

function Navbar() {
    const token = localStorage.getItem("token");
    const navigation = useNavigate();

    const handleLogout = ()=>{
        localStorage.removeItem('token');
        navigation('/');
    } 

    return (
        <div className="flex justify-between items-center p-4 bg-white shadow-md">
            <div>
                <img src={logo} alt="Logo" className="h-7" />
            </div>
            <div className="text-lg font-semibold">Contact</div>
            {token && <button onClick={handleLogout}>
                logout
            </button>}
        </div>
    );
}

export default Navbar
