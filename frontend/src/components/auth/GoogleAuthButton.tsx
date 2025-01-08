import React from 'react';
import { auth, googleProvider } from './firebase.ts';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Button } from '@yamada-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { useSetAtom } from 'jotai';
import { userEmailAtom } from '../atom/globalState.ts';

const GoogleAuthButton: React.FC = () => {
  const navigate = useNavigate();
  const setEmailAddress = useSetAtom(userEmailAtom);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const email = result.user.email;
      setEmailAddress(email);
      navigate('/');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
