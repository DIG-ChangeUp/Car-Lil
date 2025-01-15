import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';

import GoogleAuthButton from '../components/auth/GoogleAuthButton.tsx';
import { useSetAtom } from 'jotai/index';
import { userEmailAtom } from '../components/atom/globalState.ts';
import { ILoginData } from '../../globals';

import { auth } from '../components/auth/firebase.ts';
import { createUserWithEmailAndPassword } from 'firebase/auth';

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

const SignUp = () => {
  const setEmailAddress = useSetAtom(userEmailAtom);
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');

  const handleSignUpSubmit = async (data: ILoginData): Promise<void> => {
    const email: string = data.email;
    const password: string = data.password;

    try {
      await createUserWithEmailAndPassword(auth, email, password);

      setEmailAddress(email);
      navigate('/');
    } catch (error) {
      if (error instanceof Error) {
        console.error('サインアップエラー:', error);
        setError(error.message);
      } else {
        console.error('予期しないサインアップエラーエラー:', error);
      }
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginData>();

  const onSubmit: SubmitHandler<ILoginData> = async (data) => {
    await handleSignUpSubmit(data);
  };

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
          <p style={{ color: 'red', textAlign: 'center' }}>
            入力されたEmailアドレスは
            <br />
            既に登録されています
          </p>
        )}

        <Button type="submit" mt="6" bg="primary" color="#F4F4F5">
          SignUp
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
          colorScheme="link"
          mt="8"
          variant="link"
          onClick={() => navigate('/login')}
        >
          ログインへ戻る
        </Button>
      </VStack>
    </Center>
  );
};

export default SignUp;
