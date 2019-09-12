import { StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../../themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.white
  },
  header: {
    marginTop: 30,
    fontSize: Fonts.size.h6,
    fontFamily: Fonts.type.bold,
    color: Colors.black,
    fontWeight: 'bold'
  },
  textHeader: {
    marginTop: 5,
    marginLeft: 20,
    marginBottom: 10,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.h4 - 1,
    fontWeight: 'bold'
  },
  body: {
    flex: 1,
    flexDirection: 'column',
    padding: 10
  },
  viewUserName: {
    paddingVertical: 20
  },
  exitButton: {
    marginTop: 25,
    marginLeft: 15,
    width: 15,
    height: 15
  },
  underlined: {
    height: 0.5,
    backgroundColor: Colors.gray
  },
  button: {
    marginTop: 30,
    backgroundColor: Colors.orange,
    paddingBottom: 10,
    paddingTop: 10,
    borderRadius: 20,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  textInButton: {
    color: Colors.white,
    fontFamily: Fonts.type.bold,
    fontSize: Fonts.size.small,
    fontWeight: 'bold'
  },
  notification: {
    flexDirection: 'row'
  },
  checkbox: {
    height: 10, // changes the hitspace but not the checkbox itself
    width: 10,
    flex: 1,
    padding: 5
  },
  itemnotification: {
    justifyContent: 'center',
    flex: 1,
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  checknotification: {
    marginTop: 20,
    marginBottom: 20,
    marginRight: 10,
  }
});
