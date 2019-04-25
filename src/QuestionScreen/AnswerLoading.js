import React from "react";
import {View} from "react-native";

function AnswerLoading() {
  return <View

    style={{
      flex: 1,
      justifyContent: "center",
      backgroundColor: "seashell",
      height: 26,
      width: "80%",
      borderRadius: 5,
      borderWidth: 1,
      borderColor: "lightgrey",
      padding: 10,
      margin: 10
    }}
  >
    <View
      style={{
        width: "50%",
        backgroundColor: "lightgrey",
        height: 20
      }}
    />
  </View>;
}

export default AnswerLoading;
