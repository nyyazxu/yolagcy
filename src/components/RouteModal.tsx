import React, {useEffect, useState} from 'react';
import {
  Modal,
  VStack,
  Text,
  Slider,
  Input,
  Button,
  Flex,
  Switch,
  HStack,
} from 'native-base';

interface Props {
  isOpen: boolean;
  onClose: any;
  onSubmit: (capacity: number, cost: number) => void;
}

const RouteModal = ({isOpen, onClose, onSubmit}: Props) => {
  const [capacity, setCapacity] = useState(1);
  const [cost, setCost] = useState<number>(0);
  const [costAvailable, setCostAvailable] = useState<boolean>(true);

  useEffect(() => {
    if (!costAvailable) {
      setCost(-1);
    } else {
      setCost(0);
    }
  }, [costAvailable]);

  return (
    <Modal size="lg" isOpen={isOpen} onClose={onClose} avoidKeyboard>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>Täze ugur</Modal.Header>
        <Modal.Body _scrollview={{scrollEnabled: false}}>
          <VStack p={4} space={8}>
            <VStack space={4}>
              <Text fontSize="15px" fontWeight="medium">
                Adam sany {capacity}
              </Text>
              <Slider
                w="full"
                defaultValue={capacity}
                minValue={1}
                maxValue={10}
                step={1}
                colorScheme="orange"
                onChange={n => {
                  setCapacity(n);
                }}>
                <Slider.Track>
                  <Slider.FilledTrack />
                </Slider.Track>
                <Slider.Thumb bgColor="orange.500" />
              </Slider>
            </VStack>

            <HStack justifyContent="space-between" alignItems="center">
              <Text fontSize="15px" fontWeight="medium">
                Bahasyny gürleşmeli
              </Text>
              <Switch
                isChecked={!costAvailable}
                size="md"
                colorScheme="orange"
                onChange={() => {
                  setCostAvailable(!costAvailable);
                }}
              />
            </HStack>

            {costAvailable && (
              <VStack space={4}>
                <Text fontSize="15px" fontWeight="medium">
                  Bahasy
                </Text>
                <Input
                  h="50px"
                  fontSize="15px"
                  value={cost.toString()}
                  onChangeText={t => {
                    if (t.length === 0) {
                      setCost(0);
                    } else {
                      setCost(parseInt(t));
                    }
                  }}
                  keyboardType="numeric"
                  InputRightElement={
                    <Flex
                      h="full"
                      w="30%"
                      bg="orange.500"
                      alignItems="center"
                      justifyContent="center">
                      <Text fontSize="15px" color="white" fontWeight="medium">
                        {cost === 0 ? 'Mugt' : 'TMT'}
                      </Text>
                    </Flex>
                  }
                />
              </VStack>
            )}
          </VStack>
        </Modal.Body>
        <Modal.Footer>
          <Button
            w="full"
            variant="primary"
            py={'16px'}
            bgColor="green.500"
            _text={{
              fontSize: 18,
            }}
            textAlign="center"
            onPress={() => {
              onSubmit(capacity, cost);
            }}>
            Ýatda sakla
          </Button>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
};

export default RouteModal;
