import { StyleSheet } from 'react-native';
import { Colors,Metrics, Fonts } from '../../../../../themes';

export default StyleSheet.create({
  container: {
    width: Metrics.screenWidth*0.9,
    height: Metrics.screenHeight*0.6,
    backgroundColor: Colors.white,
    borderRadius: 3,
  },
  title:{
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.h5,
    marginBottom: 20,
    alignSelf: 'center'
  },
  text:{
    fontSize: Fonts.size.input,
    fontFamily: Fonts.type.semiBold
  },
  amount:{
    color: Colors.orange
  },
  lateValue:{
    color: Colors.red
  },
  closeButton:{
    alignSelf: 'flex-end',
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20
  }
});
