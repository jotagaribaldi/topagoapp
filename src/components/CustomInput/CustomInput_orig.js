import { View, TextInput, StyleSheet } from 'react-native'
import React from 'react'

const CustomInput_orig = ({ value, setValue, placeholder, secureTextEntry, iconType }) => {
  return (
    <View style={styles.container}>
       <TextInput {...props} placeholder='placeholder' 
                 value={value} 
                 onChangeText={setValue}
                 iconType={iconType}
                 placeholder={placeholder}
                 style={styles.input}
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
    input: {},
});
export default CustomInput_orig