import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Homescreen from "./src/Screens/Homescreen";
import MangaChapter from "./src/Screens/MangaChapter";
import MangaDescription from "./src/Screens/MangaDescription";

const navigator = createStackNavigator(
  {
    Home: Homescreen,
    Description: MangaDescription,
    Chapter: MangaChapter,
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "Mangareader",
      headerShown: false,
    },
  }
);

export default createAppContainer(navigator);
