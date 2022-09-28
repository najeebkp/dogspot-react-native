import React from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import colors from "../Constants/colors";

export default function TagItem({
  data,
  selector = false,
  onPress,
  selectedItems,
}) {
  return (
    <TouchableWithoutFeedback onPress={() => (selector ? onPress(data) : "")}>
      <View style={styles.tags}>
        <Text
          key={data.title}
          style={
            ([styles.tag],
            {
              ...styles.tag,
              backgroundColor:
                selectedItems && selector
                  ? selectedItems.find((item) => item.id == data.id)
                    ? data.color
                    : "white"
                  : data.color,
              borderColor: data.color,
              borderWidth: 1,
            })
          }
        >
          {data.title}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  tags: {
    display: "flex",
    flexDirection: "row",
    // marginLeft: 20,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  tag: {
    backgroundColor: "lightblue",
    margin: 5,
    paddingLeft: 28,
    paddingRight: 28,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 20,
    overflow: "hidden",
    color: colors.dark,
  },
});
