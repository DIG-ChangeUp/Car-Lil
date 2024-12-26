import Header from '../components/Header.tsx';
import Footer from '../components/Footer.tsx';
import {
  Box,
  Button,
  Center,
  Container,
  HStack,
  Separator,
  Spacer,
  Switch,
  Text,
} from '@yamada-ui/react';
import { useNavigate } from 'react-router-dom';

const OwnerSelectTime = () => {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <Container h="calc(100vh - 180px)">
        <HStack justifyContent="start" marginTop="6" px="6">
          <Box rounded="full" bg="yellow.500" px="3" py="1">
            12/8
          </Box>
          <Box rounded="full" bg="yellow.500" px="3" py="1">
            12/8
          </Box>
          <Box rounded="full" bg="yellow.500" px="3" py="1">
            12/8
          </Box>
        </HStack>
        <Center>
          <Container
            w="sm"
            h="400"
            bg="blackAlpha.50"
            rounded="20"
            marginTop="6"
          >
            <HStack justifyContent="space-between">
              <Text>終日</Text>
              <Spacer />
              <Switch></Switch>
            </HStack>
            <Separator />
            <HStack justifyContent="space-between">
              <Text>開始</Text>
              <Spacer />
              <Text bg="white" px="3" py="1" rounded="10">
                18:00
              </Text>
            </HStack>
            <Separator />
            <Box h="200" bg="white">
              sample
            </Box>
            <HStack justifyContent="space-between">
              <Text>終了</Text>
              <Spacer />
              <Text bg="white" px="3" py="1" rounded="10">
                18:00
              </Text>
            </HStack>
          </Container>
        </Center>
        <Button marginTop="6" onClick={() => navigate('/ownerConfirmation')}>
          確認画面に進む
        </Button>
      </Container>
      <Footer isOwnerMode={true} activeMenu={-1} />
    </>
  );
};

export default OwnerSelectTime;
