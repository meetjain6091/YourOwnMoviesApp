// screens/DetailsScreen.js
import React, {useEffect, useState} from 'react';
import {View, Text, Image, StyleSheet, ScrollView} from 'react-native';
import axios from 'axios';

const DetailsScreen = ({route}) => {
  const {movieId} = route.params;
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios
      .get(`https://api.tvmaze.com/shows/${movieId}`)
      .then(response => setMovie(response.data))
      .catch(error => console.error(error));
  }, [movieId]);

  if (!movie) return <Text>Loading...</Text>;

  return (
    <ScrollView style={styles.container}>
      <Image source={{uri: movie.image.original}} style={styles.image} />
      <Text style={styles.title}>{movie.name}</Text>
      <Text style={styles.summary}>{movie.summary}</Text>
      <Text style={styles.extraInfo}>Language: {movie.language}</Text>
      <Text style={styles.extraInfo}>Genres: {movie.genres.join(', ')}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  summary: {
    fontSize: 16,
    color: '#555',
  },
  extraInfo: {
    fontSize: 14,
    color: '#777',
    marginTop: 10,
  },
});

export default DetailsScreen;
