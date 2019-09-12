import { StyleSheet } from 'react-native';
import { Colors,Metrics, Fonts } from '../../../../../themes';

export default StyleSheet.create({
  container: {
    width: Metrics.screenWidth*0.9,
    backgroundColor: Colors.white,
    borderRadius: 3,
    flexDirection: 'column',
  },
  closeButton:{
    alignSelf: 'flex-end',
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20
  },
  title:{
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.h5,
    marginBottom: 20,
    alignSelf: 'center'
  },
});
