import React from "react";
import * as Yup from "yup";
import { View, Text, Image, StyleSheet, Modal } from "react-native";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import AppButton from "../Reusables/AppButton";
import AppTextInput from "../Reusables/AppTextInput";
import colors from "../Constants/colors";
import { Register } from "../Services/APIService";

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [formData, setFormData] = React.useState({ email: "", password: "" });
  const [validationError, setValidationError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  let schema = Yup.object().shape({
    name: Yup.string().required().label("Name"),
    email: Yup.string().email().required().label("Email"),
    password: Yup.string().required().label("Password"),
    password2: Yup.string()
      .required()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .label("Confirm Password"),
  });

  const handleChange = (title, value) => {
    let newData = { ...formData };

    newData[title] = value;
    setFormData(newData);
  };

  const handleSubmit = () => {
    schema
      .validate({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password2: formData.password2,
      })
      .then(function (value) {
        setLoading(true);
        Register(formData)
          .then((response) => {
            setLoading(false);
            navigation.navigate("Login");
          })
          .catch((err) => {
            setValidationError(err.message);

            setLoading(false);
          });
      })
      .catch(function (err) {
        // err.name; // => 'ValidationError'
        setValidationError(err.errors); // => ['age must be a number']
        return;
      });
  };

  return (
    <View>
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
            />
          </View>
        </Modal>
      ) : (
        <View style={styles.container}>
          {/* <Text>This is Login Screen</Text> */}
          <Image
            style={styles.image}
            source={require("../../assets/dogspot-logo.png")}
          />
          <View style={{ padding: 10 }}>
            <AppTextInput
              placeholder={"Name"}
              icon="account"
              onChange={(value) => handleChange("name", value)}
            />
            <AppTextInput
              placeholder={"Email"}
              icon="email"
              onChange={(value) => handleChange("email", value)}
            />
            <AppTextInput
              placeholder={"Password"}
              icon="lock"
              onChange={(value) => handleChange("password", value)}
            />
            <AppTextInput
              placeholder={"Confirm Password"}
              icon="lock"
              onChange={(value) => handleChange("password2", value)}
            />
          </View>
          <Text style={{ color: colors.primary }}>{validationError}</Text>
          <View style={styles.buttonWrapper}>
            <AppButton title="Register" onPress={handleSubmit} />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 40,
  },
  image: {
    width: 200,
    height: 150,
    marginBottom: 15,
  },
  buttonWrapper: {
    width: "97%",
    marginTop: 15,
    // backgroundColor: "red",
  },
});
