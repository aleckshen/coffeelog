import { useMutation } from "@apollo/client/react"
import { CREATE_PHOTO_UPLOAD } from "@/features/entry/entry.mutations"

export function useUploadPhoto() {
  const [createPhotoUpload] = useMutation(CREATE_PHOTO_UPLOAD)

  // undefined leaves photoKey out, so the API keeps the saved photo.
  return async function toPhotoKey(photo: string | null) {
    if (photo === null) return null
    if (!photo.startsWith("file://")) return undefined

    const { data } = await createPhotoUpload()
    if (!data) throw new Error("No upload URL")
    const { key, uploadUrl } = data.createPhotoUpload

    const file = await fetch(photo)
    const response = await fetch(uploadUrl, {
      method: "PUT",
      headers: { "Content-Type": "image/jpeg" },
      body: await file.blob(),
    })
    if (!response.ok) throw new Error(`Upload failed: ${response.status}`)
    return key
  }
}
