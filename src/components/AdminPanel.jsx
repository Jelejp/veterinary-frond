import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminPanel = () => {
    
    const isAdmin = useSelector(store => store.authReducer.user.isAdmin);

    return (
        <div>
            <h1>Admin Panel</h1>
            <p>Here you can manage users, pets, and more.</p>
            {/* Agrega aquí las funciones de administración */}
        </div>
    );
}

export default AdminPanel
