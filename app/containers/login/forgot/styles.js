import { StyleSheet } from "react-native";
import { Colors, Metrics } from "../../../themes";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundApp
  },
  title:{
    color:Colors.black
  },
  subtitle:{
    marginTop:8,
    color:Colors.black
  },
  close:{
    paddingTop:Metrics.closeButtonPaddingTop,
    width:Metrics.icons.medium,
    height:Metrics.icons.medium
  },
  textSubmit:{
    color:Colors.white,
  },
  button:{
    marginTop:30,
    backgroundColor: Colors.orange,
    marginLeft:30,
    marginRight:30,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  errorText:{
    marginTop:16,
    marginLeft:6,marginRight:6,
    color:Colors.error,
  },
  emailInput:{marginTop:30,marginLeft:6,marginRight:6}
});
