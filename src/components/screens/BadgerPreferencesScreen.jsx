import { Text, View, Switch } from "react-native";
import React, { useState, useEffect, useContext } from 'react';
import { PreferencesContext } from '../BadgerNews';


function BadgerPreferencesScreen(props) {
    const { prefs, setPrefs } = useContext(PreferencesContext);
    const [tags, setTags] = useState([]);

    useEffect(() => {
        fetch('https://cs571.org/api/f23/hw8/articles', {
            headers: {
                'X-CS571-ID': "bid_b17011e15e08e0a932b9fbe1084a58619b81e6dfd03fd7e2ac6bdd8ff6a75367"
            },
        })
            .then(response => response.json())
            .then(data => {
                const tagList = [];
                const togglePrefs = { ...prefs };

                data.forEach(article => {
                    article.tags.forEach(tag => {
                        if (!tagList.includes(tag)) {
                            tagList.push(tag);
                            if (togglePrefs[tag] === undefined) {
                                togglePrefs[tag] = true;
                            }
                        }
                    });
                });
                setTags(tagList);
                setPrefs(togglePrefs);
            })
    }, []);

    const toggleTag = (tag) => {
        const updatedPrefs = { ...prefs, [tag]: !prefs[tag] };
        setPrefs(updatedPrefs);
    };

    return (
        <View>
            {tags.map(tag => (
                <View key={tag} style={{alignItems: 'center', marginVertical: 15}}>
                    <Text style={{ fontSize: 20 }}>{tag}</Text>
                    <Switch
                        onValueChange={() => toggleTag(tag)}
                        value={prefs[tag]}
                    />
                </View>
            ))}
        </View>
    );
}

export default BadgerPreferencesScreen;