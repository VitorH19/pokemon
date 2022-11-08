import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, ScrollView, Image, StatusBar, View } from 'react-native';
import * as ExpoStatusBar from 'expo-status-bar'
import axios from 'axios';

import { useFonts } from 'expo-font'
import {
  Poppins_400Regular,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'

import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/SeacrhBar';

const PokemonList = () => {

  const [loaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold
  })

  const [pokemons, setPokemons] = useState(
    [
      {
        url: '',
        name: ''
      }
    ]
  )

  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    setLoading(true)
    let source = axios.CancelToken.source()
    axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=151', {
        cancelToken: source.token
      })
      .then(res => {
        setPokemons(res.data.results)
        setLoading(false)
      })
      .catch(err => {
        console.log(err);
      })
      return () => {
        source.cancel()
      }
  }, [])

  if(!loading) return (
    <View style={{flex: 1, padding: 10, backgroundColor: 'white'}}>
      <Text style={{fontFamily: 'Poppins_700Bold', fontSize: 36}}>Pokemons</Text>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false} >
        <ExpoStatusBar.StatusBar />
        {
          pokemons.map((poke, index) => (
            
            <PokemonCard 
              pokemonUrl={poke.url}
              key={index}  
            />
          ))
        }
      </ScrollView>
    </View>
  )
  else return (
    <Text>Loading...</Text>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});

export default PokemonList