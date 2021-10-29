import React, { useState, useEffect }  from 'react';
import { View, Button,
         FlatList, StyleSheet,
         Text, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChartComponent,{Plot} from './Chart.js';
//import WebView from 'react-native-webview';
import SimpleWidget from './Widget.js';

const Watchlist =() => {
    const [stock, setStock] = useState("");
    const [list, setList] = useState([]);

    useEffect(() => {getData()}
    ,[])
    
const getData = async () => {
        try {
          // the '@profile_info' can be any string
          const jsonValue = await AsyncStorage.getItem('@watchlist')
          let data = null
          if (jsonValue!=null) {
            data = JSON.parse(jsonValue)
            setList(data)
          
          } else {
            setStock("")
          }
        } catch(e) {
          console.log("error in getData ")
          // this shouldn't happen, but its good practice
          // to check for errors!
          console.dir(e)
          // error reading value
        }
  }

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@watchlist', jsonValue)
      console.log('just stored '+jsonValue)
    } catch (e) {
      console.log("error in storeData ")
      console.dir(e)
      // saving error
    }
}

const clearAll = async () => {
    try {
      console.log('in clearData')
      await AsyncStorage.clear()
    } catch(e) {
      console.log("error in clearData ")
      console.dir(e)
      // clear error
    }
}

const renderItem = ({item}) => {
    return (
      <View >
           <Text>{item.stock}</Text>
      </View>
    )
  }
    return (
      <View style={styles.container}>
        <TextInput
            style= {styles.input}
            onChangeText= {text => {
                setStock(text);
            }}
            value={stock}
            placeholder="Stock code: such as AAPL"
          />
          <Button
            title="Check"
            onPress={() =>{
              const newList = list.concat({'stock':stock})
              setList(newList)
              storeData(stock)
              //setStock("")

            }}
          />
          <Button
                title={"Clear"}
                color="red"
                onPress = {() => {
                  clearAll()
                  setList([])
                }}
                />
  
        <Text style={styles.paragraph}> The information about {stock} </Text>
        {ChartComponent}
        {/* {Plot()} */}
        
        <View style={{flexDirection:'row',
                    justifyContent:'center',
                    backgroundColor:'lightgray'}}>
        <Text style={{fontSize:20,
                      color:'green',backgroundColor:'lightgray'}}>
              Watchlist
         </Text>
      </View>

        <FlatList
        data={list}
        renderItem={renderItem}
      />
      
      
    
      
      
      
      </View>
    )
  }

  export default Watchlist;

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