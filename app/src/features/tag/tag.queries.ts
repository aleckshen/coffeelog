import { gql, type TypedDocumentNode } from "@apollo/client"

export type Tag = {
  id: string
  tagName: string
  coffeeCount: number
}

export const TAGS: TypedDocumentNode<{ tags: Tag[] }> = gql`
  query Tags {
    tags {
      id
      tagName
      coffeeCount
    }
  }
`
