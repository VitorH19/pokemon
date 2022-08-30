import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, ScrollView, Image, StatusBar } from 'react-native';
import axios from 'axios';

import { useFonts } from 'expo-font'
import {
  Poppins_400Regular,
  Poppins_700Bold
} from '@expo-google-fonts/poppins'

import PokemonCard from './components/PokemonCard';

export default function App() {

  const [loaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold
  })

  const [pokemon, setPokemon] = useState(
    [
      {
        url: '',
        name: ''
      }
    ]
  )

  const [loading, setLoading] = useState(true)


  useEffect(() => {
    let source = axios.CancelToken.source()
    axios
      .get('https://pokeapi.co/api/v2/pokemon?limit=1153', {
        cancelToken: source.token
      })
      .then(res => {
        setPokemon(res.data.results)
        setLoading(false)
      })
      .catch(err => {
        console.log(err);
      })
      return () => {
        source.cancel()
      }
  }, [])

  if(loaded) return (
    <ScrollView contentContainerStyle={styles.container}>
      {
        pokemon.map((poke, index) => (
          <PokemonCard 
            pokemonUrl={poke.url}
            key={index}  
          />
        ))
      }
      <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: StatusBar.currentHeight
  },
});
