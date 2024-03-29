import React from "react";
import { Switch, Route } from "react-router-dom";
import Gifts from "./Gifts";
import Give from "./Give";
import { Database } from './Database'

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <Switch>
          <Route exact path={["/", "/gifts"]} component={Gifts} />
          <Route exact path="/db" component={Database} />
          <Route exact path="/gifts/:id/give" component={Give} />
        </Switch>
      </div>
    );
  }
}

export default App;
