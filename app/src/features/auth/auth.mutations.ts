import { gql, type TypedDocumentNode } from "@apollo/client"

type Credentials = { username: string; password: string }
type AuthResult = { token: string; user: { id: string; username: string } }

export const LOG_IN: TypedDocumentNode<{ logIn: AuthResult }, Credentials> = gql`
  mutation LogIn($username: String!, $password: String!) {
    logIn(username: $username, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`

export const SIGN_UP: TypedDocumentNode<{ signUp: AuthResult }, Credentials> = gql`
  mutation SignUp($username: String!, $password: String!) {
    signUp(username: $username, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`
