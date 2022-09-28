import React from "react";
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  FlatList,
} from "react-native";

import colors from "../Constants/colors";
import TagItem from "./TagItem";

export default function TagSelectInput({ onChangeTags }) {
  const [modalVisible, setModalVisible] = React.useState(false);
  const handleModal = (param) => {
    setModalVisible(param);
  };
  const [selected, setSelected] = React.useState([]);
  const data = [
    { id: 1, title: "Agrressive", color: "#fc6c6c" },
    { id: 2, title: "Bitting", color: "#ff3838" },
    { id: 3, title: "Social", color: "#8bef91" },
    { id: 4, title: "Friendly", color: "lightblue" },
    { id: 5, title: "Barking", color: "#ffb24f" },
    { id: 6, title: "Chasing", color: "#eaed47" },
    { id: 7, title: "Territorial", color: "salmon" },
    { id: 8, title: "Illness", color: "lightgrey" },
  ];

  const handleSelectedItems = (data) => {
    setSelected((prev) => [
      ...prev.filter((item) => item.id !== data.id),
      data,
    ]);
    onChangeTags([...selected, data]);
    if (selected.find((item) => item.id == data.id)) {
      setSelected((prev) => [...prev.filter((item) => item.id !== data.id)]);
      onChangeTags([...selected.filter((item) => item.id !== data.id)]);
    }
  };

  return (
    <>
      <TouchableWithoutFeedback>
        <View style={styles.container}>
          <View>
            <Text style={styles.text}>Select dog behaviours</Text>
            <FlatList
              data={data}
              numColumns={3}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TagItem
                  data={item}
                  selector={true}
                  selectedItems={selected}
                  onPress={handleSelectedItems}
                ></TagItem>
              )}
            ></FlatList>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.light,
    width: "100%",
    height: "auto",
    padding: 15,
    marginBottom: 15,
    borderRadius: 25,
  },
  text: {
    color: "#bfbfbf",
    paddingLeft: 13,
    paddingBottom: 5,
  },
  modal: {
    paddingTop: 100,
  },
  selectedContainer: {
    backgroundColor: colors.light,
    height: 100,
    borderRadius: 25,
    marginBottom: 20,
  },
});
