import React, {useState} from 'react';
import {
  AddIcon,
  Box,
  CloseIcon,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
} from 'native-base';
import {launchImageLibrary} from 'react-native-image-picker';
import {BASE_URL} from '../api/network';

interface Props {
  image: any;
  onSelect: (file: any) => void;
}

const ImageSelect = ({image, onSelect}: Props) => {
  const [pickedImage, setPickedImage] = useState<string | null | undefined>(
    null,
  );

  const openImagePicker = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (!response.didCancel && !response.errorCode && response.assets) {
        setPickedImage(response.assets[0].uri);
        onSelect({
          uri: response.assets[0].uri,
          name: 'car.jpg',
          type: 'image/jpeg',
        });
      }
    });
  };

  return (
    <VStack space={2}>
      <Text pl={4} fontSize="15px" fontWeight="semibold">
        Ulagyň suraty
      </Text>

      <HStack
        p={4}
        borderRadius={10}
        bgColor="#F6F6F6"
        justifyContent="center"
        alignItems="center">
        {!image && !pickedImage && (
          <IconButton
            colorScheme="gray"
            icon={<AddIcon color="black" />}
            onPress={openImagePicker}
          />
        )}
        {(image || pickedImage) && (
          <Box position="relative">
            <IconButton
              position="absolute"
              top={0}
              right={0}
              colorScheme="gray"
              bgColor="gray.800"
              borderTopRightRadius={10}
              borderBottomLeftRadius={10}
              zIndex={1}
              icon={<CloseIcon color="white" size="15px" />}
              onPress={() => {
                setPickedImage(null);
                onSelect(null);
              }}
            />
            <Image
              alt="car"
              source={{
                uri: image
                  ? `${BASE_URL}/images/${image}`
                  : typeof pickedImage === 'string'
                  ? pickedImage
                  : '',
              }}
              borderRadius={10}
              style={{width: 150, height: 150}}
            />
          </Box>
        )}
      </HStack>
    </VStack>
  );
};

export default ImageSelect;
