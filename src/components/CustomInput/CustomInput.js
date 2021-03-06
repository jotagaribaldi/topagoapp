import { View, TextInput, StyleSheet } from 'react-native'
import React from 'react'

const CustomInput = (props) => {
  const { value, setValue, placeholder, secureTextEntry, iconType } = props
  return (
    <View style={styles.container}>
      <TextInput {...props} 
                 value={value} 
                 onChangeText={setValue}
                 iconType={iconType}
                 placeholder={placeholder}
                 style={styles.input}
                 placeholderTextColor='black'
                 secureTextEntry={secureTextEntry}/>
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
    input: {  height: 40, },
});
export default CustomInput