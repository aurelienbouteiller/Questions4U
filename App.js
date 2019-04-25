import React from "react";
import AppContainer from "./src/navigation";
import { Provider as PaperProvider } from "react-native-paper";

export default () => (
  <PaperProvider>
    <AppContainer />
  </PaperProvider>
);
