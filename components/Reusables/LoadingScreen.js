import React from "react";
import { StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";

export default function LoadingScreen() {
  return (
    <View>
      <LottieView
        autoPlay
        style={{
          width: 250,
          height: 250,
          backgroundColor: "#fff",
        }}
        source={{
          uri: "https://assets9.lottiefiles.com/private_files/lf30_noclpt6t.json",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
