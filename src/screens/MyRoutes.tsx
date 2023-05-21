import React, {useEffect, useMemo, useState} from 'react';
import {
  ArrowBackIcon,
  Box,
  FlatList,
  Flex,
  Heading,
  HStack,
  IconButton,
  ScrollView,
  StatusBar,
  useDisclose,
  useToast,
  VStack,
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackNavigationProp} from '@react-navigation/stack';
import Pin from '../svgs/Pin';
import {deleteRoute, fetchRoutes, updateRoute} from '../api/RoutesAPI';
import MyRouteItem from '../components/MyRouteItem';
import RouteModal from '../components/RouteModal';
import {AxiosError} from 'axios';

type Props = {
  navigation: StackNavigationProp<any, any>;
};

const MyRoutes = ({navigation}: Props) => {
  const toast = useToast();
  const {isOpen, onOpen, onClose} = useDisclose();
  const [user, setUser] = useState<any>({});
  const [route, setRoute] = useState<any>({
    _id: '',
    from: '',
    to: '',
    date: new Date(),
    capacity: 0,
    cost: 0,
  });
  const [routes, setRoutes] = useState<any[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    const getMyRoutes = async () => {
      try {
        const value = await AsyncStorage.getItem('user');
        if (value !== null) {
          const savedUser = JSON.parse(value);
          setUser(savedUser);
          const response = await fetchRoutes(savedUser._id);
          setRoutes(response.data);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getMyRoutes();
  }, [refresh]);

  const renderListEmptyComponent = useMemo(
    () => (
      <Flex h="500px" justifyContent="center" alignItems="center">
        <Pin />
      </Flex>
    ),
    [routes],
  );

  const handleSubmit = async (capacity: number, cost: number) => {
    try {
      await updateRoute(user._id, {...route, capacity, cost});

      toast.show({
        placement: 'top',
        title: 'Üstünlik!',
        variant: 'solid',
        bgColor: 'emerald.500',
      });

      setRefresh(!refresh);

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

  const handleDelete = async (id: string) => {
    try {
      await deleteRoute(id);

      toast.show({
        placement: 'top',
        title: 'Üstünlik!',
        variant: 'solid',
        bgColor: 'emerald.500',
      });

      setRefresh(!refresh);

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
    <ScrollView minH="full" backgroundColor="white">
      <Box safeAreaY w="full" minH="full" alignItems="center">
        <StatusBar barStyle="dark-content" />

        <VStack w="full" h="full" py={8} px="25px" alignItems="flex-start">
          <VStack
            w="full"
            h="full"
            alignItems="flex-start"
            justifyContent="space-between">
            <VStack w="full" minH="full" space="30px">
              <HStack
                w="full"
                justifyContent="space-between"
                alignItems="center">
                <Heading fontSize="24px">
                  {routes.length > 0
                    ? `${routes.length} uguryňyz bar`
                    : 'hiç uguryňyz ýok...'}
                </Heading>
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
              <VStack minH="full" space="30px">
                <FlatList
                  w="full"
                  minH="full"
                  scrollEnabled={false}
                  data={routes}
                  ListEmptyComponent={renderListEmptyComponent}
                  renderItem={({item}: any) => {
                    return (
                      <MyRouteItem
                        {...item}
                        onPress={async (id, isDelete?) => {
                          if (isDelete) {
                            await handleDelete(id);
                          } else {
                            setRoute(routes.find(r => r._id === id));
                            onOpen();
                          }
                        }}
                      />
                    );
                  }}
                  keyExtractor={(item: any, index) => index.toString()}
                />
              </VStack>
            </VStack>
          </VStack>
        </VStack>
      </Box>
      <RouteModal isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} />
    </ScrollView>
  );
};

export default MyRoutes;
