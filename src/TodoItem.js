import React, { useContext } from "react";
import { TrashFill } from "react-bootstrap-icons";
import { useMutation } from "@apollo/client";
import { UPDATE_TODO_ITEM } from "./queries";
import { AuthContext } from "./AuthContext";

function TodoItem(props) {
  const [state, setState] = useContext(AuthContext);
  const [updateTodo] = useMutation(UPDATE_TODO_ITEM, {
    variables: {
      todo: props.id,
      isComplete: !props.completed,
    },
  });

  const deleteTodoItem = () => {
    props.deleteTodo(props.id);
  };

  const handleChange = () => {
    console.log("changed Ttodo");
    updateTodo();
  };

  return (
    <div style={{ fontSize: "20px" }}>
      <input
        type="checkbox"
        onChange={handleChange}
        checked={props.completed}
      />
      {props.task}
      <span>
        - <TrashFill onClick={deleteTodoItem} />
      </span>
    </div>
  );
}

export default TodoItem;
