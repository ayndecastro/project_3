import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MapApp from "./pages/MapApp"

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={MapApp} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;