import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, HStack, Text } from '@yamada-ui/react';
import { GrUserAdmin, GrUser } from 'react-icons/gr';
import {
  userEmailAtom,
  userDataAtom,
  allCarPorteAtom,
  locationAtom,
  prevLocationAtom,
  distanceDataAtom,
} from '../components/atom/globalState.ts';
import { useAtom, useSetAtom } from 'jotai/index';
import { auth } from '../components/auth/firebase.ts';
import { useEffect } from 'react';

const SelectUserOrOwner = () => {
  const navigate = useNavigate();
  //ログイン時に取得したメールアドレスをユーザーデータ取得に利用
  const [emailAddress] = useAtom(userEmailAtom);
  console.log('取得したemail-------->', emailAddress);
  //ユーザーデータを保持
  const [userData, setUserData] = useAtom(userDataAtom);
  const setAllCarPorte = useSetAtom(allCarPorteAtom);
  const [location, setLocation] = useAtom(locationAtom);
  const setPrevLocation = useSetAtom(prevLocationAtom);
  const setDistanceData = useSetAtom(distanceDataAtom);
  let isUserExist: boolean = false;

  useEffect(() => {
    (async () => {
      const response: Response = await fetch('api/users/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailAddress }),
      });
      if (response.ok) {
        isUserExist = await response.json();
        console.log('exist-----', isUserExist);
      }
    })();
  }, []);

  //メールアドレスからオーナーに紐づくすべてのデータを取得
  async function getOwnerData(email: string | null) {
    //emailからusersテーブルのユーザーID(id)を取得
    const Response = await fetch('/api/users/owner/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email }),
    });
    if (Response.ok) {
      const jsonResponse = await Response.json();
      setUserData(jsonResponse.data);
      console.log('userData', userData);
    }
  }
  // //メールアドレスからテナントに紐づくすべてのデータを取得
  // async function getTenantData(email: string) {
  //   //emailからusersテーブルのユーザーID(id)を取得
  //   const Response = await fetch('/api/users/tenant/email', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ email: email }),
  //   });
  //   if (Response.ok) {
  //     const jsonResponse = await Response.json();
  //     setUserData(jsonResponse.data);
  //     console.log('userData', userData);
  //   }
  // }
  async function getCars() {
    const response = await fetch('/api/allCarports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPosition: location }),
    });
    if (response.ok) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const jsonResponse = await response.json();
      setAllCarPorte(jsonResponse.data);
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

  //位置情報取得、ステートに保持
  function getGeolocation(calledTiming: string | null): void {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
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

  useEffect(() => {
    (async () => {
      await getGeolocation('first');
      const response = await fetch('/api/distance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPosition: location }),
      });
      if (response.ok) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const jsonResponse = await response.json();
        setDistanceData(jsonResponse.data);
      }
    })();
  }, []);

  return (
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
              await getOwnerData(emailAddress);
              if (userData.length !== 0) navigate('/ownerSelectCar');
              navigate('/demoSelectCar');
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
              await getCars();
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
  );
};

export default SelectUserOrOwner;
