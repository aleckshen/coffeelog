import { gql, type TypedDocumentNode } from "@apollo/client"

export type EntryInput = {
  coffeeName: string
  cafeId: string
  price: string
  rating: string
  notes: string | null
  tagIds: string[]
}

export const CREATE_ENTRY: TypedDocumentNode<
  { createEntry: { id: string } },
  { input: EntryInput }
> = gql`
  mutation CreateEntry($input: EntryInput!) {
    createEntry(input: $input) {
      id
    }
  }
`

export const UPDATE_ENTRY: TypedDocumentNode<
  { updateEntry: { id: string } | null },
  { id: string; input: EntryInput }
> = gql`
  mutation UpdateEntry($id: ID!, $input: EntryInput!) {
    updateEntry(id: $id, input: $input) {
      id
    }
  }
`

export const DELETE_ENTRY: TypedDocumentNode<{ deleteEntry: boolean }, { id: string }> = gql`
  mutation DeleteEntry($id: ID!) {
    deleteEntry(id: $id)
  }
`
