import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import axios from "axios";
import { AllHtmlEntities } from "html-entities";
import FlipCard from "react-native-flip-card";

class App extends React.Component {
  state = {
    questions: []
  };
  async componentDidMount() {
    const {
      data: { results: questions }
    } = await axios.get("https://opentdb.com/api.php?amount=10");
    this.setState({ questions });
  }

  renderQuestion = ({ item: questionData }) => (
    <View>
      <Text>{questionData.question}</Text>
    </View>
  );

  renderQuestionCatDif = ({ item: questionCatDif }) => {
    return (
      <FlipCard
        style={{
          height: 200,
          width: 300,
          borderWidth: 2,
          borderColor: "green",
          marginVertical: 10,
          marginHorizontal: 20,
          paddingHorizontal: 10
        }}
        friction={6}
        perspective={1000}
      >
        <View
          style={{
            height: 200,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text>Difficulty: {questionCatDif.difficulty}</Text>
          <Text>Category: {questionCatDif.category}</Text>
        </View>
        <View
          style={{
            height: 200,
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: 20
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ textAlign: "center" }}>
              {AllHtmlEntities.decode(questionCatDif.question)}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ textAlign: "center" }}>
              Veuillez choisir une des réponses ci-dessous :
            </Text>
            <View
              style={{
                height: 100,
                flexDirection: "row",
                justifyContent: "space-evenly",
                flexWrap: "wrap"
              }}
            >
              {questionCatDif.incorrect_answers
                .concat(questionCatDif.correct_answer)
                .map(answer => (
                  <Text key={answer} style={{ marginHorizontal: 10 }}>
                    {answer}
                  </Text>
                ))}
            </View>
          </View>
        </View>
      </FlipCard>
    );
  };
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 20
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 20,
            paddingVertical: 20
          }}
        >
          <Text>Choose one card to access the question</Text>
        </View>
        <View style={{ flex: 2, alignItems: "center" }}>
          <FlatList
            data={this.state.questions}
            renderItem={this.renderQuestionCatDif}
            keyExtractor={item => item.question}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default App;
