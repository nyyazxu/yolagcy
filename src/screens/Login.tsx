import React, {useState} from 'react';
import {
  Button,
  Text,
  VStack,
  Heading,
  HStack,
  Radio,
  InputLeftAddon,
  ScrollView,
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
      position="relative"
      w="full"
      minH="full"
      px="25px"
      alignSelf="center"
      bgColor="white"
      showsVerticalScrollIndicator={false}
      automaticallyAdjustKeyboardInsets={isNewUser}
      keyboardShouldPersistTaps="never">
      <VStack w="100%" minH="100%" pt="10px" alignItems="center" space={12}>
        <Logo />

        <VStack w="100%" minH="full" space={4}>
          <FloatingLabelInput
            h="60px"
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
            h="60px"
            label={'Password'}
            secureTextEntry
            onChangeText={text => {
              setUser({...user, password: text});
            }}
          />

          {isNewUser && (
            <FloatingLabelInput
              h="60px"
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

          <Button
            isLoading={isLoading}
            variant="outlined"
            w="100%"
            mt="50px"
            mb="50px"
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
      </VStack>
    </ScrollView>
  );
};

export default Login;
