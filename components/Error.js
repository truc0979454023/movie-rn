import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const Error = ({error}) => {
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.text}>{error}</Text>
      {/* <Text style={styles.text}>{error}</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
  },
});

export default Error;
