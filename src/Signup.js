// Signup.js
import React, { useState } from 'react';
import { auth } from './firebase';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      // Redirect to dashboard or display success message
    } catch (error) {
      console.error('Error signing up:', error.message);
      // Handle error (display error message, etc.)
    }
  };

  return (
    <div>
      <h1>Signup Page</h1>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
}

export default Signup;
