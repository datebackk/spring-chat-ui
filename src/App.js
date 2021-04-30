import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Signin from "./signin/Signin";
import Signup from "./signup/Signup";
import Chat from "./chat/Chat";
import Admin from "./admin_panel/Admin";

export const AppContext = React.createContext();
const App = (props) => {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" render={(props) => <Chat {...props} />} />
          <Route exact path="/login" render={(props) => <Signin {...props} />}/>
          <Route exact path="/signup" render={(props) => <Signup {...props} />}/>
          <Route exact path="/admin" render={(props) => <Admin {...props} />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
