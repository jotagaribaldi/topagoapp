import React from "react";
import { Image, useWindowDimensions } from "react-native";

const cover =  "http://topago.com.br/assets/img/promodestak/empresa-promo.png";

const dimensions = {
  with: 792,
  height: 396,
};
const ratio = dimensions.height / dimensions.with;

const HeaderImageDestak = () => {

    const window = useWindowDimensions();

    const width = window.width;
    const height = width * ratio;
   
  return (
    <>
      <Image style={{ width, height }} source={ {uri: cover } }/>
    </>
  );
}




 

export default HeaderImageDestak