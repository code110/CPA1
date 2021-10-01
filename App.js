import React from 'react';
import {StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
        <Stack.Screen name="Check" component={CheckScreen} />
        <Stack.Screen name="Join" component={JoinScreen} />


      </Stack.Navigator>
    </NavigationContainer>
  );
};

const HomeScreen = ({ navigation }) => {
  const [stock, onChangeStock] = React.useState(null);
  
  return(
    <View style={styles.container}>
      <View style={{paddingLeft:'200px',paddingRight:'200px'}}>
        <Image
          style={styles.cover}
          source ={{uri:'https://techcrunch.com/wp-content/uploads/2019/06/GettyImages-1051659174.jpg?w=730&crop=1'}}
          />
      </View>

      <View>
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
   </View>
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

const CheckScreen =({navigation}) => {
  const [stock, onChangeStock] = React.useState(null);

  return (
    <View style={styles.container}>
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

      <Text style={styles.paragraph}> The information about {stock} </Text>
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

export default function App() {
  return (
    <MyStack/>
  );
}



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
    margin:"25px",
    padding:'10px',
    justifyContent: 'space-around', 

  },

  cover:{
    width:1000,
    height:500,
    resizeMode: 'cover',
    
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
