import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

function RouteIcon(props: any) {
  return (
    <Svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.96 4.13a.75.75 0 01.369-1.264l4.767-1.045a.75.75 0 01.893.893l-1.046 4.767a.75.75 0 01-1.262.37L6.959 4.129zm6.737 18.465a3.1 3.1 0 100-6.2 3.1 3.1 0 000 6.2zM7.407 7.403a1 1 0 00-1.414 0L3.69 9.705a4.246 4.246 0 000 6.005l.004.003a4.253 4.253 0 006.01-.003l6.005-6.005c.88-.88 2.305-.88 3.185-.002.878.876.879 2.298.003 3.176l-.002.001-1.77 1.77a1 1 0 001.414 1.415l1.77-1.77.004-.004a4.246 4.246 0 00-.007-6.004 4.253 4.253 0 00-6.01.003L8.29 14.295c-.879.88-2.304.88-3.185 0a2.246 2.246 0 010-3.175l2.302-2.303a1 1 0 000-1.414z"
        fill="#000"
      />
    </Svg>
  );
}

export default RouteIcon;