import { View } from 'react-native'
import { Picker } from "@react-native-picker/picker"
import React from 'react'

const CustomPicker = () => {
  return (
    <View style={styles.container}>
      <Text>CustomPicker</Text>
    </View>
  )
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        width: '100%',
        borderColor:'#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 5, 
    },
    input: {},
});
export default CustomPicker