import { View, Alert, Text, StyleSheet, ScrollView, Linking , ActivityIndicator, Platform } from 'react-native'
import React, {useState, useEffect} from 'react';
import firebase from "../../config/firebase/firebaseconfig";
import { useNavigation } from '@react-navigation/native';

import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import CustomMaskInput from '../../components/CustomMaskInput';
import RadioButtons from '../../components/RadioButtons';
import DropDownPicker from 'react-native-dropdown-picker';

//import SocialSignInButtons from '../../components/SocialSignInButtons/SocialSignInButtons';
const SignUpScreen = () => {

   
    const [show, setShow] = useState(false)
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [cpf, setCPF] = useState('');
    const [celular, setCelular] = useState('');
    const [password, setPassword] = useState('');
    const [codigoPromo, setCodigoPromo] = useState('');
    const navigation = useNavigation();

    const database = firebase.firestore()


    const [selected, setSelected] = useState(0);

    const [placeholderSelected, setPlaceholderSelected] = useState('CPF');
    const [masktypeSelected, setMasktypeSelected] = useState('cpf');

    const [placeholderNomeSelected, setPlaceholderNomeSelected] = useState('Nome Completo');

    const [errorRegister, setRegister] = useState("")
    const [gruParceiroSelect, setGruParceiroSelect] = useState("")
    const [gruParceirofirestore, setgruParceirofirestore] = useState([])   


    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
   // const [items, setItems] = useState([]);
   const [errorCPF, setErrorCPF] = useState("")

    const isValidCPF = (value) => {
        const limpacpf = value.replace('.','').replace('.','').replace('-','');
        const firstpartcpf = limpacpf.substr(0,9);
        const secondpartcpf = limpacpf.substr(0,10);
        let somanumfp = 0; let somanumsp = 0; let multip = 10; let restofp = 0; let restosp = 0;

        for(let i = 0; i < firstpartcpf.length; i++){
            let numb1 = firstpartcpf.substr(i,1);
            somanumfp += numb1 * multip;
            multip--;
        }
        multip = 11;
        for(let i = 0; i < secondpartcpf.length; i++){
          let numb2 = secondpartcpf.substr(i,1);
          somanumsp += numb2 * multip;
          multip--;
      }
        restofp = ((somanumfp * 10) %  11)
        restosp = ((somanumsp * 10) %  11)
       // console.log(restofp)
        //console.log(restosp)
        if(restofp.toString() + restosp.toString() == limpacpf.substr(9,2)){
          return true
        }else {
          return false
        }
    }

    const onRegisterPressed = () => {
      if (!isValidCPF(cpf)) {
        setErrorCPF(true)
        console.log("Erro no CPF")
        Alert.alert("Erro no cadastro", "O documento CPF/CNPJ informado é inválido")
      }  else {  
      setShow(true)
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
          let user = userCredential.user;
          database.collection("usuarios").doc(user.uid).set({
              tipouser: ( selected == 0 ? 'CPF' : 'CNPJ' ),
              nomeUser: username,
              documUser: cpf,
              foneUser: celular,
              emailUser: email,
              grupoparceiro: gruParceiroSelect,
              codigoIndica: codigoPromo,
              platformuser: Platform.OS,
              dataCadastro: firebase.firestore.FieldValue.serverTimestamp(),
              userFire: user.uid
          })
          setShow(false) 
        navigation.navigate("Routes", {idUser: user.uid} )
        //navigation.navigate('ConfirmEmail')
      })
      .catch((error) => {
          console.log(error)
          setRegister(true)
          let errorCode = error.code;
          let errorMessage = error.message;
      })
    }
      
    }

    const onSignInPress = () => {
      navigation.navigate('SignIn')
    }

    const onTermosdeUsoPressed = () => {
      Linking.openURL('https://suprema.eti.br/termos-de-uso-aplicativo-topago/')
    }

    const onPqPedimosCpfPressed = () => {
      Alert.alert("Por que pedir meu CPF/CNPJ?", "O CPF/CNPJ serve para sua segurança. É a partir dele que o lojista atribui o seu cashback na loja.");
    }

 

   useEffect(()=> {
    database.collection("grupoparcerias").orderBy("value").onSnapshot((query) => {
      let daddos = [];
        query.forEach((doc)=>{
          daddos.push({...doc.data(), /* id: doc.id */ })
        }) 
        setgruParceirofirestore(daddos)
        })
    }, []); 
 
    

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.rootscv}>
    <View style={styles.root} >
      
      <Text style={styles.title}>Criar Nova Conta</Text>
      <RadioButtons options={['CPF', 'CNPJ']} selected={selected}  
                    onChangeSelect={(opt, i) => { /*alert('Opcao: '+opt); */
                                                  setSelected(i); 
                                                  setPlaceholderSelected(opt);
                                                  setMasktypeSelected(opt.toLowerCase());
                                                  setPlaceholderNomeSelected(opt == 'CPF' ? 'Nome Completo' : 'Razão Social')
                                                }
                                    } />
      <CustomMaskInput placeholder={placeholderSelected} value={cpf} type={masktypeSelected} setValue={setCPF} secureTextEntry={false}/>  
      <CustomInput placeholder={placeholderNomeSelected} value={username} setValue={setUsername} secureTextEntry={false}/>
      <CustomMaskInput placeholder="Telefone Celular" value={celular} type="cel-phone" setValue={setCelular} secureTextEntry={false} />  
      <CustomInput placeholder="Email" autoCapitalize='none' value={email} setValue={setEmail} secureTextEntry={false}/>
      <CustomInput placeholder="Senha" autoCapitalize='none' value={password} setValue={setPassword} secureTextEntry={true}/>
      <DropDownPicker
          open={open}
          value={value}
          placeholder="Selecione..."
          items={gruParceirofirestore}
          setOpen={setOpen}
          setValue={setValue}
          style={styles.container}
          onSelectItem={(item) => {
            let grupocond = item.label;
            setGruParceiroSelect(grupocond);  
          }}
      />
      <CustomInput placeholder="Código Indicação" value={codigoPromo} setValue={setCodigoPromo} secureTextEntry={false}/>
      <ActivityIndicator size="large" color="#457d58" animating={show}/>
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
    rootscv: {
      backgroundColor: '#f6f6e9'
    },
    link: {
        color: '#051C63',
    },
    text: {
        color: 'gray',
        marginVertical: 10,
        
    },
    container: {
      backgroundColor: '#ffffff',
      width: '100%',
      borderColor:'#e8e8e8',
      borderWidth: 1,
      borderRadius: 5,
      paddingHorizontal: 10,
      marginVertical: 5, 
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