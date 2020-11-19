import React, { useState, useContext } from "react";
import { AuthContext } from "./AuthContext";
import NavTodo from "./NavTodo";
import { useMutation, gql } from "@apollo/client";

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      firstName
      email
      age
    }
  }
`;

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
      user {
        id
        name
        email
        companyId
      }
    }
  }
`;

function Login(props) {
  const [currentUser, setCurrentUser] = useContext(AuthContext);
  const [login, setLogin] = useState(true);
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);
  const [doLogin, { client }] = useMutation(LOGIN_MUTATION, {
    onCompleted(data) {
      client.resetStore();
      console.log("completed login: ", data);
      setCurrentUser({
        currentUser: { ...data.login },
      });
      props.history.push(`/`);
    },
    onError(data) {
      setErrors(data.graphQLErrors);
    },
  });

  const handleLogin = () => {
    if (login) {
      console.log("variables passed to doLogin: ");
      console.log("email: ", email);
      console.log("password: ", password);
      doLogin({ variables: { email, password } });
    } else {
      //   doSignup({ variables: { email, password, name: userName } });
    }
  };
  const [doSignup] = useMutation(SIGNUP_MUTATION, {
    onCompleted(data) {},
    onError(data) {
      setErrors([
        {
          message: "Something went wrong. Fix this error later",
        },
      ]);
    },
  });

  return (
    <div>
      <NavTodo />

      <h4 className="mv3">{login ? "Login" : "Sign up"}</h4>
      <div style={{ marginBottom: "20px" }} className="flex flex-column">
        {!login && (
          <div>
            <input
              style={{ margin: "10px" }}
              value={login.username}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
              placeholder="Your name"
            />
          </div>
        )}
        <input
          style={{ margin: "10px" }}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="email"
        />
        <input
          style={{ margin: "10px" }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
        />
      </div>
      <div className="flex mt3">
        <span
          style={{ margin: "20px" }}
          className="pointer mr2 button"
          onClick={handleLogin}
        >
          <button>{login ? "login" : "Sign Up!"}</button>
        </span>
        <span className="pointer button" onClick={() => setLogin(!login)}>
          <button>
            {login ? "Create an account?" : "already have an account?"}
          </button>
        </span>
      </div>
    </div>
  );
}

export default Login;
