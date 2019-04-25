import React from "react";
import { Text, View } from "react-native";
import { RadioButton } from "react-native-paper";
import * as PropTypes from "prop-types";

function Difficulty(props) {
  return (
    <View style={{ flexDirection: "row", justifyContent: 'space-evenly', alignItems: "center" }}>
      <RadioButton.Group
        onValueChange={props.onValueChange}
        value={props.value}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text>Easy</Text>
          <RadioButton value="easy" />
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text>Medium</Text>
          <RadioButton value="medium" />
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text>Hard</Text>
          <RadioButton value="hard" />
          <View />
        </View>
      </RadioButton.Group>
    </View>
  );
}

Difficulty.propTypes = {
  onValueChange: PropTypes.func,
  value: PropTypes.string
};

export default Difficulty;
