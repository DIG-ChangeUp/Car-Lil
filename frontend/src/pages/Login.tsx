import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';
import GoogleAuthButton from '../components/auth/GoogleAuthButton.tsx';

import { Button, Container, PasswordInput, Text } from '@yamada-ui/react';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const auth = getAuth(); // Firebase Auth インスタンスを取得

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const emailInput = form.elements.namedItem('email') as HTMLInputElement;
    const passwordInput = form.elements.namedItem(
      'password'
    ) as HTMLInputElement;

    const email = emailInput.value;
    const password = passwordInput.value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('ログイン成功');
      navigate('/map');
    } catch (error) {
      console.error('ログインエラー:', error);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setError(error.message);
    }
  };

  return (
    <Container centerContent>
      <Text fontSize={'4xl'} fontWeight={'bold'}>
        Car-Lil
      </Text>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">E-mail : </label>
          <input id="email" name="email" type="email" placeholder="email" />
        </div>
        <div>
          <label htmlFor="password">Password : </label>
          <PasswordInput
            id="password"
            name="password"
            type="password"
            placeholder="password"
          />
        </div>
        <div>
          <Button type="submit">ログイン</Button>
        </div>
        <div>
          ユーザ登録は<Link to={'/signup'}>こちら</Link>から
        </div>
      </form>
      <div>
        <p>Googleを使って認証はこちら</p>
        <GoogleAuthButton />
      </div>
    </Container>
  );
};

export default Login;
