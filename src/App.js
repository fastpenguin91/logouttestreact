import logo from "./logo.svg";
import "./App.css";
import { ME } from "./queries.js";
// import { useQuery } from "react-apollo";
import { useQuery, gql } from "@apollo/client";
import { AuthProvider } from "./AuthContext";
import { Route, Switch } from "react-router-dom";
import Login from "./Login";
import AppContainer from "./AppContainer";

function App() {
  const meQuery = useQuery(ME);

  if (meQuery.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <AuthProvider userData={meQuery.data}>
        <Switch>
          <Route path="/login" render={(props) => <Login {...props} />} />
          <Route path="/" render={(props) => <AppContainer {...props} />} />
        </Switch>
      </AuthProvider>
    </div>
  );
}

export default App;
