import React from 'react';
import Svg, {Defs, LinearGradient, Path, Stop} from 'react-native-svg';

const Line = () => {
  return (
    <Svg width="390" height="283" viewBox="0 0 390 283" fill="none">
      <Path
        d="M406.5 220.592C342.273 146.636 74.0897 163.767 128 209.093C157.956 234.279 321.36 177.323 270 106.592C207.011 19.8464 28.7131 48.2608 -23.5 38.5926"
        stroke="url(#paint0_linear_456_270)"
        strokeWidth="10"
      />
      <Defs>
        <LinearGradient
          id="paint0_linear_456_270"
          x1="366.476"
          y1="213.738"
          x2="77.0648"
          y2="134.102"
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#573089" />
          <Stop offset="1" stopColor="#FF6813" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};

export default Line;
