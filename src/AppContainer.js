import React, { useState, useContext } from "react";
import "./dashboard.css";
import "./App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavTodo from "./NavTodo";
import { AuthContext } from "./AuthContext";
import Todos from "./Todos";
import { DELETE_TODO_ITEM, NEW_TODO } from "./queries";

// import SidebarTodo from "./SidebarTodo";
// import CurrentListContainer from "./CurrentListContainer";
// import Collapse from "react-bootstrap/Collapse";
import Button from "react-bootstrap/Button";
import { useMutation, useQuery, gql } from "@apollo/client";
// import ListForm from "./components/ListForm";
// import ListsContainer from "./components/ListsContainer";

const USER_TODOS = gql`
  query {
    todos {
      id
      name
      isComplete
      userId
    }
  }
`;

function AppContainer(props) {
  const [open, setOpen] = useState(false);
  const [{ currentUser }, setCurrentUser] = useContext(AuthContext);
  const [taskField, setTaskField] = useState("");
  const { data, loading, error } = useQuery(USER_TODOS);
  const [deleteTodo] = useMutation(DELETE_TODO_ITEM, {
    update(cache, { data: { deleteTodo } }) {
      const thingThree = cache.readQuery({
        query: USER_TODOS,
        // variables: { listId: state.currentListId },
      });
      let updatedListTodos = thingThree.todos.filter((elem) => {
        if (elem.id !== deleteTodo.id) {
          return elem;
        }
      });
      let newListById = {
        ...thingThree.listById,
      };
      newListById.todos = updatedListTodos;
      cache.writeQuery({
        query: USER_TODOS,
        // variables: { listId: state.currentListId },
        data: {
          listById: newListById,
        },
      });
    },
  });
  // const [createTodo] = useMutation(NEW_TODO, {
  //   update(cache, { data: { createTodo } }) {
  //     const thingThree = cache.readQuery({
  //       query: LIST_TODOS,
  //       variables: { listId: state.currentListId },
  //     });

  //     cache.writeQuery({
  //       query: LIST_TODOS,
  //       variables: { listId: state.currentListId },
  //       data: {
  //         listById: [createTodo, ...thingThree.listById.todos],
  //       },
  //     });
  //   },
  // });

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    console.log(error);
    return <div>error... wwwooow </div>;
  }

  console.log("data: ", data);

  const onDeleteTodo = (todoId) => {
    deleteTodo({
      variables: { todo: todoId },
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleChange = (event) => {
    setTaskField(event.target.value);
  };

  return (
    <div>
      <NavTodo userName={props.userName} />
      <Container fluid>
        <Row>
          <main className="col-md-12 ml-sm-auto col-lg-10 px-md-4">
            <Row className="justify-content-md-center text-center">
              {!currentUser ? (
                <div
                  style={{
                    fontWeight: "bold",
                    margin: "25px",
                    color: "#28a745",
                  }}
                >
                  Log in to add todos!
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <label>
                    <input
                      type="text"
                      placeholder="Add a Todo"
                      value={taskField}
                      onChange={handleChange}
                      name="name"
                    />
                  </label>
                  <input type="submit" value="Submit" />
                </form>
              )}
            </Row>
            <div>Hello</div>
            <Todos deleteTodo={onDeleteTodo} todos={data.todos} />
          </main>
        </Row>
      </Container>
    </div>
  );
}

export default AppContainer;
