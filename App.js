import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import Route from "./src/routes/route";
import { GlobalContextProvider } from "./src/context/context";

export default function App() {
  return (
    <GlobalContextProvider>
      <NavigationContainer>
        <Route />
        <StatusBar style="auto" />
      </NavigationContainer>
    </GlobalContextProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
