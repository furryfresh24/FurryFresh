import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import dimensions from '../../utils/sizing';

interface SubtitleProps {
  text: string;
  style?: TextStyle;
  fontFamily?: string; // fontFamily is optional
  fontSize?: number
}

const Subtitle1: React.FC<SubtitleProps> = ({ text, style, fontFamily, fontSize }) => {
  return (
    <Text style={[styles.Subtitle, fontFamily ? { fontFamily } : null, style, fontSize ? { fontSize } : null]}>
      {text}
    </Text>
  );
};

const styles = StyleSheet.create({
  Subtitle: {
    fontSize: dimensions.screenWidth * 0.027, 
    fontFamily: "Poppins-SemiBold",
    color: '#808080',
    letterSpacing: 0.8,
    textAlign: 'center',
    margin: 0,
    padding: 0,
  },
});

export default Subtitle1;
