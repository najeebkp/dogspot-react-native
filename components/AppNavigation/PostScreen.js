import React from "react";
import { initializeApp } from "firebase/app";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { useNavigation, useIsFocused } from "@react-navigation/native";

import * as Yup from "yup";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import { View, Text, StyleSheet, Modal } from "react-native";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import * as Location from "expo-location";
import { CreatePost } from "../Services/APIService";
import AppButton from "../Reusables/AppButton";
import AppTextInput from "../Reusables/AppTextInput";
import ImageInputList from "../Reusables/ImageInputList";
import TagSelectInput from "../Reusables/TagSelectInput";
import firebaseApi from "../Constants/firebaseApi";
import LottieView from "lottie-react-native";
import colors from "../Constants/colors";

export default function PostScreen() {
  const app = initializeApp(firebaseApi.FirebaseConfig);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [formData, setFormData] = React.useState({});
  const [validationError, setValidationError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [imageUris, setImageUris] = React.useState([]);

  let uploadUrl = [];
  let downloadUrlList = [];

  let schema = Yup.object().shape({
    title: Yup.string().required().label("Title"),
    description: Yup.string().required().label("Description"),
    number_of_dogs: Yup.number().required().label("Number of dogs"),
  });

  const handleChange = (title, value) => {
    let newData = { ...formData };

    newData[title] = value;
    setFormData(newData);
  };

  const handleAddImage = (uri) => {
    setImageUris([...imageUris, uri]);
  };
  const handleRemoveImage = (uri) => {
    setImageUris(imageUris.filter((imageUri) => imageUri !== uri));
  };

  const getCurrentLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});
    let coords = {
      latitude: location.coords.latitude.toString(),
      longitude: location.coords.longitude.toString(),
    };
    let newData = { ...formData };
    newData["coords"] = coords;
    await setFormData(newData);
  };

  const handleSubmit = async () => {
    schema
      .validate({
        title: formData.title,
        description: formData.description,
        number_of_dogs: formData.number_of_dogs,
      })
      .then(function (value) {
        validate();
      })
      .catch(function (err) {
        setValidationError(err.errors);
        setLoading(false);
      });
  };

  const validate = () => {
    if (imageUris.length < 1) {
      setValidationError("Take atleast one picture.");
    } else {
      setLoading(true);
      upload();
    }
  };

  React.useEffect(() => {
    getCurrentLocation();
  }, [isFocused]);

  const compress = async (item) => {
    const manipResult = await manipulateAsync(
      item,
      [
        {
          resize: {
            width: 400,
          },
        },
      ],
      {
        compress: 0.7,
        format: SaveFormat.webp,
      },
    );
    return manipResult.uri;
  };
  const upload = async () => {
    let storage = getStorage();

    let promises = imageUris.map(async (item) => {
      return await fetch(await compress(item));
      // uploadUrl.push(img);
    });
    for await (let val of promises) {
      uploadUrl.push(val);
    }

    const getWithPromiseAll = async () => {
      // console.log("Start");

      const promises = await uploadUrl.map(async (item) => {
        const bytes = await item.blob();
        const refe = ref(storage, `${uuidv4()}.webp`);
        const newFile = new File([bytes], `asa.webp`, {
          type: "image/webp",
        });
        const upload = new Promise((resolve, reject) => {
          uploadBytesResumable(refe, newFile)
            .then((response) => {
              getDownloadURL(response.ref).then((downloadUrl) => {
                downloadUrlList.push(downloadUrl);
                resolve(downloadUrl);
              });
            })
            .catch((error) => console.log(error));
        });
        return upload;
      });
      const uploads = await Promise.all(promises);

      // console.log("End");
    };

    getWithPromiseAll().then(() => {
      ApiPush();
    });
  };
  const ApiPush = () => {
    let newData = { ...formData };
    newData["image"] = downloadUrlList;
    publish(newData);
  };

  const publish = (data) => {
    CreatePost(data)
      .then((response) => {
        setFormData({});
        setValidationError("");
        setImageUris([]);
        setSuccess(true);
        setTimeout(() => {
          setSuccess(false);
          navigation.navigate("Welcome");
        }, 1800);

        setLoading(false);
      })
      .catch((error) => {
        console.log("error publishing!");
        setLoading(false);
      });
  };

  const handleOnChangeTags = (tags) => {
    let newData = { ...formData };
    newData["dog_behaviour"] = tags;
    setFormData(newData);
  };

  return (
    <View>
      {success ? (
        <Modal>
          <View
            style={{
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LottieView
              autoPlay
              style={{
                width: 150,
                height: 150,
                backgroundColor: "#fff",
              }}
              source={{
                uri: "https://assets7.lottiefiles.com/private_files/lf30_yo2zavgg.json",
              }}
            />
          </View>
        </Modal>
      ) : (
        <>
          {loading ? (
            <Modal>
              <View
                style={{
                  height: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <LottieView
                  autoPlay
                  style={{
                    width: 150,
                    height: 150,
                    backgroundColor: "#fff",
                  }}
                  source={{
                    uri: "https://assets1.lottiefiles.com/packages/lf20_ekjjwkxd.json",
                  }}
                  // source={require("../assets/loading.json")}
                />
              </View>
            </Modal>
          ) : (
            <View style={styles.container}>
              <ImageInputList
                imageUris={imageUris}
                onAddImage={(uri) => handleAddImage(uri)}
                onRemoveImage={(uri) => handleRemoveImage(uri)}
              />
              {/* <AppButton title="Select Image" onPress={selectImage} /> */}
              <AppTextInput
                placeholder="Title"
                onChange={(value) => handleChange("title", value)}
              />
              <AppTextInput
                placeholder="Description"
                onChange={(value) => handleChange("description", value)}
              />
              <AppTextInput
                placeholder="Number of Dogs "
                keyboardType="numeric"
                onChange={(value) => handleChange("number_of_dogs", value)}
              />
              <TagSelectInput
                onChangeTags={handleOnChangeTags}
              ></TagSelectInput>
              <Text
                style={{
                  color: colors.primary,
                  textAlign: "center",
                  paddingBottom: 15,
                }}
              >
                {validationError}
              </Text>
              <AppButton title="Publish" onPress={() => handleSubmit()} />
            </View>
          )}
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    marginTop: 10,
  },
});
