import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import colors from "../Constants/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function AppTextInput({
  placeholder,
  icon,
  onChange,
  keyboardType = "",
}) {
  const [text, setText] = React.useState("");

  const handleChange = (e) => {
    setText(e);
    onChange(e);
  };
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons
        name={icon}
        size={20}
        color={colors.medium}
        style={styles.icon}
      />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={(text) => handleChange(text)}
        autoCapitalize="none"
        secureTextEntry={icon == "lock" ? true : false}
        value={text}
        keyboardType={keyboardType}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.light,
    width: "100%",
    height: 50,
    padding: 15,
    marginBottom: 15,
    borderRadius: 25,
  },
  icon: {
    marginRight: 15,
  },
  input: {
    width: "90%",
    height: 50,
  },
});
