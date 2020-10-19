import Axios from "axios";
import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import Swiper from "react-native-swiper";
import { ChapterScreenNavigationProp } from "../../types";

const MangaChapter: React.FC<{ navigation: ChapterScreenNavigationProp }> = ({
  navigation,
}) => {
  const [data, setData] = useState<string[]>([]);
  const [page, setPage] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    Axios.get(
      `http://mangamint.azurewebsites.net/api/chapter/${navigation.state.params.endpoint}`
    ).then((res) => {
      setData(res.data);
      setTotal(res.data.chapter_pages);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Swiper>
        {data.length > 0
          ? data.chapter_image.map((el, i) => (
              <Image
                source={{ uri: el.chapter_image_link }}
                style={{ width: 420, height: 640 }}
              />
            ))
          : null}
      </Swiper>
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
