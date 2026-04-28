import { signOut } from 'firebase/auth';
import { auth } from '@/services/firebase';

export async function logout() {
  await signOut(auth);
}
