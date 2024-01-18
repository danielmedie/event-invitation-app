import React, { useEffect } from 'react';

function UserDashboard({ userName }) {
  useEffect(() => {
    console.log('UserDashboard component mounted with userName:', userName);
  }, [userName]);

  return (
    <div>
      <h1>Welcome, {userName}!</h1>
    </div>
  );
}

export default UserDashboard;
