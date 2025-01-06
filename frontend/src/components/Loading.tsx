import PulseLoader from 'react-spinners/ClipLoader';
import { Center } from '@yamada-ui/react';

const Loading = () => {
  return (
    <Center h="100vh" w="100vw">
      <PulseLoader />
      <h1>Loading ...</h1>
    </Center>
  );
};

export default Loading;
