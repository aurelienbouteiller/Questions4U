import React, { Component } from "react";
import { View, FlatList, AsyncStorage } from "react-native";
import {
  Title,
  Paragraph,
  ActivityIndicator,
  Appbar
} from "react-native-paper";
import { AllHtmlEntities } from "html-entities";
import { Constants } from "expo";

class QuestionsHistoryScreen extends Component {
  state = {
    questionsHistory: null
  };

  componentDidMount() {
    this.loadQuestionsHistory();
  }

  loadQuestionsHistory = async () => {
    this.setState({
      questionsHistoryLoading: true
    });
    let questionsHistory = [];
    const questionsHistoryJSON = await AsyncStorage.getItem("questionsHistory");
    if (questionsHistoryJSON) {
      questionsHistory = JSON.parse(questionsHistoryJSON);
    }
    this.setState({
      questionsHistory,
      questionsHistoryLoading: false
    });
  };

  renderQuestionHistory = ({ item: questionHistory }) => {
    return (
      <View
        style={{
          width: "90%",
          borderWidth: 1,
          borderColor: "lightgrey",
          borderRadius: 15,
          backgroundColor: questionHistory.isCorrectAnswer ? "green": "tomato",
          padding: 20,
          marginVertical: 15
        }}
      >
        <Title style={{ color: "white" }}>
          {`${
            questionHistory.isCorrectAnswer
              ? "You were right! "
              : "You were wrong! "
          } It was: ${questionHistory.correctAnswer}`}
        </Title>
        <Paragraph style={{ color: "white" }}>
          {AllHtmlEntities.decode(questionHistory.question)}
        </Paragraph>
      </View>
    );
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          marginTop: Constants.statusBarHeight,
          backgroundColor: "cornflowerblue"
        }}
      >
        <Appbar>
          <Appbar.BackAction onPress={() => this.props.navigation.goBack()} />
          <Appbar.Content title="Your questions history" />
        </Appbar>
        {this.state.questionsHistoryLoading && (
          <ActivityIndicator animating={this.state.questionsHistoryLoading} />
        )}
          <FlatList
            data={this.state.questionsHistory}
            renderItem={this.renderQuestionHistory}
            keyExtractor={item => item.question}
            contentContainerStyle={{justifyContent:'center', alignItems: 'center', paddingVertical: 20}}
          />
      </View>
    );
  }
}

export default QuestionsHistoryScreen;
