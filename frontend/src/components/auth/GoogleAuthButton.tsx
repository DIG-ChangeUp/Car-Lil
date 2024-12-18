import React from 'react';
import { auth, googleProvider } from './firebase.ts';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const GoogleAuthButton: React.FC = () => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      //google認証
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log('user info:', user);
      navigate('/');
    } catch (error) {
      console.log('google auth error!');
    }
  };

  return <button onClick={handleGoogleSignIn}>Sign in with Google</button>;
};

export default GoogleAuthButton;
