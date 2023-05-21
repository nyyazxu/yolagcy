import React, {useState} from 'react';
import {
  Button,
  Text,
  VStack,
  ScrollView,
  Heading,
  HStack,
  Radio,
  InputLeftAddon,
} from 'native-base';
import {StackNavigationProp} from '@react-navigation/stack';
import Logo from '../components/Logo';
import FloatingLabelInput from '../components/FloatingLabelInput';
import {RouteProp} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {login, register} from '../api/LoginAPI';
import {AxiosError} from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  navigation: StackNavigationProp<any, any>;
  route: RouteProp<any, 'Login'>;
};

const Login: React.FC<Props> = ({navigation, route}) => {
  const isNewUser = route.params ? route.params.newUser || false : false;
  const [user, setUser] = useState({
    phonenumber: '',
    password: '',
    name: '',
    role: 'passenger',
  });
  const [isLoading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = isNewUser ? await register(user) : await login(user);
      const data = await response.data;
      if (response.status === 200) {
        await AsyncStorage.setItem('user', JSON.stringify(data));
        navigation.reset({index: 0, routes: [{name: 'Home'}]});
      }
    } catch (e: any) {
      const error: AxiosError = e;

      if (error.response && error.response.status === 406) {
        setErrorMessage('Maglumatlary doly giriziň.');
      } else if (error.response && error.response.status === 402) {
        setErrorMessage('Siziň öň hasabyňyz bar.');
      } else if (error.response && error.response.status === 404) {
        setErrorMessage('Siziň öň hasabyňyz ýok.');
      } else {
        setErrorMessage('Näsazlyk ýüze çykdy.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      minW="full"
      minH="full"
      bgColor="white"
      showsVerticalScrollIndicator={false}
      automaticallyAdjustKeyboardInsets={isNewUser}
      keyboardShouldPersistTaps="never">
      <VStack
        safeAreaY
        w="full"
        minH="full"
        px="25px"
        alignItems="center"
        alignSelf="center">
        <VStack w="100%" pt="50px" alignItems="center" space={16}>
          <Logo />

          <VStack w="100%" space={5}>
            <FloatingLabelInput
              label={'Telefon belgiňiz'}
              onChangeText={text => {
                setUser({...user, phonenumber: text});
              }}
              leftAddon={
                <InputLeftAddon
                  h="100%"
                  position="absolute"
                  borderWidth={0}
                  bgColor="transparent"
                  px={4}>
                  <Text fontWeight="semibold" color="gray.600">
                    +993
                  </Text>
                </InputLeftAddon>
              }
            />
            <FloatingLabelInput
              label={'Password'}
              secureTextEntry
              onChangeText={text => {
                setUser({...user, password: text});
              }}
            />

            {isNewUser && (
              <FloatingLabelInput
                label={'Adyňyz'}
                onChangeText={text => {
                  setUser({...user, name: text});
                }}
              />
            )}

            {isNewUser && (
              <VStack alignItems="center" pt={4} space={10}>
                <Heading
                  textAlign="center"
                  fontSize={18}
                  color="trueGray.500"
                  fontWeight="semibold">
                  Siz haýsy hyzmatdan peýdalanmakçy?
                </Heading>
                <Radio.Group
                  name="role"
                  w="100%"
                  value={user.role}
                  onChange={value => {
                    setUser({...user, role: value});
                  }}>
                  <HStack w="100%" justifyContent="space-around">
                    <Radio value="passenger">Ýolagçy</Radio>
                    <Radio value="driver">Sürüji</Radio>
                  </HStack>
                </Radio.Group>
              </VStack>
            )}

            {errorMessage.length > 0 && (
              <Text w="100%" textAlign="center" color="red.500">
                {errorMessage}
              </Text>
            )}
          </VStack>
        </VStack>

        <Button
          isLoading={isLoading}
          position="absolute"
          bottom={10}
          variant="outlined"
          py={'16px'}
          w="100%"
          borderColor={isNewUser ? 'orange.500' : 'purple.700'}
          _text={{
            fontSize: 18,
            color: isNewUser ? 'orange.500' : 'purple.700',
          }}
          textAlign="center"
          onPress={handleLogin}>
          {isNewUser ? 'Hasap döret' : 'Hasaba gir'}
        </Button>
      </VStack>
    </ScrollView>
  );
};

export default Login;
