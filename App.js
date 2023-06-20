import  React, {useState, useEffect, useRef} from 'react';
import { 
  Text, 
  View, 
  StatusBar, 
  TextInput, 
  StyleSheet, 
  Button,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { NavigationContainer, DefaultTheme, useFocusEffect } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons, AntDesign } from '@expo/vector-icons';

import {db} from "./Firebase";

import {
  collection, 
  onSnapshot,
  doc,
  docs 
  } from "firebase/firestore";

function HomeScreen({route, navigation}) {
        const [name, setName] = useState('Nome de teste');
        const [definedName, setDefinedName] = useState(false);
        
  return (
    <View style={{...styles.container,
                    justifyContent: 'center', 
                    alignItems: 'center', }}>
      {
      !definedName?(
        <View
        style={{...styles.subContainer, textAlign: 'center',                    
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: 'rgb(30,30,30)',
        borderBottomWidth: 0,
         }}>

        <Text
        style={styles.Text}
        >
        Seja bem-vindo ao chat, por favor escolha um nome 
        </Text>

         <View style={styles.divInput}>
         <TextInput
        onChangeText={(text) =>setName(text)}
        value={name}
  
        style={styles.TextInput}
        placeholder={'Escreva o seu nome'}
        ></TextInput>
          </View> 
        

     
        <TouchableOpacity
        onPress={() => setDefinedName(true)}>
          <Text
          style={styles.TouchableOpacity}
          >
          Trocar o meu nome
          </Text>
          
        </TouchableOpacity>

      </View>
    )   : (
      <View 
      style={{...styles.subContainer, textAlign: 'center',                    
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: 'rgb(30,30,30)',
        borderBottomWidth: 0,

         }}>
      <Text
      style={styles.Text}
      >
        Seja bem-vindo ao chat {name} 
        </Text>

        <TouchableOpacity
         onPress={() => navigation.navigate('Salas', {userName: name, 
                                                      userId: new Date().getTime()})}>
          <Text
          style={styles.TouchableOpacity}
          >
          Ir para o chat
          </Text>
          
        </TouchableOpacity>
    </View>
    )

    }
    </View>
  );
}

function ChatScreen({route, navigation}) {
      const [rooms, setRooms] = useState([]);
      const [name, setName] = useState('');

      
     useEffect(() => {
        if (route.params && route.params.userName) {
          if (name === "") {
            alert("Seja bem-vindo ao chat: " + route.params.userName);
          }
          setName(route.params.userName);
          // console.log('O seu id é' + route.params.userId)
        } else {
          navigation.navigate('Home');
        }
      }, [route.params]);

      
      useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'rooms'), (snapshot) => {
          setName(route.params?.userName);
          setRooms(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data()
            }))
          );
        });
      
        return () => {
          unsubscribe();
        };
      }, []);
          

  return (
    <View style={styles.container}>
      <View
       style={styles.chat}>
        
      <Text
      style={{...styles.Text,
                 color: 'rgb(52, 119, 235)',
                fontSize: 17,
                 margin: 0,}}
      >BroadCast List {/* {route.params.userName} */}
      </Text>

      <Text
      style={{...styles.Text,
                 color: 'rgb(52, 119, 235)',
                fontSize: 17,
                 margin: 0,}}
      >New room 
      </Text>

      </View>
        {
          rooms.map((val, index) => {
            return(
              <View 
              key={val.id} 
              style={{...styles.chat,
              borderBottomColor: 'rgba(255, 255, 255,0.4)',

              }}
              >
                <TouchableOpacity
                   onPress={() => navigation.navigate('Room', {
                    chatName: val.id, 
                    autor: name,
                    id: route.params.userId, 
                  })}
                   

                ><Text
                style={{...styles.Text,
                  fontSize: 22,
                  margin: 0,   
        }}
                >
                 {val.id} 
                </Text>

                </TouchableOpacity>

                  
                  <Text
                  style={{...styles.Text,
                            fontSize: 12,
                            margin: 0,   
                  }}
                   > 
                   <Ionicons 
                    size={18}  
                    name='ios-information-circle'
                   />
                     Disponível 
                  </Text>

              </View>
            )
          })
        }

    </View>
  );
}


