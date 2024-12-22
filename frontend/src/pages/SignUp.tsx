import React from 'react';
import { useState } from 'react';

import { auth } from '../components/auth/firebase.ts';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
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
import GoogleAuthButton from '../components/auth/GoogleAuthButton.tsx';
import { SubmitHandler, useForm } from 'react-hook-form';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');

  const handleSingUpSubmit = async (data: Data): Promise<void> => {
    const email: string = data.email;
    const password: string = data.password;
    console.log('email: ', email, ' / password: ', password);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // const userCredential = await createUserWithEmailAndPassword(
      //   auth,
      //   email,
      //   password
      // );
      //console.log('User created:', userCredential.user);
      navigate('/map');
    } catch (error) {
      console.error('Error creating user:', error);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setError(error.message);
    }
  };

  type Data = { name: string; password: string; email: string };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Data>();

  const onSubmit: SubmitHandler<Data> = async (data) => {
    console.log('submit:', data);
    await handleSingUpSubmit(data);
  };

  const backLoginPage = () => {
    navigate('/');
  };

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
            SinUp
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
            onClick={backLoginPage}
          >
            ログインへ戻る
          </Button>
        </VStack>
      </Center>
    </Container>
  );
};

export default SignUp;
