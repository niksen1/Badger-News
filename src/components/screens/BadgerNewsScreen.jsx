import { ScrollView, View, Text } from "react-native";
import React, { useState, useEffect, useContext } from 'react';
import BadgerCard from '../BadgerCard';
import { PreferencesContext } from '../BadgerNews';

function BadgerNewsScreen(props) {
    const [articles, setArticles] = useState([]);
    const { prefs } = useContext(PreferencesContext);

    useEffect(() => {
        fetch('https://cs571.org/api/f23/hw8/articles', {
            headers: {
                'X-CS571-ID': "bid_b17011e15e08e0a932b9fbe1084a58619b81e6dfd03fd7e2ac6bdd8ff6a75367"
            },
        })
            .then(response => response.json())
            .then(data => {
                setArticles(data);
            })
    }, []);

    const prefArticles = articles.filter(article =>
        article.tags.every(tag => prefs[tag])
    );


    return (
        <ScrollView>
            {prefArticles.length === 0 ? (
                <View>
                    <Text>There are no articles</Text>
                </View>
            ) : (
                prefArticles.map(article => (
                    <BadgerCard
                        key={article.id}
                        fullArticleId={article.fullArticleId}
                        img={article.img}
                        title={article.title}
                    />
                ))
            )}
        </ScrollView>
    )
}

export default BadgerNewsScreen;