import { MdOutlineArrowBackIos } from 'react-icons/md';
import { Box, Container, Text } from '@yamada-ui/react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  isOwnerMode: boolean;
  routePath: string | '';
  headerTitle: string | '';
}

// ヘッダーのpropsの説明
// ・isOwnerMode:オーナー画面の時は true を、テナント画面の時は false を入れる
// ・isOwnerMode:オーナー画面の時は navigate先のパスの文字列 を 、テナント画面の時は '' を入れる
// ・headerTitle:オーナー画面の時は '' を、テナント画面の時は 'ヘッダーのタイトルの文字列' を入れる

export default function Header({
  isOwnerMode,
  routePath,
  headerTitle,
}: HeaderProps) {
  const navigate = useNavigate();
  return (
    <>
      <Container
        h="50px"
        backgroundColor="#F3F7F7"
        borderBottom="1px solid #D9D9D9"
      >
        {isOwnerMode ? (
          <Box fontSize="2xl">
            <MdOutlineArrowBackIos onClick={() => navigate(`/${routePath}`)} />
          </Box>
        ) : (
          <Text
            sx={{
              fontSize: 'xl',
              fontWeight: 'bold',
              textAlign: 'center',
            }}
          >
            {headerTitle}
          </Text>
        )}
      </Container>
    </>
  );
}
