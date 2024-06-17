import React, { useState, useContext } from "react";
import { appContext } from "../constants/AppContext";
import { useNavigation } from "@react-navigation/native";
import Checkbox from "expo-checkbox";
import Header from "./Header";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
const TodoList = () => {
  const navigation = useNavigation();
  const {
    tasken,
    taskmr,
    setTaskmr,
    setTasken,
    tasks,
    setTasks,
    theme,
    setTheme,
    language,
    setLanguage,
  } = useContext(appContext);
  const styles = Styles(theme);
  console.log("language", language);
  const addTask = (taskEn, taskMM) => {
    console.log("TaskEn=>>", taskEn);
    console.log("TaskMM=>", taskMM);
    if (taskEn.length > 0 || taskMM.length > 0) {
      setTasks([
        ...tasks,
        {
          key: `${tasks.length + 1}`,
          isChecked: false,
          taskEn: taskEn,
          taskMM: taskMM,
        },
      ]);
      // setTask("");
      // setTaskB("");
    }
  };

  const deleteTask = (taskToDelete) => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () =>
            setTasks(tasks.filter((t) => t.key !== taskToDelete.key)),
        },
      ],
      { cancelable: true }
    );
  };
  const handleCheckboxChange = (item) => {
    setTasks(
      tasks.map((t) =>
        t.key === item.key ? { ...t, isChecked: !t.isChecked } : t
      )
    );
  };
  const selectedLang = language.filter((obj) => obj.isChecked == true)[0].value;
  console.log("val", selectedLang);
  return (
    <View style={styles.container}>
      <Header title={selectedLang === "en" ? "Todo-List" : "တူဒူး လစ်"} />
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { color: theme === "dark" ? "#fff" : "#000" }]}
          placeholder="Add a new task"
          placeholderTextColor={theme === "dark" ? "#fff" : "#000"}
          value={tasken}
          onChangeText={(text) => setTasken(text)}
        />
        <TextInput
          style={[styles.input, { color: theme === "dark" ? "#fff" : "#000" }]}
          placeholder="task အသစ်"
          placeholderTextColor={theme === "dark" ? "#fff" : "#000"}
          value={taskmr}
          onChangeText={(text) => setTaskmr(text)}
        />
        <TouchableOpacity onPress={() => addTask(tasken, taskmr)}>
          <Icon
            name="add-circle"
            size={30}
            color="blue"
            style={{ marginRight: 7 }}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Checkbox
                style={styles.checkbox}
                value={item.isChecked}
                onValueChange={() => handleCheckboxChange(item)}
              />
              <Text
                style={[
                  styles.taskText,
                  item.isChecked && styles.checkedTaskText,
                ]}
              >
                {selectedLang == "en" ? item.taskEn : item.taskMM}
              </Text>
            </View>
            <View style={styles.inputGP}>
              <TouchableOpacity
                onPress={() => deleteTask(item)}
                style={{ marginRight: 10 }}
              >
                <Icon name="trash" size={25} color="red" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Update", { item })}
                style={{ padding: 10 }}
              >
                <Icon name="pencil" size={25} color="blue" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
};
export default TodoList;
const Styles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === "dark" ? "#000" : "#fff",
      paddingTop: 50,
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 20,
      color: theme === "dark" ? "#fff" : "#000",
    },
    inputContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
    },
    input: {
      flex: 1,
      borderBottomWidth: 1,
      borderColor: "#ccc",
      marginRight: 10,
      paddingVertical: 5,
      color: theme === "dark" ? "#fff" : "#000",
    },
    taskContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingVertical: 10,
      paddingHorizontal: 0,
      borderBottomWidth: 1,
      borderColor: "#eee",
    },
    taskText: {
      fontSize: 18,
      marginLeft: 10,
      color: theme === "dark" ? "#fff" : "#000",
    },
    checkedTaskText: {
      textDecorationLine: "underline",
      color: theme === "dark" ? "#888" : "#777",
    },
    inputGP: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  });
