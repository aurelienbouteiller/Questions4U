import React from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";
import CategoriesScreen from "./CategoriesScreen/CategoriesScreen";
import QuestionScreen from "./QuestionScreen/QuestionScreen";
import {IconButton} from "react-native-paper";
import QuestionsHistoryScreen from "./QuestionsHistory/QuestionsHistoryScreen";

const CategoriesQuestionNavigator = createStackNavigator(
  {
    Categories: {
      screen: CategoriesScreen,
      navigationOptions: ({ navigation }) => ({
        headerTitle: "Categories list",
        headerRight: (
          <IconButton
            icon="history"
            color={"black"}
            size={20}
            onPress={() => navigation.navigate("QuestionsHistory")}
          />
        )
      })
    },
    Question: {
      screen: QuestionScreen
    }
  },
  {
    mode: "modal"
  }
);

const CategoryHistoryNavigator = createStackNavigator(
  {
    CategoriesQuestionNavigator,
    QuestionsHistory: {
      screen: QuestionsHistoryScreen
    }
  },
  {
    headerMode: "none"
  }
);

export default createAppContainer(CategoryHistoryNavigator);
