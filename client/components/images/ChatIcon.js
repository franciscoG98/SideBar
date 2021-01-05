import React from "react";
import { View, Text } from "react-native";

//Importamos los componentes del package
import Svg, { G, Path } from "react-native-svg";

function ChatIcon({ color, size, ...props }) {
  return (
    <Svg
      fill={color}
      width={size}
      height={size}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <Path d="M 4 3 C 2.9 3 2 3.9 2 5 L 2 17 L 5 14 L 14 14 C 15.1 14 16 13.1 16 12 L 16 5 C 16 3.9 15.1 3 14 3 L 4 3 z M 18 8 L 18 12 C 18 14.206 16.206 16 14 16 L 8 16 L 8 17 C 8 18.1 8.9 19 10 19 L 19 19 L 22 22 L 22 10 C 22 8.9 21.1 8 20 8 L 18 8 z" />
    </Svg>
  );
}

export default ChatIcon;
