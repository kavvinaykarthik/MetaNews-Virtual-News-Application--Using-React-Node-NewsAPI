// Login.js
import React, { useState } from 'react';
import { auth } from './firebase';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      // Redirect to dashboard or display success message
    } catch (error) {
      console.error('Error logging in:', error.message);
      // Handle error (display error message, etc.)
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;
