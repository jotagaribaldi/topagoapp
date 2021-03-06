import { View, Text, StyleSheet, useWindowDimensions, ScrollView } from 'react-native'
import React, {useState} from 'react'
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const ConfirmEmailScreen = () => {
     
    const [code, setCode] = useState('');
    const navigation = useNavigation();


    const onConfirmPressed = () => {
     // console.warn('Confirmar In');
      navigation.navigate('HomeScreen');
    }

    const onResendPress = () => {
      console.warn('Reenviar Codigo');
    }

    const onSignInPress = () => {
      navigation.navigate('SignIn');
    }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.root}>
      
    <Text style={styles.title}>Confirme seu email</Text>
      
      <CustomInput placeholder="Código recebido" value={code} setValue={setCode} secureTextEntry={false}/>
      <CustomButton text="Confirmar conta" onPress={onConfirmPressed}/>
       
 
      <CustomButton text="Reenviar Código" 
                    onPress={onResendPress} 
                    type="SECONDARY"
                    />
      <CustomButton text="Voltar para Login" 
                    onPress={onSignInPress} 
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

export default ConfirmEmailScreen