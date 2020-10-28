import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Homescreen from "./src/Screens/Homescreen";
import MangaChapter from "./src/Screens/MangaChapter";
import MangaDescription from "./src/Screens/MangaDescription";
import { RootStackParamList } from "./src/types";

const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ title: "Mangareader", headerShown: false }}
      >
        <Stack.Screen name="Home" component={Homescreen} />
        <Stack.Screen name="Description" component={MangaDescription} />
        <Stack.Screen name="Chapter" component={MangaChapter} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
