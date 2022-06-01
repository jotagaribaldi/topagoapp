import { View, StyleSheet } from 'react-native'
import { TextInputMask } from "react-native-masked-text";
import React from 'react'

const CustomMaskInput = ({ value, setValue, placeholder, type, secureTextEntry, iconType }) => {
  return (
    <View style={styles.container}>
     { /* <TextInput placeholder='placeholder' 
                 value={value} 
                 onChangeText={setValue}
                 iconType={iconType}
                 placeholder={placeholder}
                 style={styles.input}
                 secureTextEntry={secureTextEntry}/> */ }
      <TextInputMask
                style={styles.input}
                placeholder={placeholder}
                type={type}
                onChangeText={setValue}
                placeholderTextColor='black'
                value={value}
                keyboardType="numeric"
            />
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
    input: { height: 40 },
});
export default CustomMaskInput