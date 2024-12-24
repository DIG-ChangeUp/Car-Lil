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
import React from 'react';

type DistanceCardListProps = {
  distanceData: DistanceData[];
};

type DistanceData = {
  routes: Route[];
};

type Route = {
  legs: Leg[];
};

type Leg = {
  end_address: string;
  distance: Distance;
};

type Distance = {
  text: string;
  value: number;
};

const DistanceCardList: React.FC<DistanceCardListProps> = ({
  distanceData,
}) => {
  return (
    <Container marginTop="40px">
      <ScrollArea h="calc(100vh - 80px - 90px)" w="100%">
        <Container>
          {distanceData.map((distance, index) => {
            return (
              <Card
                marginTop="3px"
                key={index + 1}
                sx={{
                  padding: '3',
                }}
                backgroundColor="#F3F7F7"
              >
                <HStack>
                  <VStack>
                    <Text fontSize="14px">
                      {
                        distance.routes[0].legs[0].end_address
                          .replace('日本、', '')
                          .split(' ')[1]
                      }
                    </Text>
                    <HStack>
                      {/*eslint-disable-next-line @typescript-eslint/ban-ts-comment*/}
                      {/*@ts-ignore*/}
                      <Text>{distance.carData.car_name}</Text>
                      <Spacer />
                      <Text>{distance.routes[0].legs[0].distance.text}</Text>
                    </HStack>
                  </VStack>
                  <Button rounded="full" w="50px" h="46px">
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