const RoomScreen = ({route, navigation}) => {
      const [messages, setMessages] = useState([]);
      const [currentmessages, setCurrentMessages] = useState('');
      const [usuario, setUsuario] = useState('');

      const ScrollViewRef = useRef();
        
      useEffect(() => {
        setUsuario(route.params?.autor)

        const collectionRef = collection(db, 'rooms');
        const docRef = doc(collectionRef, route.params?.chatName);
        
        const unsub = onSnapshot(docRef, (snapshot) => {
          setMessages(snapshot.docs.map(l => {
            return {
              id: l.id,
              data: l.data()
            };
          }));
        });
        

//?         O CONCAT SERVE PARA RETORNAR O QUE FOI PASSADO.         
        /* setMessages(messages => messages.concat({
          data: {
            autor: usuario,
            mensagem: 'Ola, mundo'
          }
        })) */
        
      
      }, [])
      
        const sendMessage = () => {
          alert(usuario +    route.params.id) 
        }
      return(
        <View
         style={styles.container}>
          <ScrollView
          ref={ScrollViewRef}
          onContentSizeChange={() => ScrollViewRef.
          current.scrollToEnd({animated: true})}
          
          style={{flex: 0.8}}
          >
              { 
              messages.map((val, index) => {
                return(
                  <View
                  style={styles.subContainer}
                  key={index}
  
                  >
                    <Text
                    style={{...styles.Text, 
                      margin: 0,
                        }}
                    >{usuario}:</Text> 
                    <Text
                      style={{...styles.Text, 
                        margin: 0,
                        color: 'rgb(210,210,210)',
                        fontWeight: 'bold'
                          }}
                    >{val.data.mensagem}.</Text> 
  
                  </View>
                )
              })
              }
          </ScrollView>

          <View
          style={{...styles.container,
                  alignItems:'flex-end',
                  flex:0.2,
                  justifyContent:'flex-end',
                  flexDirection:'row'}}
          > 

          <TextInput 
          onChangeText={(text) =>setCurrentMessages(text)}
          style={{...styles.TextInput,
                      width:'90%',
                      height:40,
                      paddingLeft:10,
                      backgroundColor:'white',
                      margin: 0,
                      marginBottom: 0,

                     }}
          ></TextInput>

          <TouchableOpacity
          style={{...styles.TouchableOpacity,
                              width:'10%',
                              alignItems:'center',
                              padding: 0,
                              marginHorizontal: 0,
                              borderRadius: 20,
                             backgroundColor: 'rgb(30,30,30)',

          }}
          onPress={sendMessage}

          >
              <AntDesign name="dingding" size={24} color="rgb(52, 119, 235)" />
              
          </TouchableOpacity>

          </View>

        </View>
      )

}


const HomeStack = createNativeStackNavigator();
const ChatStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


/* const ChatStackScreen = () => {
       return(
        
          <ChatStack.Navigator>
          <ChatStack.Screen name='Room' component={RoomScreen}/>

          </ChatStack.Navigator>
        
       )
} */

const MyTheme = {

  ...DefaultTheme,

  colors: {

    ...DefaultTheme.colors,

    background: 'rgb(255,255,255)',

    card: 'rgb(40,40,40)',

    text: 'rgb(255,255,255)',

  },

};


export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
   <Stack.Navigator 
    screenOptions={({ route }) => ({
    /* lazy: false, */
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === 'Salas') {
        iconName = focused
          ? 'ios-information-circle'
          : 'ios-information-circle-outline';
      } else if (route.name === 'Settings') {
        iconName = focused ? 'ios-list-box' : 'ios-list';
      } else if (route.name === 'Home') {
        iconName = focused ? 'ios-map' : 'ios-map';
      }

      return <Ionicons name={iconName} size={size} color={color} />;
    },
    tabBarActiveTintColor: 'rgb(52, 119, 235)',
    tabBarInactiveTintColor: 'white',
    tabBarStyle: [
      {
        display: 'flex',
      },
      null,
    ],
  })}
>
  <Tab.Screen name="Home" component={HomeScreen}/>
  <Tab.Screen name="Salas" component={ChatScreen} />
  <Tab.Screen name="Room" component={RoomScreen} />


</Stack.Navigator>


      <StatusBar hidden/>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    backgroundColor: 'rgb(30,30,30)',
  },

  subContainer: {
    backgroundColor: 'rgb(20,20,20)',
    borderBottomWidth: 1,
    padding: 10

  },

  Text: {
    color: 'white',
    fontSize: 16,
    margin: 10,

  },

  divInput: {
    marginLeft: 30,
  },

  TextInput: {
     width: 300,
     height: 40,
     backgroundColor: 'white',
     paddingLeft: 20,
     height: 45,
     borderRadius: 30,
     marginBottom: 10,
     margin: 10,


  },

  Button: {
    paddingHorizontal: 80,
    margin: 10,
  
  },

  TouchableOpacity: {
    color: 'white',
    backgroundColor: '#069',
    padding: 10,
    textAlign: 'center',
    borderRadius: 20,
    marginHorizontal: 90,
  
  },

  chat: {
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between'},
  
});