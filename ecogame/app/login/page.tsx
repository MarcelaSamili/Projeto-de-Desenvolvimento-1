'use client';

import { useState } from 'react';
import { login } from '@/features/auth/login';
import { register } from '@/features/auth/register';
import { createUserData } from '@/features/auth/createUserData';
import { resetPassword } from '@/features/auth/resetPassword';
import { useRouter } from 'next/navigation';
import { validarEmail, validarSenha } from '@/utils/validation';
import { Button } from '@base-ui/react';
import { FaArrowLeftLong } from 'react-icons/fa6';
export default function Login() {
  const [modo, setModo] = useState<'login' | 'register' | 'reset'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState(false);

  const router = useRouter();

  async function handleSubmit() {
    setMensagem('');

    if (!validarEmail(email)) {
      setErro(true);
      setMensagem('Email inválido.');
      return;
    }

    try {
      // LOGIN
      if (modo === 'login') {
        await login(email, password);

        setErro(false);
        setMensagem('Login realizado com sucesso!');

        setTimeout(() => router.push('/dashboard'), 1000);
      }

      // CADASTRO
      if (modo === 'register') {
        if (!validarSenha(password)) {
          setErro(true);
          setMensagem('Senha inválida.');
          return;
        }

        const userCredential = await register(email, password);
        const user = userCredential.user;

        await createUserData(user.uid, user.email);

        setErro(false);
        setMensagem(
          'Conta criada! 📩 Verifique seu email para ativar sua conta. (Spam ou promoções)'
        );
      }

      // RESET
      if (modo === 'reset') {
        await resetPassword(email);

        setErro(false);
        setMensagem('Email de recuperação enviado!');
      }
    } catch (error: any) {
      setErro(true);

      if (error.code === 'auth/email-already-in-use') {
        setMensagem('Esse email já está em uso.');
      } else if (error.code === 'auth/invalid-credential') {
        setMensagem('Email ou senha incorretos.');
      } else if (error.message === 'email-not-verified') {
        setMensagem('Verifique seu email antes de entrar.');
      } else {
        setMensagem('Erro ao processar.');
      }
    }
  }

  return (
    <main className="min-h-screen bg-emerald-700 from-[#08140F] via-[#0B1D14] to-[#0E2A1B] text-white overflow-hidden flex items-center justify-center px-6">
      {/* GLOWS */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-green-500/20 blur-3xl rounded-full" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-400/10 blur-3xl rounded-full" />
      <div className="relative z-10 w-full max-w-6xl grid lg:grid-cols-2 rounded-[40px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl shadow-green-500/10">
        {/* LADO ESQUERDO */}
        <div className="hidden lg:flex flex-col justify-between p-12  from-green-500/10 to-emerald-300/5 border-r border-white/10">
          <div>
            <Button
              className=" text-white mb-6 border rounded-4xl p-2 bg-emerald-600 border-emerald-600"
              onClick={() => router.push('/')}
            >
              <FaArrowLeftLong />
            </Button>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-14 h-14 rounded-3xl bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/30">
                🌱
              </div>

              <div>
                <h1 className="text-3xl font-black">ECOGAME</h1>
                <p className="text-white/60">
                  Aprenda sustentabilidade jogando
                </p>
              </div>
            </div>

            <h2 className="text-5xl font-black leading-tight mb-6">
              Transforme
              <span className="block text-green-400">conhecimento</span>
              em impacto.
            </h2>

            <p className="text-white/70 text-lg leading-relaxed max-w-md">
              Responda quizzes, ganhe XP, desbloqueie conquistas e aprenda como
              pequenas ações podem ajudar o planeta.
            </p>
          </div>

          {/* CARDS */}
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur-xl">
              <p className="text-sm text-white/60 mb-1">Jogadores ativos</p>

              <h3 className="text-3xl font-black text-green-400">2.543+</h3>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur-xl">
              <p className="text-sm text-white/60 mb-1">XP distribuído</p>

              <h3 className="text-3xl font-black text-emerald-300">
                98.240 XP
              </h3>
            </div>
          </div>
        </div>

        {/* LOGIN */}
        <div className="p-8 md:p-14 flex flex-col justify-center">
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-300 px-4 py-2 rounded-full mb-6">
              EcoGame
            </div>

            <h1 className="text-4xl font-black mb-3">
              {modo === 'login' && 'Bem-vindo de volta'}
              {modo === 'register' && 'Criar conta'}
              {modo === 'reset' && 'Recuperar senha'}
            </h1>

            <p className="text-white/60 text-lg">
              {modo === 'login' &&
                'Entre para continuar sua jornada sustentável.'}

              {modo === 'register' && 'Crie sua conta e comece a ganhar XP.'}

              {modo === 'reset' &&
                'Enviaremos um email para recuperação da senha.'}
            </p>
          </div>

          {/* INPUT EMAIL */}
          <div className="mb-4">
            <label className="text-sm text-white/60 mb-2 block">Email</label>

            <input
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-green-500 transition-all duration-300"
              placeholder="Digite seu email"
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          {/* INPUT SENHA */}
          {modo !== 'reset' && (
            <div className="mb-4">
              <label className="text-sm text-white/60 mb-2 block">Senha</label>

              <input
                type="password"
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-green-500 transition-all duration-300"
                placeholder="Digite sua senha"
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          )}

          {/* FEEDBACK */}
          {mensagem && (
            <div
              className={`mb-5 p-4 rounded-2xl border ${
                erro
                  ? 'bg-red-500/10 border-red-500/20 text-red-300'
                  : 'bg-green-500/10 border-green-500/20 text-green-300'
              }`}
            >
              {mensagem}
            </div>
          )}

          {/* BOTÃO */}
          <button
            onClick={handleSubmit}
            className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-4 rounded-2xl transition-all duration-300 hover:scale-[1.02] shadow-2xl shadow-green-500/20"
          >
            {modo === 'login' && 'Entrar'}
            {modo === 'register' && 'Criar conta'}
            {modo === 'reset' && 'Enviar recuperação'}
          </button>

          {/* MODOS */}
          <div className="mt-8 flex flex-col gap-3 text-center">
            {modo === 'login' && (
              <>
                <button
                  onClick={() => setModo('register')}
                  className="text-green-400 hover:text-green-300 transition-all"
                >
                  Criar conta
                </button>

                <button
                  onClick={() => setModo('reset')}
                  className="text-cyan-200  hover:text-blue-300 transition-all "
                >
                  Esqueci minha senha
                </button>
              </>
            )}

            {modo === 'register' && (
              <button
                onClick={() => setModo('login')}
                className="text-green-400 hover:text-green-300 transition-all"
              >
                Já tenho conta
              </button>
            )}

            {modo === 'reset' && (
              <button
                onClick={() => setModo('login')}
                className="text-slate-400 hover:text-white transition-all"
              >
                Voltar
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
