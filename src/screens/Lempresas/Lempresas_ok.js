import React, { useState, useEffect, Component, useReducer } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, Image, TextInput, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import firebase from '../../config/firebase/firebaseconfig'

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
    <ScrollView
        style={{ flex: 1, backgroundColor: '#f6f6e9'}}
        showsVerticalScrollIndicator={false}>
     <StatusBar animated={true} backgroundColor="#457d58"/>
     <TextInput
                style={styles.inputText}
                placeholder="Pesquisar por empresa, cidade ou segmento"
                placeholderTextColor="#c4c4c4"
                value={searchText}
                onChangeText={(t) => setSearchText(t) }
            >
        </TextInput>  
        <FlatList 
            showsVerticalScrollIndicator={false} 
            data={lempresas} renderItem={ ( { item }) => {
                return(
                <View style={styles.Citys}>
                    <TouchableOpacity style={styles.itemempr}>
                        <Image source={{ uri: item.logomarca }} style={styles.itemLogo}/> 
                    </TouchableOpacity> 
                  
                    <Text 
                        style={styles.DescriptionCity}
                        
                    >
                         {item.nomeFantasia}  - {item.segmento} {'\n'}
                         {item.porcentdesc} de Cashback{'\n'}Fone: {item.fone} {'\n'}
                        {item.endereco} - {item.cidade} 
                    </Text>   
                </View>)
            } } keyExtractor = {(item) => item.id}/> 
    </ScrollView>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:60,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
        marginTop:6

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
        borderBottomColor: "#0000ff"
    },
    itemLogo: {
        width: 90,
        height: 90,
        borderRadius:45,
        justifyContent:"center",
        paddingLeft: 15,
        left: 20
    }
});

export default Lempresas