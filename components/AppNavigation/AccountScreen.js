import React, { useContext } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import colors from "../Constants/colors";
import IconList from "../Reusables/IconList";
import UserThumbnail from "../Reusables/UserThumbnail";
import AuthContext from "../Context/context";
import authStorage from "../Services/Storage";

export default function AccountScreen() {
  const { user, setUser } = useContext(AuthContext);
  const data = [
    {
      id: 1,
      title: "Listings",
      icon: "view-list",
      bgColor: "lightblue",
    },
    {
      id: 2,
      title: "Notifications",
      icon: "bell",
      bgColor: "darkorange",
    },
    {
      id: 3,
      title: "Log Out",
      icon: "logout",
      bgColor: colors.primary,
    },
  ];

  const handleClick = (button) => {
    if (button == "Log Out") {
      setUser(null);
      authStorage.removeToken();
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.elementWrapper}>
        <UserThumbnail name={user.name} desc={user.email} />
      </View>
      <View style={styles.elementWrapper}>
        <FlatList
          data={data}
          key={(data) => data.id.toStrin()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleClick(item.title)}>
              <IconList
                name={item.icon}
                bgColor={item.bgColor}
                text={item.title}
              />
            </TouchableOpacity>
          )}
        ></FlatList>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e2e2e2",
    height: "100%",
  },
  elementWrapper: {
    backgroundColor: "#fff",
    marginTop: 30,
    borderBottomWidth: 0.2,
  },
});
