//Esse codigo manipula os XPs trabalhando com o banco para construir o ranking

import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/services/firebase';

export async function addXP(uid: string, amount: number) {
  const ref = doc(db, 'users', uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) return;

  const data = snap.data();

  let xp = data.xp || 0;
  let level = data.level || 1;

  xp += amount;

  // cálculo do próximo nível
  let xpNecessario = level * 100;

  // sobe de nível automaticamente
  while (xp >= xpNecessario) {
    xp -= xpNecessario;
    level += 1;
    xpNecessario = level * 100;
  }

  await updateDoc(ref, {
    xp,
    level,
  });
}
