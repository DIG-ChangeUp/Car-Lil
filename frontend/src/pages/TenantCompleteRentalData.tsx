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
      <Center
        p="10"
        h="calc(100vh - 80px)"
        minW="300px"
        maxW="400px"
        m="0 auto"
      >
        <VStack>
          <Center mt={90} mb={5}>
            <MdOutlineCheckCircle fontSize="130" color="#289fab" />
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

          <Button h="45" bg="primary" color="#F4F4F5" onClick={handlerClickTop}>
            予約設定に戻る
          </Button>
        </VStack>
      </Center>

      <Footer isOwnerMode={false} activeMenu={-1} />
    </>
  );
}
