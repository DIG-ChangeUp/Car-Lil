import { SubmitHandler, useForm } from 'react-hook-form';
import { FcGoogle } from 'react-icons/fc';

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

const NewLogin = () => {
  type Data = { name: string; password: string; email: string };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Data>();

  const onSubmit: SubmitHandler<Data> = (data) => {
    console.log('submit:', data);
  };

  console.log('watch:', watch());

  return (
    <Center padding={'10'} height="calc(100vh - 100px)">
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

        <Button leftIcon={<FcGoogle />} variant="outline">
          Googleでログイン
        </Button>
        <Button colorScheme="link" marginTop="8" variant="link">
          新規登録
        </Button>
      </VStack>
    </Center>
  );
};

export default NewLogin;
