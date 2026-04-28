import { doc, updateDoc, increment } from 'firebase/firestore';
import { db } from '@/services/firebase';

export async function addXP(uid: string, amount: number) {
  const userRef = doc(db, 'users', uid);

  await updateDoc(userRef, {
    xp: increment(amount),
  });
}
