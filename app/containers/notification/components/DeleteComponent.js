import React, { PureComponent } from 'react'
import { Text, View ,StyleSheet} from 'react-native'
import { Fonts, Colors } from '../../../themes';

class DeleteComponent extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Text 
            style={[styles.text,Fonts.style.mediumBold]}
        > 
            {this.props.textButton} 
        </Text>
      </View>
    )
  }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        borderRadius:2,
        marginRight:14,
        justifyContent:'center',
        alignItems:'center',
        marginTop:16,
        backgroundColor:Colors.red
    },
    text:{
        color:Colors.white
    }
})
export default DeleteComponent