import Axios from "axios";
import React, { useState, useEffect, FunctionComponent } from "react";
import { Dimensions, View, StyleSheet, Image, FlatList } from "react-native";
import {
  ChapterScreenNavigationProp,
  ChapterScreenRouteProp,
} from "../../types";

const initialLayout = { width: Dimensions.get("window").width };

const MangaChapter: FunctionComponent<{
  navigation: ChapterScreenNavigationProp;
  route: ChapterScreenRouteProp;
}> = ({ navigation, route }) => {
  const [data, setData] = useState<{
    chapter_endpoint: string;
    chapter_image: { chapter_image_link: string; image_number: number }[];
    chapter_pages: number;
    title: string;
  }>();
  const [page, setPage] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [routes] = React.useState([
    { key: "first", title: "First" },
    { key: "second", title: "Second" },
  ]);

  useEffect(() => {
    Axios.get(
      `http://mangamint.azurewebsites.net/api/chapter/${route.params.endpoint}`
    ).then((res) => {
      console.log(console.log(res.data));
      setData(res.data);
      setTotal(res.data.chapter_pages);
    });
  }, []);

  return (
    <View style={styles.container}>
      {data ? (
        <FlatList
          horizontal
          data={data.chapter_image}
          snapToAlignment="start"
          snapToInterval={420}
          decelerationRate="fast"
          pagingEnabled
          renderItem={({ item }) => (
            <Image
              source={{ uri: item.chapter_image_link }}
              style={{ width: 420, height: 640 }}
              key={item.image_number}
            />
          )}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#383d42",
    flex: 1,
    marginTop: 64,
  },
});

export default MangaChapter;
