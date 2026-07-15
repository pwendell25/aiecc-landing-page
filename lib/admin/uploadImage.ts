import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { getFirebaseStorage } from '@/lib/firebase'

export async function uploadMailerImage(file: File): Promise<string> {
  const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_')
  const path = `mailer-assets/${Date.now()}-${safeName}`
  const storageRef = ref(getFirebaseStorage(), path)
  await uploadBytes(storageRef, file)
  return getDownloadURL(storageRef)
}
