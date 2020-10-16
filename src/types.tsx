import { NavigationStackProp } from "react-navigation-stack";

export type RootStackParamList = {
  Home: undefined;
  Description: { endpoint: string };
};

export type HomeScreenNavigationProp = NavigationStackProp<
  RootStackParamList,
  "Home"
>;

export type MangaScreenNavigationProp = NavigationStackProp<
  RootStackParamList,
  "Description"
>;
