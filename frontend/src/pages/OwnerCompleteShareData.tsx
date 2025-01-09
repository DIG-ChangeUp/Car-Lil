import Header from '../components/Header.tsx';
import Footer from '../components/Footer.tsx';
import { Box, Button, Center, Text, VStack } from '@yamada-ui/react';
import { MdOutlineCheckCircle } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export default function OwnerCompleteShareData() {
  const navigate = useNavigate();

  function handlerClickTop() {
    navigate('/ownerSelectDay');
  }

  return (
    <>
      <Header isOwnerMode={true} headerTitle={''} />

      <VStack w={'100%'} h="calc(100vh - 180px)" px={'6'} py={'2'}>

        <Center mt={48} mb={9}>
          <MdOutlineCheckCircle fontSize="130" color="#289FAB"/>
        </Center>

        <Box mb={9}>
          <Text fontWeight="bold" align={'center'}>
            貸出日登録が完了しました。
          </Text>
        </Box>

        <Box>
          <Text align={'center'}>
            MVP開発であるため<br/>実際には登録されません。
          </Text>
        </Box>

        <Button h={'4em'} bg={'#289FAB'} color={'#F4F4F5'} onClick={handlerClickTop}>
          トップへ戻る
        </Button>

      </VStack>

      <Footer isOwnerMode={true} activeMenu={-1} />
    </>
  );
}
