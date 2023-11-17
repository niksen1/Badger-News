import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BadgerPreferencesScreen from "../screens/BadgerPreferencesScreen";
import BadgerNewsScreen from "../screens/BadgerNewsScreen";
import BadgerNewsArticle from "../screens/BadgerNewsArticle";

const Stack = createNativeStackNavigator();

function ArticleStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Articles" component={BadgerNewsScreen} />
            <Stack.Screen name="Article" component={BadgerNewsArticle} />
        </Stack.Navigator>
    );
}

function BadgerTabs(props) {

    const tab = createBottomTabNavigator();
    return <>
        <tab.Navigator>
            <tab.Screen name=" " component={ArticleStack} options={{ tabBarLabel: 'News' }} />
            <tab.Screen name="Preferences" component={BadgerPreferencesScreen} />
        </tab.Navigator>
    </>
}

export default BadgerTabs;