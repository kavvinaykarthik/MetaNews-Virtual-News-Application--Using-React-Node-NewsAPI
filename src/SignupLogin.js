import React, { useState } from 'react';
import firebase from 'firebase/compat/app'; 
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import './l.css'; // Import CSS file

const firebaseConfig = {
 //YOUR'S CONFIG
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();

const SignupLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      const response = await auth.createUserWithEmailAndPassword(email, password);
      const { user } = response;
      await firestore.collection('users').doc(user.uid).set({ email: user.email });
      console.log('User signed up successfully:', user.uid);
      window.location.href = '/news'; // Navigate to root route after sign up
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  const handleSignIn = async () => {
    try {
      const response = await auth.signInWithEmailAndPassword(email, password);
      const { user } = response;
      console.log('User signed in successfully:', user.uid);
      window.location.href = '/news'; // Navigate to root route after sign in
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <div id="log">
      <h1>Signup / Login</h1>
      <div className="form">
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button onClick={handleSignUp}>Sign Up</button>
        <button onClick={handleSignIn}>Sign In</button>
        <p>Don't have an account? Go for SignUp</p>
      </div>
    </div>
  );
};

export default SignupLogin;
