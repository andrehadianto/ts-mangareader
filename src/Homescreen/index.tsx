import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import Axios from "axios";

const Homescreen = () => {
  useEffect(() => {
    Axios.get(
      "http://mangamint.azurewebsites.net/api/manga/page/1"
    ).then((res) => console.log(res));
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Homescreen;
