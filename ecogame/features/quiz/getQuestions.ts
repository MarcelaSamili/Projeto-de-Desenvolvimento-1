{
  /*
CODIGO DE BUSCAR AS QUESTOES NO FIREBASE,  
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { Question } from '@/types/Quetions';

export async function getQuestions(): Promise<Question[]> {
  const snapshot = await getDocs(collection(db, 'questions'));

  const perguntas: Question[] = snapshot.docs.map(doc => ({
    id: doc.id,
    ...(doc.data() as Omit<Question, 'id'>),
  }));

  return perguntas;
}
*/
}
