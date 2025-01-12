import {
  Button,
  Card,
  Container,
  HStack,
  ScrollArea,
  Spacer,
  Text,
  VStack,
} from '@yamada-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAtomValue } from 'jotai/index';
import {
  distanceDataAtom,
  locationAtom,
  prevLocationAtom,
} from './atom/globalState.ts';

const DistanceCardList = () => {
  const currLocation = useAtomValue(locationAtom);
  const prevLocation = useAtomValue(prevLocationAtom);
  const distanceData = useAtomValue(distanceDataAtom);

  const navigate = useNavigate();

  function handleNavigate() {
    // TODO: パスパラメータを修正する
    navigate('/emptyData/2/2');
  }

  console.log('distanceData: ', distanceData);
  console.log('prevLocation: ', prevLocation);
  console.log('currLocation: ', currLocation);

  if (distanceData.length < 1) return;
  return (
    <Container marginTop="40px">
      <ScrollArea h="calc(100vh - 80px - 90px)" w="100%">
        <Container>
          {distanceData.map((data, i) => {
            return (
              <Card
                marginTop="3px"
                key={i}
                sx={{
                  padding: '3',
                }}
                backgroundColor="#F3F7F7"
              >
                <HStack>
                  <VStack>
                    <Text fontSize="14px">{data.carData.address}</Text>
                    <HStack>
                      <Text>{data.carData.car_name}</Text>
                      <Spacer />
                      <Text>{data.distance.text}</Text>
                    </HStack>
                  </VStack>
                  <Button
                    colorScheme="primary"
                    shadow="2px 4px 10px -1px #777777"
                    rounded="full"
                    w="50px"
                    h="46px"
                    onClick={handleNavigate}
                  >
                    予約
                  </Button>
                </HStack>
              </Card>
            );
          })}
        </Container>
      </ScrollArea>
    </Container>
  );
};

export default DistanceCardList;
