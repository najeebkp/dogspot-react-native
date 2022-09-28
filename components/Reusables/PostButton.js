import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../Constants/colors";

export default function PostButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons name="plus-circle" size={52} color="white" />
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    borderRadius: 40,
    height: 80,
    width: 80,
    bottom: 20,
    borderWidth: 10,
    borderColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
