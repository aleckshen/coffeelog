import { gql, type TypedDocumentNode } from "@apollo/client"

export type Cafe = {
  id: string
  cafeName: string
  location: string
  coffeeEntries: { id: string; rating: string }[]
}

export const CAFES: TypedDocumentNode<{ cafes: Cafe[] }> = gql`
  query Cafes {
    cafes {
      id
      cafeName
      location
      coffeeEntries {
        id
        rating
      }
    } 
  }
`
