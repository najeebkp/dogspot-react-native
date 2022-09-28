import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";

import UserThumbnail from "../Reusables/UserThumbnail";
import TagItem from "../Reusables/TagItem";

export default function FeedDetailScreen({ route }) {
  const { data, otherParam } = route.params;
  const [mainImage, setMainImage] = React.useState(data.image[0]);
  const handleMainImage = (url) => {
    setMainImage(url);
  };
  return (
    <View style={styles.container}>
      <View style={styles.overlay}></View>
      <ScrollView>
        <>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={{ uri: mainImage }}></Image>
          </View>
          <View style={styles.smallImageContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {data.image.map((item) => (
                <TouchableWithoutFeedback
                  key={item}
                  onPress={() => handleMainImage(item)}
                >
                  <Image
                    style={styles.smallImage}
                    source={{
                      uri: item,
                    }}
                  ></Image>
                </TouchableWithoutFeedback>
              ))}
            </ScrollView>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.desc}>{data.description}</Text>
          </View>
          <View style={{ paddingLeft: 15 }}>
            <ScrollView horizontal>
              <FlatList
                data={data.dog_behaviour}
                numColumns={3}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <TagItem data={item} />}
              />
            </ScrollView>
          </View>
          <View style={{ marginTop: 15 }}>
            <UserThumbnail
              name={data.user_email}
              desc={`${new Date(data.created_time).toGMTString()}`}
            />
          </View>
        </>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginTop: Constants.statusBarHeight,
  },
  overlay: {
    backgroundColor: "red",
    width: "100%",
    height: "20%",
    position: "absolute",
    top: 0,
    zIndex: 1,
    opacity: 0,
  },
  imageContainer: {
    width: "100%",
    height: 350,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    padding: 20,
  },
  title: {
    fontSize: 25,
  },
  desc: {
    paddingTop: 10,
    fontSize: 18,
    color: "grey",
  },

  smallImageContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  smallImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    margin: 10,
  },
});
