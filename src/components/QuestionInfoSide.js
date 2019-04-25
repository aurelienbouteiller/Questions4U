import React from "react";
import { Text, View } from "react-native";

function QuestionInfoSide(props) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "grey",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Text>Difficulty: {props.difficulty}</Text>
      <Text>Category: {props.category}</Text>
    </View>
  );
}

export default QuestionInfoSide;
