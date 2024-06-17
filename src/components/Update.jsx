import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { appContext } from "../constants/AppContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import Header from "./Header";
const Update = () => {
  const { theme, tasks, setTasks, language, setTasken, setTaskmr } =
    useContext(appContext);
  const styles = createStyles(theme);
  const route = useRoute();
  const { item } = route.params;
  const selectedLang = language.filter((obj) => obj.isChecked === true)[0]
    .value;
  const [editingTaskEn, setEditingTaskEn] = useState(item.taskEn);
  const [editingTaskMr, setEditingTaskMr] = useState(item.taskMM);
  const navigation = useNavigation();
  useEffect(() => {
    if (item) {
      setEditingTaskEn(item.taskEn);
      setEditingTaskMr(item.taskMM);
    }
  }, [item]);

  const handleUpdateTask = () => {
    const updatedTasks = tasks.map((t) =>
      t.key === item.key
        ? {
            ...t,
            taskEn: editingTaskEn,
            taskMM: editingTaskMr,
          }
        : t
    );
    Alert.alert("Edit Data", "Are You Ready?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          setTasks(updatedTasks);
          setTasken("");
          setTaskmr("");
          navigation.navigate("TodoList");
        },
      },
    ]);
  };
  const handleCancel = () => {
    navigation.navigate("TodoList");
  };
  return (
    <View style={styles.container}>
      <Header
        title={selectedLang === "en" ? "Update-Todo" : "Update တူဒူး လစ်"}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={
            selectedLang === "en"
              ? "Edit task in English"
              : "Edit task in Myanmar"
          }
          value={editingTaskEn}
          onChangeText={(text) => setEditingTaskEn(text)}
        />
        <TextInput
          style={styles.input}
          placeholder={
            selectedLang === "en"
              ? "Edit task in English"
              : "Edit task in Myanmar"
          }
          value={editingTaskMr}
          onChangeText={(text) => setEditingTaskMr(text)}
        />
        <TouchableOpacity onPress={handleUpdateTask}>
          <Icon name="checkmark-circle" size={30} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCancel}>
          <Icon name="close-circle" size={30} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default Update;
const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme === "dark" ? "#000" : "#fff",
      paddingTop: 50,
      paddingHorizontal: 20,
    },
    inputContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
      backgroundColor: theme === "dark" ? "#333" : "#dbd7d7",
      padding: 10,
      borderRadius: 5,
    },
    input: {
      flex: 1,
      borderColor: "#ccc",
      borderWidth: 1,
      padding: 10,
      marginRight: 10,
      borderRadius: 5,
      color: theme === "dark" ? "#fff" : "#000",
      backgroundColor: theme === "dark" ? "#555" : "#f9f9f9",
    },
  });
