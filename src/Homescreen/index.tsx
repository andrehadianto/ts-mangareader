import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  StatusBar as sb,
  ImageBackground,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import Axios from "axios";
import { SearchBar } from "react-native-elements";

interface MangaDetail {
  title: string;
  chapter?: string;
  endpoint?: string;
  thumb?: string;
  type?: string;
  updated_on?: string;
}

const Homescreen = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    Axios.get("http://mangamint.azurewebsites.net/api/manga/page/1").then(
      (res) => {
        setData(res.data.manga_list);
      }
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar placeholder="Search manga" />
      {data && data.length > 0 ? (
        <FlatList
          keyExtractor={(item: MangaDetail) => item.title}
          data={data}
          renderItem={({ item }) => {
            return (
              <ImageBackground
                source={{ uri: item.thumb }}
                style={{ width: 420, height: 170 }}
              >
                <LinearGradient colors={["rgba(0,0,0,0)", "rgba(0,0,0,1)"]}>
                  <View style={styles.thumbnail_view}>
                    <Text style={styles.thumbnail_title}>
                      {item.title.length > 50
                        ? `${item.title.slice(0, 50)}...`
                        : item.title}
                    </Text>
                    <View
                      style={{
                        justifyContent: "space-between",
                        flexDirection: "row",
                      }}
                    >
                      <Text style={styles.thumbnail_title}>{item.chapter}</Text>
                      <Text style={styles.thumbnail_title}>
                        {item.updated_on}
                      </Text>
                    </View>
                  </View>
                </LinearGradient>
              </ImageBackground>
            );
          }}
        />
      ) : null}
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#383D42",
    flex: 1,
    marginTop: sb.currentHeight || 0,
  },
  thumbnail_view: {
    width: 420,
    height: 170,
    paddingTop: 100,
    paddingLeft: 10,
    paddingRight: 20,
  },
  thumbnail_title: {
    color: "white",
    marginTop: 10,
  },
});

export default Homescreen;
