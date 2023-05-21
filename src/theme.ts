import {extendTheme} from 'native-base';

const Button = {
  variants: {
    primary: {
      backgroundColor: '#FF7A00',
      borderRadius: 16,
      _text: {
        color: 'white',
        fontWeight: 500,
      },
    },
    outlined: {
      borderWidth: 1,
      backgroundColor: 'transparent',
      borderRadius: 16,
      _text: {
        fontWeight: 500,
      },
    },
  },
};

const Input = {
  baseStyle: {
    borderRadius: 10,
    borderWidth: 1,
    height: '60px',
    fontWeight: 500,
    borderColor: '#BABABA',
    _focus: {
      bgColor: 'transparent',
      borderWidth: 2,
      borderColor: 'orange.500',
    },
  },
};

const Radio = {
  defaultProps: {
    _text: {
      fontWeight: '600',
    },
  },
  baseStyle: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 0.5,
    _checked: {
      borderColor: 'black',
      _icon: {
        size: 4,
        color: 'black',
      },
    },
  },
  sizes: {
    md: {
      _text: {
        fontSize: '18px', // Set the desired font size
      },
      _icon: {
        size: 5,
        color: 'black',
      },
    },
  },
};

export default extendTheme({components: {Button, Input, Radio}});
