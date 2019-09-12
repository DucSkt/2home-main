import { StyleSheet } from 'react-native';
import { Fonts, Colors } from '../../../themes';

export default StyleSheet.create({
  container: {
    padding: 0,
    flex: 1
  },
  titleStyle: {
    margin: 10,
    flex: 1
  },
  dateLineTitleStyle: {
    fontSize: Fonts.size.h6,
    fontFamily: Fonts.type.semiBold,
    flex: 1,
    margin: 5,
    textAlign: 'left'
  },
  dateLineDetailStyle: {
    fontSize: 16,
    fontFamily: Fonts.type.semiBold,
    color: Colors.orange,
    marginTop: 7,
    flex: 1.5,
  },
  detailNameText: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.base,
    flex: 1,
    textAlign: 'left'
  },
  detailValueText: {
    fontSize: 16,
    fontFamily: Fonts.type.semiBold,
    color: Colors.orange,
    textAlign: 'right',
    flex: 1
  }
});
