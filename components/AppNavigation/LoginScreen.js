import React, { useContext } from "react";
import { View, Text, Image, StyleSheet, Modal } from "react-native";
import * as Yup from "yup";
import AppButton from "../Reusables/AppButton";
import AppTextInput from "../Reusables/AppTextInput";
import AuthContext from "../Context/context";
import { Login } from "../Services/APIService";
import jwtDecode from "jwt-decode";
import authStorage from "../Services/Storage";
import LottieView from "lottie-react-native";
import colors from "../Constants/colors";

export default function LoginScreen() {
  const [formData, setFormData] = React.useState({ email: "", password: "" });
  const [validationError, setValidationError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const authContext = useContext(AuthContext);

  let schema = Yup.object().shape({
    email: Yup.string().email().required().label("Email"),
    password: Yup.string().required().label("Password"),
  });

  const handleChange = (title, value) => {
    let newData = { ...formData };

    newData[title] = value;
    setFormData(newData);
  };
  const handleSubmit = () => {
    schema
      .validate({ email: formData.email, password: formData.password })
      .then(function (value) {
        setLoading(true);
        Login(formData)
          .then((response) => {
            const user = jwtDecode(response.accessToken);

            authContext.setUser(user);
            authStorage.storeToken(response.accessToken);
            setLoading(false);
          })
          .catch((err) => {
            setValidationError(err.message);

            setLoading(false);
          });
      })
      .catch(function (err) {
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
          <>
            <Image
              style={styles.image}
              source={require("../../assets/dogspot-logo.png")}
            />
            <View style={{ padding: 10 }}>
              <AppTextInput
                placeholder={"Email"}
                icon="account"
                onChange={(value) => handleChange("email", value)}
              />
              <AppTextInput
                placeholder={"Password"}
                icon="lock"
                onChange={(value) => handleChange("password", value)}
              />
              <Text style={{ color: colors.primary, textAlign: "center" }}>
                {validationError}
              </Text>
            </View>
            <View style={styles.buttonWrapper}>
              <AppButton title="Login" color="primary" onPress={handleSubmit} />
            </View>
          </>
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
  },
});
