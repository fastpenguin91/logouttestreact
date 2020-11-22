import React, { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { AuthContext } from "./AuthContext";
import { useMutation, gql } from "@apollo/client";
import { useHistory } from "react-router-dom";

const LOGOUT_MUTATION = gql`
  mutation {
    logout
  }
`;

function NavTodo(props) {
  let history = useHistory();
  const [{ currentUser }, setCurrentUser] = useContext(AuthContext);

  const [doLogout, { client }] = useMutation(LOGOUT_MUTATION, {
    onCompleted(data) {
      client.resetStore();
      setCurrentUser({
        currentUser: "",
      });
    },
  });

  const routeToHome = () => {
    history.push("/");
    console.log("after routed");
    doLogout();
  };

  return (
    <Navbar className="sticky-top" bg="light" expand="md">
      <Link to="/">
        <Navbar style={{ fontWeight: "bold", color: "black" }}>
          Project Management
        </Navbar>
      </Link>
      {currentUser?.firstName ? (
        <div>
          <Link to="/">
            <Button
              onClick={() => {
                // doLogout();
                routeToHome();
              }}
            >
              Logout
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button>Dashboard</Button>
          </Link>
        </div>
      ) : (
        <div>
          <Link to="/login">
            <Button variant="outline-success">Login</Button>
          </Link>
        </div>
      )}
    </Navbar>
  );
}
export default NavTodo;
