import React, {useContext, useState } from "react";
import './App.css';
import 'antd/dist/antd.css'
import ListNotes from './Pages/ListNotes';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import Home from "./Pages/Home";
import { ThemeContext } from "./context/ThemeContext";
import { themes } from "./constants/theme-context";

function App() {
  const [currentTheme, setCurrentTheme] = useState(themes.light)

  return (
    <ThemeContext.Provider value={{currentTheme, setCurrentTheme}}>
      <BrowserRouter>
        <Switch>
          <Route path="/home" component={Home}/>
          <Route path="/list-notes" component={ListNotes} />
          <Redirect from={'*'} to={'/home'} />
        </Switch>
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}

export default App;
