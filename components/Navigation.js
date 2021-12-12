import React, { useState } from 'react';
import {StyleSheet, Text, View, Button, Image, TextInput, ScrollView } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import WatchlistView from './watchlist'
import ChartView from './ChartView'

import ValueProvider,{useValue} from './ValueContext';


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Watchlist () {
  return (
    <Stack.Navigator> 
        <Stack.Screen name="WatchlistView" component={WatchlistView} />
        <Stack.Screen name="ChartView" component={ChartView} />
      
    </Stack.Navigator>
  )
}

const data = {
  stock:'',
  list:[]
}

const MyStack = () => {
  return (
    <ValueProvider value = {data}>
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home"
          component={HomeScreen}/>
          <Tab.Screen name="Watchlist" component={Watchlist} />
          <Tab.Screen name="About" component={AboutScreen} />
          <Tab.Screen name="Join" component={JoinScreen} />
          
        </Tab.Navigator>
      
    </NavigationContainer>
    </ValueProvider>
  );
};

const HomeScreen = ({ navigation }) => {
  const {currentValue,setCurrentValue} = useValue();
  const [stock, onChangeStock] = useState('');
 

  return(
    <ScrollView contentContainerStyle={{flexDirection:'column',justifyContent:'center'}}>
    
        <Image
          style={styles.logo}
          source ={require('../assets/logo.png')}
          />
      

      <View>
        
        <Text style={styles.paragraph}>Please input the stock code:</Text>
        <TextInput
          style= {styles.input}
          onChangeText= {text => {
            onChangeStock(text.toUpperCase())
            
          }}
          
          placeholder="Stock code: such as AAPL"
        />
        <Button
          title="Check"
          onPress={() =>{
           
              const newList = currentValue.list.concat({'stock':stock})
              setCurrentValue({...currentValue,stock,newList})
              console.log(newList)
              console.log(currentValue.stock)
              
            
            navigation.navigate('Watchlist')
          }
            
               
          }
        />
        
      </View>

   </ScrollView>
  )
}

const AboutScreen =({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}> This App is a small toolkit for stock trading. </Text>
      <Text style={{textAlign:'center'}}>It will calculate the support and pressure level and show the Stock chart for the certain 
        stock. And consider adding other indicators.
        
      </Text>
    </View>
  )
}

const JoinScreen = ({navigation}) =>{
  return(
    <View style={styles.container}>
      <Text style={styles.join} > Join us !!!</Text>
      
    </View>
  )
  
}



export default MyStack;



const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-around',
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
    width:300,
    height:300,
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
