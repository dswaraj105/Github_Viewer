import React from "react";
import { Route, Switch } from "react-router-dom";

// My Custom Components
import SearchPage from './search/Search';
import DetailsPage from "./details/Details";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <Switch>
      <Route path="/" exact>
        <SearchPage />
      </Route>

      <Route path="/details/:login">
        <DetailsPage />
      </Route>

      <Route path="*">
        <PageNotFound />
      </Route>
    </Switch>
  );
}

export default App;
