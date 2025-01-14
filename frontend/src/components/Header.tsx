import { MdOutlineArrowBackIos } from 'react-icons/md';
import { Box, Container, HStack, Spacer, Text } from '@yamada-ui/react';
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
          <HStack>
            <Box fontSize="2xl" w="24px" h="36px">
              <MdOutlineArrowBackIos
                onClick={() => navigate(`/${routePath}`)}
              />
            </Box>
            <Spacer />
            <Text
              sx={{
                fontSize: 'xl',
                fontWeight: 'bold',
                textAlign: 'center',
              }}
            >
              {headerTitle}
            </Text>
            <Spacer />
            <Box fontSize="2xl" w="24px" h="36px"></Box>
          </HStack>
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
