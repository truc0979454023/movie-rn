import {View, Text, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../theme/Colors';

const PlayButton = ({setModalVisibe}) => {
  return (
    <Pressable onPress={() => setModalVisibe(true)} style={styles.button}>
      <Icon name={'caret-forward-outline'} size={30} color={colors.white} />
    </Pressable>
  );
};
const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    width: 50,
    height: 50,
    backgroundColor: colors.primary,
  },
});

export default PlayButton;
