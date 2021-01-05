import React from "react";

//Importamos los componentes del package
import Svg, { Path } from "react-native-svg";

function BackIcon({ color, size, ...props }) {
  return (
    <Svg
      fill={color}
      width={size}
      height={size}
      {...props}
      xxmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <Path d="M 13.59375 3.9921875 L 5.5898438 11.996094 L 13.488281 20.001953 L 14.912109 18.597656 L 8.4101562 12.003906 L 15.007812 5.40625 L 13.59375 3.9921875 z" />
    </Svg>
  );
}

export default BackIcon;
