import React from "react";
import { View, Text } from "react-native";

function Category(props) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, color: "snow" }}>{props.categoryName}</Text>
    </View>
  );
}

export default Category;
