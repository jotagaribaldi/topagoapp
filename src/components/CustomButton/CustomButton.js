import { View, Text, StyleSheet, Pressable  } from 'react-native'
import React from 'react'

const CustomButton = ({ onPress, text, type="PRIMARY", bgColor, fgColor }) => {
  return (
    <Pressable onPress={onPress} 
      style={[styles.container, 
      styles[`container_${type}`],
      bgColor ? {backgroundColor: bgColor} : {} 
      ]}>
      <Text style={[
            styles.text ,
            styles[`text_${type}`],
            fgColor ? {color: fgColor} : {}
            ]}>{text}</Text>
    </Pressable>
  )
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 15,
        marginVertical: 5, 
        borderColor:'#e8e8e8',
        borderRadius: 5,
        alignItems: 'center',   
    },

    container_PRIMARY: {
        backgroundColor: '#457d58',
       /* width: '100%',
        padding: 15,
        marginVertical: 5, 
        borderColor:'#e8e8e8',
        borderRadius: 5,
        alignItems: 'center',   */
    },
    container_SECONDARY: {
        borderColor:'#457d58',
        borderWidth: 2,
    },
    container_TERTIARY: {
      /*  backgroundColor: '#457d58',
        width: '100%',
        padding: 15,
        marginVertical: 5, 
        borderColor:'#e8e8e8',
        borderRadius: 5,
        alignItems: 'center',   */
    },
    text: {
        fontWeight: 'bold',
        color:'white'
    },
    text_SECONDARY: {
      color:'#457d58'
  },
    text_TERTIARY: {
        color:'gray'
    },
});

export default CustomButton