import { View, Image, Text, StyleSheet, useWindowDimensions, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react';
import Logo from '../../../assets/logo.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native';
import firebase from "../../config/firebase/firebaseconfig";
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { StackActions } from '@react-navigation/native';
import { Alert } from 'react-native-web';

const SignInScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorLogin, setErrorLogin] = useState("")
    
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPwd, setErrorPwd] = useState("")


    const { height } = useWindowDimensions();
    const navigation = useNavigation();
  const [errom, setErrom] = useState("");
  const [erroc, setErroc] = useState("")

    const onSignInPressed = () => {
      if (!isValidEmail(username) || username.length < 4 || !username.trim()) {
        setErrorEmail(true) 
        setErrorPwd(false)
      } else if (password.length < 2 || !password.trim()) {
        setErrorPwd(true)
        setErrorEmail(false) 
      }  else {  
      firebase.auth().signInWithEmailAndPassword(username, password )
      .then((userCredential) => {
          let user = userCredential.user;
          navigation.navigate("Routes", {idUser: user.uid} )
      })
      .catch((error) => {
          setErrorLogin(true) 
           
          let errorCode = error.code;
          let errorMessage = error.message;

          setErrom(errorMessage);
          setErroc(errorCode)
  })
  }

  }


  useEffect(()=> {
      
      firebase.auth().onAuthStateChanged((user) => {
          if (user) {
              navigation.navigate("Routes", { idUser: user.uid } )
          }   else {
            navigation.dispatch(
              StackActions.popToTop()
            );
      
          }
            
        });

   }, []);

 

    const onForgotPasswordPressed = () => {
      //console.warn('Esqueci Senha');
      navigation.navigate('ForgotPassword');
    }

     


    const onSignUpPress = () => {
      //console.warn('Criar nova conta');
      navigation.navigate('SignUp');
    }

    const isValidEmail = (value) => {
      const regx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      return regx.test(value)
    }

    


  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.rootscv}>
    <View style={styles.root}>
      <Image source={Logo} style={[styles.logo, 
              {height: height * 0.3}]} resizeMode="contain" /> 
      <CustomInput placeholder="E-mail" value={username} setValue={setUsername}  secureTextEntry={false} />
      <CustomInput placeholder="Senha" value={password} setValue={setPassword} secureTextEntry={true}/>
      {errorLogin === true
                ?
                    <View style={styles.contentAlert}>
                        <MaterialCommunityIcons
                            name="alert-circle"
                            size={27}
                            color="#ff0000"
                        />
                        <Text style={styles.warningAlert}>Email ou senha sao incorretos</Text>    
                         
                    </View>
                :
                <View></View>
            }   
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
          {  errorPwd === true
                ?
                <View style={styles.contentAlert}>
                        <MaterialCommunityIcons
                            name="alert-circle"
                            size={27}
                            color="#ff0000"
                        />
                        <Text style={styles.warningAlert}>Sua senha é invalida</Text>    
                    </View>
                :
                <View></View>
          } 
      <CustomButton text="Login" onPress={onSignInPressed}/>
      <CustomButton text="Esqueceu a Senha?" onPress={onForgotPasswordPressed} type="TERTIARY"/>
      
    { /* <SocialSignInButtons/> */ }

      <CustomButton text="Não tem uma conta? Crie a sua já" 
                    onPress={onSignUpPress} 
                    type="SECONDARY"
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
    logo: {
        width: '70%',
       // height: '70%',
        maxHeight: 200,
        maxWidth: 300,
    },
    link: {
      color: '#051C63',
    },
    contentAlert: {
      marginTop:5,
      flexDirection:"row",
      justifyContent: "center",
      alignItems: "center",
  },
  warningAlert:{
      paddingLeft: 10,
      fontSize: 16,
      color: "#ff0000",
  },
   
})

export default SignInScreen