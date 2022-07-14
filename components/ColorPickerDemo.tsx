import React, { useCallback } from 'react';
import { Dimensions, StyleSheet, TextStyle, View, Text, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useDerivedValue, useSharedValue } from 'react-native-reanimated';
import { ReText } from 'react-native-redash';
import Picker from './Picker';

const { width } = Dimensions.get('window');
const pickerWidth = width * 0.8;
const circleWidth = width * 0.65;
const smallCircleWidth = width * 0.17;

const ColorPickerDemo: React.FC = () => {
  const pickerColors = [
    colors.red,
    colors.yellow,
    colors.green,
    colors.cyan,
    colors.blue,
    colors.magenta,
    colors.red
  ];

  const pickedColor = useSharedValue<string | number>(pickerColors[0]);
  const colorText = useDerivedValue<string>(() => {
    const c = parseInt((pickedColor.value.toString()), 10);
    const v = Platform.OS === 'android' ?
      ('000000' + (c & 0xFFFFFF).toString(16)).slice(-6)
      :
      (pickedColor.value.toString(16)).slice(-6);
    return `#${v}`;
  });
  
  const redText = useDerivedValue(() => parseInt(colorText.value.slice(1).slice(0, 2), 16).toString());
  const greenText = useDerivedValue(() => parseInt(colorText.value.slice(1).slice(2, 4), 16).toString());
  const blueText = useDerivedValue(() => parseInt(colorText.value.slice(1).slice(4, 6), 16).toString());

  const onChangeColor = (color: string | number) => {
    'worklet';
    pickedColor.value = color;
  };

  const rColorCircle = useAnimatedStyle(() => ({ backgroundColor: pickedColor.value }));
  const rTextStyle = useAnimatedStyle(() => ({ color: pickedColor.value }));
  const rRedViewStyle = useAnimatedStyle(() => ({ backgroundColor: `rgb(${redText.value}, 0, 0)` }));
  const rGreenViewStyle = useAnimatedStyle(() => ({ backgroundColor: `rgb(0, ${greenText.value}, 0))` }));
  const rBlueViewStyle = useAnimatedStyle(() => ({ backgroundColor: `rgb(0, 0, ${blueText.value}))` }));

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={{ alignItems: 'center', flex: 1 }}>
        <Animated.View style={[styles.bigColorCircle, rColorCircle]}/>
        <ReText text={colorText} style={[styles.hexTextStyle, rTextStyle]}/>
      </View>

      <View style={styles.rgbContainer}>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.rgbTextStyle}>r</Text>
          <Animated.View style={[styles.smallColorCircle, rRedViewStyle]}/>
          <ReText text={redText} style={styles.rgbTextStyle}/>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.rgbTextStyle}>g</Text>
          <Animated.View style={[styles.smallColorCircle, rGreenViewStyle]}/>
          <ReText text={greenText} style={styles.rgbTextStyle}/>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={styles.rgbTextStyle}>b</Text>
          <Animated.View style={[styles.smallColorCircle, rBlueViewStyle]}/>
          <ReText text={blueText} style={styles.rgbTextStyle}/>
        </View>
      </View>

      <Picker
        pickerColors={pickerColors}
        pickerWidth={pickerWidth}
        onChangeColor={onChangeColor}
      />
    </GestureHandlerRootView>
  );
};

const colors = {
  background: '#444B6F',
  rgbText: '#eee',
  red: '#ff0000',
  yellow: '#ffff00',
  green: '#00ff00',
  cyan: '#00ffff',
  blue: '#0000ff',
  magenta: '#ff00ff'
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 50,
    backgroundColor: '#222',
  },
  bigColorCircle: {
    width: circleWidth,
    height: circleWidth,
    borderRadius: circleWidth/2,
    borderColor: 'white',
    borderWidth: 4
  },
  rgbContainer: {
    flex: 1,
    width: width * 0.7,
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 120,
  },
  smallColorCircle: {
    backgroundColor: '#222',
    width: smallCircleWidth,
    height: smallCircleWidth,
    borderRadius: smallCircleWidth / 2,
    borderColor: 'white',
    borderWidth: 3
  },
  hexTextStyle: {
    fontWeight: 'bold', 
    fontSize: 20,
    paddingTop: 30
  },
  rgbTextStyle: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
    paddingVertical: 8,
    color: colors.rgbText
  } as TextStyle
});

export default ColorPickerDemo;
