import { MdOutlineArrowBackIos } from 'react-icons/md';
import { Box, HStack, Text } from '@yamada-ui/react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  routePath: string | '';
  headerTitle: string | '';
}

// ヘッダーのpropsの説明
// ・isOwnerMode:オーナー画面の時は true を、テナント画面の時は false を入れる
// ・isOwnerMode:オーナー画面の時は navigate先のパスの文字列 を 、テナント画面の時は '' を入れる
// ・headerTitle:オーナー画面の時は '' を、テナント画面の時は 'ヘッダーのタイトルの文字列' を入れる

export default function Header({ routePath, headerTitle }: HeaderProps) {
  const navigate = useNavigate();
  return (
    <>
      <Box bg="#F3F7F7"
           h="50px"
           pt={'1'}
           pb={'8'}
           fontSize="2xl"
           borderBottom="1px solid #D9D9D9">
        <HStack
          minW="300px"
          maxW="400px"
          margin={'0 auto'}
        >
          <Box pt={'1'} w={'10%'} >
            <MdOutlineArrowBackIos onClick={() => navigate(`/${routePath}`)} />
          </Box>

          <Box w={'80%'}>
            <Text fontSize="xl" fontWeight="bold" textAlign="center">
              {headerTitle}
            </Text>
          </Box>
          <Box w={'10%'}>

          </Box>
        </HStack>
      </Box>
    </>
  );
}
