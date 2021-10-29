import React, { useState } from 'react';
import {StyleSheet, Text, View, Button, Image, TextInput, ScrollView } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Watchlist from './watchlist'

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen
          name="Stock Trading Tools"
          component={HomeScreen}
          //options={{ title: 'Welcome' }}
        />
        
        <Stack.Screen name="About" component={AboutScreen} /> 
        <Stack.Screen name="Check" component={Watchlist} />
        <Stack.Screen name="Join" component={JoinScreen} />


      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeScreen = ({ navigation }) => {
  const [stock, onChangeStock] = React.useState(null);
  const [username,onChangeUsername] = useState();

  return(
    <ScrollView contentContainerStyle={{flexDirection:'column',justifyContent:'center'}}>
    
        <Image
          style={styles.logo}
          source ={require('../assets/logo.png')}
          />
      

      <View>
        
      <TextInput
          style= {styles.input}
          onChangeText= {onChangeUsername}
          value={username}
          placeholder="Username"
        />
        <Button
          title="Login"
          onPress={() =>
            navigation.navigate('Login')
               
          }
        />
        <Text style={styles.paragraph}>Please input the stock code:</Text>
        <TextInput
          style= {styles.input}
          onChangeText= {onChangeStock}
          value={stock}
          placeholder="Stock code: such as AAPL"
        />
        <Button
          title="Check"
          onPress={() =>
            navigation.navigate('Check')
               
          }
        />
        
      </View>

    <View style={styles.Button }>

        <Button
          title="About this App"
          onPress={() =>
            navigation.navigate('About')
               
          }
        />

          <Button
          title="Join us"
          onPress={() =>
            navigation.navigate('Join')
               
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
