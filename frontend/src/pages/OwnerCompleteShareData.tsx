import Header from '../components/Header.tsx';
import Footer from '../components/Footer.tsx';
import { Box, Button, Container, Text } from '@yamada-ui/react';
import { MdOutlineCheckCircle } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export default function OwnerCompleteShareData() {
  const navigate = useNavigate();
  return (
    <>
      <Header isOwnerMode={false} routePath={'notFound'} headerTitle={''} />
      <Container
        sx={{
          h: 'calc(100vh - 130px)',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box>
          <MdOutlineCheckCircle fontSize="130" color="#289FAB" />
          <br></br>
          <br></br>
          <Text fontWeight="bold">貸出日設定が完了しました</Text>
          <br></br>
          <br></br>
          <br></br>

          <Button
            sx={{
              w: '230',
              h: '55',
              fontSize: '2xl',
              backgroundColor: '#289FAB',
              color: '#FEFEFE',
            }}
            onClick={() => {
              navigate('/');
            }}
          >
            トップへ戻る
          </Button>
        </Box>
      </Container>
      <Footer isOwnerMode={true} activeMenu={-1} />
    </>
  );
}
