import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';

import GoogleAuthButton from '../components/auth/GoogleAuthButton.tsx';
import { useSetAtom } from 'jotai';
import { userEmailAtom } from '../components/atom/globalState.ts';
import { ILoginData } from '../../globals';

import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';

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

const Login = () => {
  const setEmailAddress = useSetAtom(userEmailAtom);
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const auth = getAuth(); // Firebase Auth インスタンスを取得

  const handleLoginSubmit = async (data: ILoginData) => {
    const email: string = data.email;
    const password: string = data.password;
    try {
      await signInWithEmailAndPassword(auth, email, password);

      setEmailAddress(email);
      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        console.error('ログインエラー:', error);
        setError(error.message);
      } else {
        console.error('予期しないログインエラー:', error);
      }
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginData>();

  const onSubmit: SubmitHandler<ILoginData> = async (data) => {
    await handleLoginSubmit(data);
  };

  // ログイン状態の場合、ユーザーの手間を減らすために画面遷移
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmailAddress(user.email);
        navigate('/');
      }
    });
  }, []);

  return (
    <Center p="10" h="100vh" minW="300px" maxW="400px" m="0 auto">
      <VStack as="form" onSubmit={handleSubmit(onSubmit)}>
        <Text
          fontSize="5xl"
          fontWeight="extrabold"
          textAlign="center"
          color="primary"
        >
          CAR-LIL
        </Text>
        <FormControl
          mt="6"
          isInvalid={!!errors.email}
          label="Email"
          errorMessage={errors.email ? errors.email.message : undefined}
        >
          <InputGroup>
            <Input
              type="email"
              placeholder="your address@example.com"
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

        {error && (
          <p style={{ color: 'red' }}>Emailまたは、Passwordが間違っています</p>
        )}

        <Button type="submit" mt="6" bg="primary" color="#F4F4F5">
          Login
        </Button>
        <HStack mt="6">
          <Separator w="40" />
          <Text fontSize="2xs" w="60" textAlign="center">
            OR CONTINUE WITH
          </Text>
          <Separator w="40" />
        </HStack>

        <GoogleAuthButton />
        <Button
          h="45"
          colorScheme="link"
          mt="8"
          variant="link"
          onClick={() => navigate('/signup')}
        >
          新規登録
        </Button>
      </VStack>
    </Center>
  );
};

export default Login;
