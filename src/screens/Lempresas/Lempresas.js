import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, Image, TextInput, StyleSheet, SafeAreaView, FlatList, Dimensions } from 'react-native'
import firebase from '../../config/firebase/firebaseconfig'
import FlatListSeparator from '../../components/FlatListSeparator';
import HeaderImageDestak from '../../components/HeaderImageDestak';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';

const database = firebase.firestore()


const Lempresas = () => {

  const [searchText, setSearchText] = useState("");
  const [flatLempresa, setFlatEmpresa] = useState([]);
  const [lempresas, setEmpresa] = useState([])
  
  useEffect(()=> {
    database.collection("empresas").onSnapshot((query)=>{
        const listempresas = []
        query.forEach((doc)=>{
            listempresas.push({ ...doc.data(),id:doc.id})
        })
        setEmpresa(listempresas)
        setFlatEmpresa(listempresas)
    })
  },[])

  useEffect(() => {
    if(searchText === ""){
      setEmpresa(lempresas);
    } else {
      setEmpresa(
        flatLempresa.filter( (item) => item.nomeFantasia.toLowerCase().indexOf(searchText.toLowerCase()) > -1  || item.segmento.toLowerCase().indexOf(searchText.toLowerCase()) > -1 || item.cidade?.toLowerCase().indexOf(searchText?.toLowerCase()) > -1
        )
       );
    }
  }, [searchText])

  return (
   <SafeAreaView
        style={{ flex: 1, backgroundColor: '#f6f6e9', height: Dimensions.get('window').height  }}
   showsVerticalScrollIndicator={false}> 
     <StatusBar animated={true} backgroundColor="#457d58"/>
     <TextInput
                style={styles.inputText}
                placeholder="Pesquisar por empresa, cidade ou segmento"
                placeholderTextColor="#000000"
                value={searchText}
                onChangeText={(t) => setSearchText(t) }
            >
        </TextInput>  
        <FlatList 
            showsVerticalScrollIndicator={false} 
            ListHeaderComponent={HeaderImageDestak}
            ItemSeparatorComponent={FlatListSeparator}
            data={lempresas} renderItem={ ( { item }) => {
                return(
                <View style={styles.container}>
                     
                     <Image source={{ uri: item.logomarca }} style={{ width: 120, height: 100 }}/> 
                       
                     <View style={styles.content}>                
                    <Text style={{ textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>{item.nomeFantasia}</Text>
                    <Text style={styles.description}>{item.segmento}</Text>    
                    <Text style={styles.descriptioncashback}><Feather size={16} name="arrow-right-circle"  />{item.porcentdesc} de Cashback</Text>        
                    <Text style={{ textAlign: 'center'}} ><Feather size={14} name="more-horizontal" /><Feather size={14} name="more-horizontal" /><Feather size={14} name="more-horizontal" /><Feather size={14} name="more-horizontal" /><Feather size={14} name="more-horizontal" /></Text>        
                    <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold'}}><Feather size={16} name="phone-call"/> {item.fone} </Text>
                    <Text style={{ textAlign: 'center'}} ><MaterialCommunityIcons size={16} name="map-marker-radius"/>{item.endereco}</Text>
                    <Text style={{ fontWeight: "bold", textAlign:"center",}}>{item.cidade}</Text>   
                    </View>    
                </View>)
            } } keyExtractor = {(item) => item.id}/> 
    </SafeAreaView>
  )
}



const styles = StyleSheet.create({
  
  DescriptionCity: {
    width:"60%",
    alignContent: "flex-start",
    backgroundColor: "#DAF0FF",
    padding:12,
    paddingHorizontal: 20,
    borderRadius: 50,
    marginBottom: 5,
    marginRight: 50,
    color: "#282bd5"
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
    itemLogo: {
        width: 90,
        height: 90,
        borderRadius:45,
        justifyContent:"center",
        paddingLeft: 15,
        left: 20
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
  
    title: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#6F4E37",
      marginBottom: 16,
    },
    description: {
      fontSize: 16,
      color: "#457d58",
      fontStyle: "italic", 
      textAlign:"center",
    },
    descriptioncashback: {
      fontSize: 16,
      color: "#0000ff",
      fontStyle: "italic",
      fontWeight:"bold",
      textAlign:"center",
    },


});

export default Lempresas