import React from 'react'
import Register from '../components/Auth/Signup/Signup'
import { Navigate } from 'react-router-dom';

function Auth() {
  const token = localStorage.getItem("token");
    if (token) {
        return <Navigate to="/dashboard" replace />
    }
  return (
    <div>
      <Register />
    </div>
  )
}

export default Auth
