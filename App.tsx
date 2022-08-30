import React, { useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
// Icons
import { FontAwesome } from '@expo/vector-icons';

// Screens
import PokemonList from './screens/PokemonList'

// Fonts
import { useFonts } from 'expo-font'
import {
  Poppins_400Regular,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'
import { View, ActivityIndicator } from 'react-native';

export default function App() {

  const [loaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold
  })

  const [loading, setLoading] = useState(true)

  const BottomTab = createBottomTabNavigator()

  if(loaded) return (
    <NavigationContainer>
      <BottomTab.Navigator 
        initialRouteName='PokemonList'
        screenOptions={{
          headerShown: false
        }}
      >
        <BottomTab.Screen 
          name={'PokemonList'}
          component={PokemonList}
          options={{
            tabBarIcon: ({color}) => <FontAwesome name="th-list" size={24} color={color} />
          }}
        />
        <BottomTab.Screen 
          name={'BerryList'}
          component={PokemonList}
          options={{
            tabBarIcon: ({color}) => <FontAwesome name="th-list" size={24} color={color} />
          }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  )
  else return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator 
        size={'large'}
      />
    </View>
  )
}