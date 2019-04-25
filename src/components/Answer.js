import React from "react";
import { Text, StyleSheet } from "react-native";
import * as PropTypes from "prop-types";
import { AllHtmlEntities } from "html-entities";
import Touchable from "react-native-platform-touchable";

class Answer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAnswer: false
    };
  }
  onPress = () => {
    this.setState({
      showAnswer: true
    });
    this.props.onPress(this.props.isCorrectAnswer);
  };

  render() {
    return (
      <Touchable
        disabled={this.props.answered}
        onPress={this.onPress}
        style={[
          {
            backgroundColor: "seashell",
            margin: 10,
            padding: 10,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: "lightgrey"
          },

          this.props.answered &&
          (this.state.showAnswer || this.props.isCorrectAnswer)
            ? this.props.isCorrectAnswer
              ? styles.correctAnswer
              : styles.wrongAnswer
            : null
        ]}
      >
        <Text
          style={{
            fontSize: 16,
            color:
              this.props.answered &&
              (this.state.showAnswer || this.props.isCorrectAnswer)
                ? "snow"
                : "black"
          }}
        >
          {AllHtmlEntities.decode(this.props.answer)}
        </Text>
      </Touchable>
    );
  }
}

Answer.propTypes = {
  onPress: PropTypes.func,
  answer: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  correctAnswer: { backgroundColor: "green" },
  wrongAnswer: { backgroundColor: "tomato" }
});

export default Answer;
