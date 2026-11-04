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

export const CAFE: TypedDocumentNode<{ cafe: Cafe | null }, { id: string }> = gql`
  query Cafe($id: ID!) {
    cafe(id: $id) {
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
