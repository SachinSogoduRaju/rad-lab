import { db } from "../utils/firebase-admin-con"
import { Timestamp } from "firebase-admin/firestore"

export const getAllDocuments = async (collection: string) => {
  const res: any = []
  const snapshot = await db.collection(collection).get()
  snapshot.forEach((doc: any) => {
    res.push({ ...doc.data(), id: doc.id })
  })
  return res
}

export const saveDocument = async (
  collectionName: string,
  body: Record<string, any>,
  id?: string,
) => {
  if (!id) body.createdAt = Timestamp.now()
  body.updatedAt = Timestamp.now()
  const collection = db.collection(collectionName)
  const doc = id ? collection.doc(id) : collection.doc()
  if (!id) body.buildingId = doc.id
  await doc.set(body)
  const docRef = db.collection(collectionName).doc(doc.id)
  const res = await docRef.get()
  return { ...res.data(), id: doc.id }
}

export const getDocsByField = async (
  collection: string,
  field: string,
  value: string,
) => {
  const res: any = []
  const snapshot = await db
    .collection(collection)
    .where(field, "==", value)
    .get()
  snapshot.forEach((doc: any) => {
    const document = {
      ...doc.data(),
      id: doc.id,
    }
    res.push(document)
  })
  return res
}