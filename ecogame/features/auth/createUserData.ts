import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/services/firebase';

export async function createUserData(uid: string, email: string | null) {
  await setDoc(doc(db, 'users', uid), {
    xp: 0,
    level: 1,
    email: email || 'Usuário',
    nickname: 'Nikname',
  });
}
