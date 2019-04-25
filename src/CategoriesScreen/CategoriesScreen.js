import React from "react";
import { View, FlatList } from "react-native";
import {
  ActivityIndicator,
  Appbar,
  Button,
  Dialog,
  Portal,
  Text
} from "react-native-paper";
import axios from "axios/index";
import Category from "../components/Category";
import Difficulty from "../components/Difficulty";
import CategoryLoading from "../components/CategoryLoading";

const LOADING_COMPONENT = "loadingComponent";

class CategoriesScreen extends React.Component {
  state = {
    categories: new Array(20).fill(LOADING_COMPONENT),
    difficultyChosen: "",
    difficultyDialogVisible: false,
    categoriesLoading: null
  };
  componentDidMount() {
    this.loadCategories();
  }
  loadCategories = async () => {
    this.setState({ categoriesLoading: true });
    const categoriesPromise = axios.get("https://opentdb.com/api_category.php");
    const categoriesInfoPromise = axios.get(
      "https://opentdb.com/api_count_global.php"
    );
    try {
      const promisesResult = await Promise.all([
        categoriesPromise,
        categoriesInfoPromise
      ]);
      const [
        {
          data: { trivia_categories: categories }
        },
        {
          data: { categories: categoriesInfo }
        }
      ] = promisesResult;
      this.setState({ categories, categoriesInfo, categoriesLoading: false });
    } catch (e) {
      console.log(e);
    }
  };
  onCategoryPress = (categoryId, categoryName) => {
    this.setState({ categoryId, categoryName, difficultyDialogVisible: true });
  };
  onDifficultyChanged = difficultyChosen => this.setState({ difficultyChosen });
  renderCategory = ({ item: category }) => {
    if (category === LOADING_COMPONENT) {
      return <CategoryLoading />;
    } else {
      const categoryInfo = this.state.categoriesInfo[category.id];
      return (
        <Category
          categoryId={category.id}
          categoryName={category.name}
          categoryInfo={categoryInfo}
          onPress={() => this.onCategoryPress(category.id, category.name)}
        />
      );
    }
  };

  _hideDialog = () => {
    this.setState({ difficultyDialogVisible: false });
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: "cornflowerblue"
        }}
      >
        <Portal>
          <Dialog
            visible={this.state.difficultyDialogVisible}
            onDismiss={this._hideDialog}
          >
            <Dialog.Title>Difficulty of the question</Dialog.Title>
            <Dialog.Content>
              <Difficulty
                onValueChange={this.onDifficultyChanged}
                value={this.state.difficultyChosen}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button
                onPress={() => {
                  const {
                    categoryId,
                    categoryName,
                    difficultyChosen
                  } = this.state;
                  const params = { categoryId, categoryName, difficultyChosen };
                  this._hideDialog();
                  this.props.navigation.navigate("Question", params);
                }}
              >
                Question please
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <View
          style={{
            flex: 1
          }}
        >
          <FlatList
            data={this.state.categories}
            renderItem={this.renderCategory}
            keyExtractor={(item, index) =>
              item === LOADING_COMPONENT ? index : item.id.toString()
            }
            showsVerticalScrollIndicator={false}
            numColumns={2}
            columnWrapperStyle={{ flex: 1, flexDirection: "row", justifyContent: "space-evenly"}}
          />
        </View>
      </View>
    );
  }
}

export default CategoriesScreen;
