import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MapApp from "./pages/MapApp";
import Bank from "./pages/Bank/Bank"
import BottomBar from "./components/NavBar/NavBar";


function App() {
  return (
    <Router>
    
      <div>
      <BottomBar />
        <Switch>
          <Route exact path="/" component={MapApp} />
          <Route exact path="/bank" component={Bank} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;