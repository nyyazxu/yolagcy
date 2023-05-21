import React, {useEffect, useState} from 'react';
import {
  Box,
  NativeBaseProvider,
  PresenceTransition,
  Spinner,
  VStack,
} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Welcome from './src/screens/Welcome';
import theme from './src/theme';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import Logo from './src/components/Logo';
import Routes from './src/screens/Routes';
import RouteDetail from './src/screens/RouteDetail';
import Profile from './src/screens/Profile';
import MyRoutes from './src/screens/MyRoutes';

console.warn = () => {};

const Stack = createStackNavigator();

export default function App() {
  const [splash, setSplash] = useState<boolean>(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSplash(false);
    }, 1200);
    () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, []);
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        {splash && (
          <Box
            position="absolute"
            w="full"
            top={0}
            bottom={0}
            left={0}
            right={0}
            zIndex={100}>
            <PresenceTransition
              visible={true}
              initial={{
                opacity: 1,
              }}
              animate={{
                opacity: 0,
                transition: {
                  duration: 200,
                  delay: 500,
                },
              }}>
              <VStack
                w="full"
                h="full"
                alignItems="center"
                justifyContent="center"
                bgColor="white"
                space={8}>
                <Logo />
                <Spinner color="orange.500" />
              </VStack>
            </PresenceTransition>
          </Box>
        )}
        <Stack.Navigator>
          <Stack.Screen
            options={{headerShown: false}}
            name="Welcome"
            component={Welcome}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Login"
            component={Login}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Home"
            component={Home}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="MyRoutes"
            component={MyRoutes}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Routes"
            component={Routes}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="RouteDetail"
            component={RouteDetail}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Profile"
            component={Profile}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
