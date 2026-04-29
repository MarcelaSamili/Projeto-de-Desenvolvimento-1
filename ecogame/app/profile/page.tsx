'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/services/firebase';
import { onAuthStateChanged, updatePassword } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import { deleteAccount } from '@/features/auth/deleteaccount';
export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const [nickname, setNickname] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [mensagem, setMensagem] = useState('');

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async user => {
      if (!user) {
        router.push('/login');
      } else {
        setUser(user);

        const ref = doc(db, 'users', user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          setNickname(snap.data().nickname);
        }
      }
    });

    return () => unsubscribe();
  }, [router]);

  async function atualizarPerfil() {
    if (!user) return;

    try {
      const ref = doc(db, 'users', user.uid);

      await updateDoc(ref, {
        nickname,
      });

      if (novaSenha) {
        await updatePassword(user, novaSenha);
      }

      setMensagem('Nikname atualizado!');
    } catch (error) {
      setMensagem('Erro ao atualizar.');
    }
  }

  return (
    <main className="min-h-screen bg-cyan-800 text-white p-6 ">
      <Navbar />
      <h1 className="text-2xl mb-6">Perfil 👤</h1>
      <div className="border-2 items-center p-5 rounded-2xl">
        <p className="mb-4 text-slate-400 border-2 p-2">Email: {user?.email}</p>
        Nikname:
        <input
          className="mb-2 p-2 text-slate-400 border-2 ml-2 mr-2"
          placeholder="Nickname"
          value={nickname}
          onChange={e => setNickname(e.target.value)}
        />
        {/*Senha:
        <input
          type="password"
          className="mb-4 p-2 text-slate-400 border-2 ml-2"
          placeholder="Nova senha"
          onChange={e => setNovaSenha(e.target.value)}
        />*/}
        <button
          onClick={atualizarPerfil}
          className="bg-green-500 px-4 py-2 rounded ml-2"
        >
          Salvar alterações
        </button>
        {/*BOTAO DE EXCLUIR CONTA*/}
        <button
          onClick={async () => {
            const confirmacao = confirm(
              'Tem certeza que deseja excluir sua conta? '
            );

            if (!confirmacao) return;

            try {
              await deleteAccount();
              router.push('/login');
            } catch (error: any) {
              alert('Erro ao excluir conta. Faça login novamente.');
            }
          }}
          className="bg-red-600 px-4 py-2 rounded mt-6 ml-5"
        >
          Excluir conta 🗑️
        </button>
        {mensagem && <p className="mb-3 text-green-400">{mensagem}</p>}
      </div>
    </main>
  );
}
