import { Button, Center, Text, VStack } from '@yamada-ui/react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate('/');
  };

  return (
    <Center height="90vh" margin="10">
      <VStack>
        <Text fontSize="3xl" fontWeight="bold" textAlign="center">
          404 NOT FOUND
        </Text>
        <Button onClick={handleBackHome} marginTop="6">
          Homeへ戻る
        </Button>
      </VStack>
    </Center>
  );
};

export default NotFound;
