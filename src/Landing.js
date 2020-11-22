import React from "react";
import NavTodo from "./NavTodo";

function Landing(props) {
  return (
    <div>
      <NavTodo userName={props.userName} />
      <div>Buy my product!</div>
    </div>
  );
}

export default Landing;
