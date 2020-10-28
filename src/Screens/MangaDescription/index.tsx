import React, { useEffect, useState, FunctionComponent } from "react";
import { Text, StyleSheet, View, ImageBackground, Image } from "react-native";
import {
  MangaDescriptionData,
  MangaScreenNavigationProp,
  MangaScreenRouteProp,
} from "../../types";
import Axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";
import { Badge, ListItem } from "react-native-elements";

const MangaDescription: FunctionComponent<{
  navigation: MangaScreenNavigationProp;
  route: MangaScreenRouteProp;
}> = ({ navigation, route }) => {
  const [data, setData] = useState<MangaDescriptionData>({
    thumb: "",
    title: "",
    author: "",
    status: "",
    synopsis: "",
    genre_list: [],
    chapter: [],
  });
  const [isLoading, setIsLoading] = useState<true | false>(true);

  useEffect(() => {
    setIsLoading(true);
    Axios.get(
      `http://mangamint.azurewebsites.net/api/manga/detail/${route.params.endpoint}`
    ).then((res) => {
      setData(res.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <View style={styles.container}>
      {!isLoading && data ? (
        <>
          <ImageBackground
            style={{ width: 420, height: 640, position: "absolute" }}
            source={{ uri: data.thumb }}
          />
          <ScrollView>
            <LinearGradient
              style={{ width: 420, marginTop: 200, flex: 1 }}
              colors={["rgba(0,0,0,0)", "#383d42FF"]}
              start={{ x: 0.5, y: 0.0 }}
              end={{ x: 0.5, y: 0.3 }}
            >
              <View style={styles.descriptionContainer}>
                <View style={{ flexDirection: "row", marginBottom: 10 }}>
                  <Image
                    style={{ width: 120, height: 180 }}
                    source={{ uri: data.thumb }}
                  />
                  <View style={styles.textContainer}>
                    <Text style={styles.textTitle}>
                      {data.title.length > 40
                        ? `${data.title.slice(0, 40)}...`
                        : data.title}
                    </Text>
                    <Text
                      style={styles.textMeta}
                    >{`Author: ${data.author}`}</Text>
                    <Text
                      style={styles.textMeta}
                    >{`Status: ${data.status}`}</Text>
                  </View>
                </View>
                <View style={{ marginBottom: 10 }}>
                  <Text style={styles.textSynopsis}>Synopsis</Text>
                  <Text style={styles.textSynopsisContent}>
                    {data.synopsis}
                  </Text>
                </View>
                <View style={{ flexDirection: "row", marginBottom: 10 }}>
                  {data.genre_list && data.genre_list.length > 0
                    ? data.genre_list.map((el) => (
                        <Badge
                          value={el.genre_name}
                          status="primary"
                          containerStyle={{ marginRight: 5 }}
                          badgeStyle={{
                            backgroundColor: undefined,
                            borderRadius: 2,
                          }}
                        />
                      ))
                    : null}
                </View>
              </View>
            </LinearGradient>

            <View
              style={{
                marginBottom: 40,
                paddingLeft: 10,
                paddingRight: 20,
                backgroundColor: "#383D42",
              }}
            >
              <Text style={styles.textSynopsis}>Chapters</Text>
              {data.chapter.map((el, i) => (
                <ListItem
                  key={i}
                  bottomDivider
                  style={{ borderRadius: 40 }}
                  containerStyle={{
                    backgroundColor: "#323232",
                  }}
                  onPress={() =>
                    navigation.navigate("Chapter", {
                      endpoint: el.chapter_endpoint,
                    })
                  }
                >
                  <ListItem.Content>
                    <ListItem.Title style={{ color: "white" }}>
                      {el.chapter_title}
                    </ListItem.Title>
                    {/* <ListItem.Subtitle>
                          {el.chapter_endpoint}
                        </ListItem.Subtitle> */}
                  </ListItem.Content>
                  <ListItem.Chevron />
                </ListItem>
              ))}
            </View>
          </ScrollView>
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#383D42",
    flex: 1,
  },
  descriptionContainer: {
    paddingTop: 64,
    paddingLeft: 10,
    paddingRight: 20,
  },
  textContainer: {
    marginLeft: 10,
  },
  textTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "600",
  },
  textMeta: {
    color: "white",
  },
  textSynopsis: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
  },
  textSynopsisContent: {
    color: "white",
  },
});

export default MangaDescription;
