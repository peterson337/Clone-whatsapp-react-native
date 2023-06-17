import  React, {useState, useEffect} from 'react';
import { 
  Text, 
  View, 
  StatusBar, 
  TextInput, 
  StyleSheet 
} from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Ionicons } from '@expo/vector-icons';



function HomeScreen({route, navigation}) {
        const [name, setName] = useState('');
        const [definedName, setDefinedName] = useState(false);


  return (
    <View style={styles.container}>
      {
      name === ''?(
        <View>
        <Text
        style={styles.Text}
        >
        Seja bem-vindo ao chat, por favor escolha um nome 
        </Text>
        <TextInput
        style={styles.TextInput}
        ></TextInput>
      </View>
    )   : (
      <View style={styles.container}>
      <Text
      style={styles.Text}
      >
        Seja bem-vindo ao chat {name} 
        </Text>
    </View>
    )

    }
    </View>
  );
}

function ChatScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Chat!</Text>
    </View>
  );
}

const HomeStack = createNativeStackNavigator();


const Tab = createBottomTabNavigator();

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
   <Tab.Navigator
  screenOptions={({ route }) => ({
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
  <Tab.Screen name="Home" component={HomeScreen} />
  <Tab.Screen name="Salas" component={ChatScreen} />
  {/* <Tab.Screen name="Settings" component={SettingsScreen} /> */}
</Tab.Navigator>


      <StatusBar hidden/>

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   /*  justifyContent: 'center', 
    alignItems: 'center', */
    backgroundColor: 'rgb(30,30,30)',
  },

  Text: {
    color: 'white',
    fontSize: 16,
  },

  TextInput: {
     width: '90%',
     height: 40,
     backgroundColor: 'white',
     padding: 10,
     borderRadius: 20,
  },
  
});