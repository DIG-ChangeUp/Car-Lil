import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, HStack, Text } from '@yamada-ui/react';
import { GrUserAdmin, GrUser } from 'react-icons/gr';
import { userEmailAtom, userDataAtom } from '../components/atom/globalState.ts';
import { useAtom } from 'jotai/index';
import { auth } from '../components/auth/firebase.ts';

const SelectUserOrOwner = () => {
  const navigate = useNavigate();
  //ログイン時に取得したメールアドレスをユーザーデータ取得に利用
  const [emailAddress] = useAtom(userEmailAtom);
  console.log('取得してるはずのemail-------->', emailAddress);
  //ユーザーデータを保持
  const [userData, setUserData] = useAtom(userDataAtom);

  //メールアドレスからオーナーに紐づくすべてのデータを取得
  async function getOwnerData(email: string) {
    //emailからusersテーブルのユーザーID(id)を取得
    const Response = await fetch('/api/users/owner/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email }),
    });
    if (Response.ok) {
      const jsonResponse = await Response.json();
      console.log('jsonResponse', jsonResponse);
      setUserData(jsonResponse.data);
      console.log('userData', userData);
    }
  }
  //メールアドレスからテナントに紐づくすべてのデータを取得
  async function getTenantData(email: string) {
    //emailからusersテーブルのユーザーID(id)を取得
    const Response = await fetch('/api/users/tenant/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email }),
    });
    if (Response.ok) {
      const jsonResponse = await Response.json();
      console.log('jsonResponse', jsonResponse);
      setUserData(jsonResponse.data);
      console.log('userData', userData);
    }
  }
  //ログアウト
  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.log('ログアウト エラー');
    }
  };

  return (
    <div>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Text sx={{ fontSize: '5xl' }}>メニュー選択</Text>
        <HStack
          sx={{
            textAlign: 'center',
            marginX: 'auto',
          }}
        >
          <Box
            sx={{
              backgroundColor: '#F3F7F7',
              padding: 5,
              rounded: 'md',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
            onClick={() => getOwnerData(emailAddress)}
          >
            <GrUserAdmin size="40" />
            <Text sx={{ fontSize: '2xl' }}>オーナー</Text>
          </Box>
          <Box
            sx={{
              backgroundColor: '#F3F7F7',
              padding: 5,
              rounded: 'md',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}
            onClick={() => getTenantData(emailAddress)}
          >
            <GrUser size="40" />
            <Text sx={{ fontSize: '2xl' }}>ユーザー</Text>
          </Box>
        </HStack>
        <Button
          sx={{
            w: 330,
            h: 50,
            backgroundColor: '#289FAB',
            color: '#FEFEFE',
            margin: 'auto',
          }}
          onClick={() => handleLogout()}
        >
          サインアウト
        </Button>
      </Container>
    </div>
  );
};

export default SelectUserOrOwner;
