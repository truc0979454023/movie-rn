import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState, useTransition} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {searchMovieTV} from '../services';
import placeHolderImage from '../assets/images/placeholder.png';
import Card from '../components/Card';

const Search = ({navigation}) => {
  const [text, setText] = useState('');
  const [searchMovie, setSearchMovie] = useState([]);

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (text) {
      startTransition(() => {
        const query = text.toLowerCase().trim();
        Promise.all([
          searchMovieTV(query, 'movie'),
          searchMovieTV(query, 'tv'),
        ]).then(([movies, tv]) => {
          const data = [...movies, ...tv];
          setSearchMovie(data);
        });
      });
    } else {
      setSearchMovie([]);
    }
  }, [text]);

  return (
    <React.Fragment>
      <SafeAreaView>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search..."
            style={styles.input}
            onChangeText={setText}
            value={text}
          />
        </View>
        {isPending ? (
          <ActivityIndicator size="large" />
        ) : (
          <View style={styles.searchResult}>
            {searchMovie.length === 0 && text ? (
              <Text>No result</Text>
            ) : (
              <ScrollView>
                <View style={styles.seachItem}>
                  {searchMovie.map(movie => (
                    <View key={movie.id}>
                      <Card data={movie} navigation={navigation} />
                    </View>
                  ))}
                </View>
              </ScrollView>
            )}
          </View>
        )}
      </SafeAreaView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    marginTop: 60,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  input: {
    height: 50,
    padding: 8,
    paddingRight: 28,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: 'gray',
    width: '100%',
  },
  search: {
    position: 'absolute',
    right: 20,
  },
  seachItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  searchResult: {
    paddingHorizontal: 10,
  },
});

export default Search;
