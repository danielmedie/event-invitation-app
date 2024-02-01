import React, { useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { getCurrentUser, getUser } = useAuth();
  
  useEffect(() => { getUser() }, [])
  const user = getCurrentUser()

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
	  <p>Hej {user?.name}</p>
	  <p><strong>Email</strong>: {user?.email}</p>
	  <p className='mt-2'>Visa vilka gäster som kommer på <Link to={`/admin/guests`} className="text-blue-500 underline">gästsidan</Link></p>
    </div>
  );
};

export default AdminDashboard;
