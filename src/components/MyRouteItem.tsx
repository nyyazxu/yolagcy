import React, {useState} from 'react';
import {Box, Button, HStack, Image, Pressable, Text, VStack} from 'native-base';
import {BASE_URL} from '../api/network';
import {formatDate} from '../utils';

interface Props {
  _id: string;
  driver: {name: string; car: string; carImage: string};
  date: any;
  cost: number;
  from: string;
  to: string;
  onPress: (id: string, isDelete?: boolean) => void;
}

const MyRouteItem = ({_id, driver, date, cost, from, to, onPress}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <Pressable w="100%" mb="15px">
      <HStack bgColor="#F3F3F3" borderRadius={20}>
        <VStack space="9px" flex={1} padding="15px">
          <VStack flex={1} justifyContent="space-between">
            <Text fontSize="12px" fontWeight="medium">
              {formatDate(date)}
            </Text>
            <Text fontSize="12px" fontWeight="medium">
              Nyrh:{' '}
              {cost && cost === -1
                ? 'Gürleşmeli'
                : cost === 0
                ? 'Mugt'
                : `${cost} TMT`}
            </Text>
            <Text fontSize="12px" fontWeight="medium">
              {`${from || ''} - ${to || ''}`}
            </Text>
            <Text fontSize="12px" fontWeight="semibold" color="#DE8B05">
              {`${driver?.car}`}
            </Text>
          </VStack>
          <HStack space={2}>
            <Button
              size="sm"
              colorScheme="blueGray"
              fontSize="15px"
              fontWeight="semibold"
              onPress={() => {
                onPress(_id);
              }}>
              Üýtget
            </Button>
            <Button
              isLoading={loading}
              size="sm"
              colorScheme="red"
              fontSize="15px"
              fontWeight="semibold"
              onPress={async () => {
                setLoading(true);
                await onPress(_id, true);
                setLoading(false);
              }}>
              Poz
            </Button>
          </HStack>
        </VStack>
        <Box p="10px">
          <Image
            w="123px"
            h="123px"
            borderRadius={20}
            aria-label="car"
            resizeMode="cover"
            source={{uri: `${BASE_URL}/images/${driver.carImage}`}}
          />
        </Box>
      </HStack>
    </Pressable>
  );
};

export default MyRouteItem;
