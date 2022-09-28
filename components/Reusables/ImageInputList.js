import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import ImagePickerComponent from "./ImagePickerComponent";

const ImageInputList = ({ imageUris = [], onAddImage, onRemoveImage }) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {imageUris.map((uri) => (
          <View key={uri}>
            <ImagePickerComponent
              imageUri={uri}
              onChangeImage={(uri) => onRemoveImage(uri)}
            />
          </View>
        ))}
        <ImagePickerComponent onChangeImage={(uri) => onAddImage(uri)} />
      </ScrollView>
    </View>
  );
};

export default ImageInputList;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },
});
