import { View, Text, StyleSheet, useWindowDimensions, ScrollView , Alert } from 'react-native'
import React, {useState} from 'react'
import CustomInput from '../../components/CustomInput';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomButton from '../../components/CustomButton';
import firebase from "../../config/firebase/firebaseconfig"; 
import { useNavigation } from '@react-navigation/native';

const ForgotPasswordScreen = () => {
     
    const [emailUser, setEmailUser] = useState('');
    const navigation = useNavigation();
    const [errorEmail, setErrorEmail] = useState("")

    const isValidEmail = (value) => {
      const regx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      return regx.test(value)
    }

    const onBackLoginPress = () => {
     // console.warn('Voltar pra tela login');
     navigation.navigate('SignIn')
    }

    const onSendPressed = () => {
       
      if (!isValidEmail(emailUser) || emailUser.length < 4 || !emailUser.trim()) {
        setErrorEmail(true) 
         
      }  else {  
         
        try {
          firebase.auth().sendPasswordResetEmail(emailUser)
          console.log('Password reset email sent successfully')
          Alert.alert('Um email foi enviado para o endereço informado. Acesse sua caixa de entrada e clique no link para alterar')
          navigation.navigate('SignIn')
        } catch (error) {
        //  actions.setFieldError('general', error.message)
          console.log('Ocorreu um erro na tentativa de recuperar sua senha', error.message)
          Alert.alert('Ocorreu um erro na tentativa de recuperar sua senha')
          navigation.navigate('SignIn')
        }
      }
  }
    

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.rootscv}>
    <View style={styles.root}>
      
    <Text style={styles.title}>Resetar minha senha</Text>
      
      <CustomInput placeholder="Email" value={emailUser} setValue={setEmailUser} secureTextEntry={false}/>
      <CustomButton text="Enviar" onPress={onSendPressed}/>
       
      {  errorEmail === true
                ?
                <View style={styles.contentAlert}>
                        <MaterialCommunityIcons
                            name="alert-circle"
                            size={27}
                            color="#ff0000"
                        />
                        <Text style={styles.warningAlert}>Informe seu email válido</Text>    
                    </View>
                :
                <View></View>
      } 
      
      <CustomButton text="Voltar para Login" 
                    onPress={onBackLoginPress} 
                    type="TERTIARY"
                    />
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f6f6e9'
    },
    rootscv: {
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
    warningAlert:{
      paddingLeft: 10,
      fontSize: 16,
      color: "#ff0000",
    },
    contentAlert: {
      marginTop:5,
      flexDirection:"row",
      justifyContent: "center",
      alignItems: "center",
    },
})

export default ForgotPasswordScreen