import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function Phone(props: any) {
  return (
    <Svg
      width={21}
      height={20}
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        d="M18.833 14.1v2.5a1.667 1.667 0 01-1.816 1.667 16.492 16.492 0 01-7.192-2.559 16.252 16.252 0 01-5-5 16.492 16.492 0 01-2.558-7.225 1.666 1.666 0 011.658-1.816h2.5A1.667 1.667 0 018.092 3.1c.105.8.3 1.586.583 2.342A1.667 1.667 0 018.3 7.2L7.242 8.258a13.334 13.334 0 005 5L13.3 12.2a1.667 1.667 0 011.758-.375c.756.282 1.542.478 2.342.583a1.666 1.666 0 011.433 1.692z"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default Phone;
