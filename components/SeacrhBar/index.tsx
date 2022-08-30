import { View, Text, TextInput, StyleSheet, StatusBar } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';

interface Props {
  _onChange: (text: string) => void
}

const SearchBar = ({_onChange}: Props) => {

  return (
    <View style={styles.searchBar} >
      <FontAwesome name={'search'} size={25} onPress={() => alert('menu de filtro')}/>
      <TextInput 
        placeholder='Procurar'
        style={styles.input}
        onChangeText={_onChange}
      />
      <FontAwesome name={'filter'} size={25}/>
    </View>
  )
}

const styles = StyleSheet.create({
  searchBar: {
    width: '90%',
    height: 60,
    backgroundColor: '#f6f6f6',
    borderRadius: 15,

    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',

    paddingHorizontal: 20,
    marginTop: StatusBar.currentHeight,

    shadowColor: '#171717',
    shadowOffset: {width: 0, height: -2},
    shadowOpacity: 0.2,
    shadowRadius: 2
  },
  input: {
    width: '70%',
    height: '90%',
    fontSize: 24
  }
})

export default SearchBar