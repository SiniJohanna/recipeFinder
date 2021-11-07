import { StatusBar } from 'expo-status-bar';
import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert,FlatList, Image } from 'react-native';

export default function App() {
  const [keyword, setKeyword] = useState('');
  const [recepies, setRecepies] = useState([]);
  const getRecipes= () => { 
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`)
    .then(response=>  response.json())
    .then(responseJson=>{ 
      setRecepies(responseJson.meals)
      console.log(recepies);
    })
    .catch(error=> { Alert.alert('Error'); });
    
  }
  return (
    <View style={styles.container}>
      <View style={{flex: 1,justifyContent:'flex-end'}}>
      <TextInput
      placeholder='keyword'
      onChangeText={ keyword=> setKeyword(keyword) } 
      value={keyword}
      />
      <Button 
      title='Find recipes'
      onPress={getRecipes}/>
      </View>
          <View style={{flex: 3}}>
      <FlatList
            style={{marginLeft: "5%"}}
            keyExtractor={(item,  index) => index.toString()}
            renderItem={({item}) =>
              <View>
                <Text style={{fontSize: 18 , fontWeight: "bold"}}>{item.strMeal}</Text>
                <Image 
                style={{  width:100, height:100 }}
                source={{  uri: `${item.strMealThumb}/preview`}}/>
              </View>}
              data={recepies}
          />
          </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
