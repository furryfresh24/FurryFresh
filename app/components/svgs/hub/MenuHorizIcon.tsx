import * as React from "react";
import Svg, { Path } from "react-native-svg";
interface MenuHorizProps {
    color: string;
    width: number;
    height: number;
    props: any;
}

const MenuHorizIcon: React.FC<MenuHorizProps> = ({ color, width, height, props }) => (
    <Svg
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <Path
            d="M4 6H20M4 12H20M4 18H20"
            stroke={color}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </Svg>
);
export default MenuHorizIcon;
