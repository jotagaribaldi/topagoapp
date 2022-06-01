import { View, Text, Button, StyleSheet, Alert, Image, useWindowDimensions  } from 'react-native'
import React , { useState, useEffect } from 'react'
import firebase from '../../config/firebase/firebaseconfig'
import { BarCodeScanner } from 'expo-barcode-scanner';
import uuid from 'react-native-uuid';


const cover =  "http://topago.com.br/assets/img/promodestak/produto-promo-sqr.png";

const dimensions = {
  with: 400,
  height: 160,
};
const ratio = dimensions.height / dimensions.with;

const Scanqr = () => {

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Aponte para QR Code');
  const userlog = firebase.auth().currentUser;
  const database = firebase.firestore()


  const window = useWindowDimensions();

  const width = window.width;
  const height = width * ratio;

  const askForCameraPermission = () => {
    (async () => {
        const { status } = await  BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status == 'granted')
    }) ()

  }

  useEffect(() => {
    askForCameraPermission();

  }, []);

  const handleBarCodeScanned = ({type, data}) => {
    setScanned(true);
    setText(data);
    Alert.alert('Leitura realizada',
    'A Leitura foi realizada com sucesso. Esta NFCe foi emitida em regime de contingência. Aguarde o prazo de até 48h para que a mesma seja informada pelo estabelecimento a Receita Estadual. Em breve seu saldo estará atualizado.');
   // const myUuid = uuid.v4();
   //console.log('userid: ' + userCredential.user);
    database.collection("leituras").doc(uuid.v4()).set({
      urlQR: data,
      uideng: userlog.uid,
      status: null,
      emaillog: userlog.email,
      readedAt: firebase.firestore.FieldValue.serverTimestamp()
    })
  }


  if (hasPermission === null) {
    return(
      <View style={styles.container}>
      <Text>Requisitando acesso a camera</Text>
    </View>  
    )
  }

  if (hasPermission === false) {
    return(
      <View style={styles.container}>
      <Text style={{margin:10}}>Sem acesso a camera</Text>
      <Button title={'Allow Camera'} onPress={() => askForCameraPermission()}></Button>
    </View>  
    )
  }

  return (
    <View style={styles.container}>
      <Image style={{ width, height }} source={ {uri: cover } }/>
      <View style={styles.barcodebox}>
        <BarCodeScanner onBarCodeScanned={scanned ? undefined  : handleBarCodeScanned} 
          style={{height: 400, width: 400, marginBottom: 30}}
        />  
       </View>   
       <Text style={styles.maintext}>{text}</Text>
       { scanned && <Button title={'Ler Novamente'} style={styles.buttonler}   onPress={() => setScanned(false)} color='tomato'/>}
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonler: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'green',
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center', 
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'tomato'
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  }
})
export default Scanqr