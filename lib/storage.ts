import { db } from './firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'

export class Storage {
  private collectionName: string

  constructor(collectionName: string) {
    this.collectionName = collectionName
  }

  async read(): Promise<any[]> {
    try {
      const docRef = doc(db, 'storage', this.collectionName)
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        return docSnap.data().items || []
      }
      return []
    } catch (error) {
      console.error(`Error reading ${this.collectionName}:`, error)
      return []
    }
  }

  async write(data: any[]): Promise<void> {
    try {
      const docRef = doc(db, 'storage', this.collectionName)
      await setDoc(docRef, { items: data, updatedAt: new Date().toISOString() })
      console.log(`${this.collectionName} saved to Firebase`)
    } catch (error) {
      console.error(`Error writing ${this.collectionName}:`, error)
      throw error
    }
  }
}
