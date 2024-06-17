import React, { createContext, useState } from "react";
export const appContext = createContext();
export const AppContextProvider = (props) => {
  const [tasken, setTasken] = useState("");
  const [taskmr, setTaskmr] = useState("");
  const [tasks, setTasks] = useState([]);
  const [theme, setTheme] = useState("dark");
  const [language, setLanguage] = useState([
    {
      id: 1,
      value: "en",
      isChecked: true,
      label: "English",
    },
    {
      id: 2,
      value: "mr",
      isChecked: false,
      label: "Myanmar",
    },
  ]);
  return (
    <appContext.Provider
      value={{
        tasken,
        setTasken,
        taskmr,
        setTaskmr,
        tasks,
        setTasks,
        theme,
        setTheme,
        language,
        setLanguage,
      }}
    >
      {props.children}
    </appContext.Provider>
  );
};
