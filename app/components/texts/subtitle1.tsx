import React, { useState, useRef } from 'react';
import { Text, StyleSheet, TextStyle, View, TouchableOpacity } from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip'; // Walkthrough Tooltip
import { Ionicons } from '@expo/vector-icons';
import dimensions from '../../utils/sizing';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Portal } from '@gorhom/portal';
import Button1 from '../buttons/button1';

interface SubtitleProps {
  text: string;
  style?: TextStyle;
  fontFamily?: string;
  fontSize?: number;
  color?: string;
  opacity?: number;
  marginTop?: number;
  textAlign?: TextStyle['textAlign'];
  lineHeight?: number;
  tooltip?: boolean;
  tooltipWidget?: any;
  tooltipSnapPoints?: [];
  tooltipCustomHandler?: () => void; // Handler for opening the bottom sheet
}

const Subtitle1: React.FC<SubtitleProps> = ({
  text,
  style,
  fontFamily,
  fontSize,
  color = '#808080',
  opacity = 1,
  marginTop = 0,
  textAlign = 'center',
  lineHeight,
  tooltip = false,
  tooltipWidget = null,
  tooltipSnapPoints = ["50"],
  tooltipCustomHandler
}) => {
  const [showTip, setShowTip] = useState(false);
  const sheetRef = useRef<BottomSheet>(null); // Reference for the bottom sheet

  const handleOpenSheet = () => {
    if (tooltipCustomHandler) {
      tooltipCustomHandler(); // Custom handler, if provided
    } else {
      sheetRef.current?.expand(); // Open the bottom sheet if no custom handler
    }
  };

  return (
    <View style={[styles.container, { justifyContent: textAlign === 'center' ? 'center' : 'flex-start' }]}>
      <Text
        style={[
          styles.Subtitle,
          fontFamily ? { fontFamily } : null,
          fontSize ? { fontSize } : null,
          color ? { color } : null,
          opacity !== undefined ? { opacity } : null,
          marginTop ? { marginTop } : null,
          textAlign ? { textAlign } : null,
          lineHeight ? { lineHeight } : null,
          style,
        ]}
      >
        {text}
      </Text>

      {tooltip && (
        <TouchableOpacity
          onPress={handleOpenSheet} // Open bottom sheet or call custom handler
          style={{ marginLeft: 5 }}
        >
          <Ionicons name="information-circle-outline" size={dimensions.screenWidth * 0.045} color={color} />
        </TouchableOpacity>
      )}

      {/* Gorhom BottomSheet */}
      <Portal>
        <BottomSheet
          ref={sheetRef}
          index={-1} // Start closed
          snapPoints={tooltipSnapPoints} // Snap points for bottom sheet
          enablePanDownToClose={true}
          handleComponent={null}
          backgroundStyle={{ backgroundColor: '#FFF' }}
        >
          <BottomSheetView>
            {tooltipWidget?.({ closeSheet: () => sheetRef.current?.close() })}
          </BottomSheetView>
        </BottomSheet>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
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
