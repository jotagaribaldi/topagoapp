import { View, Text, StyleSheet, useWindowDimensions, ScrollView } from 'react-native'
import React, {useState} from 'react'
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
const NewPasswordScreen = () => {
    const [code, setCode] = useState('');
    const [newPassword, setnewPassword] = useState('');
    const navigation = useNavigation();
    
    const onSubmitPressed = () => {
      navigation.navigate('HomeScreen')
    }

    const onBackLoginPress = () => {
      navigation.navigate('SignIn')
    }

   

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.root}>
      
    <Text style={styles.title}>Resetar minha senha</Text>
      
      <CustomInput placeholder="Código Recebido" value={code} setValue={setCode} secureTextEntry={false}/>
      <CustomInput placeholder="Informe a nova senha" value={newPassword} setValue={setnewPassword} secureTextEntry={true}/>
      <CustomButton text="Trocar Senha" onPress={onSubmitPressed}/>
       
 
      
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

export default NewPasswordScreen