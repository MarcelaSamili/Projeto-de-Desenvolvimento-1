'use client';

import { motion } from 'framer-motion';
import { Leaf, Trophy, BookOpen, ChevronRight, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

import { useRouter } from 'next/navigation';

export default function EcoGameHome() {
  const router = useRouter();
  return (
    <main className="min-h-screen bg-emerald-700 from-[#08140F] via-[#0B1D14] to-[#0E2A1B] text-white overflow-hidden">
      {/* NAVBAR */}
      <header className="text-black w-full px-6 py-5 flex items-center justify-between border-b border-white/10 backdrop-blur-xl">
        <div className="flex items-center gap-3 text-black">
          <div className=" w-10 h-10 rounded-2xl bg-green-500 flex items-center justify-center shadow-lg shadow-green-500/30">
            <Leaf className="w-5 h-5" />
          </div>

          <div>
            <h1 className="font-bold text-xl text-white">ECOGAME</h1>
            <p className="text-xs text-white/70">Aprenda jogando</p>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="relative px-6 md:px-16 py-16 grid lg:grid-cols-2 gap-12 items-center">
        {/* Glow */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/20 blur-3xl rounded-full" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-400/10 blur-3xl rounded-full" />

        {/* TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6 inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-300 px-4 py-2 rounded-full"
          >
            <Leaf className="w-4 h-4" />
            Plataforma gamificada de sustentabilidade
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-black leading-tight mb-6">
            Aprenda
            <span className="block text-green-400">sustentabilidade</span>
            jogando.
          </h2>

          <p className="text-lg text-white/70 leading-relaxed max-w-xl mb-10">
            Responda quizzes, ganhe XP, suba de nível e descubra como pequenas
            ações podem transformar o planeta.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => router.push('/login')}
              className="bg-green-500 hover:bg-green-400 text-white font-bold px-8 py-7 rounded-2xl text-lg shadow-2xl shadow-green-500/20 transition-all duration-300 hover:scale-105"
            >
              Começar agora
              <ChevronRight className="ml-2 w-5 h-5" />
            </Button>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-3 gap-4 mt-14 text-white">
            {[
              ['2.543', 'Jogadores'],
              ['15.328', 'Quizzes'],
              ['8.721kg', 'CO₂ economizados'],
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.2 }}
              >
                <Card className="bg-white/5 border-white/10 backdrop-blur-xl rounded-3xl">
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-black text-green-400 mb-1">
                      {item[0]}
                    </h3>

                    <p className="text-sm text-white/60">{item[1]}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* IMAGE SIDE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative flex justify-center"
        >
          {/* Floating cards */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute top-10 left-0 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-4 z-20"
          >
            <div className="flex items-center gap-3">
              <div className="bg-green-500 p-3 rounded-2xl">
                <Trophy className="w-5 h-5 text-black" />
              </div>

              <div>
                <p className="text-sm text-white/60">Nível atual</p>
                <h4 className="font-bold">Guardião Verde</h4>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
            className="absolute bottom-8 right-0 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-4 z-20"
          >
            <div className="flex items-center gap-3">
              <div className="bg-emerald-400 p-3 rounded-2xl">
                <BookOpen className="w-5 h-5 text-black" />
              </div>

              <div>
                <p className="text-sm text-white/60">XP ganho</p>
                <h4 className="font-bold">+240 XP</h4>
              </div>
            </div>
          </motion.div>

          {/* Main card */}
          <div className="relative w-full  rounded-[40px] bg-emerald-900 from-green-500/20 to-emerald-300/10 border border-white/10 backdrop-blur-2xl p-10 overflow-hidden shadow-2xl shadow-green-500/10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.15),transparent_60%)]" />

            <motion.div
              animate={{ rotate: [0, 2, -2, 0] }}
              transition={{ repeat: Infinity, duration: 6 }}
              className="relative z-10 flex justify-center"
            >
              <Image
                src="/public/image/eco2.png"
                alt="EcoGame"
                width={500}
                height={500}
                className="rounded-3xl object-cover "
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 md:px-16 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-12 text-center text-white">
            <h2 className="text-4xl text-white mb-4">Como funciona?</h2>

            <p className="text-white/60 text-lg">
              Aprender sustentabilidade nunca foi tão divertido.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-white">
            {[
              {
                icon: BookOpen,
                title: 'Responda quizzes',
                desc: 'Aprenda sobre reciclagem, energia e sustentabilidade.',
              },
              {
                icon: Trophy,
                title: 'Ganhe XP',
                desc: 'Complete desafios e suba de nível.',
              },
              {
                icon: Leaf,
                title: 'Faça a diferença',
                desc: 'Descubra hábitos que ajudam o planeta.',
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="bg-white/5 border-white/10 rounded-[32px] backdrop-blur-xl hover:bg-white/10 transition-all duration-500 hover:-translate-y-2">
                  <CardContent className="p-8 flex flex-col items-center text-center">
                    <div className="w-20 h-20 rounded-3xl bg-green-500/15 flex items-center justify-center mb-6">
                      <item.icon className="w-10 h-10 text-green-400" />
                    </div>

                    <h3 className="text-2xl font-bold mb-3">{item.title}</h3>

                    <p className="text-white/60 leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </main>
  );
}
