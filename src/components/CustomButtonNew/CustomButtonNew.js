import { View, Text, StyleSheet, Pressable  } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CustomButtonNew = ({ focused, size }) => {
    return (
    <View style={[styles.container, {backgroundColor: focused ? '#457d58' : '#457d0c'}]}>
        <MaterialCommunityIcons name="qrcode-scan" color={ focused ? '#FFF' : '#f8f8f8' } size={ size }/>
    </View>
    )
  }
  
  
  const styles = StyleSheet.create({
      container: {
            width: 60,
            height: 60,
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 20, 
      },
  
       
  });
  
  export default CustomButtonNew