import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import LoginScreen from "./components/AppNavigation/LoginScreen";
import Constants from "expo-constants";
import RegisterScreen from "./components/AppNavigation/RegisterScreen";
import AuthScreen from "./components/AppNavigation/AuthScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import navigationTheme from "./components/Constants/navigationTheme";
import PostScreen from "./components/AppNavigation/PostScreen";
import AccountScreen from "./components/AppNavigation/AccountScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import PostButton from "./components/Reusables/PostButton";
import FeedNavigator from "./components/AppNavigation/FeedNavigator";
import AuthContext from "./components/Context/context";
import authStorage from "./components/Services/Storage";
import jwtDecode from "jwt-decode";
import * as SplashScreen from "expo-splash-screen";

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [user, setUser] = React.useState();
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    async function prepare() {
      try {
        const token = await authStorage.getToken();
        if (!token) return;
        setUser(jwtDecode(token));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
      }}
      onLayout={onLayoutRootView}
    >
      <AuthContext.Provider value={{ user, setUser }}>
        <NavigationContainer theme={navigationTheme}>
          {!user ? (
            <Stack.Navigator>
              <Stack.Screen
                name="Home"
                component={AuthScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
            </Stack.Navigator>
          ) : (
            <Tab.Navigator
              screenOptions={{
                // ...
                tabBarStyle: {
                  borderTopWidth: 0,
                },
              }}
            >
              <Tab.Screen
                name="Feed"
                component={FeedNavigator}
                options={{
                  headerShown: false,
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons
                      name="home"
                      color={color}
                      size={size}
                    />
                  ),
                }}
              />
              <Tab.Screen
                name="Post"
                component={PostScreen}
                options={({ navigation }) => ({
                  tabBarButton: () => (
                    <PostButton onPress={() => navigation.navigate("Post")} />
                  ),
                })}
              />
              <Tab.Screen
                name="Account"
                component={AccountScreen}
                options={{
                  headerShadowVisible: false,
                  tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons
                      name="account"
                      color={color}
                      size={size}
                    />
                  ),
                }}
              />
            </Tab.Navigator>
          )}
        </NavigationContainer>
      </AuthContext.Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: Constants.statusBarHeight,
  },
});
