import React, {useEffect, useState} from 'react';
import {
  ArrowBackIcon,
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Radio,
  ScrollView,
  StatusBar,
  Text,
  useToast,
  VStack,
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackNavigationProp} from '@react-navigation/stack';
import FloatingLabelInput from '../components/FloatingLabelInput';
import ImageSelect from '../components/ImageSelect';
import {updateUser} from '../api/ProfileAPI';
import {AxiosError} from 'axios';

type Props = {
  navigation: StackNavigationProp<any, any>;
};

const Profile = ({navigation}: Props) => {
  const [user, setUser] = useState<any>({});
  const [role, setRole] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [file, setFile] = useState<any>(null);
  const toast = useToast();

  useEffect(() => {
    const getUser = async () => {
      try {
        const value = await AsyncStorage.getItem('user');
        if (value !== null) {
          const savedUser = JSON.parse(value);
          setUser({...savedUser});
          setRole(savedUser.role);
        } else {
          navigation.navigate('Welcome');
        }
      } catch (e) {
        navigation.navigate('Welcome');
      }
    };

    getUser();
  }, []);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await updateUser({...user, role}, file);

      await AsyncStorage.setItem('user', JSON.stringify(response.data));

      toast.show({
        placement: 'top',
        title: 'Üstünlik!',
        variant: 'solid',
        bgColor: 'emerald.500',
      });
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

    setLoading(false);
  };

  return (
    <VStack safeAreaY backgroundColor="white" h="full">
      <StatusBar barStyle="dark-content" />
      <ScrollView>
        <VStack h="full" px="25px" py={8} justifyContent="space-between">
          <HStack w="full" justifyContent="space-between" alignItems="center">
            <Heading>Hasabym</Heading>
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

          <VStack flex={1} space={4} py={8}>
            <Box p={4} borderRadius={10} bgColor="#F6F6F6">
              <Text fontSize="15px" fontWeight="semibold">
                Belgim: {user.phonenumber}
              </Text>
            </Box>

            <VStack flex={1} space={6} py={6}>
              <FloatingLabelInput
                h="60px"
                value={user.name}
                label={'Adyňyz'}
                onChangeText={text => {
                  setUser({...user, name: text});
                }}
              />

              <FloatingLabelInput
                h="60px"
                label={'Açaryňyz'}
                secureTextEntry
                onChangeText={text => {
                  setUser({...user, password: text});
                }}
              />

              {role === 'driver' && (
                <FloatingLabelInput
                  h="60px"
                  value={user.car}
                  label={'Maşynyňyz'}
                  onChangeText={text => {
                    setUser({...user, car: text});
                  }}
                />
              )}

              {role === 'driver' && (
                <ImageSelect
                  image={user.carImage}
                  onSelect={newFile => {
                    setUser({...user, carImage: null});
                    setFile(newFile);
                  }}
                />
              )}
            </VStack>

            <VStack
              alignItems="center"
              justifyContent="space-between"
              p={4}
              borderRadius={10}
              bgColor="#F6F6F6"
              space={6}>
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
                value={role}
                onChange={(value: string) => {
                  setRole(value);
                }}>
                <HStack w="100%" justifyContent="space-around">
                  <Radio value="passenger">Ýolagçy</Radio>
                  <Radio value="driver">Sürüji</Radio>
                </HStack>
              </Radio.Group>
            </VStack>
          </VStack>

          <VStack space={6}>
            <Button
              isLoading={loading}
              w="full"
              variant="primary"
              py={'16px'}
              _text={{
                fontSize: 18,
              }}
              textAlign="center"
              onPress={handleUpdate}>
              Ýatda sakla
            </Button>

            <Button
              w="full"
              variant="ghost"
              colorScheme="red"
              py={'16px'}
              _text={{
                fontSize: 18,
              }}
              textAlign="center"
              onPress={() => {
                AsyncStorage.clear();
                navigation.pop();
                navigation.replace('Welcome');
              }}>
              Hasabymdan çyk
            </Button>
          </VStack>
        </VStack>
      </ScrollView>
    </VStack>
  );
};

export default Profile;
