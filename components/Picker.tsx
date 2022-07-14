import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import {
  Gesture,
  GestureDetector
} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  interpolateColor, useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming
} from 'react-native-reanimated';

interface PickerProps {
  pickerWidth: number;
  pickerColors: string[];
  onChangeColor: (color: string | number) => void;
}

const Picker: React.FC<PickerProps> = ({ pickerWidth, pickerColors, onChangeColor }: PickerProps) => {

  const pickerHeight = pickerWidth / 8;
  const innerPickerHeight = pickerWidth/ 13;
  const styles = stylesheet(pickerWidth, pickerHeight, innerPickerHeight);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const outerScale = useSharedValue(1);
  const innerScale = useSharedValue(1);
  const pickerContextX = useSharedValue(0);

  const adjustedTranslateX = useDerivedValue(() => {
    return Math.min(
      Math.max(translateX.value, 0),
      pickerWidth - pickerHeight
    );
  });

  const circleAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: adjustedTranslateX.value },
        { translateY: translateY.value },
        { scale: outerScale.value },
      ],
    };
  });

  const innerCircleAnimatedStyle = useAnimatedStyle(() => {
    const size = pickerColors.length;
    const inputRange = pickerColors.map((c, i) => ((i / size) * pickerWidth));
    const backgroundColor = interpolateColor(
      translateX.value,
      inputRange,
      pickerColors
    );

    onChangeColor(backgroundColor);

    return {
      transform: [
        { scale: innerScale.value }
      ],
      backgroundColor
    };
  });

  const onEnd = () => {
    'worklet';
    translateY.value = withSpring(0);
    outerScale.value = withSpring(1);
    innerScale.value = withSpring(1);
  };

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX + pickerContextX.value;
    })
    .onEnd(onEnd)
    .minDistance(0.1)

  const tapGesture = Gesture.Tap()
    .onBegin((event) => {
      const targetX = event.x - pickerHeight / 2;
      pickerContextX.value = targetX;
      translateX.value = withTiming(targetX, { duration: 200 });
      translateY.value = withSpring(-pickerHeight * 1.9);
      outerScale.value = withSpring(2);
      innerScale.value = withSpring(1.4);
    })
    .onEnd(onEnd)
    .maxDuration(5000)

    const gesture = Gesture.Simultaneous(panGesture, tapGesture);
  
  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={{ justifyContent: 'center' }}>
        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={pickerColors} style={styles.gradient}/>
        <Animated.View style={[styles.circle, circleAnimatedStyle]}>
          <Animated.View style={[styles.innerCircle, innerCircleAnimatedStyle]}/>
        </Animated.View>
      </Animated.View>
    </GestureDetector>
  );
};

const stylesheet = (pickerWidth: number, pickerHeight: number, innerPickerHeight: number) => {
  return StyleSheet.create({
    gradient:{
      width: pickerWidth,
      height: pickerHeight * 1.2,
      borderRadius: pickerHeight / 1.6,
    },
    circle: {
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      width: pickerHeight,
      height: pickerHeight,
      borderRadius: pickerHeight / 2,
      backgroundColor: 'white'
    },
    innerCircle: {
      width: innerPickerHeight,
      height: innerPickerHeight,
      borderRadius: innerPickerHeight / 2,
    }
  });
};

export default Picker;
