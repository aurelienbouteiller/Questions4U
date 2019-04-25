import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import * as PropTypes from "prop-types";

function Category(props) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        flex: 1,
        height: 100,
        justifyContent: "space-evenly",
        alignItems: "center",
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: "lightgrey",
        margin: 15,
        backgroundColor: "white",
        borderRadius: 10
      }}
    >
      <Text style={{ fontSize: 18, textAlign: "center" }}>
        {props.categoryName}
      </Text>
      <View style={{ width: "80%", height: 1, backgroundColor: "lightgrey" }} />
      <Text style={{ fontSize: 16, textAlign: "center" }}>
        {props.categoryInfo.total_num_of_questions} questions
      </Text>
    </TouchableOpacity>
  );
}

Category.propTypes = {
  onPress: PropTypes.func,
  categoryId: PropTypes.number,
  categoryName: PropTypes.string,
  categoryInfo: PropTypes.any
};

export default Category;
