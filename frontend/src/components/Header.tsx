import { MdOutlineArrowBackIos } from 'react-icons/md';
import { Box, Container } from '@yamada-ui/react';

export default function Header() {
  return (
    <Container h="100px" backgroundColor="#F3F7F7">
      <Box fontSize="2xl" sx={{ paddingTop: '35' }}>
        <MdOutlineArrowBackIos />
      </Box>
    </Container>
  );
}
