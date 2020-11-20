import { gql } from "@apollo/client";

const ME = gql`
  query meQuery {
    me {
      id
      email
      firstName
    }
  }
`;

const UPDATE_TODO_ITEM = gql`
  mutation updateTodo($todo: ID!, $isComplete: Boolean!) {
    updateTodo(todoId: $todo, isComplete: $isComplete) {
      id
      name
      isComplete
    }
  }
`;

const NEW_TODO = gql`
  mutation createNewTodo($newTodo: String!) {
    createTodo(name: $newTodo) {
      id
      name
    }
  }
`;

const DELETE_TODO_ITEM = gql`
  mutation deleteTodoItem($todo: ID!) {
    deleteTodo(todoId: $todo) {
      id
      name
    }
  }
`;

export { ME, UPDATE_TODO_ITEM, DELETE_TODO_ITEM, NEW_TODO };
