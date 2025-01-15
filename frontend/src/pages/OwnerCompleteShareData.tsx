import Footer from '../components/Footer.tsx';
import { Box, Button, Center, Text, VStack } from '@yamada-ui/react';
import { MdOutlineCheckCircle } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { UseAuthContext } from '../components/AuthContext.tsx';

export default function OwnerCompleteShareData() {
  const navigate = useNavigate();

  function handlerClickTop() {
    navigate('/ownerSelectDay');
  }

  const { authUser } = UseAuthContext();

  // userが存在しない場合にリダイレクト
  useEffect(() => {
    if (!authUser) navigate('/login');
  }, [authUser, navigate]);

  // navigateによるリダイレクトが完了するまで何もレンダリングしない
  if (!authUser) return null;

  return (
    <>
      <Center
        py="10"
        px="4"
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
              貸出日登録が完了しました
            </Text>
          </Box>

          <Box>
            <Text align={'center'}>
              MVP開発であるため
              <br />
              実際には登録されません
            </Text>
          </Box>

          <Button h="45" bg="primary" color="#F4F4F5" onClick={handlerClickTop}>
            貸出設定に戻る
          </Button>
        </VStack>
      </Center>
      <Footer isOwnerMode={true} activeMenu={-1} />
    </>
  );
}
