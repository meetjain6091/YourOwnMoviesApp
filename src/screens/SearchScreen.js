import React, {useState} from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

const SearchScreen = ({navigation}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = text => {
    setSearchTerm(text);
    axios
      .get(`https://api.tvmaze.com/search/shows?q=${text}`)
      .then(response => {
        setMovies(response.data);
      });
  };

  const renderMovie = ({item}) => (
    <TouchableOpacity
      style={styles.movieContainer}
      onPress={() => navigation.navigate('Details', {movie: item.show})}>
      <Image source={{uri: item.show.image?.medium}} style={styles.thumbnail} />
      <View>
        <Text style={styles.title}>{item.show.name}</Text>
        <Text style={styles.summary} numberOfLines={3}>
          {item.show.summary?.replace(/<\/?[^>]+(>|$)/g, '')}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search Movies"
        style={styles.searchBar}
        value={searchTerm}
        onChangeText={handleSearch}
      />
      <FlatList
        data={movies}
        keyExtractor={item => item.show.id.toString()}
        renderItem={renderMovie}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
    paddingHorizontal: 8,
  },
  movieContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  thumbnail: {
    width: 80,
    height: 120,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  summary: {
    fontSize: 14,
    color: '#555',
  },
});

export default SearchScreen;
