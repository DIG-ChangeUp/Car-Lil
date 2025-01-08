import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, HStack, Text } from '@yamada-ui/react';
import { GrUserAdmin, GrUser } from 'react-icons/gr';
import {
  userEmailAtom,
  userDataAtom,
  allCarPorteAtom,
  locationAtom,
  prevLocationAtom,
  diffDistanceAtom,
} from '../components/atom/globalState.ts';
import { useAtom, useSetAtom } from 'jotai/index';
import { auth } from '../components/auth/firebase.ts';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { ILocation } from '../components/atom/globalState.ts';

const Home = () => {
  const navigate = useNavigate();
  //ログイン時に取得したメールアドレスをユーザーデータ取得に利用
  const [emailAddress, setEmailAddress] = useAtom(userEmailAtom);

  //ユーザーデータを保持
  const setUserData = useSetAtom(userDataAtom);
  const setAllCarPorte = useSetAtom(allCarPorteAtom);
  const [currLocation, setCurrLocation] = useAtom(locationAtom);
  const setPrevLocation = useSetAtom(prevLocationAtom);
  const setDiffDistance = useSetAtom(diffDistanceAtom);

  // ページを開いた時にオーナーとしてのデータを取得
  useEffect(() => {
    (async () => {
      getGeolocation();
      await checkLogin();
      await getOwnerData(emailAddress);
    })();
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
    }
  }

  async function getCars() {
    if (!currLocation) return;
    const response = await fetch('/api/allCarports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPosition: currLocation }),
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
      navigate('/login');
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.log('ログアウト エラー');
    }
  };

  //位置情報取得、ステートに保持
  function getGeolocation(): void {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 30000,
    };
    function success(pos: GeolocationPosition) {
      const crd = pos.coords;
      const latestLocation = { lat: crd.latitude, lng: crd.longitude };
      if (currLocation) {
        setPrevLocation(currLocation);
        setCurrLocation(latestLocation);
      } else {
        setCurrLocation(latestLocation);
      }
      calcDistance(currLocation, latestLocation);
    }
    function error(err: GeolocationPositionError) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
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
                w: 40,
                h: 40,
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
                w: '40',
                h: '40',
                backgroundColor: '#F3F7F7',
                paddingTop: 'xl',
                rounded: 'xl',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              }}
              onClick={async () => {
                await fetchUserData(emailAddress);
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
              marginY: 90,
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
