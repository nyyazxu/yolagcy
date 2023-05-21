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
  VStack,
} from 'native-base';
import {StackNavigationProp} from '@react-navigation/stack';
import RouteItem from '../components/RouteItem';
import Pin from '../svgs/Pin';
import {filterRoutes} from '../api/RoutesAPI';

type Props = {
  navigation: StackNavigationProp<any, any>;
  route: any;
};

const Routes = ({navigation, route}: Props) => {
  const [routes, setRoutes] = useState<any[]>([]);
  const {date, from, to} = route.params;

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await filterRoutes(date, from, to);
        setRoutes(response.data);
      } catch (e) {
        console.log(e);
      }
    };

    getUser();
  }, []);

  const renderListEmptyComponent = useMemo(
    () => (
      <Flex h="500px" justifyContent="center" alignItems="center">
        <Pin />
      </Flex>
    ),
    [routes],
  );

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
                    ? `${routes.length} ugur tapyldy`
                    : 'ugur tapylmady...'}
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
                      <RouteItem
                        {...item}
                        onPress={() => {
                          navigation.navigate('RouteDetail', {
                            details: {...item},
                          });
                        }}
                      />
                    );
                  }}
                  keyExtractor={(item: any, index) => `${index}`}
                />
              </VStack>
            </VStack>
          </VStack>
        </VStack>
      </Box>
    </ScrollView>
  );
};

export default Routes;
