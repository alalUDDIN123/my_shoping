import React from 'react';
import './UnauthorizedAccess.css';

const UnauthorizedAccess = () => {
  return (
    <div className="unauthorized-access">
      <h1>Unauthorized Access</h1>
      <p>Sorry, you do not have permission to access this page.</p>
      <button onClick={() => window.history.back()}>Go Home</button>
    </div>
  );
};

export default UnauthorizedAccess;
