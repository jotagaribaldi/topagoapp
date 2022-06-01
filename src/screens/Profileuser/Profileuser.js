import { View, Text, StyleSheet, StatusBar, FlatList, Dimensions, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { WebView } from 'react-native-webview'
import firebase from '../../config/firebase/firebaseconfig'
import FlatListSeparator from '../../components/FlatListSeparator';
const Profileuser = () => {

  const userlog = firebase.auth().currentUser;
  const database = firebase.firestore();
  const [leituras, setLeituras] = useState([])
  const [loading, setLoading] = useState(true)

 
  const urlcs = 'https://www.condominiolivre.com.br/app/newcondfree/backend/web/?ViewExtratoUsuarioAppSearch[UIDFireb]='+ userlog.uid + '&r=view-extrato-usuario-app/index';
 

    const getLeiturasnaolancadas = async() => {
      await database.collection('leituras').where("status", "==", null).where("uideng","==", userlog.uid ).get()
        .then(querySnapshot => {
          let dpromos = [];
          querySnapshot.forEach((doc) => {
           
            const prom = {
              id: doc.id,
              emaillog: doc.data().emaillog,
              readedAt: doc.data().readedAt,
              status: doc.data().status,
              uideng: doc.data().uideng,
              urlQR: doc.data().urlQR,
            }
            dpromos.push(prom)
          })
          setLeituras(dpromos)
         
          if (loading) {
            setLoading(false);
          }
    })
    .catch((e) =>{
      console.log(e)
    })
    
    }

    const convertDate = (date) => {
      // whatever formatting you want to do can be done here
      var d = date.toString()
      return d.substr(0, 21);
    }

    const convertOnlyNF =  (nfwhashcode) => {
      if (nfwhashcode){
        var chaveacesso = nfwhashcode.substr(0,44)
        return chaveacesso
        } else {
          return null
        }
    }


    const convertMesAno =  (nftrecho) => {
      if (nftrecho){
        return nftrecho.substr(2,4)
        } 
    }

    const cnpjNota =  (nfcnpj) => {
      if (nfcnpj){
        return nfcnpj.substr(6,14)
        } 
    }

    const numIDNota =  (IDnota) => {
      if (IDnota){
        return IDnota.substr(25,9)
        } 
    }

    useEffect(() => {
      getLeiturasnaolancadas();
      console.log(leituras)
    },[loading]); 


    
  
  return (
    
    <ScrollView  style={{ flex: 1, backgroundColor: '#f6f6e9'}}
    showsVerticalScrollIndicator={false} >
     
    <StatusBar
    animated={true}
    backgroundColor="#457d58"/>
        <Text style={ styles.title }>Notas Lançadas</Text>
        <View style={{ flex: 1, backgroundColor: '#457d58', height: Dimensions.get('window').height / 2.2}}>
          <WebView
              
              source={{uri: urlcs}}
              style={{height: 30}}
          />
          </View>
           
          <Text style={ styles.title }>Notas Aguardando Lançamento</Text>
          <View style={{ flex: 1, alignItems: "center", justifyContent: "center", width: '100%' }}>
          <FlatList 
            showsVerticalScrollIndicator={true} 
            style={{ margin: 5, width: '95%'}}
            ItemSeparatorComponent={FlatListSeparator}
            data={leituras} renderItem={ ( { item }) => {
                return(
                <View style={styles.container }>
                    <View style={styles.content}>  
                      <Text style={{  textAlign: 'justify',  fontWeight: 'bold', fontSize: 13 }} > Nota Num.: {  !convertOnlyNF(item.urlQR.split('?p=')[1]) ? numIDNota(item.urlQR) : numIDNota(convertOnlyNF(item.urlQR.split('?p=')[1]))  } </Text>  
                      <Text style={{  textAlign: 'center', fontWeight: 'bold'}}>Chave de acesso</Text>
                      <Text style={{ textAlign: 'center', fontSize: 12}}>{ !convertOnlyNF(item.urlQR.split('?p=')[1]) ? item.urlQR : convertOnlyNF(item.urlQR.split('?p=')[1]) } </Text>                       
                      <Text style={{  textAlign: 'center' }}>CPNJ Empresa:{ !convertOnlyNF(item.urlQR.split('?p=')[1]) ? cnpjNota(item.urlQR) : cnpjNota(convertOnlyNF(item.urlQR.split('?p=')[1])) } </Text>              
                      <Text style={styles.description}>Data Hora Leitura: {convertDate(item.readedAt.toDate())}</Text>
                    </View>    
                </View>)
            } } keyExtractor = {(item) => item.id}/> 
          </View>
    </ScrollView>
  )
}



const styles = StyleSheet.create({
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#457d58",
      marginTop: 20,
      marginBottom: 10,
      marginLeft: 18
    },
    description: {
      fontSize: 16,
      color: "#457d58",
      fontStyle: "italic", 
      textAlign:"center",
    },
    container: {
      flexDirection: "row",
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      paddingVertical: 20,
    },
  
    content: {
      flex: 1,
      marginLeft: 16,
      
    },
    Citys: {
      width: "100%",
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop:4,
      padding: 12,
  },
  iconButton: {
      color: "#fff",
      fontSize: 25,
      fontWeight: "bold"
  },
  iconButtonLogout: {
      position:"absolute",
      width: 60,
      height: 60,
      bottom: 30,
      right: 20,
      justifyContent: "center",
      alignItems: "center",
      fontWeight: "bold"
  },
  inputText: {
      width:"90%",
      marginTop: 10,
      padding: 10,
      height: 50,
      marginLeft: "auto",
      marginRight: "auto",
      borderBottomWidth: 1,
      borderBottomColor: "#457d58"
  },
  

});

export default Profileuser