{
  /*Login*/
}

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/services/firebase';

export async function login(email: string, password: string) {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  if (!userCredential.user.emailVerified) {
    throw new Error('email-not-verified');
  }

  return userCredential;
}
