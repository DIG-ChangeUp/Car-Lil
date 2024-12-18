import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Link } from 'react-router-dom';
import GoogleAuthButton from '../components/auth/GoogleAuthButton.tsx';

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
      navigate('/');
    } catch (error) {
      console.error('ログインエラー:', error);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setError(error.message);
    }
  };

  return (
    <div>
      <h1>ログイン</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">メールアドレス</label>
          <input id="email" name="email" type="email" placeholder="email" />
        </div>
        <div>
          <label htmlFor="password">パスワード</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="password"
          />
        </div>
        <div>
          <button type="submit">ログイン</button>
        </div>
        <div>
          ユーザ登録は<Link to={'/signup'}>こちら</Link>から
        </div>
      </form>
      <div>
        <p>Googleを使って認証はこちら</p>
        <GoogleAuthButton />
      </div>
    </div>
  );
};

export default Login;
