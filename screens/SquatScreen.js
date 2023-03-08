import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable, ImageBackground, TextInput, Button, FlatList } from 'react-native';
import bg from '../assets/weight.jpg';


const [squatInput, setSquatInput] = useState('');
const [squatData, setSquatData] = useState({});
 
const SquatScreen = ({navigation}) => {

useEffect(() => {
  async function restoreData() {
    let permaData;
    permaData = await getData();
    setSquatData(permaData);
  }
  restoreData()
}, [])

const addSquatWorkout = () => {
  squatData.messages.push({text: squatInput});
  setSquatInput('');
  console.log(squatData.messages);

  storeData()
};

const renderItem = ({item}) => (
  <View>
    <Text>{item.text}</Text>
  </View>
)

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@storage_Key', jsonValue)
    } catch (e) {
      // saving error
      console.log(e)
      
    }
  }


  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
    }
  }
  
  return (
    <View style={styles.container}>
      <ImageBackground source={bg} resizeMode="cover" style={styles.bgImage} >
      <Text style={{color: 'white'}}>SquatScreen</Text>
      <TextInput 
        editable
        multiline
        numberOfLines={2}
        maxLength={100}
        onChangeText={setSquatInput}
        value={squatInput}
      />

    <Button   title='Add workout' onPress={addSquatWorkout}/>

    <FlatList
    data={squatData.messages}
    renderItem={renderItem}
    keyExtractor={(item, index) => index}
    />

      <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={{color: 'white'}}>Back</Text>
      </Pressable>

      <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}

export default SquatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  backButton: {
    width: '35%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 12
  }
});
