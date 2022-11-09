import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, ScrollView, Image, StatusBar, View, FlatList } from 'react-native';
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

  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    let source = axios.CancelToken.source()
    axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=151', {
        cancelToken: source.token
      })
      .then(res => {
        setPokemons(res.data.results)
        console.log(pokemons[0])
        
        setLoading(false)
      })
      .catch(err => {
        console.log(err);
      })
      return () => {
        source.cancel()
      }
  }, [])

  if(pokemons) return (
    <FlatList 
      contentContainerStyle={styles.container}
      data={pokemons}
      // @ts-ignore
      renderItem={({pokemon}) =>  console.log(pokemon.url)}
    />
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