import React, { useState, useEffect }  from 'react';
import { View, Button,TouchableOpacity,
         FlatList, StyleSheet,
         Text, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Chart from './Chart';

const WatchlistView =({navigation}) => {
  
    const [stock, setStock] = useState();
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

const Item = ({ item, onPress, backgroundColor, textColor }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
      <Text style={[styles.title, textColor]}>{item.stock}</Text>
    </TouchableOpacity>
  );
const [selectedId, setSelectedId] = useState(null);
  const renderItem = ({item}) => {
    const backgroundColor = item.stock === selectedId ? 'blue' : 'lightblue';
    const color = item.stock === selectedId ? 'white' : 'black';
    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.stock);
          navigation.navigate('ChartView', {
            ticker: item.stock,
            otherParam: 'anything you want here',
          });
        }}
        // onPress={() => {
        //   const newList1 = list.filter(function(value){ 
        //     return value != item.stock;
        // });
        //   setList(newList1)
        //   storeData(newList1)
        // }}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    )
  }
    return (
      <View style={styles.container}>
        <TextInput
            style= {styles.input}
            onChangeText= {text => {
                let temp= text.toUpperCase();
                setStock(temp);
            }}
            
            placeholder="Stock code: such as AAPL"
          />
          <Button
            title="Check"
            onPress={() =>{
              if(stock!="" && !list.includes(stock)){
              const newList = list.concat({'stock':stock})
              setList(newList)
              storeData(newList)
              setStock("")
              }

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
        keyExtractor = {item => item.stock}
        extraData ={selectedId}
      />
      
      <View>
          <Text></Text>
      </View>
      
      </View>
    )
  }

  // const ChartView = ({route, navigation}) => {
  //   const {ticker} = route.params;
  //   const {otherParam} = route.params;
  //     return(
  //       <View>
  //         <Text>{JSON.stringify(ticker)}</Text>
        
        
  //       <Chart label={ticker}/>
        
  //       </View>
  //     )
  // }


  
  export default WatchlistView;
  

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
    },

    item: {
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },

    title: {
      fontSize: 32,
    },
  
    
  
  });