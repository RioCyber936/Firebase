import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import {Switch, BrowserRouter as Router, Route} from "react-router-dom";
import routes from "./routes";
import Header from "./Header";
import './styles.css';
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
firebase.initializeApp(firebaseConfig);

// import reportWebVitals from './reportWebVitals';

export const AuthContext = React.createContext(null);
function App() {
  const[isLoggedIn, setLoggedIn] = useState(false);
  return(
    <AuthContext.Provider value={{isLoggedIn, setLoggedIn}}>
      Is Logged in?{JSON.stringify(isLoggedIn)}
      <div className="App">
        <Router>
          <Header></Header>
          <Switch>
            {routes.map(route => (
              <Route key={route.path}
              path={route.path}
              exact={route.exact}
              component={route.main}
              ></Route>
            ))}
          </Switch>
        </Router>
      </div>
    </AuthContext.Provider>
  );
}
const rootElement = document.getElementById("root");
ReactDOM.render(<App></App>, rootElement);

