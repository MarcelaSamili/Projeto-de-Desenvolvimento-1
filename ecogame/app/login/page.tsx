'use client';

import { useState } from 'react';
import { login } from '@/features/auth/login';
import { register } from '@/features/auth/register';
import { createUserData } from '@/features/auth/createUserData';
import { resetPassword } from '@/features/auth/resetPassword';
import { useRouter } from 'next/navigation';
import { validarEmail, validarSenha } from '@/utils/validation';

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
    <main className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <div className="border border-white rounded-2xl p-6 w-80">
        <h1 className="text-2xl mb-4 text-center">
          {modo === 'login' && 'Entrar'}
          {modo === 'register' && 'Criar Conta'}
          {modo === 'reset' && 'Recuperar Senha'}
        </h1>

        <input
          className="mb-2 p-2 w-full text-white border border-white rounded-xl"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />

        {modo !== 'reset' && (
          <input
            type="password"
            className="mb-2 p-2 w-full text-white border border-white rounded-xl"
            placeholder="Senha"
            onChange={e => setPassword(e.target.value)}
          />
        )}

        {mensagem && (
          <p className={`mb-3 ${erro ? 'text-red-400' : 'text-green-400'}`}>
            {mensagem}
          </p>
        )}

        <button
          onClick={handleSubmit}
          className="bg-green-500 w-full py-2 rounded-xl"
        >
          {modo === 'login' && 'Entrar'}
          {modo === 'register' && 'Cadastrar'}
          {modo === 'reset' && 'Enviar recuperação'}
        </button>

        {/* TROCAS DE MODO */}
        <div className="mt-4 text-sm text-center flex flex-col gap-2">
          {modo === 'login' && (
            <>
              <button
                onClick={() => setModo('register')}
                className="text-green-400"
              >
                Criar conta
              </button>

              <button
                onClick={() => setModo('reset')}
                className="text-blue-400"
              >
                Esqueci minha senha
              </button>
            </>
          )}

          {modo === 'register' && (
            <button onClick={() => setModo('login')} className="text-green-400">
              Já tenho conta
            </button>
          )}

          {modo === 'reset' && (
            <button onClick={() => setModo('login')} className="text-slate-400">
              Voltar
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
