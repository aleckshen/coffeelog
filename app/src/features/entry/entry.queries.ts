import { gql, type TypedDocumentNode } from "@apollo/client"

export type CoffeeEntry = {
  id: string
  coffeeName: string
  price: string
  rating: string
  createdAt: string
  cafe: {
    id: string
    cafeName: string
    location: string
  }
  tags: {
    id: string
    tagName: string
  }[]
}

export const ENTRIES: TypedDocumentNode<{ entries: CoffeeEntry[] }> = gql`
  query Entries {
    entries {
      id
      coffeeName
      price
      rating
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
`
