import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Homescreen from "./src/Homescreen";

const navigator = createStackNavigator(
  {
    Home: Homescreen,
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "App",
      headerShown: false,
    },
  }
);

export default createAppContainer(navigator);
