import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Image,
  StyleSheet,
  ActivityIndicator,
  Modal,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getMovieById} from '../services';
import placeHolderImage from '../assets/images/placeholder.png';
import {Rating, AirbnbRating} from 'react-native-ratings';
import PlayButton from '../components/PlayButton';
import Video from '../components/Video';

const dimensions = Dimensions.get('screen');
const Detail = ({route, navigation}) => {
  const movieId = route.params.movieId;

  const [detail, setDetail] = useState();
  const [loading, setLoading] = useState(false);
  const [modalVisibe, setModalVisibe] = useState(false);

  useEffect(async () => {
    getMovieById(movieId).then(res => {
      setDetail(res);
      setLoading(true);
    });
  }, [movieId]);

  return (
    <React.Fragment>
      <View>
        <ScrollView>
          {loading && (
            <View>
              <Image
                resizeMode="cover"
                style={styles.image}
                source={
                  detail.poster_path
                    ? {
                        uri: `https://image.tmdb.org/t/p/original${detail.poster_path}`,
                      }
                    : placeHolderImage
                }
              />
              <View style={styles.container}>
                <View style={styles.playButton}>
                  <PlayButton setModalVisibe={setModalVisibe} />
                </View>
                <Text style={styles.title}>{detail?.title}</Text>
                {detail.genres && (
                  <View style={styles.genresContainer}>
                    {detail.genres.map(genre => (
                      <Text style={styles.genreText} key={genre.id}>
                        {genre.name}
                      </Text>
                    ))}
                  </View>
                )}
                <View style={styles.ratingContainer}>
                  <Rating
                    type="custom"
                    startingValue={detail.vote_average / 2}
                    readonly={true}
                    ratingCount={5}
                    imageSize={25}
                    style={styles.ratingIcons}
                  />
                  <Text style={styles.ratingText}>
                    {detail.vote_average / 2}/5
                  </Text>
                </View>
                <Text style={styles.overview}>{detail.overview}</Text>
                <Text style={styles.release}>
                  Release date: {detail.release_date}
                </Text>
              </View>
            </View>
          )}
        </ScrollView>

        <Modal animationType="slide" visible={modalVisibe}>
          <View style={styles.videoModal}>
            <Video setIsOpen={setModalVisibe} navigation={navigation} />
          </View>
        </Modal>
      </View>
      {!loading && <ActivityIndicator />}
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    position: 'relative',
  },
  image: {
    height: dimensions.height / 2.5,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 15,
  },
  genresContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  genreText: {
    marginRight: 10,
    fontSize: 14,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingIcons: {
    marginVertical: 15,
    marginRight: 5,
  },
  ratingText: {
    color: '#f1c40f',
    fontWeight: 'bold',
    fontSize: 14,
  },
  overview: {
    marginBottom: 15,
  },
  release: {
    fontWeight: 'bold',
  },
  playButton: {
    position: 'absolute',
    top: -25,
    right: 20,
  },
  videoModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Detail;
