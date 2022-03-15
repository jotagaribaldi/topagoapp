import { View, Alert, Text, StyleSheet, ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react';
import firebase from "../../config/firebase/firebaseconfig";
import { useNavigation } from '@react-navigation/native';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import CustomMaskInput from '../../components/CustomMaskInput';
import RadioButtons from '../../components/RadioButtons';
//import SocialSignInButtons from '../../components/SocialSignInButtons/SocialSignInButtons';
const SignUpScreen = () => {

    const database = firebase.firestore()
    
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCPF] = useState('');
    const [celular, setCelular] = useState('');
    const [password, setPassword] = useState('');
    const [codigoPromo, setCodigoPromo] = useState('');
    const navigation = useNavigation();
    const [selected, setSelected] = useState(0);

    const [placeholderSelected, setPlaceholderSelected] = useState('CPF');
    const [masktypeSelected, setMasktypeSelected] = useState('cpf');

    const [placeholderNomeSelected, setPlaceholderNomeSelected] = useState('Nome Completo');


    const [gruParceiroSelect, setGruParceiroSelect] = useState([])
    const [gruParceirofirestore, setgruParceirofirestore] = useState([])   

    const onRegisterPressed = () => {
      //console.warn('Register In');
      navigation.navigate('ConfirmEmail')
    }

    const onSignInPress = () => {
      navigation.navigate('SignIn')
    }

    const onTermosdeUsoPressed = () => {
      console.warn('Termos de Uso');
    }

    const onPqPedimosCpfPressed = () => {
      Alert.alert("Por que pedir meu CPF/CNPJ?", "O CPF/CNPJ serve para sua segurança. É a partir dele que o lojista atribui o seu cashback na loja.");
    }


  useEffect(()=> {
  database.collection("grupoparceria").orderBy('codigo').onSnapshot((query) => {
      let daddos = [];
      query.forEach((doc)=>{
          
         daddos.push({...doc.data(), id: doc.id})
         const gruparc  = {
             id: doc.id,
             grupoparceiro: doc.data().grupoparceiro,
         };
       
      })
      setgruParceirofirestore(daddos);
      console.log(daddos);
})
}, []); 

    

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.root} >
      
      <Text style={styles.title}>Criar Nova Conta</Text>
      <RadioButtons options={['CPF', 'CNPJ']} selected={selected}  
                    onChangeSelect={(opt, i) => { alert('Opcao: '+opt);
                                                  setSelected(i); 
                                                  setPlaceholderSelected(opt);
                                                  setMasktypeSelected(opt.toLowerCase());
                                                  setPlaceholderNomeSelected(opt == 'CPF' ? 'Nome Completo' : 'Razão Social')
                                                }
                                    } />
      <CustomMaskInput placeholder={placeholderSelected} value={cpf} type={masktypeSelected} setValue={setCPF} secureTextEntry={false}/>  
      <CustomInput placeholder={placeholderNomeSelected} value={username} setValue={setUsername} secureTextEntry={false}/>
      <CustomMaskInput placeholder="Telefone Celular" value={celular} type="cel-phone" setValue={setCelular} secureTextEntry={false}/>  
      <CustomInput placeholder="Email" value={email} setValue={setEmail} secureTextEntry={false}/>
      <CustomInput placeholder="Senha" value={password} setValue={setPassword} secureTextEntry={true}/>
      <CustomInput placeholder="Código Promocional" value={codigoPromo} setValue={setCodigoPromo} secureTextEntry={false}/>
      <CustomButton text="Criar Usuário" onPress={onRegisterPressed}/>
      <Text style={styles.text}>Ao se cadastrar, você aceita os nossos <Text style={styles.link} onPress={onTermosdeUsoPressed}>Termos de Uso</Text></Text> 

      <Text style={styles.link} onPress={onPqPedimosCpfPressed}>Por que pedimos seu CPF?</Text> 

     { /* <SocialSignInButtons/> */ }
      
      <Text style={styles.text}>Já tem uma conta? <Text style={styles.link} onPress={onSignInPress}>Faça Login já!</Text></Text> 
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
    link: {
        color: '#051C63',
    },
    text: {
        color: 'gray',
        marginVertical: 10,
        
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#457d58',
        margin:18

    }, 
    horizontal:{
      flexDirection:'row',
      alignItems: 'center',
    },
    vertical:{
      alignItems: 'center',
    }
})

export default SignUpScreen