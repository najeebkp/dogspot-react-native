import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function UserThumbnail({ desc = "", name = "" }) {
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          style={styles.image}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/168/168724.png",
          }}
        />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.title}>{name ? name : ""}</Text>
        <Text style={styles.desc}>{desc ? desc : ""}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  imageWrapper: {
    width: 80,
    height: 80,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  textWrapper: {
    paddingLeft: 10,
  },
  title: {
    fontSize: 18,
  },
  desc: {
    paddingTop: 5,
    color: "grey",
  },
});
