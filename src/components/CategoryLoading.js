import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import * as PropTypes from "prop-types";

function CategoryLoading(props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{ flex: 1, paddingHorizontal: 8 }}
    >
      <View
        style={{
          flex: 1,
          height: 100,
          justifyContent: "space-evenly",
          alignItems: "center",
          backgroundColor: 'white',
          borderWidth: 1,
          borderColor: "lightgrey",
          marginVertical: 15,
          borderRadius: 10
        }}
      >
        <View style={{ width: "70%", height: 15, backgroundColor: "lightgrey" }} />
        <View style={{ width: "40%", height: 15, backgroundColor: "lightgrey" }} />
      </View>
    </TouchableOpacity>
  );
}

export default CategoryLoading;
