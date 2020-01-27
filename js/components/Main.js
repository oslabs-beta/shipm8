// this will be our landing page we can use this to work with the MVP data we are trying to get 
import React from 'react';
import { View, Text, Button } from 'react-native';

const Main = (props) => {
  let content = (
    <View style={{ flex: 1, backgroundColor: 'orange', justifyContent: 'center' }}>

      <Text style={{ textAlign: 'center', fontSize: 50 }}>Our Cool Data Will Go Here</Text>
      <Button style={{ flex: 2, justifyContent: 'center', alignItems: 'center', backgroundColor: 'red' }} title='Sign Out' onPress={() => props.navigation.goBack()} />

    </View>
  )
  return content
}

export default React.memo(Main);
