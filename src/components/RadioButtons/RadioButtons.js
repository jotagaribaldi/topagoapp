import { View, Text, TextInput, StyleSheet,TouchableOpacity } from 'react-native'
import React from 'react'

const RadioButtons = ({ options=[], onChangeSelect, selected, value, setValue  }) => {
  return (
    <View style={styles.container}>
      {
          options.map((opt, index) => (
              <TouchableOpacity onPress={() => onChangeSelect(opt,index)} key={index} style={styles.optContainer}>
                  <View style={styles.outlineCircle}>
                    { selected == index &&  <View style={styles.innerCircle}/> } 
                  </View>
                  <Text style={styles.txti}>{opt}</Text>
              </TouchableOpacity>
          ))

      }
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
        flexDirection: 'row',
        paddingHorizontal: 10,
        marginVertical: 5, 
    },
    outlineCircle: {
        width: 20,
        height: 20,
        borderRadius:10,
        borderColor: '#777',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    optContainer:{
        flexDirection:'row',
        alignItems: 'center', 
        marginHorizontal: 10
    }, 
    innerCircle:{
        width: 10,
        height: 10,
        borderRadius:5,
        backgroundColor: '#444',
        
    }, 
    txti:{
        fontSize: 14,
        marginLeft:6,
    }
});
export default RadioButtons