import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { useRoute } from "@react-navigation/native";
import { appContext } from "../constants/AppContext";
const TodoDetails = () => {
  const route = useRoute();
  const { Details } = route.params || {};
  const { theme } = useContext(appContext);
  const styles = Styles(theme);
  return (
    <View style={styles.container}>
      <Text style={styles.taskText}>Details is : {Details.task}</Text>
    </View>
  );
};
export default TodoDetails;
const Styles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
      backgroundColor: theme === "dark" ? "#000" : "#fff",
    },
    taskText: {
      fontSize: 25,
      fontWeight: "bold",
      color: "pink",
    },
    errorText: {
      fontSize: 18,
      color: "red",
    },
  });
