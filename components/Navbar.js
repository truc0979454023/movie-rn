import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../theme/Colors';

const Navbar = ({navigation, main = false}) => {
  return (
    <SafeAreaView>
      {main ? (
        <View style={styles.mainNav}>
          <View style={styles.logo}>
            <Image
              style={styles.logoImage}
              source={require('../assets/images/movie.png')}
            />
            <Text style={styles.logoText}>MovieHome</Text>
          </View>
          <TouchableOpacity
            style={styles.search}
            onPress={() => navigation.navigate('Search')}>
            <Icon name={'search-outline'} size={30} color={colors.white} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.iconContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon
              name={'return-up-back-outline'}
              size={40}
              color={colors.lightGray}
            />
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainNav: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  search: {
    paddingRight: 10,
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  logoImage: {
    width: 50,
    height: 50,
  },
  logoText: {
    fontWeight: 'bold',
    fontSize: 16,
    position: 'absolute',
    left: 45,
    top: 20,
  },
  iconContainer: {
    width: 50,
    marginLeft: 10,
  },
});

export default Navbar;
