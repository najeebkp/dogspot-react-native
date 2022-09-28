import React from "react";
import {
  Alert,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import colors from "../Constants/colors";
import * as ImagePicker from "expo-image-picker";

const ImagePickerComponent = ({ imageUri, onChangeImage }) => {
  const imageRequest = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) alert("You need to enable camera permission.");
  };
  React.useEffect(() => {
    imageRequest();
  }, []);

  const handlePress = () => {
    if (!imageUri) {
      selectImage();
    } else
      Alert.alert("Delete", "Are you sure you want to delete this image?", [
        {
          text: "Yes",
          onPress: () => onChangeImage(imageUri),
        },
        {
          text: "No",
        },
      ]);
  };
  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        quality: 0.5,
      });
      if (!result.cancelled) {
        onChangeImage(result.uri);
      }
    } catch (error) {
      console.log("error on image picker");
    }
  };
  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        {imageUri ? (
          <Image
            style={styles.image}
            key={imageUri}
            source={{ uri: imageUri }}
          />
        ) : (
          <MaterialCommunityIcons name="camera" size={40} />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ImagePickerComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginBottom: 20,
    overflow: "hidden",
    marginRight: 20,
  },
  image: {
    width: 100,
    height: 100,

    borderColor: "black",
    borderWidth: 1,
  },
});
