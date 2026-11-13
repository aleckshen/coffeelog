import { gql, type TypedDocumentNode } from "@apollo/client"

export const ME: TypedDocumentNode<{ me: { id: string; username: string } | null }> = gql`
  query Me {
    me {
      id
      username
    }
  }
`
