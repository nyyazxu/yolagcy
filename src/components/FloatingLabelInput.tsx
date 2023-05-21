import {Box, Input, Text, VStack} from 'native-base';
import React, {useState, useEffect} from 'react';
import {Animated} from 'react-native';

interface FloatingLabelInputProps {
  label: string;
  secureTextEntry?: boolean;
  onChangeText: (text: string) => void;
  value?: string;
  leftAddon?: any;
  h?: any;
}

const AnimatedText = Animated.createAnimatedComponent(Text);
const AnimatedBox = Animated.createAnimatedComponent(Box);

const FloatingLabelInput = ({
  label,
  value,
  secureTextEntry = false,
  onChangeText,
  leftAddon,
  h,
}: FloatingLabelInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState(value);
  const [animationValue] = useState(new Animated.Value(0));

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    setIsFocused((text || '').length !== 0);
  };

  useEffect(() => {
    setText(value);
  }, [value]);

  useEffect(() => {
    Animated.timing(animationValue, {
      toValue: isFocused ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [animationValue, isFocused]);

  const fontSize = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: [15, 14],
  });

  const width = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <VStack h={h}>
      <AnimatedBox
        position="absolute"
        left={3}
        opacity={animationValue}
        zIndex={100}
        style={{transform: [{translateY: -10}]}}>
        <Animated.View
          style={{
            position: 'absolute',
            width,
            height: '100%',
            alignSelf: 'center',
            backgroundColor: 'white',
          }}
        />
        <AnimatedText
          px={2}
          color="#666666"
          style={{
            fontSize,
            fontWeight: '500',
          }}>
          {label}
        </AnimatedText>
      </AnimatedBox>
      {leftAddon}
      <Input
        flex={1}
        pl={leftAddon && 16}
        secureTextEntry={secureTextEntry}
        placeholder={!isFocused ? label : ''}
        fontSize={16}
        isFocused={isFocused}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={text}
        onChangeText={v => {
          setText(v);
          onChangeText(v);
        }}
      />
    </VStack>
  );
};

export default FloatingLabelInput;
