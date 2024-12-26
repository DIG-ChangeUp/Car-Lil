import { MdOutlineArrowBackIos } from 'react-icons/md';
import { Box, Container, Text } from '@yamada-ui/react';

interface HeaderProps {
  isOwnerMode: boolean;
  headerTitle: string | '';
}

// ヘッダーのpropsの説明
// ・isOwnerMode:オーナー画面の時は true 、テナント画面の時は false を入れる
// ・headerTitle:オーナー画面の時は '' 、テナント画面の時は 'ヘッダーのタイトルの文字列' を入れる

export default function Header({ isOwnerMode, headerTitle }: HeaderProps) {
  return (
    <>
      {isOwnerMode ? (
        <Container h="100px" backgroundColor="#F3F7F7">
          <Box fontSize="2xl" sx={{ paddingTop: '35' }}>
            <MdOutlineArrowBackIos />
          </Box>
        </Container>
      ) : (
        <Container h="100px" backgroundColor="#F3F7F7">
          <Text
            sx={{
              fontSize: '2xl',
              fontWeight: 'bold',
              textAlign: 'center',
              paddingTop: 'lg',
            }}
          >
            {headerTitle}
          </Text>
        </Container>
      )}
    </>
  );
}
