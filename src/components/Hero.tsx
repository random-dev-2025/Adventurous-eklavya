'use client';

import { motion } from 'framer-motion';
import Avatar from './Avatar';
import {
  FloatingElement,
  Star,
  CricketBall,
  Sparkle,
  PawPrint,
  PawShield,
  RaceCar,
  LightningBolt,
  DogBone,
  SpeedLines,
  Gamepad,
  Rocket,
} from './FloatingElements';

export default function Hero() {
  const scrollToAdventures = () => {
    document.getElementById('who-am-i')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-slate-900 via-blue-950 to-blue-900"
    >
      {/* Animated grid lines background */}
      <div className="absolute inset-0 opacity-[0.07]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: 'linear-gradient(rgba(96,165,250,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Radial glow behind center */}
      <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute left-1/3 top-1/3 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/8 blur-3xl" />
      <div className="absolute right-1/4 bottom-1/4 h-[250px] w-[250px] rounded-full bg-red-500/5 blur-3xl" />

      {/* === Floating boy-themed elements === */}

      {/* Paw Patrol shield - prominent */}
      <FloatingElement delay={0} duration={6} x={15} y={10} className="left-[5%] top-[12%]">
        <PawShield size={50} />
      </FloatingElement>
      <FloatingElement delay={3} duration={7} x={12} y={8} className="right-[8%] top-[15%] hidden sm:block">
        <PawShield size={38} />
      </FloatingElement>

      {/* Paw prints scattered */}
      <FloatingElement delay={0.5} duration={5} x={8} y={12} className="left-[15%] top-[35%]">
        <PawPrint size={24} color="#60A5FA" />
      </FloatingElement>
      <FloatingElement delay={2} duration={5.5} x={10} y={8} className="right-[15%] top-[50%] hidden sm:block">
        <PawPrint size={20} color="#93C5FD" />
      </FloatingElement>
      <FloatingElement delay={4} duration={6} x={6} y={10} className="left-[40%] bottom-[20%] hidden md:block">
        <PawPrint size={18} color="#3B82F6" />
      </FloatingElement>

      {/* Race car zooming */}
      <FloatingElement delay={1} duration={8} x={30} y={5} className="left-[3%] top-[55%]">
        <RaceCar size={48} />
      </FloatingElement>
      <FloatingElement delay={4} duration={7} x={25} y={4} className="right-[5%] bottom-[25%] hidden sm:block">
        <RaceCar size={36} />
      </FloatingElement>

      {/* Lightning bolts */}
      <FloatingElement delay={0.5} duration={4} x={6} y={8} className="left-[25%] top-[18%]">
        <LightningBolt size={22} />
      </FloatingElement>
      <FloatingElement delay={2.5} duration={4.5} x={8} y={10} className="right-[22%] top-[25%]">
        <LightningBolt size={18} color="#F97316" />
      </FloatingElement>
      <FloatingElement delay={1.5} duration={3.5} x={5} y={6} className="right-[35%] bottom-[15%] hidden sm:block">
        <LightningBolt size={16} />
      </FloatingElement>

      {/* Dog bones */}
      <FloatingElement delay={3} duration={6} x={10} y={12} className="right-[25%] top-[10%] hidden md:block">
        <DogBone size={30} />
      </FloatingElement>
      <FloatingElement delay={1} duration={5} x={8} y={10} className="left-[10%] bottom-[30%] hidden sm:block">
        <DogBone size={24} color="#D1D5DB" />
      </FloatingElement>

      {/* Cricket ball and Stars */}
      <FloatingElement delay={2} duration={5} x={8} y={10} className="left-[30%] top-[20%] hidden md:block">
        <CricketBall size={18} />
      </FloatingElement>
      <FloatingElement delay={0.5} duration={4.5} x={6} y={8} className="right-[10%] top-[40%]">
        <Star size={20} color="#FBBF24" />
      </FloatingElement>
      <FloatingElement delay={3.5} duration={5} x={8} y={12} className="left-[8%] top-[42%] hidden sm:block">
        <Star size={16} color="#FCD34D" />
      </FloatingElement>

      {/* Gamepad */}
      <FloatingElement delay={2} duration={6.5} x={12} y={8} className="right-[6%] top-[55%] hidden md:block">
        <Gamepad size={32} />
      </FloatingElement>

      {/* Rocket */}
      <FloatingElement delay={1.5} duration={5} x={10} y={15} className="left-[18%] top-[60%] hidden sm:block">
        <Rocket size={26} />
      </FloatingElement>

      {/* Speed lines */}
      <SpeedLines className="left-[2%] top-[45%] hidden sm:block" />
      <SpeedLines className="right-[2%] top-[60%] hidden md:block" />

      {/* Energy sparkles */}
      <Sparkle className="left-[20%] top-[15%]" delay={0} />
      <Sparkle className="right-[20%] top-[20%]" delay={0.7} />
      <Sparkle className="left-[45%] top-[10%]" delay={1.4} />
      <Sparkle className="right-[30%] top-[40%]" delay={2.1} />
      <Sparkle className="left-[12%] top-[55%] hidden sm:block" delay={0.3} />
      <Sparkle className="right-[12%] top-[50%] hidden sm:block" delay={1.8} />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center px-4 text-center">
        {/* Avatar with energy ring */}
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
          className="relative mb-6 md:mb-8"
        >
          {/* Rotating energy ring */}
          <motion.div
            className="absolute inset-0 -m-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          >
            <svg viewBox="0 0 200 200" className="h-full w-full">
              <defs>
                <linearGradient id="heroRingGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                  <stop offset="25%" stopColor="#EF4444" stopOpacity="0.6" />
                  <stop offset="50%" stopColor="#FBBF24" stopOpacity="0.8" />
                  <stop offset="75%" stopColor="#22C55E" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.8" />
                </linearGradient>
              </defs>
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="url(#heroRingGrad)"
                strokeWidth="2"
                strokeDasharray="8 12"
              />
            </svg>
          </motion.div>

          {/* Pulsing glow */}
          <motion.div
            className="absolute inset-0 -m-4 rounded-full bg-gradient-to-r from-blue-500/20 via-red-400/15 to-blue-500/20 blur-xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Avatar pose="waving" size={220} className="relative z-10 h-[180px] w-[180px] drop-shadow-2xl sm:h-[220px] sm:w-[220px] md:h-[260px] md:w-[260px]" />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="mb-3 text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          Adventurous{' '}
          <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent">
            Eklavya
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="mb-8 max-w-md text-lg font-medium text-blue-200/80 sm:text-xl md:max-w-lg md:text-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          Paw Patrol fan. Cricket champ. World explorer.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          onClick={scrollToAdventures}
          className="group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-cyan-500 px-8 py-4 text-lg font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-xl hover:shadow-blue-500/40 sm:px-10 sm:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: 'easeInOut' }}
          />
          <span className="relative z-10 flex items-center gap-2">
            Explore My Adventures
            <motion.span
              className="inline-block"
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              &rarr;
            </motion.span>
          </span>
        </motion.button>

        {/* Paw Patrol badge row */}
        <motion.div
          className="mt-6 flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <span className="text-sm font-semibold text-blue-300/60">No job is too big, no pup is too small!</span>
        </motion.div>
      </div>

      {/* Bottom wave - dark to light transition */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 50 Q360 0 720 50 Q1080 100 1440 50 L1440 100 L0 100 Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}
