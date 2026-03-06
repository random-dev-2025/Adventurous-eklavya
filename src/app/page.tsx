'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import WhoAmI from '@/components/WhoAmI';
import WhatILove from '@/components/WhatILove';
import Superpowers from '@/components/Superpowers';
import VisitorBadges from '@/components/VisitorBadges';
import WorldMap from '@/components/WorldMap';
import Countries from '@/components/Countries';
import AdventurePoll from '@/components/AdventurePoll';
import CricketGame from '@/components/CricketGame';
import Gallery from '@/components/Gallery';
import FunFacts from '@/components/FunFacts';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';
import BirthdayMode from '@/components/BirthdayMode';

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-300/40 transition-shadow hover:shadow-xl hover:shadow-blue-300/50"
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll to top"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 16 L10 4" />
            <path d="M4 10 L10 4 L16 10" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <BirthdayMode />
      <Navigation />
      <main>
        <Hero />
        <WhoAmI />
        <WhatILove />
        <Superpowers />
        <VisitorBadges />
        <WorldMap />
        <Countries />
        <AdventurePoll />
        <CricketGame />
        <Gallery />
        <FunFacts />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
