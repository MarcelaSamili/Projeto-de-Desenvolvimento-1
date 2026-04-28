'use client';

import { useState } from 'react';
import { login } from '@/features/auth/login';
import { register } from '@/features/auth/register';
import { createUserData } from '@/features/auth/createUserData';
import { useRouter } from 'next/navigation';
import { validarEmail, validarSenha } from '@/utils/validation';

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState(false);

  const router = useRouter();

  async function handleSubmit() {
    setMensagem('');

    // validações
    if (!validarEmail(email)) {
      setErro(true);
      setMensagem('Email inválido.');
      return;
    }

    if (!validarSenha(password)) {
      setErro(true);
      setMensagem('Senha Inválida');
      return;
    }

    try {
      if (isLogin) {
        await login(email, password);
        setErro(false);
        setMensagem('Login realizado com sucesso!');
      } else {
        const userCredential = await register(email, password);
        await createUserData(userCredential.user.uid);

        setErro(false);
        setMensagem('Conta criada com sucesso!');
      }

      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    } catch (error: any) {
      setErro(true);

      if (error.code === 'auth/email-already-in-use') {
        setMensagem('Esse email já está em uso.');
      } else {
        setMensagem('Esse email já existe no nosso banco de dados');
      }

      if (error.code === 'auth/invalid-credential') {
        setMensagem('Email incorreto.');
      } else {
        setMensagem('Erro ao processar. Tente novamente.');
      }
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-slate-900 text-white">
      <div className="flex flex-col items-center justify-center border-2 border-white rounded-2xl p-5">
        <h1 className="text-2xl mb-4">{isLogin ? 'Entrar' : 'Criar Conta'}</h1>
        <p className="text-xs text-slate-400 mb-2">
          A senha deve conter:
          <br />• 8 caracteres
          <br />• 1 letra maiúscula
          <br />• 1 minúscula
          <br />• 1 número
          <br />• 1 símbolo
        </p>
        <input
          className="mb-2 p-2 text-white border-2 border-white rounded-2xl "
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="mb-2 p-2 text-white border-2  border-white rounded-2xl"
          placeholder="Senha"
          onChange={e => setPassword(e.target.value)}
        />

        {/* FEEDBACK */}
        {mensagem && (
          <p className={`mb-3 ${erro ? 'text-red-400' : 'text-green-400'}`}>
            {mensagem}
          </p>
        )}

        <button
          onClick={handleSubmit}
          className="bg-green-500 px-4 py-2 rounded"
        >
          {isLogin ? 'Entrar' : 'Cadastrar'}
        </button>

        <button
          onClick={() => {
            setIsLogin(!isLogin);
            setMensagem('');
          }}
          className="mt-4 text-sm text-green-400"
        >
          {isLogin ? 'Criar conta' : 'Já tenho conta'}
        </button>
      </div>
    </main>
  );
}
