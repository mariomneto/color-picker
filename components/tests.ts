// import { interpolate, processColor } from "react-native-reanimated";

// export const interpolateColor = (
//     value: number,
//     inputRange: readonly number[],
//     outputRange: readonly (string | number)[],
//   ): string | number => {
//     'worklet';
//     return interpolateColorsRGB(
//         value,
//         inputRange,
//         getInterpolateRGB(outputRange)
//     );
// }

// const interpolateColorsRGB = (
//     value: number,
//     inputRange: readonly number[],
//     colors: InterpolateRGB
//     ) => {
//     'worklet';
//     const r = interpolate(value, inputRange, colors.r, Extrapolate.CLAMP);
//     const g = interpolate(value, inputRange, colors.g, Extrapolate.CLAMP);
//     const b = interpolate(value, inputRange, colors.b, Extrapolate.CLAMP);
//     const a = interpolate(value, inputRange, colors.a, Extrapolate.CLAMP);
//     return rgbaColor(r, g, b, a);
// };

// interface InterpolateRGB {
//     r: number[];
//     g: number[];
//     b: number[];
//     a: number[];
// }

// const getInterpolateRGB = (
//     colors: readonly (string | number)[]
//   ): InterpolateRGB => {
//     'worklet';
  
//     const r = [];
//     const g = [];
//     const b = [];
//     const a = [];
//     for (let i = 0; i < colors.length; ++i) {
//       const color = colors[i];
//       const proocessedColor = processColor(color);
//       // explicit check in case if processedColor is 0
//       if (proocessedColor !== null && proocessedColor !== undefined) {
//         r.push(red(proocessedColor));
//         g.push(green(proocessedColor));
//         b.push(blue(proocessedColor));
//         a.push(opacity(proocessedColor));
//       }
//     }
//     return { r, g, b, a };
// };

// export const opacity = (c: number): number => {
// 'worklet';
// return ((c >> 24) & 255) / 255;
// };

// export const red = (c: number): number => {
// 'worklet';
// return (c >> 16) & 255;
// };

// export const green = (c: number): number => {
// 'worklet';
// return (c >> 8) & 255;
// };

// export const blue = (c: number): number => {
// 'worklet';
// return c & 255;
// };