import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import colors from "../Constants/colors";

export default function AppButton({ title, color = "primary", onPress }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[color] }]}
      onPress={onPress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    width: "100%",
    backgroundColor: colors.primary,
    height: 55,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontSize: 17,
    fontWeight: "600",
  },
});
