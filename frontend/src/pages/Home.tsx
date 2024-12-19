import { auth } from '../components/auth/firebase';
import { useNavigate } from 'react-router-dom';
import { UseAuthContext } from '../components/AuthContext.tsx';
import { useEffect } from 'react';
import GoogleMap from '../components/GoogleMap.tsx';
import { Button } from '@yamada-ui/react';

const Home = () => {
  const navigate = useNavigate();
  const { user } = UseAuthContext();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      console.log('ログアウト エラー');
    }
  };

  // userが存在しない場合にリダイレクト
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]); // user または navigate が変更された場合にのみ実行

  if (!user) {
    // navigateによるリダイレクトが完了するまで何もレンダリングしない
    return null;
  }

  return (
    <div>
      <h1>ホームページ</h1>
      <Button onClick={handleLogout}>ログアウト</Button>
      <GoogleMap />
    </div>
  );
};

export default Home;
