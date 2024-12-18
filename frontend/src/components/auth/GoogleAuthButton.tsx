import React from 'react';
import { auth, googleProvider } from './firebase.ts';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@yamada-ui/react';
import { FcGoogle } from 'react-icons/fc';

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

  return (
    <Button
      leftIcon={<FcGoogle />}
      variant="outline"
      onClick={handleGoogleSignIn}
    >
      Googleでログイン
    </Button>
  );
};

export default GoogleAuthButton;
