import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';
import placeHolderImage from '../assets/images/placeholder.png';

const Card = ({navigation, data}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Detail', {movieId: data.id})}
      style={styles.container}>
      <Image
        resizeMode="cover"
        style={styles.image}
        source={
          data.poster_path
            ? {uri: `https://image.tmdb.org/t/p/original${data.poster_path}`}
            : placeHolderImage
        }
      />
      {!data.poster_path && <Text style={styles.movieName}>{data.title}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    position: 'relative',
    alignItems: 'center',
    height: 200,
  },
  image: {
    height: '100%',
    width: 120,
    borderRadius: 20,
  },
  movieName: {
    position: 'absolute',
    width: '100%',
    top: 15,
    textAlign: 'center',
    color: 'black',
  },
});

export default Card;
