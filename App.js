import { StyleSheet, Text, View } from "react-native";
import TodoList from "./src/components/TodoList";
import TodoDetails from "./src/components/TodoDetails";
import { AppContextProvider } from "./src/constants/AppContext";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Update from "./src/components/Update";
import React from "react";
const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <AppContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="TodoList"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="TodoList" component={TodoList} />
          <Stack.Screen name="TodoDetails" component={TodoDetails} />
          <Stack.Screen name="Update" component={Update} />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContextProvider>
  );
};
export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
