import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/services/firebase';

export async function getRanking() {
  const querySnapshot = await getDocs(collection(db, 'users'));

  const users: any[] = [];

  querySnapshot.forEach(doc => {
    users.push({
      id: doc.id,
      ...doc.data(),
    });
  });

  // ordenar por XP (maior primeiro)
  users.sort((a, b) => b.xp - a.xp);

  return users;
}
