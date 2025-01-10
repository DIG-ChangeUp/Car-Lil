import { Loading, Container, Text, Flex } from '@yamada-ui/react';

const MyLoading = () => {
  return (
    <Flex h="100vh" w="100vw" justify="center" align="center">
      <Container centerContent>
        <Loading fontSize="4xl" />
        <Text>Loading ...</Text>
      </Container>
    </Flex>
  );
};

export default MyLoading;
