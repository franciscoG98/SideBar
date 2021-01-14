import Svg, { G, Path } from "react-native-svg";
import React from "react";

function Pencil({ color, size, ...props }) {
  return (
    <Svg
      fill={color}
      width={size}
      height={size}
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 30"
    >
      <Path d="M 22.828125 3 C 22.316375 3 21.804562 3.1954375 21.414062 3.5859375 L 20 5 L 25 10 L 26.414062 8.5859375 C 27.195062 7.8049375 27.195062 6.5388125 26.414062 5.7578125 L 24.242188 3.5859375 C 23.851688 3.1954375 23.339875 3 22.828125 3 z M 18 7 L 6 19 L 7.5 19.5 L 8 22 L 10.5 22.5 L 11 24 L 23 12 L 18 7 z M 4.1523438 23.152344 L 3.0371094 26.308594 A 0.5 0.5 0 0 0 3 26.5 A 0.5 0.5 0 0 0 3.5 27 A 0.5 0.5 0 0 0 3.6816406 26.966797 L 6.8476562 25.847656 L 4.1523438 23.152344 z" />
    </Svg>
  );
}

export default Pencil;
