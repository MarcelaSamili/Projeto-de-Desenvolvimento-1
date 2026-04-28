{
  /*Login*/
}

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/services/firebase';

export async function login(email: string, password: string) {
  return await signInWithEmailAndPassword(auth, email, password);
}
