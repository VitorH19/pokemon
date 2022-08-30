import { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import axios from 'axios'
import { addCommaBeforeLastNumber, capitalizeFirstLetter, setTypeBackgroundColor } from '../../utils/functions'

interface Props {
  pokemonUrl: string
}

const PokemonCard = (props: Props) => {

  const [pokemon, setPokemon] = useState({
    name: '',
    url: '#',
    sprites: {
      front_default: ''
    },
    types: [
      {
        type: {
          name: ''
        }
      }
    ],
    height: 0,
    weight: 0
  })

  useEffect(() => {
    axios
      .get(props.pokemonUrl)
      .then(res => {
        setPokemon(res.data)
      })
      .catch(err => console.log(err))
    
  }, [])
  if(pokemon.url === '#') return (
    <></>
  )
  else return (
    <View style={styles.card}>
      <Image 
        source={{uri: pokemon.sprites.front_default}}
        style={styles.sprite}
      />
      <View style={{width: '100%', marginLeft: 10}}>
        <Text style={styles.name}>{capitalizeFirstLetter(pokemon.name)}</Text>
        
        <View style={styles.types}>
          {
            pokemon.types.map((type, index) => {
              const bgColor = setTypeBackgroundColor(type.type.name)
              return (
                <Text key={index} style={[styles.type, {backgroundColor: setTypeBackgroundColor(type.type.name)}]}>{capitalizeFirstLetter(type.type.name)}</Text>
              )
            })
          }
        </View>
        <View style={styles.types}>
          <Text>{addCommaBeforeLastNumber(pokemon.weight) + ' Kg'}</Text>
          <Text>{pokemon.height + '"'}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: '90%',
    minHeight: 100,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 15
  },
  sprite: {
    width: 100, 
    height: 100, 
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15
  },
  name: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 24,
    width: 242,
  },
  types: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: 120,
  },
  type: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 18,
    color: 'black',
    alignSelf: 'center',
    paddingHorizontal: 10,
    marginRight: 10,
    borderRadius: 5
  }
})

export default PokemonCard