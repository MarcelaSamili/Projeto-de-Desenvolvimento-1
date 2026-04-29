import { deleteUser } from 'firebase/auth';
import { doc, deleteDoc } from 'firebase/firestore';
import { auth, db } from '@/services/firebase';

export async function deleteAccount() {
  const user = auth.currentUser;

  if (!user) throw new Error('Usuário não autenticado');

  const uid = user.uid;

  // 1. deletar dados do Firestore
  await deleteDoc(doc(db, 'users', uid));

  // 2. deletar usuário do Auth
  await deleteUser(user);
}
