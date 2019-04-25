import React from "react";
import { View, AsyncStorage } from "react-native";
import { Button, Snackbar } from "react-native-paper";
import axios from "axios/index";
import Category from "./Category";
import QuestionCard from "./QuestionCard";
import QuestionCardLoading from "./QuestionCardLoading";

const initialState = {
  answered: false,
  questionLoading: true,
  showResult: false,
  winStreak: 0
};

const difficultyPoints = {
  easy: 5,
  medium: 10,
  hard: 15
};

class QuestionScreen extends React.Component {
  state = initialState;
  static navigationOptions = {
    title: `Question time`
  };
  constructor(props) {
    super(props);
    const {
      difficultyChosen,
      categoryId,
      categoryName
    } = this.props.navigation.state.params;
    this.questionDifficulty = difficultyChosen;
    this.categoryId = categoryId;
    this.categoryName = categoryName;
  }

  componentDidMount() {
    this.loadQuestion();
    this.loadCategoryWinStreak();
  }

  componentWillUnmount() {
    AsyncStorage.setItem(
      `Category${this.categoryId}`,
      this.state.winStreak.toString()
    );
  }

  loadQuestion = async () => {
    this.setState({ questionLoading: true });
    const {
      data: {
        results: [questionInfo]
      }
    } = await axios.get("https://opentdb.com/api.php", {
      params: {
        amount: 1,
        difficulty: this.questionDifficulty,
        category: this.categoryId
      }
    });
    this.setState({ questionInfo, questionLoading: false });
  };

  loadCategoryWinStreak = async () => {
    const winStreak = await AsyncStorage.getItem(`Category${this.categoryId}`);
    if (winStreak) {
      this.setState({ winStreak: Number(winStreak) });
    }
  };

  reloadQuestion = async () => {
    this.setState({
      answered: false,
      questionLoading: true,
      showResult: false
    });
    await this.loadQuestion();
  };

  onAnswerPress = isCorrectAnswer => {
    this.setState(state => {
      return {
        isCorrectAnswer,
        winStreak: isCorrectAnswer ? state.winStreak + 1 : 0
      };
    });
    this.saveQuestionHistory(isCorrectAnswer);
    this.setModalVisible(true);
  };

  saveQuestionHistory = async isCorrectAnswer => {
    const { question, difficulty, correct_answer } = this.state.questionInfo;
    let questionsHistory = [];
    const questionsHistoryJSON = await AsyncStorage.getItem("questionsHistory");
    if (questionsHistoryJSON) {
      questionsHistory = JSON.parse(questionsHistoryJSON);
    }
    questionsHistory.push({
      question,
      difficulty,
      correctAnswer: correct_answer,
      isCorrectAnswer
    });
    await AsyncStorage.setItem(
      "questionsHistory",
      JSON.stringify(questionsHistory)
    );
  };

  setModalVisible = visible => {
    this.setState({
      showResult: visible
    });
  };

  render() {
    const { winStreak } = this.state;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "cornflowerblue"
        }}
      >
        <Category categoryName={this.categoryName} />
        {this.state.questionLoading ? (
          <QuestionCardLoading />
        ) : (
          <QuestionCard
            questionInfo={this.state.questionInfo}
            onAnswerPress={this.onAnswerPress}
          />
        )}
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Button
            loading={this.state.questionLoading}
            color="snow"
            icon="refresh"
            mode="contained"
            onPress={this.reloadQuestion}
          >
            New question
          </Button>
        </View>
        <Snackbar
          duration={Snackbar.DURATION_SHORT}
          visible={this.state.showResult}
          onDismiss={() => this.setModalVisible(false)}
        >
          {this.state.isCorrectAnswer
            ? `Congrats! ${
                difficultyPoints[this.questionDifficulty]
              } more points!
${winStreak} good answers in a row`
            : "Nope! Win streak is now reset"}
        </Snackbar>
      </View>
    );
  }
}

export default QuestionScreen;
