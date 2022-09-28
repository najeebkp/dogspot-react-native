import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MapScreen from "./MapScreen";
import FeedDetailScreen from "./FeedDetailScreen";
const Stack = createNativeStackNavigator();

const FeedNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={MapScreen}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="FeedDetail"
        component={FeedDetailScreen}
        options={{ headerShown: false, presentation: "Modal" }}
      ></Stack.Screen>
    </Stack.Navigator>
  );
};

export default FeedNavigator;
