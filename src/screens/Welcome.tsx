import React, {useEffect} from 'react';
import {Button, Text, Box, Heading, VStack, StatusBar} from 'native-base';
import {StackNavigationProp} from '@react-navigation/stack';
import Logo from '../components/Logo';
import Line from '../svgs/Line';
import Map from '../svgs/Map';
import AsyncStorage from '@react-native-async-storage/async-storage';

type WelcomeProps = {
  navigation: StackNavigationProp<any, any>;
};

const Welcome: React.FC<WelcomeProps> = ({navigation}) => {
  useEffect(() => {
    const checkUser = async () => {
      const data = await AsyncStorage.getItem('user');
      if (data) {
        navigation.replace('Home');
      }
    };
    checkUser();
  }, [navigation]);

  return (
    <Box safeAreaY w="full" h="full" bgColor="white">
      <StatusBar barStyle="dark-content" />
      <Box w="full" h="50%" top="42%" position={'absolute'} zIndex={1}>
        <Line />
      </Box>
      <Box w="full" h="50%" top="34%" position={'absolute'}>
        <Map />
      </Box>
      <VStack
        zIndex={10}
        top={0}
        w="full"
        h="full"
        px="25px"
        alignItems="center"
        alignSelf="center">
        <VStack h="100%">
          <VStack alignItems="center" space={0} pt="25px">
            <Logo />
            <Heading
              textAlign="center"
              color="#4D4D4D"
              fontSize="4xl"
              fontWeight={'bold'}>
              ýoldaş
            </Heading>

            <Text fontSize={16} fontWeight="bold" mt="50px">
              Uzak ýollara ýoldaş tapyn!
            </Text>
          </VStack>
        </VStack>
        <VStack w="100%" position="absolute" bottom={10} space="20px">
          <Button
            variant="outlined"
            py={'16px'}
            borderColor="orange.500"
            _text={{
              fontSize: 18,
              color: 'orange.500',
            }}
            textAlign="center"
            onPress={() => {
              navigation.navigate('Login', {newUser: true});
            }}>
            Hasap döret
          </Button>
          <Button
            variant="outlined"
            py={'16px'}
            borderColor="purple.700"
            _text={{
              fontSize: 18,
              color: 'purple.700',
            }}
            textAlign="center"
            onPress={() => {
              navigation.navigate('Login');
            }}>
            Hasaba gir
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
};

export default Welcome;
