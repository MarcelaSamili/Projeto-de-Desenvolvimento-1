{
  /*Register*/
}

import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/services/firebase';
export async function register(email: string, password: string) {
  return await createUserWithEmailAndPassword(auth, email, password);
}
