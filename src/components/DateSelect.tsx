import {Flex, HStack, Pressable, Text, VStack} from 'native-base';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import Calendar from '../svgs/Calendar';
import {formatDate} from '../utils';

interface Props {
  driver: boolean;
  value: Date;
  onSelect: (date: Date) => void;
}

const DateSelect = ({value, onSelect, driver}: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Pressable
      onPress={() => {
        setOpen(true);
      }}>
      <HStack
        w="full"
        px="15px"
        h="88px"
        bgColor="#F3F3F3"
        borderRadius={10}
        justifyContent="space-between">
        <VStack py="10px" h="full" justifyContent="space-between">
          <Text fontSize="16px">Haýsy senede?</Text>
          <Flex
            h="30px"
            bgColor="#4D4D4D"
            borderRadius="30px"
            alignItems="center"
            justifyContent="center">
            <Text color="white" fontSize="14px" fontWeight="medium">
              {formatDate(value.toISOString(), true)}
            </Text>
            <DatePicker
              modal
              mode={driver ? 'datetime' : 'date'}
              open={open}
              date={value}
              onConfirm={date => {
                setOpen(false);
                onSelect(date);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </Flex>
        </VStack>
        <Calendar />
      </HStack>
    </Pressable>
  );
};

export default DateSelect;
