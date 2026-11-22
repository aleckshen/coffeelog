export const photoTypeDefs = `#graphql
  type PhotoUpload {
    key: String!
    uploadUrl: String!
  }

  extend type Mutation {
    createPhotoUpload: PhotoUpload!
  }
`
