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

export { ME };
