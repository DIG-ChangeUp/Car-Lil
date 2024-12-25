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
      await signInWithPopup(auth, googleProvider);
      // google認証 帰値の残し
      // const result = await signInWithPopup(auth, googleProvider);
      // const user = result.user;
      // const email = result.email;
      // console.log('user email:', email);
      navigate('/selectUserType');
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
