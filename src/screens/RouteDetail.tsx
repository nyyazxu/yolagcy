import React from 'react';
import {Linking} from 'react-native';
import {
  ArrowBackIcon,
  Box,
  Flex,
  HStack,
  IconButton,
  Image,
  Pressable,
  StatusBar,
  Text,
  VStack,
} from 'native-base';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import Person from '../svgs/Person';
import Phone from '../svgs/Phone';
import {BASE_URL} from '../api/network';

type Props = {
  navigation: StackNavigationProp<any, any>;
  route: RouteProp<any, 'RouteDetail'>;
};

const RouteDetail = ({navigation, route}: Props) => {
  const details: any = route.params ? route.params.details : {};

  return (
    <VStack
      safeAreaBottom
      backgroundColor="white"
      h="full"
      justifyContent="space-between">
      <StatusBar barStyle="dark-content" />
      <VStack flex={1} w="full" alignItems="center" space="25px">
        <Image
          w="full"
          h="350px"
          aria-label="car"
          resizeMode="cover"
          source={{uri: `${BASE_URL}/images/${details.driver.carImage}`}}
        />
        <VStack
          w="full"
          py="25px"
          px="25px"
          alignItems="flex-start"
          space="15px">
          <HStack
            w="full"
            bgColor="#F6F6F6"
            borderRadius={20}
            justifyContent="space-between">
            <VStack space="15px" p="15px">
              <Text fontSize="14px" fontWeight="medium">
                Suruji barada maglumat
              </Text>
              <HStack space="15px">
                <VStack>
                  <Text fontSize="15px" fontWeight="semibold">
                    {details.driver.name}
                  </Text>
                  <Text fontSize="14px" fontWeight="medium">
                    {details.from}
                  </Text>
                </VStack>
              </HStack>
            </VStack>
            <Box>
              <Person />
            </Box>
          </HStack>
          <HStack w="full" bgColor="#F6F6F6" borderRadius={20}>
            <VStack space="15px" p="15px">
              <Text fontSize="14px" fontWeight="medium">
                Ulag barada maglumat
              </Text>
              <HStack space="15px">
                <VStack>
                  <Text fontSize="15px" fontWeight="semibold">
                    {details.driver.car}
                  </Text>
                  <Text fontSize="14px" fontWeight="medium">
                    {details.capacity} yer bosh
                  </Text>
                </VStack>
              </HStack>
            </VStack>
          </HStack>
        </VStack>
      </VStack>
      <HStack
        w="full"
        px="30px"
        mb="25px"
        justifyContent="space-between"
        space={4}>
        {details.cost !== -1 && (
          <Flex
            maxW="75px"
            px={4}
            borderRadius={10}
            bgColor="emerald.500"
            justifyContent="center">
            <Text
              lineHeight={'18px'}
              textAlign="center"
              color="white"
              fontSize="15px"
              fontWeight="medium">
              {details.cost === 0 ? 'Mugt' : `${details.cost} \nTMT`}
            </Text>
          </Flex>
        )}
        <Pressable
          flex={1}
          onPress={() => {
            Linking.openURL(`tel:+993${details.driver.phonenumber}`);
          }}>
          <HStack
            flex={1}
            borderRadius={10}
            bgColor="#573089"
            alignItems="center"
            justifyContent="space-evenly"
            py="13px"
            px="10px">
            <Text color="white" fontSize="15px" fontWeight="medium">
              +993 {details.driver.phonenumber}
            </Text>
            <Phone />
          </HStack>
        </Pressable>

        <IconButton
          w="50px"
          h="50px"
          borderRadius={10}
          bgColor="#F3F3F3"
          icon={<ArrowBackIcon color="black" />}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </HStack>
    </VStack>
  );
};

export default RouteDetail;
