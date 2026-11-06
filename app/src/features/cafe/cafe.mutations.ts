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

export const UPDATE_CAFE: TypedDocumentNode<
  { updateCafe: { id: string; cafeName: string; location: string } | null },
  { id: string; cafeName: string; location: string }
> = gql`
  mutation UpdateCafe($id: ID!, $cafeName: String!, $location: String!) {
    updateCafe(id: $id, cafeName: $cafeName, location: $location) {
      id
      cafeName
      location
    }
  }
`

export const DELETE_CAFE: TypedDocumentNode<{ deleteCafe: boolean }, { id: string }> = gql`
  mutation DeleteCafe($id: ID!) {
    deleteCafe(id: $id)
  }
`
