import React from 'react';
import { Text, StyleSheet, Image } from 'react-native';
import { Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function BadgerCard(props) {
  const navigation = useNavigation();
  const onPress = (articleId) => {
    navigation.navigate('Article', { articleId });
  };

  return (
    <Pressable
      onPress={() => onPress(props.fullArticleId)}
      style={styles.card}
    >
      <Image
        style={styles.image}
        source={{ uri: `https://raw.githubusercontent.com/CS571-F23/hw8-api-static-content/main/articles/${props.img}` }}
      />
      <Text style={styles.title}>{props.title}</Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center"
  },
  title: {
    padding: 8,
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 275,
    resizeMode: 'cover',
  },
});

export default BadgerCard;