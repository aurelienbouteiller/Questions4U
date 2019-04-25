import React from "react";
import { View } from "react-native";
import AnswerLoading from "./AnswerLoading";

const LOADING_COMPONENT = "loadingComponent";

class QuestionCardLoading extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 4,
          alignItems: "center",
          width: "100%",
          paddingHorizontal: 20
        }}
      >
        <View
          style={{
            width: "90%",
            height: 120,
            padding: 15,
            borderWidth: 1,
            borderColor: "lightgrey",
            borderRadius: 15,
            backgroundColor: "snow",
            justifyContent: "space-evenly"
          }}
        >
          <View
            style={{ height: 18, width: "80%", backgroundColor: "lightgrey" }}
          />
          <View
            style={{ height: 18, width: "60%", backgroundColor: "lightgrey" }}
          />
          <View
            style={{ height: 18, width: "40%", backgroundColor: "lightgrey" }}
          />
        </View>
        <View
          style={{
            flex: 1,
            width: "100%",
            justifyContent: "space-evenly",
            alignItems: "center"
          }}
        >
          {new Array(4).fill(LOADING_COMPONENT).map((item, index) => (
            <AnswerLoading key={index}/>
          ))}
        </View>
      </View>
    );
  }
}

export default QuestionCardLoading;
