import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

export type RootStackParamList = {
  Home: undefined;
  Description: { endpoint: string };
  Chapter: { endpoint: string };
};

export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Home"
>;

export type MangaScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Description"
>;

export type ChapterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Chapter"
>;

export type HomeScreenRouteProp = RouteProp<RootStackParamList, "Home">;

export type MangaScreenRouteProp = RouteProp<RootStackParamList, "Description">;

export type ChapterScreenRouteProp = RouteProp<RootStackParamList, "Chapter">;

export interface MangaDescriptionData {
  thumb: string;
  title: string;
  author: string;
  status: string;
  synopsis: string;
  genre_list: { genre_name: string }[];
  chapter: { chapter_title: string; chapter_endpoint: string }[];
}
