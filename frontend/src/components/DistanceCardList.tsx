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
import { allCarPorteAtom } from './atom/globalState.ts';

const DistanceCardList = () => {
  const allCarPorte = useAtomValue(allCarPorteAtom);

  const navigate = useNavigate();

  function handleNavigate(carport_id: number) {
    navigate(`/emptyData/${carport_id}/${carport_id}`);
  }

  if (allCarPorte.length < 1) return;
  return (
    <Container marginTop="40px">
      <ScrollArea
        h="calc(100vh - 80px - 90px)"
        minW="300px"
        maxW="400px"
        m="0 auto"
      >
        <Container>
          {allCarPorte.map((data, i) => {
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
                    <Text fontSize="14px">{data.address}</Text>
                    <HStack>
                      <Text>{data.car_name}</Text>
                      <Spacer />
                      <Text>{`${parseFloat(data.distance.toFixed(1))} km`}</Text>
                    </HStack>
                  </VStack>
                  <Button
                    colorScheme="primary"
                    shadow="2px 4px 10px -1px #777777"
                    rounded="full"
                    w="50px"
                    h="46px"
                    onClick={() => handleNavigate(data.carport_id)}
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
