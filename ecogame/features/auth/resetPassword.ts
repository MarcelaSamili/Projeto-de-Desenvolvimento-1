import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/services/firebase';

export async function resetPassword(email: string) {
  await sendPasswordResetEmail(auth, email);
}
