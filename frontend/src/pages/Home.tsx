import { useNavigate } from 'react-router-dom';
import { Box, Container, HStack, Text } from '@yamada-ui/react';
import { GrUserAdmin, GrUser } from 'react-icons/gr';
import {
  userEmailAtom,
  userDataAtom,
  locationAtom,
  diffDistanceAtom,
  isOpenInfoWindowAtom,
} from '../components/atom/globalState.ts';
import { useAtom, useSetAtom } from 'jotai/index';
import { auth } from '../components/auth/firebase.ts';
import { useEffect, useState } from 'react';
import { ILocation } from '../../globals';
import { UseAuthContext } from '../components/AuthContext.tsx';
import MyLoading from '../components/MyLoading.tsx';

const Home = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { authUser } = UseAuthContext();
  //ログイン時に取得したメールアドレスをユーザーデータ取得に利用
  const [emailAddress, setEmailAddress] = useAtom(userEmailAtom);
  const setUserData = useSetAtom(userDataAtom);
  const [currLocation, setCurrLocation] = useAtom(locationAtom);
  const setDiffDistance = useSetAtom(diffDistanceAtom);
  const setIsOpenInfoWindow = useSetAtom(isOpenInfoWindowAtom);

  // userが存在しない場合にリダイレクト
  useEffect(() => {
    if (!authUser) {
      navigate('/login');
    } else {
      setEmailAddress(authUser.email);
      (async () => {
        await getOwnerData(authUser.email);
      })();
    }
  }, [authUser, navigate]);

  // ページを開いた時にオーナーとしてのデータを取得
  useEffect(() => {
    getGeolocation();
  }, []);

  // navigateによるリダイレクトが完了するまで何もレンダリングしない
  if (!authUser) return null;

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

  //メールアドレスからオーナーに紐づくすべてのデータを取得
  async function getOwnerData(email: string | null) {
    if (!email) return;
    //emailからusersテーブルのユーザーID(id)を取得
    const response = await fetch('/api/users/owner/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email }),
    });
    if (response.ok) {
      const jsonResponse = await response.json();
      setUserData(jsonResponse.data);
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
  function getGeolocation(): void {
    setIsLoading(true);
    const options = {
      enableHighAccuracy: false, // 精度の高い位置精度の場合はtrue ただし通信が遅いのでfalseを採用
      timeout: 5000, // 位置情報が取得できない場合のタイムアウト（ms）、デフォルトはinfinityなので取得できるまでになる
      maximumAge: 30000, // 設定ms前までの取得値を利用する
    };
    function success(pos: GeolocationPosition) {
      const crd = pos.coords;
      const latestLocation = { lat: crd.latitude, lng: crd.longitude };
      setCurrLocation(latestLocation);
      calcDistance(currLocation, latestLocation);
      setIsLoading(false);
    }
    function error(err: GeolocationPositionError) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
      setIsLoading(false);
    }
    navigator.geolocation.getCurrentPosition(success, error, options);
  }

  function calcDistance(prev: ILocation | null, latest: ILocation | null) {
    const R = Math.PI / 180;
    if (!prev || !latest) return;

    let lat1 = prev.lat;
    let lat2 = latest.lat;
    let lng1 = prev.lng;
    let lng2 = latest.lng;
    lat1 *= R;
    lng1 *= R;
    lat2 *= R;
    lng2 *= R;

    // 結果は四捨五入された小数点第2位までをmで返す
    let calcDistance =
      6371 *
      Math.acos(
        Math.cos(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1) +
          Math.sin(lat1) * Math.sin(lat2)
      ) *
      1000;

    calcDistance = parseFloat(calcDistance.toFixed(2));
    setDiffDistance(calcDistance);
  }

  if (!emailAddress) {
    return <></>;
  }

  if (isLoading) return <MyLoading />;

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Text
        sx={{
          fontSize: '6xl',
          textAlign: 'center',
          mt: '3xl',
          mb: 'lg',
          pl: 5,
        }}
      >
        TOP
      </Text>
      <HStack
        sx={{
          h: 'max-content',
          textAlign: 'center',
          mx: 'auto',
        }}
      >
        <Box
          sx={{
            w: '40',
            aspectRatio: '1/1',
            bg: '#F3F7F7',
            pt: 'xl',
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
            w: '40',
            aspectRatio: '1/1',
            bg: '#F3F7F7',
            pt: 'xl',
            rounded: 'xl',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          }}
          onClick={async () => {
            await fetchUserData(emailAddress);
            setIsOpenInfoWindow(false);
            navigate('/map');
          }}
        >
          <GrUser size="50" />
          <Text sx={{ fontSize: '2xl' }}>ユーザー</Text>
        </Box>
      </HStack>
      <Box
        sx={{
          w: 350,
          h: 55,
          fontSize: 'xl',
          bg: '#289FAB',
          color: '#FEFEFE',
          mx: 'auto',
          mt: 140,
          textAlign: 'center',
          lineHeight: '55px',
          rounded: '10px',
        }}
        onClick={() => handleLogout()}
      >
        サインアウト
      </Box>
    </Container>
  );
};

export default Home;
