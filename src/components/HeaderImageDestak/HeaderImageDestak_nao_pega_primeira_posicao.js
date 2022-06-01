import React, { useState, useEffect } from "react";
import { Image, useWindowDimensions, StyleSheet, } from "react-native";
import firebase from '../../config/firebase/firebaseconfig'




const HeaderImageDestak = () => {

    
    const [imgDest, setimgDest] = useState([])
    const [loading, setLoading] = useState(true)
    //const [pict, setPict] = useState("")
    const window = useWindowDimensions();

    const width = window.width;
    const height = width * ratio; 

    useEffect(() => {
      getImgdesk();
  
    },[loading]); 
   
  const cover =  imgDest.logomarca792x396 

 
  
  const getImgdesk = async() => {
    const database = firebase.firestore();
    await database
    .collection("empresadestaque")
    .where("ativo", "==", true)
    .get()
    .then((querySnapshot) => { 
      let destakemp = [];
      querySnapshot.forEach((doc) => {
        const promdesk = {
          id: doc.id,
          ativo: doc.data().ativo,
          datainsert: doc.data().datainsert,
          textochamada: doc.data().textochamada,
          logomarca792x396: doc.data().logomarca792x396,
        }
        destakemp.push(promdesk)    
        setimgDest(...destakemp)     
      })  
      if (loading) {
        setLoading(false);
      }
    })  
}  // Final da funcao busca imagem destaque
        
    
  const dimensions = {
    with: 792,
    height: 396,
  };
  const ratio = dimensions.height / dimensions.with;
   
  return (
    <>
      <Image style={{ width, height }} source={cover == null ? console.log('to zerado') : cover }/>
    </>
  );
}




 

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#6F4E37",
      paddingVertical: 8,
      marginBottom: 16,
    },
  
    title: {
      alignSelf: "center",
      fontSize: 36,
      fontWeight: "bold",
      color: "#FFF",
    },
  });

export default HeaderImageDestak