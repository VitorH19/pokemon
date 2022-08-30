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

  if(loaded) return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false} stickyHeaderIndices={[0]} stickyHeaderHiddenOnScroll={true} >
      <View style={{width: '100%', alignItems: 'center'}}>
        <SearchBar _onChange={(text) => setSearch(text.toLowerCase())}/>
      </View>
      <Text>{search}</Text>
      <ExpoStatusBar.StatusBar />
      {
        pokemons.filter(pokemon => {
          if(search == '') return pokemon
          else if (pokemon.name.includes(search) || pokemon.url.slice(-4, -1).includes(search)) return pokemon
        }).map((poke, index) => (
          <>
          <Text>{poke.name}</Text>
            <PokemonCard 
              pokemonUrl={poke.url}
              key={index}  
            />
          </>
        ))
      }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
  },
});

export default PokemonList