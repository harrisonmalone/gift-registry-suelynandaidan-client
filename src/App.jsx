import React from "react";
import { Switch, Route } from "react-router-dom";
import Gifts from "./Gifts";
import Give from "./Give";
import Contribute from "./Contribute";

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Switch>
          <Route exact path={["/", "/gifts"]} component={Gifts} />
          <Route exact path="/gifts/:id/give" component={Give} />
          <Route exact path="/gifts/:id/contribute" component={Contribute} />
        </Switch>
      </div>
    );
  }
}

export default App;
