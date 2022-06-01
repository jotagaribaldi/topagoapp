import { View , Text , StyleSheet, StatusBar, Dimensions, SafeAreaView} from 'react-native'
import React, { useState, useEffect } from 'react'
import { WebView } from 'react-native-webview'
import firebase from '../../config/firebase/firebaseconfig'
import { FontAwesome5 } from '@expo/vector-icons'
import ListaHorizont from '../../components/ListaHorizont'

const HomeLogado = () => {

  const database = firebase.firestore();
  const [dataImg, setDataImg] = useState([])
  const [userInfo, setUserInfo] = useState([])
  const [loading, setLoading] = useState(true)

  const userlog = firebase.auth().currentUser;
  const urlcs = 'https://www.condominiolivre.com.br/app/consultsaldotopago.php?uid='+ userlog.uid + '';
  

    

      const getUser = async() => {
        await database
        .collection('usuarios')
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((documentSnapshot) => {
          if( documentSnapshot.exists ) {
          //  console.log('User Data', documentSnapshot.data());
            setUserInfo(documentSnapshot.data());
               
          }
        })
        console.log(userInfo)
      }

     const getPromocionais = async() => {
      await database.collection('promocionais').where("ativo", "==", true).get()
        .then(querySnapshot => {
          let dpromos = [];
          querySnapshot.forEach((doc) => {
           // console.log(doc.id, '=> ', doc.data());
            const prom = {
              id: doc.id,
              color: doc.data().color,
              ativo: doc.data().ativo,
              dateinsert: doc.data().dateinsert,
              textpromo: doc.data().textpromo,
              urlimage: doc.data().urlimage,
            }
            dpromos.push(prom)
            
            
          })
          setDataImg(dpromos)
          console.log(dataImg)
          if (loading) {
            setLoading(false);
          }
    })
    .catch((e) =>{
      console.log(e)
    })
    
  }   

  useEffect(() => {
    getUser();
    getPromocionais();
  },[loading]); 


  return (
    
     
    <SafeAreaView
        style={{ flex: 1, backgroundColor: '#f6f6e9'}}
        showsVerticalScrollIndicator={false}>
         
        <StatusBar
        animated={true}
        backgroundColor="#457d58"/>

          <View style={{ height: Dimensions.get('window').height / 10,  backgroundColor: '#f6f6e9' }}>
        <FontAwesome5 name="user-circle" size={28} color="black" style={{ marginTop: 10, marginLeft: 35, backgroundColor: '#f6f6e9' }}/>
          <Text style={styles.saudacoes}>Olá {userInfo.nomeUser} </Text>
          <Text style={styles.grupoparc}>{userInfo.grupoparceiro}</Text>
        </View>
        
          <View style={{ flex: 1, backgroundColor: '#457d58', height: Dimensions.get('window').height / 5}}>
          <WebView
              source={{uri: urlcs}}
              style={{height: 30}}
          />
          </View>
          <View style={styles.bottonView}>
              <View  style={{padding:40}}>
              </View>
              <View>
                <Text style={styles.titleOfertas}>Ofertas do Dia</Text>
                <ListaHorizont data={dataImg == null ? console.log('to zerado') : dataImg }/>  
              </View>
          </View>
    </SafeAreaView>
     
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
  titlesaldo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fffcce',
    margin:20
  },
  link: {
    color: '#051C63',
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  brandView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
  },
  brandViewText: {
    textTransform: 'uppercase',
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  bottonView: {
      flex: 1.5,
      backgroundColor: '#f6f6e9',
      bottom: 50,
      borderTopStartRadius:60,
      borderTopEndRadius: 60,
  },
  saudacoes: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#457d58',
    marginLeft: 75,
    marginVertical:-25
  },  
  titleOfertas: {
    fontSize: 24,
    flex: 1,
    fontWeight: 'bold',
    color: '#457d58',
    margin:20
  },
  grupoparc: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#457d58',
    marginLeft: 75,
    marginVertical:22
  },  

})


export default HomeLogado

 