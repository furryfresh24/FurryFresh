import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const screenWidth = width;
const screenHeight = height;

export default { screenWidth, screenHeight };
