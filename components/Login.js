import React, { useState, useEffect } from "react";
import {View,Text,TextInput, Button, Image,StyleSheet, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from "@react-navigation/native";




const Login = () => {
   const [username,setUsername] = useState("");

   useEffect(() => {getData()}
           ,[])

   const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@username', jsonValue)
    } catch (e) {
      console.dir(e)
    }
    }

    const getData = async () => {
        try {
        const jsonValue = await AsyncStorage.getItem('@username')
        let data = null
        if (jsonValue!=null) {
            data = JSON.parse(jsonValue)
            setUsername(data.username)
        
        } else {
            setUsername("")
        }
        } catch(e) {
        console.dir(e)
        }
    }

    const clearAll = async () => {
        try {
        await AsyncStorage.clear()
        } catch(e) {
        console.dir(e)
        }
    }

   return(
    <ScrollView style={styles.container}>
    
    <Image
      style={styles.logo}
      source ={require('../assets/logo.png')}
      />
  

  <View>
    
    <Button
      title="Login"
      onPress={() =>{
        storeData(username)
      }  
      }
    />

    <Text>{username}</Text>
    
  </View>
  
  


</ScrollView>
   )
}

export default Login

const styles = StyleSheet.create({
    container: {
      flexDirection: 'column',
      //justifyContent: 'space-around',
    },
  
    paragraph: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  
    Button:{
      flexDirection: 'row',
      margin:25,
      padding:10,
      justifyContent: 'space-around', 
  
    },
  
    logo:{
      width:500,
      height:500,
      alignContent:"center"
      
    },
  
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    
    join:{
      fontSize: 36,
      textAlign: 'center',
    }
  
    
  
  });
  