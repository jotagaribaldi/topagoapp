import { SafeAreaView,  ScrollView, FlatList, StyleSheet } from 'react-native'
import React from 'react'
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes'


const Empresas = () => {
  return (
   <Text>Alfa</Text>
  )
}

export default Empresas

const styles = StyleSheet.create({
  root: {
      alignItems: 'center',
      padding: 20,
      backgroundColor: '#f6f6e9'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#457d58',
    margin:18
  },
  link: {
    color: '#051C63',
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  container: {
    flex:1,
    backgroundColor:"#fff",
  },
})