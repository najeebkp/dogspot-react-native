import React from "react";
import { View, Image, StyleSheet } from "react-native";
import AppButton from "../Reusables/AppButton";

export default function AuthScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/dogspot-logo.png")}
      />
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <AppButton
            title="Login"
            color={"primary"}
            onPress={() => navigation.navigate("Login")}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <AppButton
            title="Register"
            color={"secondary"}
            onPress={() => navigation.navigate("Register")}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    // paddingTop: 70,
    flex: 1,
    justifyContent: "flex-end",
  },
  image: {
    position: "absolute",
    width: 200,
    height: 150,
    marginBottom: 15,
    top: 120,
  },
  buttonWrapper: {
    width: "97%",
    marginTop: 15,
  },
  buttonContainer: {
    width: "100%",
    bottom: 50,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
});
