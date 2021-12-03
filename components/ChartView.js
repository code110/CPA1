import React, { useState, useEffect }  from 'react';
import { View, Button,TouchableOpacity,
         FlatList, StyleSheet,
         Text, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Chart from './Chart';

const ChartView = ({route, navigation}) => {
    const {ticker} = route.params;
    const {otherParam} = route.params;
      return(
        <View>
          <Text>{ticker}</Text>
        <Chart label={ticker}/>
        
        </View>
      )
  }

  export default ChartView;