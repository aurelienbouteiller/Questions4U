import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";

class FlipCard extends Component {
  constructor(props) {
    super(props);
    const [FrontSide, BackSide] = React.Children.toArray(this.props.children);
    this.frontSide = FrontSide;
    this.backSide = BackSide;
    this.state = {
      activeSide: "frontSide"
    };
  }

  onPress = () => {
    const newSide =
      this.state.activeSide === "frontSide" ? "backSide" : "frontSide";
    this.setState({ activeSide: newSide });
  };

  render() {
    return (
      <TouchableOpacity style={this.props.style} onPress={this.onPress}>
        <View
          style={{
            flex: 1,
            display: this.state.activeSide === "frontSide" ? "flex" : "none"
          }}
        >
          {this.frontSide}
        </View>
        <View
          style={{
            flex: 1,
            display: this.state.activeSide === "backSide" ? "flex" : "none"
          }}
        >
          {this.backSide}
        </View>
      </TouchableOpacity>
    );
  }
}

export default FlipCard;
