{
  /*Register*/
}

import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import { auth } from '@/services/firebase';

export async function register(email: string, password: string) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  await sendEmailVerification(userCredential.user);

  return userCredential;
}
