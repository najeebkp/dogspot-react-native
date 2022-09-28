import * as SecureStore from "expo-secure-store";

const key = "authToken";

const storeToken = async (authToken) => {
  try {
    await SecureStore.setItemAsync(key, authToken);
  } catch (error) {
    console.log("Error storing the auth Token", error);
  }
};

const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log("Error getting the auth Token", error);
  }
};

const removeToken = () => {
  try {
    return SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log("Error deleting the auth Token", error);
  }
};

export default { getToken, storeToken, removeToken };
