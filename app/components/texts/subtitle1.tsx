import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import dimensions from '../../utils/sizing';

interface SubtitleProps {
  text: string;
  style?: TextStyle;
  fontFamily?: string;
  fontSize?: number;
  color?: string;
  opacity?: number; 
  marginTop?: number;
  textAlign?: TextStyle['textAlign'];
}

const Subtitle1: React.FC<SubtitleProps> = ({
  text,
  style,
  fontFamily,
  fontSize,
  color = '#808080', 
  opacity = 1, 
  marginTop = 0,
  textAlign = 'center' 
}) => {
  return (
    <Text
      style={[
        styles.Subtitle,
        fontFamily ? { fontFamily } : null,
        fontSize ? { fontSize } : null,
        color ? { color } : null,
        opacity !== undefined ? { opacity } : null,
        marginTop ? { marginTop } : null,
        textAlign ? { textAlign } : null,
        style, 
      ]}
    >
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  Subtitle: {
    fontSize: dimensions.screenWidth * 0.027,
    fontFamily: 'Poppins-SemiBold',
    color: '#808080', 
    letterSpacing: 0.8,
    textAlign: 'center',
    margin: 0,
    padding: 0,
  },
});

export default Subtitle1;
