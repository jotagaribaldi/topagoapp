import { View, Text, StyleSheet, useWindowDimensions, ScrollView } from 'react-native'
import React, {useState} from 'react'
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const ForgotPasswordScreen = () => {
     
    const [emailUser, setEmailUser] = useState('');
    const navigation = useNavigation();

    const onSendPressed = () => {
      navigation.navigate('NewPassword')
    }

    const onBackLoginPress = () => {
     // console.warn('Voltar pra tela login');
     navigation.navigate('SignIn')
    }

   

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.root}>
      
    <Text style={styles.title}>Resetar minha senha</Text>
      
      <CustomInput placeholder="Email" value={emailUser} setValue={setEmailUser} secureTextEntry={false}/>
      <CustomButton text="Enviar" onPress={onSendPressed}/>
       
 
      
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
})

export default ForgotPasswordScreen