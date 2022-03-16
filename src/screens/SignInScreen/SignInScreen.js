import { View, Image, StyleSheet, useWindowDimensions, ScrollView } from 'react-native'
import React, {useState} from 'react';
import Logo from '../../../assets/logo.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import SocialSignInButtons from '../../components/SocialSignInButtons';
import { useNavigation } from '@react-navigation/native';
const SignInScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { height } = useWindowDimensions();
    const navigation = useNavigation();
    const onSignInPressed = () => {
      //console.warn('Sign In');
      // apos validar usuario....
      navigation.navigate('HomeScreen');
    }

    const onForgotPasswordPressed = () => {
      //console.warn('Esqueci Senha');
      navigation.navigate('ForgotPassword');
    }

     


    const onSignUpPress = () => {
      //console.warn('Criar nova conta');
      navigation.navigate('SignUp');
    }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.root}>
      <Image source={Logo} style={[styles.logo, 
              {height: height * 0.3}]} resizeMode="contain" /> 
      <CustomInput placeholder="E-mail" value={username} setValue={setUsername} iconType="lock" secureTextEntry={false} iconType="lock"/>
      <CustomInput placeholder="Senha" value={password} setValue={setPassword} secureTextEntry={true}/>
      <CustomButton text="Login" onPress={onSignInPressed}/>
      <CustomButton text="Esqueceu a Senha?" onPress={onForgotPasswordPressed} type="TERTIARY"/>
      
    { /* <SocialSignInButtons/> */ }

      <CustomButton text="Não tem uma conta? Crie a sua já" 
                    onPress={onSignUpPress} 
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
    logo: {
        width: '70%',
       // height: '70%',
        maxHeight: 200,
        maxWidth: 300,
    },
    link: {
      color: '#051C63',
    },
   
})

export default SignInScreen