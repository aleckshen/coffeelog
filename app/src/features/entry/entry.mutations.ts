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
