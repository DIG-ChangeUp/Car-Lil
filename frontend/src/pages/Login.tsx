import { useNavigate } from 'react-router-dom';
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import GoogleAuthButton from '../components/auth/GoogleAuthButton.tsx';

import { SubmitHandler, useForm } from 'react-hook-form';

import {
  Button,
  Center,
  FormControl,
  Input,
  InputGroup,
  VStack,
  PasswordInput,
  Separator,
  HStack,
  Text,
  Container,
} from '@yamada-ui/react';
import { useEffect, useState } from 'react';
// import {
//   userDataAtom,
//   shareCarsDataAtom,
//   shareDataAtom,
// } from '../components/atom/globalState.ts';
// import { useAtom } from 'jotai';
// import { shareCars } from './sampleData.tsx';

const Login = () => {
  // login ----------------------------
  //認証時のemailアドレスを保持
  // const [emailAddress, setEmailAddress] = useAtom(userDataAtom);
  //シェアカーを保持
  // const [shareCarsData, setShareCarsData] = useAtom(shareCarsDataAtom);
  //shareテーブルに登録するデータを保持
  // const [shareData, setShareData] = useAtom(shareDataAtom);

  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const auth = getAuth(); // Firebase Auth インスタンスを取得

  const handleLoginSubmit = async (data: Data) => {
    const email: string = data.email;
    const password: string = data.password;
    console.log('email: ', email, ' / password: ', password);
    // setEmailAddress({ email });
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

  // ---------------------------------

  type Data = { name: string; password: string; email: string };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Data>();

  const onSubmit: SubmitHandler<Data> = async (data) => {
    console.log('submit:', data);
    await handleLoginSubmit(data);
  };

  const RegistrationNewUser = () => {
    navigate('/signup');
  };

  // ログイン状態なら、画面遷移させる
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/map');
      }
    });
  }, []);

  // //オーナーのユーザーIDからシェアカーデータを取得
  // async function getShareCarsData(email: string) {
  //   //emailからusersテーブルのユーザーID(id)を取得
  //   const usersResponse = await fetch('/api/users/email', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ email: email }),
  //   });
  //   if (usersResponse.ok) {
  //     const [jsonUser] = await usersResponse.json();
  //     const userId = jsonUser.id;
  //     //usersテーブルから取得したユーザーIDでシェアカー情報を取得
  //     const shareCarsResponse = await fetch('/api/shareCars/userId', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify({ userId: userId }),
  //     });
  //     if (shareCarsResponse.ok) {
  //       const jsonShareCars = await shareCarsResponse.json();
  //       setShareCarsData(jsonShareCars);
  //     }
  //   }
  // }
  // getShareCarsData('mochiokaneda@mail.com');

  return (
    <Container centerContent margin="0 auto">
      <Center padding={'10'} height="calc(100vh - 100px)" maxWidth="100vw">
        <VStack as="form" onSubmit={handleSubmit(onSubmit)}>
          <Text fontSize="5xl" fontWeight="extrabold" textAlign="center">
            CAR-LIL
          </Text>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <FormControl
            marginTop="6"
            isInvalid={!!errors.email}
            label="Email"
            errorMessage={errors.email ? errors.email.message : undefined}
          >
            <InputGroup>
              <Input
                type="email"
                placeholder="your-address@example.com"
                {...register('email', {
                  required: { value: true, message: 'E-mail is required.' },
                })}
              />
            </InputGroup>
          </FormControl>

          <FormControl
            isInvalid={!!errors.password}
            label="Password"
            errorMessage={errors.password?.message}
            // errorMessage={errors.name ? errors.name.message : undefined}
          >
            <PasswordInput
              variant="outline"
              placeholder="your password"
              {...register('password', {
                required: { message: 'Password is required.', value: true },
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
            />
          </FormControl>

          <Button type="submit" marginTop="6">
            Login
          </Button>
          <HStack marginTop="6">
            <Separator width="40" />
            <Text fontSize="2xs" width="60" textAlign="center">
              OR CONTINUE WITH
            </Text>
            <Separator width="40" />
          </HStack>

          <GoogleAuthButton />
          <Button
            colorScheme="link"
            marginTop="8"
            variant="link"
            onClick={RegistrationNewUser}
          >
            新規登録
          </Button>
        </VStack>
      </Center>
    </Container>
  );
};

export default Login;
