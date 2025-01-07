import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, HStack, Text } from '@yamada-ui/react';
import { GrUserAdmin, GrUser } from 'react-icons/gr';
import {
  userEmailAtom,
  userDataAtom,
  locationAtom,
  prevLocationAtom,
} from '../components/atom/globalState.ts';
import { useAtom, useSetAtom } from 'jotai/index';
import { auth } from '../components/auth/firebase.ts';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

const Home = () => {
  const navigate = useNavigate();
  //ログイン時に取得したメールアドレスをユーザーデータ取得に利用
  const [emailAddress, setEmailAddress] = useAtom(userEmailAtom);

  //ユーザーデータを保持
  const [userData, setUserData] = useAtom(userDataAtom);
  const [location, setLocation] = useAtom(locationAtom);
  const setPrevLocation = useSetAtom(prevLocationAtom);

  useEffect(() => {
    checkLogin();
  }, []);

  // ページを開いた時にオーナーとしてのデータを取得
  useEffect(() => {
    (async () => {
      await getOwnerData(emailAddress);
    })();
  }, []);

  useEffect(() => {
    getGeolocation('first');
  }, []);

  async function fetchUserData(email: string | null) {
    if (!email) return;
    const response: Response = await fetch('api/users/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    if (response.ok) {
      const user = await response.json();
      //DBに未登録のユーザーの場合オーナーとして登録処理を行う
      if (user.data === false) {
        const addUserResponse = await fetch('/api/addUser', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: email,
            user_type: 'オーナー',
          }),
        });
        if (addUserResponse.ok) {
          console.log('usersテーブルへのユーザー登録完了');
        }
      }
    }
  }

  async function checkLogin() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmailAddress(user.email);
      } else {
        navigate('/login');
      }
    });
  }

  //メールアドレスからオーナーに紐づくすべてのデータを取得
  async function getOwnerData(email: string | null) {
    //emailからusersテーブルのユーザーID(id)を取得
    const response = await fetch('/api/users/owner/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email }),
    });
    if (response.ok) {
      const jsonResponse = await response.json();
      setUserData(jsonResponse.data);
      console.log('userData', userData);
    }
  }

  //ログアウト
  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.log('ログアウト エラー');
    }
  };

  //位置情報取得、ステートに保持
  function getGeolocation(calledTiming: string | null): void {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 10,
    };
    function success(pos: GeolocationPosition) {
      const crd = pos.coords;
      // 不要な routes api の呼び出しを回避するための処理
      if (!calledTiming) {
        setPrevLocation(location);
      }
      setLocation({ latitude: crd.latitude, longitude: crd.longitude });
    }
    function error(err: GeolocationPositionError) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  if (!emailAddress) {
    return <></>;
  }
  return (
    <>
      <div>
        <Container
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Text
            sx={{
              fontSize: '5xl',
              marginTop: '3xl',
              paddingLeft: 5,
            }}
          >
            メニュー選択
          </Text>
          <HStack
            sx={{
              h: 'max-content',
              textAlign: 'center',
              marginX: 'auto',
              marginY: 'xl',
            }}
          >
            <Box
              sx={{
                w: 44,
                h: 44,
                backgroundColor: '#F3F7F7',
                paddingTop: 'xl',
                rounded: 'xl',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              }}
              onClick={async () => {
                await fetchUserData(emailAddress);
                navigate('/ownerSelectCar');
              }}
            >
              <GrUserAdmin size="50" />
              <Text sx={{ fontSize: '2xl' }}>オーナー</Text>
            </Box>
            <Box
              sx={{
                w: '44',
                h: '44',
                backgroundColor: '#F3F7F7',
                paddingTop: 'xl',
                rounded: 'xl',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              }}
              onClick={async () => {
                await fetchUserData(emailAddress);
                navigate('/map');
              }}
            >
              <GrUser size="50" />
              <Text sx={{ fontSize: '2xl' }}>ユーザー</Text>
            </Box>
          </HStack>
          <Button
            sx={{
              w: 350,
              h: 55,
              fontSize: 'xl',
              backgroundColor: '#289FAB',
              color: '#FEFEFE',
              marginX: 'auto',
              marginY: 160,
            }}
            onClick={() => handleLogout()}
          >
            サインアウト
          </Button>
        </Container>
      </div>
    </>
  );
};

export default Home;
