import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/services/firebase';

export async function getUserData(uid: string) {
  const docRef = doc(db, 'users', uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  }
}
