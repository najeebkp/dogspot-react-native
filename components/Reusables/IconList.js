import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const IconList = ({ bgColor = "black", text = "", name = "" }) => {
  return (
    <View style={styles.container}>
      <View
        style={
          ([styles.iconWrapper],
          { ...styles.iconWrapper, backgroundColor: bgColor })
        }
      >
        <MaterialCommunityIcons
          name={name}
          color="white"
          size="22"
        ></MaterialCommunityIcons>
      </View>
      <View>
        <Text style={styles.text}>{text}</Text>
      </View>
      <View style={styles.arrow}>
        <MaterialCommunityIcons
          name="chevron-right"
          color="grey"
          size="22"
        ></MaterialCommunityIcons>
      </View>
    </View>
  );
};

export default IconList;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 30,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderBottomWidth: 0.3,
    borderColor: "#eee",
  },
  iconWrapper: {
    marginLeft: 20,
    height: 50,
    width: 50,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "500",
    paddingLeft: 10,
  },
  arrow: {
    marginLeft: "auto",
  },
});
