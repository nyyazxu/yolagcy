import React, {useMemo} from 'react';
import {
  Actionsheet,
  Flex,
  Pressable,
  Text,
  useDisclose,
  VStack,
} from 'native-base';

interface Props {
  label: string;
  value: string;
  onSelect: any;
  icon: any;
  values: string[];
  badgeColor?: string;
}

const LocationPicker = ({
  label,
  value,
  onSelect,
  icon,
  values,
  badgeColor,
}: Props) => {
  const {isOpen, onOpen, onClose} = useDisclose();

  const options = useMemo(
    () =>
      values.map(v => (
        <Actionsheet.Item
          key={v}
          _pressed={{
            bgColor: 'gray.200',
          }}
          onPress={() => {
            onSelect(v);
            onClose();
          }}>
          {v}
        </Actionsheet.Item>
      )),
    [values, onSelect, onClose],
  );

  return (
    <Pressable
      flex={1}
      onPress={() => {
        onOpen();
      }}>
      <VStack
        py="10px"
        px="15px"
        h="215px"
        bgColor="#F3F3F3"
        borderRadius={10}
        justifyContent="space-between">
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>{options}</Actionsheet.Content>
        </Actionsheet>
        <Text fontSize="16px">{label}</Text>

        {icon}

        <Flex
          h="30px"
          bgColor={badgeColor || '#FF7A00'}
          borderRadius="30px"
          alignItems="center"
          justifyContent="center">
          <Text color="white" fontSize="14px" fontWeight="medium">
            {value}
          </Text>
        </Flex>
      </VStack>
    </Pressable>
  );
};

export default LocationPicker;
