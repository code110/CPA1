import React, { useState, useEffect } from "react";
import {View,Text,Button,TouchableOpacity,FlatList,StyleSheet, ScrollView, SectionList} from 'react-native'
import Axios from 'axios'
import { VictoryCandlestick, VictoryAxis,VictoryZoomContainer,VictoryVoronoiContainer,VictoryChart, VictoryTheme } from "victory-native";
import { render } from "react-dom";
//import { VictoryCandlestick, VictoryZoomContainer,VictoryVoronoiContainer,VictoryChart, VictoryTheme } from "victory";

const Chart = (props) =>{
  const [ticker,setTicker] = useState(props.label);
  //const [date,setDate] = useState([]);
  const [data,setData] = useState([]);
  const [news,setNews] = useState([]);

  useEffect(() =>{
    let tempdate = []
    let tempdata = []
    let tempnews = []

    const getData= async () => {
      var axios = require("axios").default;

      var options = {
        method: 'GET',
        url: 'https://yfapi.net/v8/finance/chart/'+ ticker +'?range=3mo&region=US&interval=1d&lang=en',
        params: {modules: 'defaultKeyStatistics,assetProfile'},
        headers: {
          'x-api-key': 'GHc4gh7Scu6nEq3IfOSh492rvIHmPIah7Js1agri'
        }
      };

      var news = {
        method: 'GET',
        url: 'https://yfapi.net/ws/insights/v1/finance/insights?symbol='+ ticker,
        headers: {
          'x-api-key': 'GHc4gh7Scu6nEq3IfOSh492rvIHmPIah7Js1agri'
        }
      };

      let response = await Axios.request(options)
      //setData(response.data.chart.result[0].indicators.quote[0])
      tempdata = response.data.chart.result[0].indicators.quote[0]
      //setDate(response.data.chart.result[0].timestamp)
      tempdate = response.data.chart.result[0].timestamp

      let responseNews = await Axios.request(news)
      tempnews = responseNews.data.finance.result.reports
      setNews(tempnews)
      
      let mydata = [];
      for( let i=0; i < tempdate.length; i++){
        mydata.push({x:new Date(tempdate[i]*1000),open:tempdata.open[i], close:tempdata.close[i],high:tempdata.high[i],low:tempdata.low[i]});
      } 
      setData(mydata)


    }

  
      
    const ps = getData()
  },[])

  const Item = ({item}) => (
    <View>
      <Text>{item.id}</Text>

    </View>
  );
  const renderItem = () =>(
    <Item/>
  );
    
    return(
        <View style={styles.container}>
          <View >
            <VictoryChart 
              width={420} 
              theme={VictoryTheme.material}
              scale={{ x: "time" }}
             
              >
                

            <VictoryCandlestick
              candleColors={{ positive: "#FF0000", negative: "#00FF00" }}
              data= {Array.from(data)}
              />
            </VictoryChart>
          </View>

          {/* <View>
            <ScrollView>
            <FlatList
              data={news}
              renderItem ={renderItem}
              keyExtractor = {item => item.publishedOn}
            />
            </ScrollView>

            <Text>{news[0].id}</Text>

            
          </View> */}

          
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column', 
    margin:5,
  },  
  title:{
        backgroundColor: 'black',
        alignItems:'center',
        justifyContent:'center',
        flex:1,
    },
    button: {
        backgroundColor: "black",
        padding: 10
      },
      posts:{
        marginRight:120,
        backgroundColor:'lightgrey',
        padding:20,
        margin:20,
        
    
      },

})
export default Chart;