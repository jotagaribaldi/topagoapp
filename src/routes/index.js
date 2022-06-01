import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator();

import { Entypo, Feather } from '@expo/vector-icons';

import HomeLogado from '../screens/HomeLogado';
import Lempresas from '../screens/Lempresas';
//import Login from './pages/Login';
import Logout from '../screens/Logout';
import Profileuser from '../screens/Profileuser';
import Scanqr from '../screens/Scanqr';
import CustomButtonNew from '../components/CustomButtonNew';

export default function Routes({ navigation, route }){
    return (
        <Tab.Navigator  initialRouteName="Routes" 
      
            screenOptions={{
                activeTintColor: '#0000ff',
                inactiveTintColor: 'gray',
                showLabel: false,
                headerShown: false,
                tabStyle:{
                    paddingBottom: 5,
                    paddinTop: 15,
                },
          }}        
        >
            <Tab.Screen name="Home" component={HomeLogado}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Entypo name="home" size={size} color={color} />
                    )
                }}
            />
       
           <Tab.Screen name="Empresas" component={Lempresas}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Entypo name="shop" size={size} color={color} />
                    )
                }}
            />

            <Tab.Screen name="Leituras" component={Scanqr}
                options={{
                    tabBarLabel:'',
                    tabBarIcon: ({ focused, size }) => (
                        <CustomButtonNew size={size}  focused={focused}/>
                    )
                }}
            />


            <Tab.Screen name="Perfil" component={Profileuser}
                options={{
                    tabBarIcon: ({ size, color }) => (
                        <Feather name="user" size={size} color={color} />
                    )
                }}
            />

            <Tab.Screen name="Sair" component={Logout}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ size, color }) => (
                        <Entypo name="squared-cross" size={size} color={color} />
                    )
                }}
            />
          
    </Tab.Navigator>
    )
}