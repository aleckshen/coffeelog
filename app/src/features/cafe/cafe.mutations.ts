import { gql, type TypedDocumentNode } from "@apollo/client"

export const CREATE_CAFE: TypedDocumentNode<
  { createCafe: { id: string } },
  { cafeName: string; location: string }
> = gql`
  mutation CreateCafe($cafeName: String!, $location: String!) {
    createCafe(cafeName: $cafeName, location: $location) {
      id
    }
  }
`
