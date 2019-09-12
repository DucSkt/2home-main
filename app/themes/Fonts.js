const type = {
  base: "OpenSans-Regular",
  bold: "OpenSans-Bold",
  boldItalic: "OpenSans-BoldItalic",
  extraBold: "OpenSans-ExtraBold",
  extraBoldItalic: "OpenSans-ExtraBoldItalic",
  italic: "OpenSans-Italic",
  light: "OpenSans-Light",
  lightItalic: "OpenSans-LightItalic",
  semiBold: "OpenSans-SemiBold",
  semiBoldItalic: "OpenSans-SemiBoldItalic",
};

const size = {
  giant: 42,
  h1: 38,
  h2: 34,
  h3: 30,
  h4: 26,
  h5: 20,
  h6: 19,
  p: 15,
  input: 17,
  regular: 16,
  medium: 15,
  small: 12,
  underSmall: 10,
  tiny: 8.5,
  numPad: 24,
  button: 20,
  instructionTitle: 22,
  header:17,
};

const style = {
  h1: {
    fontFamily: type.base,
    fontSize: size.h1
  },
  h2: {
    fontWeight: type.base,
    fontSize: size.h2
  },
  h3: {
    fontFamily: type.base,
    fontSize: size.h3
  },
  h4SemiBold:{
    fontFamily:type.semiBold,
    fontSize:size.h4,
  },
  h4: {
    fontFamily: type.base,
    fontSize: size.h4
  },
  h5: {
    fontFamily: type.base,
    fontSize: size.h5
  },
  h5Bold: {
    fontFamily: type.bold,
    fontSize: size.h5
  },
  h6: {
    fontFamily: type.base,
    fontSize: size.h6
  },
  h6Bold: {
    fontFamily: type.bold,
    fontSize: size.h6
  },
  normal: {
    fontFamily: type.base,
    fontSize: size.regular
  },
  normalBold: {
    fontFamily: type.bold,
    fontSize: size.regular
  },
  instructionTitle: {
    fontFamily: type.base,
    fontSize: size.instructionTitle
  },
  description: {
    fontFamily: type.base,
    fontSize: size.medium
  },
  descriptionBold: {
    fontFamily: type.bold,
    fontSize: size.medium
  },
  textInput: {
    fontFamily: type.base,
    fontSize: size.input
  },
  numPad: {
    fontFamily: type.base,
    fontSize: size.numPad
  },
  button: {
    fontFamily: type.base,
    fontSize: size.button
  },
  small: {
    fontFamily: type.base,
    fontSize: size.small
  },
  tabLabel: {
    fontFamily: type.bold,
    fontSize: size.tiny
  },
  smallBold:{
    fontFamily:type.bold,
    fontSize:size.medium
  },
  regularBold:{
    fontFamily:type.bold,
    fontSize:size.regular
  },
  smallItalic:{
    fontFamily:type.italic,
    fontSize:size.small
  },
  tabLabelSmall:{
    fontFamily: type.bold,
    fontSize: size.small
  },
  regularBase:{
    fontFamily:type.base,
    fontSize:size.regular
  },
  tinyBold:{
    fontFamily:type.bold,
    fontSize:size.tiny
  },
  mediumBase:{
    fontFamily:type.base,
    fontSize:size.medium
  },
  mediumBold:{
    fontFamily:type.semiBold,
    fontSize:size.medium
  },
  regularSemiBold:{
    fontFamily:type.semiBold,
    fontSize:size.regular
  },
  smallSemiBold:{
    fontFamily:type.semiBold,
    fontSize:size.small
  },
  h4Bold:{
    fontFamily:type.bold,
    fontSize:size.h4
  },
  headerTitle:{
    fontFamily:type.semiBold,
    fontSize:size.header
  },
  h3Bold:{
    fontFamily:type.bold,
    fontSize:size.h3
  },
  mediumItalic:{
    fontFamily:type.semiBoldItalic,
    fontSize:size.medium
  },
  featureTitle:{
    fontSize:size.instructionTitle,
    fontFamily:type.bold
  },
};

export default {
  type,
  size,
  style
};
