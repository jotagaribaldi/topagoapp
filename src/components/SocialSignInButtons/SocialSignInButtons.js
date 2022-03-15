import { View, Text } from 'react-native'
import React from 'react'
import CustomButton from '../CustomButton'
const SocialSignInButtons = () => {

    const onSignInFacebook = () => {
        console.warn('Facebook Senha');
      }
  
  
      const onSignInGoogle = () => {
        console.warn('Google Senha');
      }
  return (
    <>
      <CustomButton text="Login via Facebook" 
                    onPress={onSignInFacebook} 
                    bgColor="#E7EAF4" 
                    fgColor="#4765A9" 
                    />
      <CustomButton text="Login via Google" 
                    onPress={onSignInGoogle} 
                    bgColor="#FAE9EA" 
                    fgColor="#DD4D44" 
                    />
    </>
  )
}

export default SocialSignInButtons