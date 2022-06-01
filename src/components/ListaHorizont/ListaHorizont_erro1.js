import { Image, View, Dimensions, StyleSheet, FlatList } from 'react-native'
import React from 'react'

const {width} = Dimensions.get('window')

const ListaHorizont = ({data}) => {
  return (
    <FlatList data={data}
            showsHorizontalScrollIndicator={false}
            keyExtractor ={(item) => String(item)} 
            horizontal 
            snapToOffsets={[ ...Array(data.length)].map(
                (x,i)=> i * (width * 0.8 -40) + (i - 1) * 40 ) }
            snapToAlignment={'start'}
            scrollEventThrottle={16}
            decelerationRate="fast"
            style={{marginTop:20}}
            renderItem={({item})=> (
                <View style={{
                    backgroundColor: '#ffccee',
                    height: width / 2.6,
                    width: width * 0.8 - 20,
                    marginHorizontal: 10,
                    borderRadius: 12
                }} >
                    <Image
                        source={{uri: item}}
                    />
                </View>
            )}
    />
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        width: '100%',
        borderColor:'#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 5, 
    },
     
});
export default ListaHorizont