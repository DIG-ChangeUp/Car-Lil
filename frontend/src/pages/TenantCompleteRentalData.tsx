import Footer from '../components/Footer.tsx';
import { Box, Button, Center, Text, VStack } from '@yamada-ui/react';
import { MdOutlineCheckCircle } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { isOpenInfoWindowAtom } from '../components/atom/globalState.ts';
import { useSetAtom } from 'jotai/index';

export default function TenantCompleteRentalData() {
  const navigate = useNavigate();
  const setIsOpenInfoWindow = useSetAtom(isOpenInfoWindowAtom);

  function handlerClickTop() {
    setIsOpenInfoWindow(false);
    navigate('/map');
  }

  return (
    <>
      <VStack w={'100%'} h="calc(100vh - 80px)" px={'6'} py={'2'}>
        <Center mt={100} mb={5}>
          <MdOutlineCheckCircle fontSize="130" color="#289FAB" />
        </Center>

        <Box mb={9}>
          <Text fontWeight="bold" align={'center'}>
            レンタル予約が完了しました
          </Text>
        </Box>

        <Box>
          <Text align={'center'}>
            MVP開発であるため
            <br />
            実際には予約はされません
          </Text>
        </Box>

        <Button
          h={'45'}
          bg={'#289FAB'}
          color={'#F4F4F5'}
          onClick={handlerClickTop}
        >
          貸出設定に戻る
        </Button>
      </VStack>

      <Footer isOwnerMode={false} activeMenu={-1} />
    </>
  );
}
