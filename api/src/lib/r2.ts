import {
  DeleteObjectCommand,
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const accountId = process.env.R2_ACCOUNT_ID
if (!accountId) throw new Error("R2_ACCOUNT_ID is not set")

const accessKeyId = process.env.R2_ACCESS_KEY_ID
if (!accessKeyId) throw new Error("R2_ACCESS_KEY_ID is not set")

const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY
if (!secretAccessKey) throw new Error("R2_SECRET_ACCESS_KEY is not set")

const bucket = process.env.R2_BUCKET
if (!bucket) throw new Error("R2_BUCKET is not set")

const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId, secretAccessKey },
  requestChecksumCalculation: "WHEN_REQUIRED",
  responseChecksumValidation: "WHEN_REQUIRED",
})

export function photoUploadUrl(key: string) {
  const command = new PutObjectCommand({ Bucket: bucket, Key: key, ContentType: "image/jpeg" })
  return getSignedUrl(r2, command, {
    expiresIn: 300,
    signableHeaders: new Set(["content-type"]),
  })
}

export function photoViewUrl(key: string) {
  const command = new GetObjectCommand({ Bucket: bucket, Key: key })
  return getSignedUrl(r2, command, { expiresIn: 3600 })
}

export async function deletePhoto(key: string) {
  await r2.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }))
}
