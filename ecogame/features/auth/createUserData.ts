import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/services/firebase';

export async function createUserData(uid: string) {
  await setDoc(doc(db, 'users', uid), {
    xp: 0,
    level: 1,
    quizzes: 0,
  });
}
