import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';

import GoogleAuthButton from '../components/auth/GoogleAuthButton.tsx';
import { useSetAtom } from 'jotai/index';
import { userEmailAtom } from '../components/atom/globalState.ts';

import { auth } from '../components/auth/firebase.ts';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {
  Button,
  Center,
  Container,
  FormControl,
  HStack,
  Input,
  InputGroup,
  PasswordInput,
  Separator,
  Text,
  VStack,
} from '@yamada-ui/react';

const SignUp = () => {
  const setEmailAddress = useSetAtom(userEmailAtom);

  const navigate = useNavigate();
  const [error, setError] = useState<string>('');

  const handleSingUpSubmit = async (data: Data): Promise<void> => {
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

  type Data = { name: string; password: string; email: string };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Data>();

  const onSubmit: SubmitHandler<Data> = async (data) => {
    await handleSingUpSubmit(data);
  };

  return (
    <Container centerContent margin="0 auto">
      <Center padding={'10'} height="calc(100vh - 100px)" maxWidth="100vw">
        <VStack as="form" onSubmit={handleSubmit(onSubmit)}>
          <Text fontSize="5xl" fontWeight="extrabold" textAlign="center">
            CAR-LIL
          </Text>
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

          {error && (
            <p style={{ color: 'red', textAlign: 'center' }}>
              入力されたEmailアドレスは
              <br />
              既に登録されています
            </p>
          )}

          <Button type="submit" marginTop="6">
            SignUp
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
            onClick={() => navigate('/login')}
          >
            ログインへ戻る
          </Button>
        </VStack>
      </Center>
    </Container>
  );
};

export default SignUp;
