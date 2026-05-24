'use client';

import { useEffect, useState } from 'react';
import { auth } from '@/services/firebase';
import { onAuthStateChanged, updatePassword } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { useRouter } from 'next/navigation';
import { deleteAccount } from '@/features/auth/deleteaccount';
import { Button } from '@/components/ui/button';
import { FaArrowLeftLong } from 'react-icons/fa6';
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
    <main className="min-h-screen bg-emerald-700 from-[#08140F] via-[#0B1D14] to-[#0E2A1B] text-white overflow-hidden p-6 md:p-10">
      {/* GLOWS */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-green-500/20 blur-3xl rounded-full" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-400/10 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <Button
          className=" text-white mb-6 border rounded-4xl p-2 bg-emerald-600 border-emerald-600"
          onClick={() => router.push('/dashboard')}
        >
          <FaArrowLeftLong />
        </Button>

        {/* HEADER */}
        <div className="mt-10 mb-10 flex flex-col lg:flex-row gap-8 items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 text-purple-300 px-4 py-2 rounded-full mb-5">
              👤 EcoGame Profile
            </div>

            <h1 className="text-5xl font-black mb-3">Seu Perfil</h1>

            <p className="text-white/60 text-lg">
              Gerencie sua conta e personalize sua experiência.
            </p>
          </div>

          {/* AVATAR CARD */}
          <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[40px] p-8 flex items-center gap-6 min-w-[320px]">
            <div className="w-28 h-28 rounded-[32px] bg-linear-to-br from-green-400 to-emerald-500 flex items-center justify-center text-5xl shadow-2xl shadow-green-500/20">
              🌱
            </div>

            <div>
              <p className="text-white/50 text-sm mb-1">Jogador</p>

              <h2 className="text-3xl font-black mb-2">
                {nickname || 'EcoPlayer'}
              </h2>

              <p className="text-white/60 text-sm">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* GRID */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* PERFIL */}
          <div className="lg:col-span-2 bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[40px] p-8">
            <h2 className="text-3xl font-black mb-8">Editar Perfil</h2>

            {/* EMAIL */}
            <div className="mb-6">
              <label className="text-sm text-white/50 mb-2 block">Email</label>

              <div className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white/70">
                {user?.email}
              </div>
            </div>

            {/* NICKNAME */}
            <div className="mb-6">
              <label className="text-sm text-white/50 mb-2 block">
                Nickname
              </label>

              <input
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-green-500 transition-all duration-300"
                placeholder="Seu nickname"
                value={nickname}
                onChange={e => setNickname(e.target.value)}
              />
            </div>

            {/* NOVA SENHA */}
            <div className="mb-8">
              <label className="text-sm text-white/50 mb-2 block">
                Nova senha
              </label>

              <input
                type="password"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-green-500 transition-all duration-300"
                placeholder="Digite uma nova senha"
                onChange={e => setNovaSenha(e.target.value)}
              />
            </div>

            {/* FEEDBACK */}
            {mensagem && (
              <div className="mb-6 bg-green-500/10 border border-green-500/20 text-green-300 p-4 rounded-2xl">
                {mensagem}
              </div>
            )}

            {/* BOTÃO */}
            <button
              onClick={atualizarPerfil}
              className="bg-green-500 hover:bg-green-400 text-black font-bold px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-[1.02] shadow-2xl shadow-green-500/20"
            >
              Salvar alterações
            </button>
          </div>

          {/* STATS + DANGER ZONE */}
          <div className="flex flex-col gap-6">
            {/* ESTATÍSTICAS */}
            <div className="bg-white/5 border border-white/10 backdrop-blur-2xl rounded-[40px] p-8">
              <h2 className="text-2xl font-black mb-6">Estatísticas</h2>

              <div className="space-y-5">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <p className="text-white/50 text-sm mb-1">Conta criada</p>

                  <h3 className="text-xl font-bold">EcoPlayer</h3>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <p className="text-white/50 text-sm mb-1">Status</p>

                  <h3 className="text-xl font-bold text-green-400">Online</h3>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <p className="text-white/50 text-sm mb-1">Segurança</p>

                  <h3 className="text-xl font-bold">Protegida 🔒</h3>
                </div>
              </div>
            </div>

            {/* EXCLUIR CONTA */}
            <div className="bg-red-500/10 border border-red-500/20 rounded-[40px] p-8">
              <h2 className="text-2xl font-black mb-4 text-red-300">
                Zona de Perigo
              </h2>

              <p className="text-red-200/70 mb-6">
                Excluir sua conta removerá permanentemente todos os seus dados.
              </p>

              <button
                onClick={async () => {
                  const confirmacao = confirm(
                    'Tem certeza que deseja excluir sua conta?'
                  );

                  if (!confirmacao) return;

                  try {
                    await deleteAccount();
                    router.push('/login');
                  } catch (error: any) {
                    alert('Erro ao excluir conta. Faça login novamente.');
                  }
                }}
                className="w-full bg-red-500 hover:bg-red-400 text-white font-bold py-4 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
              >
                🗑️ Excluir conta
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
