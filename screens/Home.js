import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  getPopularTV,
  getUpcomingMovies,
  getPopularMovies,
  getFamilyMovies,
  getDocumentaryMovies,
} from '../services/index';
import {SliderBox} from 'react-native-image-slider-box';
import List from '../components/List';
import Error from '../components/Error';

const Home = ({navigation}) => {
  const dimensions = Dimensions.get('screen');

  const [upcomingMovieImages, setUpcomingMovieImages] = useState([]);

  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTV, setPopularTV] = useState([]);
  const [familyMovies, setFamilyMovies] = useState([]);
  const [documentaryMovies, setDocumentaryMovies] = useState([]);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');

  useEffect(async () => {
    return Promise.all([
      getPopularMovies(),
      getPopularTV(),
      getUpcomingMovies(),
      getDocumentaryMovies(),
      getFamilyMovies(),
    ])
      .then(
        ([
          popularMovies,
          popularTV,
          upcomingMovies,
          documentaryMovies,
          familyMovies,
        ]) => {
          const imageArray = [];
          upcomingMovies.forEach(data => {
            imageArray.push(
              `https://image.tmdb.org/t/p/original${data.poster_path}`,
            );
          });
          setPopularMovies(popularMovies);
          setPopularTV(popularTV);
          setUpcomingMovieImages(imageArray);
          setDocumentaryMovies(documentaryMovies);
          setFamilyMovies(familyMovies);
        },
      )
      .catch(error => setError(error))
      .finally(() => {
        setLoading(true);
      });
  }, []);

  return (
    <ScrollView>
      {loading && !error ? (
        <View>
          {upcomingMovieImages && (
            <View style={styles.sliderContainer}>
              <SliderBox
                images={upcomingMovieImages}
                sliderBoxHeight={dimensions.height / 1}
                autoplay={true}
                circleLoop={true}
                dotStyle={styles.sliderStyle}
              />
            </View>
          )}

          {popularMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title={'Pupular Movies'}
                content={popularMovies}></List>
            </View>
          )}

          {popularTV && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title={'Pupular TV Shows'}
                content={popularTV}></List>
            </View>
          )}

          {familyMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title={'Family Movies'}
                content={familyMovies}></List>
            </View>
          )}

          {documentaryMovies && (
            <View style={styles.carousel}>
              <List
                navigation={navigation}
                title={'Documentary Movies'}
                content={documentaryMovies}></List>
            </View>
          )}
        </View>
      ) : (
        <ActivityIndicator size={'large'} />
      )}
      {error && <Error error={error} />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderStyle: {
    height: 0,
  },
  carousel: {flex: 1},
});

export default Home;
