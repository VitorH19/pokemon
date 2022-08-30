import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, ScrollView, Image, StatusBar } from 'react-native';
import axios from 'axios';
import PokemonCard from './components/PokemonCard';

export default function App() {

  const [pokemon, setPokemon] = useState(
    [
      {
        url: '',
        name: ''
      }
    ]
  )

  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon/')
      .then(res => {
        setPokemon(res.data.results);
      })
      .catch(err => {
        console.log(err);
      })
  })

  return (
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
