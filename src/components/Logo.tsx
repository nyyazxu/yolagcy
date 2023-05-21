import React from 'react';
import {Image} from 'react-native';
import {Box} from 'native-base';

const LogoImage = require('../../assets/images/logo.png');

const Logo = (props: any) => {
  return (
    <Box h="135px" pr="5px">
      <Image
        aria-label="logo"
        resizeMode="contain"
        source={LogoImage}
        style={{
          width: props.width || 200,
        }}
      />
    </Box>
  );
};

export default Logo;
