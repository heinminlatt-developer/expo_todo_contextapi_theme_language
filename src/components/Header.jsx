import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useContext } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { appContext } from "../constants/AppContext";

const Header = ({ title }) => {
  const { theme, setTheme, language, setLanguage } = useContext(appContext);

  const changeLang = (id) => {
    setLanguage(
      language.map((lang) =>
        lang.id === id
          ? { ...lang, isChecked: true }
          : { ...lang, isChecked: false }
      )
    );
  };
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.themeContainer}>
        <TouchableOpacity
          onPress={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Icon name="sunny-sharp" size={25} color="red" style={styles.Icon} />
        </TouchableOpacity>
        <View>
          {language.map((item, index) => {
            return (
              <Pressable
                key={index}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginLeft: 10,
                }}
                onPress={() => {
                  changeLang(item.id);
                }}
              >
                <Text style={{ marginRight: 5 }}>{item.label}</Text>
                {item.isChecked && (
                  <Icon name="checkmark" size={25} color="black" />
                )}
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#0f6594",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    color: "red",
    fontWeight: "bold",
  },
  themeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  Icon: {
    marginRight: 10,
  },
});
