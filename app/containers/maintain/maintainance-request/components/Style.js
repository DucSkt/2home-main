import {
  StyleSheet
} from 'react-native';
import { Colors, Fonts } from '../../../../themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 15,
    marginLeft:16,
    marginRight:16,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 0 },
    backgroundColor: Colors.white,
    borderRadius: 5,
    margin: 3,
  },
  header: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5
  },
  solutionContainer:{
    flexDirection: 'row',
    marginTop:16
  },
  nameInHeader: {
    fontSize: Fonts.size.header,
    fontFamily: Fonts.type.semiBold,
    color: Colors.black,
  },
  dateTime: {
    marginLeft:16,
    marginBottom:8,
    fontSize: Fonts.size.small,
    color: Colors.lightGray,
    fontFamily: Fonts.type.base,
  },
  line: {
    height: 2,
    backgroundColor: Colors.cloud
  },
  body: {
    padding: 16
  },

  submitContainer: {
    flexDirection: 'row',
    justifyContent:'space-around',
    marginTop: 16,
    marginBottom: 16,
  },
  submitButton: {
    width:120,
    borderColor: Colors.red,
    borderRadius: 15,
    borderWidth: 1,
    paddingTop:6,
    paddingBottom:6,
    justifyContent:'center',
    alignItems:'center',
  },
  submitText: {
    fontSize: Fonts.size.medium,
    fontFamily: Fonts.type.bold,
  },
})
export default styles;