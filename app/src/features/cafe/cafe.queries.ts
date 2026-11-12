import { gql, type TypedDocumentNode } from "@apollo/client"
import type { CoffeeEntry } from "@/features/entry/entry.queries"

export type Cafe = {
  id: string
  cafeName: string
  location: string
  coffeeEntries: { id: string; rating: string; price: string }[]
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
        price
      }
    } 
  }
`

export type CafeDetails = Omit<Cafe, "coffeeEntries"> & {
  coffeeEntries: CoffeeEntry[]
}

export const CAFE: TypedDocumentNode<{ cafe: CafeDetails | null }, { id: string }> = gql`
  query Cafe($id: ID!) {
    cafe(id: $id) {
      id
      cafeName
      location
      coffeeEntries {
        id
        coffeeName
        rating
        price
        createdAt
        cafe {
          id
          cafeName
          location
        }
        tags {
          id
          tagName
        }
      }
    }
  }
`
