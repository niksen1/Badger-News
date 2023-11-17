import React, { useState, useEffect, useRef } from 'react';
import { Pressable, View, ScrollView, Text, StyleSheet, Animated, Image, Linking } from 'react-native';


function BadgerNewsArticle(props) {
    const articleId = props.route.params.articleId;
    const opVal = useRef(new Animated.Value(0)).current
    const [article, setArticle] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch(`https://cs571.org/api/f23/hw8/article?id=${articleId}`, {
            headers: {
                'X-CS571-ID': "bid_b17011e15e08e0a932b9fbe1084a58619b81e6dfd03fd7e2ac6bdd8ff6a75367"
            },
        })
            .then(response => response.json())
            .then(data => {
                setArticle(data);
                setIsLoading(false);
                Animated.timing(opVal, {
                    toValue: 1,
                    duration: 5000,
                    useNativeDriver: true,
                }).start();
            })
    }, [articleId]);

    return (
        <ScrollView>
            {isLoading ? (
                <View>
                    <Text style={{ textAlign: 'center' }}>The content is loading!</Text>
                </View>
            ) : (
                <Animated.View style={{ opacity: opVal }}>
                    <Image
                        style={styles.image}
                        source={{ uri: `https://raw.githubusercontent.com/CS571-F23/hw8-api-static-content/main/articles/${article.img}`}}
                    />
                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{article.title}</Text>
                    <Text>

                    </Text>
                    <Text style={{ fontSize: 16 }}>
                        By {article.author} on {article.posted}
                    </Text>
                    <Text>

                    </Text>
                    <Pressable onPress={() => Linking.openURL(article.url)}>
                        <Text style={styles.urlLink}>Read full article here.</Text>
                    </Pressable>
                    <Text>

                    </Text>
                    {article.body.map((line, index) => (
                        <Text key={index} style={{ fontSize: 16 }}>
                            {line}
                        </Text>
                    ))}
                </Animated.View>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 275,
        resizeMode: 'cover',
    },
    urlLink: {
        fontSize: 20,
        color: '#0000ff',
        textDecorationLine: 'underline'
    },
});

export default BadgerNewsArticle;