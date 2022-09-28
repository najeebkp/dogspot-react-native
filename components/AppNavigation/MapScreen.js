import React, { useState, useEffect, useRef } from "react";
import { useIsFocused } from "@react-navigation/native";
import MapView, { Marker, Callout } from "react-native-maps";
import {
  Platform,
  StyleSheet,
  Dimensions,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import * as Location from "expo-location";
import { GetPosts } from "../Services/APIService";
import LoadingScreen from "../Reusables/LoadingScreen";

export default function MapScreen({ navigation }) {
  const isFocused = useIsFocused();
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [feed, setFeed] = useState([]);
  const mapViewRef = useRef();

  const getCurrentLocation = async () => {
    setLoading(true);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    let region = {
      latitude: parseFloat(location.coords.latitude),
      longitude: parseFloat(location.coords.longitude),
      latitudeDelta: 5,
      longitudeDelta: 5,
    };
    await setLocation({
      initialRegion: region,
    });
    setLoading(false);
  };

  const goToInitialLocation = async () => {
    let initialRegion = Object.assign({}, location?.initialRegion);
    initialRegion["latitudeDelta"] = 0.005;
    initialRegion["longitudeDelta"] = 0.005;
    mapViewRef.current.animateToRegion(initialRegion, 2000);
  };

  const getPosts = () => {
    GetPosts().then((response) => {
      setFeed(response);
    });
  };

  useEffect(() => {
    getCurrentLocation();
    getPosts();
  }, []);

  useEffect(() => {
    getPosts();
  }, [isFocused]);

  // console.log(location);
  return (
    <View style={styles.container}>
      {loading ? (
        <LoadingScreen />
      ) : (
        <MapView
          style={styles.map}
          followUserLocation={true}
          showsUserLocation={true}
          ref={mapViewRef}
          // region={location?.initialRegion}
          onMapReady={goToInitialLocation}
          initialRegion={location?.initialRegion}
        >
          {feed.map((item, key) => (
            <View key={key}>
              <Marker
                style={styles.marker}
                coordinate={{
                  latitude: parseFloat(item.coords.latitude),
                  longitude: parseFloat(item.coords.longitude),
                }}
              >
                <Image
                  source={require("../../assets/dogmarker.png")}
                  style={{ width: 60, height: 60 }}
                  resizeMode="contain"
                />
                <Callout tooltip>
                  <TouchableWithoutFeedback
                    onPress={() =>
                      navigation.navigate("FeedDetail", { data: item })
                    }
                  >
                    <View style={styles.callout}>
                      <View style={styles.imageWrapper}>
                        <Image
                          style={styles.image}
                          source={{ uri: item.image[0] }}
                        ></Image>
                      </View>
                      <View style={styles.textWrapper}>
                        <Text style={styles.header}>{item.title}</Text>
                        <Text numberOfLines={2} style={styles.desc}>
                          {item.description}
                        </Text>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </Callout>
              </Marker>
            </View>
          ))}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  marker: {
    // width: 10,
    // height: 10,
  },
  callout: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 6,
    minWidth: 200,
    maxWidth: "auto",
    padding: 10,

    // overflow: "wrap",
  },
  header: {
    fontWeight: "600",
    width: 200,
  },
  desc: {
    width: 200,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 5,
  },
  textWrapper: {
    paddingLeft: 10,
  },
  arrowIcon: {
    top: 26,
  },
});
