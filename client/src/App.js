import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MapApp from "./pages/MapApp"
import Nav from "./components/NavBar/NavBar"

function App() {
  return (
    <Router>
    
      <div>
      <Nav />
        <Switch>
        
          <Route exact path="/" component={MapApp} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;