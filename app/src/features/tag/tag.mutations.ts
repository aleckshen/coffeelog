import { gql, type TypedDocumentNode } from "@apollo/client"

export const CREATE_TAG: TypedDocumentNode<
  { createTag: { id: string; tagName: string } },
  { tagName: string }
> = gql`
  mutation CreateTag($tagName: String!) {
    createTag(tagName: $tagName) {
      id
      tagName
    }
  }
`

export const DELETE_TAG: TypedDocumentNode<{ deleteTag: boolean }, { id: string }> = gql`
  mutation DeleteTag($id: ID!) {
    deleteTag(id: $id)
  }
`
