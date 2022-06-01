import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import firebase from "../../config/firebase/firebaseconfig";
//import { useNavigation } from '@react-navigation/native';




const logoutfb = async () => {
  //  const navigation = useNavigation();
    console.log('saindo..')
    try{
    await firebase.auth().signOut(); 
    }catch(e) {
      console.log(e)    
    }
  }

  //const navigation = useNavigation();
const Logout = () => {
  return (
    <View  style={styles.container}>
      <Text>Confirma Saida?</Text>
      <TouchableOpacity style={styles.buttonSair} onPress={()=>{ logoutfb() }}>
          <Text style={ styles.textButtonSair } >Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Logout

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    textButtonSair: {
      color:"#ffffff"
    },
    buttonSair: {
      width: 200,
      height: 50,
      justifyContent: "center",
      alignContent: "center",
      backgroundColor: "#ff0000",
      borderRadius: 50,
      alignItems: "center",
      marginTop:30
    }
  });