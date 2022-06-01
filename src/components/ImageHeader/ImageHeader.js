import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import React from 'react'


const win = Dimensions.get('window');
const ImageHeader = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.stretch}
        source={require('../../../assets/logo.png')}
      />
    </View>
  )
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    stretch: {
      width: win.width,
      height: 200,
      resizeMode: 'stretch',
    },
  });
export default ImageHeader