import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View,Image,Button,Share,Alert,ScrollView,TouchableOpacity} from 'react-native';
import { Card,Icon } from 'react-native-elements';
import { Appbar} from 'react-native-paper';

export default function App() {
  
  const [data, setData] = useState([]);
  const [cardarray,setCardarray]=useState([]);
  const [selectedvalue,setselectedvalue]=useState();


  useEffect(() => {
    fetch('https://newsapi.org/v2/sources?apiKey=d29d58aab88d4ea0b04ddb245a230068')
      .then((response) => response.json())
      .then((json) => addcard(json.sources))
      .catch((error) => console.error(error))
     
    
  }, []);
  
  
  console.log(JSON.stringify(cardarray))
  const addcard = (data) => {
 
   
    setData(data);
    let textarray = [];
    for (var i=0; i<data.length ;i++)
    {
      textarray.push(data[i].description);



    }
    setCardarray(textarray);
   }
 





  function HomeScreen({ navigation: { navigate } }) {
    onPressHandler =( key)=> {
    
    setselectedvalue(key)
    
    navigate('Profile');


  }
  return (
    <View>
     
    <Appbar.Header> 
          <Appbar.Content style={{alignItems:'center'}} title="NEWS" />
          <Appbar.Action icon="magnify" onPress={()=>alert("serrch option")} />
          <Appbar.Action icon="dots-vertical" onPress={()=>alert("More option")} />
    </Appbar.Header> 
   
     <ScrollView>
        <View>
          {cardarray.map((value,index) => {
                return(
            
                    <TouchableOpacity key={index} onPress={()=>onPressHandler(index)}>  
                    <Card>
                          <View style={{flex:0,alignItems:"center"}}>
                              <Image style={styles.stretch} source={require('./assets/abcnews.jpg')} />
                          </View>
                          <Text >{value}</Text>
                    </Card> 
                    </TouchableOpacity> 
    

                )
            
          
                })}
        </View>
  </ScrollView>
 
        </View>
  );
}




function ProfileScreen({ navigation: { navigate } }) {
  let message=data[selectedvalue].description;
  let URL=data[selectedvalue].url;
  const onShare = async () => {
    
    try {
      const result = await Share.share({
        message:message +"\n"+URL,
       
      });

     
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
 

  const checkPermission = () => {
    alert("Downloaded successfully")
};

 

 
  return (
    <View>
      <Appbar.Header> 
            <Appbar.BackAction  onPress={()=>navigate('Profile')}/>
            <Appbar.Content style={{alignItems:'center'}} title="NEWS" />
            <Appbar.Action icon="magnify" onPress={()=>alert("serrch option")} />
            <Appbar.Action icon="dots-vertical" onPress={()=>alert("More option")} />
      </Appbar.Header> 
      <Image style={{width:"60%",marginLeft:"20%",height:"50%"}} source={require('./assets/abcnews.jpg')} />
      <Button title="Save image" style={{width:"40%"}}onPress={()=>checkPermission()}></Button>
      <View style={{flex:0,flexDirection:"column",justifyContent:"space-between",alignContent:"space-between"}}>
          <Text>{data[selectedvalue].description}</Text> 
          <View style={{flexDirection:"row",flex:0,justifyContent:"space-between",borderWidth:2,borderColor:"black"}}>
                <Text>{data[selectedvalue].name}</Text>
                <Icon onPress={onShare} name='rowing' />
                <Text>26/05/2021</Text>
          </View>
          <Text>{data[selectedvalue].description}</Text> 
          <Text>{data[selectedvalue].description}</Text> 
          <Text>{data[selectedvalue].description}</Text> 
      </View>
    </View>
  );
}




const Stack = createStackNavigator();
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Home"  screenOptions={{
              headerShown: false,
            }} >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  </NavigationContainer>
 
  );
}

const styles = StyleSheet.create({
    stretch: {
    width:200,
    height: 200,
    
    
  },
});
