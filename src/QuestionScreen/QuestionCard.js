import React from "react";
import { View } from "react-native";
import { Title } from "react-native-paper";
import { AllHtmlEntities } from "html-entities";
import Answer from "../components/Answer";
import * as PropTypes from "prop-types";

class QuestionCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answered: false
    };
  }

  onAnswerPress = isCorrectAnswer => {
    this.setState({
      answered: true,
      correctAnswer: isCorrectAnswer
    });
    this.props.onAnswerPress(isCorrectAnswer);
  };

  renderAnswer = (answer, index) => {
    return (
      <Answer
        key={index}
        answer={answer}
        isCorrectAnswer={answer === this.props.questionInfo.correct_answer}
        answered={this.state.answered}
        onPress={this.onAnswerPress}
      />
    );
  };

  render() {
    return (
      <View style={{flex: 4, alignItems:'center', width: "100%", paddingHorizontal: 20}}>
        <View
          style={{
            width: "90%",
            borderWidth: 1,
            borderColor: "lightgrey",
            borderRadius: 15,
            backgroundColor: "snow",
            padding: 20
          }}
        >
          <Title style={{ color: "black" }}>
            {AllHtmlEntities.decode(this.props.questionInfo.question)}
          </Title>
        </View>
        <View
          style={{
            width: "80%",
            justifyContent: "space-evenly"
          }}
        >
          {this.props.questionInfo.incorrect_answers
            .concat(this.props.questionInfo.correct_answer)
            .sort()
            .map(this.renderAnswer)}
        </View>
      </View>
    );
  }
}

QuestionCard.propTypes = {
  questionInfo: PropTypes.shape({
    question: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    correct_answer: PropTypes.string
  })
};

export default QuestionCard;
