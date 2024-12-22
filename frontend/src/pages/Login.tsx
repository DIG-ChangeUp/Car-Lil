import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import GoogleAuthButton from '../components/auth/GoogleAuthButton.tsx';
import { getGeolocation } from '../components/geolocation.ts';

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
} from '@yamada-ui/react';
import { useEffect, useState } from 'react';
import { useSetAtom } from 'jotai/index';
import { locationAtom } from '../components/atom/globalState.ts';

const Login = () => {
  const setLocation = useSetAtom(locationAtom);
  // login ----------------------------

  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const auth = getAuth(); // Firebase Auth インスタンスを取得

  const handleLoginSubmit = async (data: Data) => {
    const email: string = data.email;
    const password: string = data.password;
    console.log('email: ', email, ' / password: ', password);

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

  // 現在位置取得
  useEffect(() => {
    const userPosition = getGeolocation();
    setLocation(userPosition);
  }, []);

  return (
    <Center padding={'10'} height="calc(100vh - 100px)">
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
  );
};

export default Login;
