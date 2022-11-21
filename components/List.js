import {View, Text, FlatList, StyleSheet} from 'react-native';
import React from 'react';
import Card from './Card';

const List = ({title, content, navigation}) => {
  return (
    <View style={styles.list}>
      <Text style={styles.text}>{title}</Text>
      <FlatList
        data={content}
        horizontal={true}
        renderItem={({item}) => (
          <Card navigation={navigation} data={item} />
        )}></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    marginTop: 25,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    marginLeft: 5,
    color: 'black',
  },
});

export default List;
