import React, {useEffect, useState} from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Pressable,
  StatusBar,
  useDisclose,
  useToast,
  VStack,
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackNavigationProp} from '@react-navigation/stack';
import Thumb from '../svgs/Thumb';
import Strategy from '../svgs/Strategy';
import Pin from '../svgs/Pin';
import LocationPicker from '../components/LocationPicker';
import DateSelect from '../components/DateSelect';
import {CITIES} from '../constants';
import ProfileIcon from '../svgs/ProfileIcon';
import {useIsFocused} from '@react-navigation/native';
import RouteIcon from '../svgs/RouteIcon';
import RouteModal from '../components/RouteModal';
import {AxiosError} from 'axios';
import {createRoute} from '../api/RoutesAPI';

type Props = {
  navigation: StackNavigationProp<any, any>;
};

const Home = ({navigation}: Props) => {
  const toast = useToast();
  const {isOpen, onOpen, onClose} = useDisclose();
  const [user, setUser] = useState<any>({});
  const [route, setRoute] = useState<any>({
    from: CITIES[0],
    to: CITIES[1],
    date: new Date(),
    capacity: 0,
    cost: 0,
  });
  const [date, setDate] = useState(new Date());

  const isFocused = useIsFocused();

  useEffect(() => {
    const getUser = async () => {
      try {
        const value = await AsyncStorage.getItem('user');
        if (value !== null) {
          setUser(JSON.parse(value));
        } else {
          navigation.navigate('Welcome');
        }
      } catch (e) {
        navigation.navigate('Welcome');
      }
    };

    getUser();
  }, [isFocused]);

  const handleRouteSelect = () => {
    if (user.role === 'passenger') {
      navigation.navigate('Routes', {date, from: route.from, to: route.to});
    } else {
      onOpen();
    }
  };

  const handleSubmit = async (capacity: number, cost: number) => {
    try {
      await createRoute(user._id, {...route, capacity, cost});

      toast.show({
        placement: 'top',
        title: 'Üstünlik!',
        variant: 'solid',
        bgColor: 'emerald.500',
      });

      onClose();
    } catch (e) {
      const error = e as AxiosError;
      console.log(error.message);
      toast.show({
        placement: 'top',
        title: 'Näsazlyk ýüze çykdy!',
        variant: 'solid',
        bgColor: 'red.500',
      });
    }
  };

  return (
    <Box w="full" minH="full" bgColor="white">
      <StatusBar barStyle="dark-content" />

      <VStack
        safeAreaY
        w="full"
        minH="full"
        py={8}
        px="25px"
        alignItems="flex-start">
        <VStack
          w="full"
          h="full"
          alignItems="flex-start"
          justifyContent="space-between">
          <VStack flex={1} w="full" space="70px">
            <HStack w="full" justifyContent="space-between">
              <Pressable
                onPress={() => {
                  navigation.navigate('Profile');
                }}>
                <Flex
                  w="50px"
                  h="50px"
                  bgColor="#F3F3F3"
                  borderRadius={10}
                  justifyContent="center"
                  alignItems="center">
                  <ProfileIcon />
                </Flex>
              </Pressable>
              {user.role === 'driver' && (
                <Pressable
                  onPress={() => {
                    navigation.navigate('MyRoutes');
                  }}>
                  <Flex
                    w="50px"
                    h="50px"
                    bgColor="#F3F3F3"
                    borderRadius={10}
                    justifyContent="center"
                    alignItems="center">
                    <RouteIcon />
                  </Flex>
                </Pressable>
              )}
            </HStack>

            <VStack w="full" space="30px">
              <Heading fontSize="32px">
                siz {user && user.role === 'passenger' ? 'ýolagçy' : 'sürüji'}
              </Heading>

              <VStack w="full" space="12px">
                <HStack w="full" space="16px">
                  <LocationPicker
                    label="Nireden?"
                    value={route.from}
                    values={CITIES.filter(city => city !== route.to)}
                    icon={user.role === 'passenger' ? <Thumb /> : <Strategy />}
                    onSelect={(v: string) => {
                      setRoute({...route, from: v});
                    }}
                  />
                  <LocationPicker
                    label="Nirä?"
                    value={route.to}
                    values={CITIES.filter(city => city !== route.from)}
                    badgeColor="#573089"
                    icon={<Pin />}
                    onSelect={(v: string) => {
                      setRoute({...route, to: v});
                    }}
                  />
                </HStack>

                <DateSelect
                  driver={user.role === 'driver'}
                  value={date}
                  onSelect={newDate => {
                    setDate(newDate);
                  }}
                />
              </VStack>
            </VStack>
          </VStack>

          <Button
            variant="primary"
            py={'16px'}
            w="100%"
            _text={{
              fontSize: 18,
            }}
            textAlign="center"
            onPress={handleRouteSelect}>
            {user.role === 'passenger' ? 'Gözlet' : 'Döret'}
          </Button>
        </VStack>
      </VStack>

      {user.role === 'driver' && (
        <RouteModal isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} />
      )}
    </Box>
  );
};

export default Home;
