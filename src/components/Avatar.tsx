'use client';

import { motion } from 'framer-motion';

type AvatarPose =
  | 'waving'
  | 'traveling'
  | 'cricket'
  | 'singing'
  | 'dancing'
  | 'skating'
  | 'acting'
  | 'explorer';

interface AvatarProps {
  pose?: AvatarPose;
  size?: number;
  className?: string;
}

export default function Avatar({ pose = 'waving', size = 200, className = '' }: AvatarProps) {
  const defs = (
    <defs>
      {/* Skin gradient - warm Indian skin tone with depth */}
      <radialGradient id="skinGrad" cx="45%" cy="38%" r="58%">
        <stop offset="0%" stopColor="#D4945A" />
        <stop offset="40%" stopColor="#C68642" />
        <stop offset="80%" stopColor="#B87A3D" />
        <stop offset="100%" stopColor="#A0652F" />
      </radialGradient>
      <radialGradient id="skinGradArm" cx="50%" cy="30%" r="60%">
        <stop offset="0%" stopColor="#D4945A" />
        <stop offset="100%" stopColor="#B87A3D" />
      </radialGradient>
      {/* Hair gradient - thick dark hair */}
      <linearGradient id="hairGrad" x1="0" y1="0" x2="0.2" y2="1">
        <stop offset="0%" stopColor="#1A1A2E" />
        <stop offset="50%" stopColor="#0F0F1E" />
        <stop offset="100%" stopColor="#080812" />
      </linearGradient>
      {/* Hoodie gradient - cool grey with depth */}
      <linearGradient id="hoodieGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#B0B8C4" />
        <stop offset="50%" stopColor="#9CA3AF" />
        <stop offset="100%" stopColor="#7B8290" />
      </linearGradient>
      <linearGradient id="hoodieSleeve" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#A8B0BC" />
        <stop offset="100%" stopColor="#8B929E" />
      </linearGradient>
      {/* Pants gradient */}
      <linearGradient id="pantsGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#8A7F72" />
        <stop offset="100%" stopColor="#57534E" />
      </linearGradient>
      {/* Shoe gradient */}
      <linearGradient id="shoeGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#E5E7EB" />
      </linearGradient>
      {/* Cap gradient */}
      <linearGradient id="capGrad" x1="0" y1="0" x2="0.3" y2="1">
        <stop offset="0%" stopColor="#2563EB" />
        <stop offset="100%" stopColor="#1E40AF" />
      </linearGradient>
      <linearGradient id="capGradRed" x1="0" y1="0" x2="0.3" y2="1">
        <stop offset="0%" stopColor="#EF4444" />
        <stop offset="100%" stopColor="#B91C1C" />
      </linearGradient>
      {/* Sunglass lens gradient */}
      <linearGradient id="lensGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#1E293B" />
        <stop offset="100%" stopColor="#0F172A" />
      </linearGradient>
      {/* Body shadow */}
      <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#1E3A5F" floodOpacity="0.15" />
      </filter>
      <filter id="headShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#1E3A5F" floodOpacity="0.1" />
      </filter>
      <filter id="glowBlue" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feFlood floodColor="#60A5FA" floodOpacity="0.3" result="color" />
        <feComposite in="color" in2="blur" operator="in" result="shadow" />
        <feMerge>
          <feMergeNode in="shadow" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      {/* Jersey gradient */}
      <linearGradient id="jerseyGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="100%" stopColor="#DBEAFE" />
      </linearGradient>
      {/* Blazer gradient */}
      <linearGradient id="blazerGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#334155" />
        <stop offset="100%" stopColor="#0F172A" />
      </linearGradient>
      {/* Backpack gradient */}
      <linearGradient id="backpackGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#60A5FA" />
        <stop offset="100%" stopColor="#2563EB" />
      </linearGradient>
      {/* Cheek glow */}
      <radialGradient id="cheekGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#E8A87C" stopOpacity="0.4" />
        <stop offset="100%" stopColor="#E8A87C" stopOpacity="0" />
      </radialGradient>
      {/* Lip color */}
      <linearGradient id="lipGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#C1564B" />
        <stop offset="100%" stopColor="#A0413A" />
      </linearGradient>
      {/* Anime hair highlight */}
      <linearGradient id="hairHighlight" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#2D2D5E" />
        <stop offset="100%" stopColor="#1A1A2E" />
      </linearGradient>
      {/* Anime lens gradient - cooler */}
      <linearGradient id="animeLensGrad" x1="0" y1="0" x2="0.3" y2="1">
        <stop offset="0%" stopColor="#0F172A" />
        <stop offset="40%" stopColor="#1E293B" />
        <stop offset="100%" stopColor="#0F172A" />
      </linearGradient>
    </defs>
  );

  const renderSunglasses = () => {
    return (
      <g filter="url(#headShadow)">
        {/* Left lens - angular anime style */}
        <path d="M76 85 L93 85 L91 97 L78 97 Z" fill="url(#animeLensGrad)" stroke="#0F172A" strokeWidth="1.8" strokeLinejoin="round" />
        {/* Right lens */}
        <path d="M107 85 L124 85 L122 97 L109 97 Z" fill="url(#animeLensGrad)" stroke="#0F172A" strokeWidth="1.8" strokeLinejoin="round" />
        {/* Bridge - sleek */}
        <path d="M93 89 Q100 92 107 89" fill="none" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
        {/* Left arm */}
        <line x1="76" y1="89" x2="67" y2="87" stroke="#0F172A" strokeWidth="2" />
        {/* Right arm */}
        <line x1="124" y1="89" x2="133" y2="87" stroke="#0F172A" strokeWidth="2" />
        {/* Lens shine - sharp angular reflection */}
        <path d="M79 87 L85 87 L84 89" fill="rgba(255,255,255,0.3)" />
        <path d="M110 87 L116 87 L115 89" fill="rgba(255,255,255,0.3)" />
        {/* Blue tint reflection */}
        <path d="M80 93 L89 93 L88 95 L81 95 Z" fill="#3B82F6" opacity="0.1" />
        <path d="M111 93 L120 93 L119 95 L112 95 Z" fill="#3B82F6" opacity="0.1" />
      </g>
    );
  };

  const renderCap = (variant: 'blue' | 'red' = 'blue') => {
    const gradId = variant === 'red' ? 'url(#capGradRed)' : 'url(#capGrad)';
    const accent = variant === 'red' ? '#F87171' : '#60A5FA';
    return (
      <g filter="url(#headShadow)">
        {/* Cap bill (backwards) */}
        <path d="M68 78 Q62 82 60 88" fill={variant === 'red' ? '#DC2626' : '#1E40AF'} stroke={variant === 'red' ? '#DC2626' : '#1E40AF'} strokeWidth="2" />
        <path d="M60 85 Q58 90 62 92" fill={variant === 'red' ? '#DC2626' : '#1E40AF'} />
        {/* Cap body with gradient */}
        <path d="M70 80 Q70 58 100 54 Q130 58 130 80" fill={gradId} />
        {/* Panel lines */}
        <line x1="100" y1="54" x2="100" y2="80" stroke={accent} strokeWidth="0.8" opacity="0.3" />
        <line x1="85" y1="56" x2="80" y2="80" stroke={accent} strokeWidth="0.8" opacity="0.2" />
        <line x1="115" y1="56" x2="120" y2="80" stroke={accent} strokeWidth="0.8" opacity="0.2" />
        {/* Cap button */}
        <circle cx="100" cy="54" r="2.5" fill={accent} />
        {/* Cap band */}
        <path d="M70 78 Q100 83 130 78" fill="none" stroke={accent} strokeWidth="2.5" />
        {/* Cap highlight */}
        <path d="M80 62 Q90 58 100 60" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2" strokeLinecap="round" />
        {/* Paw Patrol badge on cap */}
        <g transform="translate(96, 63) scale(0.4)">
          <circle cx="10" cy="10" r="9" fill="white" opacity="0.25" />
          <ellipse cx="10" cy="13" rx="4" ry="3.5" fill="white" opacity="0.3" />
          <ellipse cx="6" cy="8" rx="2" ry="2.5" fill="white" opacity="0.3" />
          <ellipse cx="10" cy="6" rx="2" ry="2.5" fill="white" opacity="0.3" />
          <ellipse cx="14" cy="8" rx="2" ry="2.5" fill="white" opacity="0.3" />
        </g>
      </g>
    );
  };

  const renderShoes = () => (
    <g>
      {/* Left shoe */}
      <ellipse cx="87" cy="218" rx="14" ry="6" fill="url(#shoeGrad)" />
      <ellipse cx="87" cy="217" rx="12" ry="4" fill="white" opacity="0.3" />
      <line x1="80" y1="216" x2="80" y2="220" stroke="#3B82F6" strokeWidth="1.3" />
      <line x1="83" y1="215" x2="83" y2="221" stroke="#3B82F6" strokeWidth="1.3" />
      <line x1="86" y1="215" x2="86" y2="221" stroke="#3B82F6" strokeWidth="1.3" />
      <path d="M73 220 Q87 224 101 220" fill="none" stroke="#D1D5DB" strokeWidth="1.5" />
      {/* Right shoe */}
      <ellipse cx="113" cy="218" rx="14" ry="6" fill="url(#shoeGrad)" />
      <ellipse cx="113" cy="217" rx="12" ry="4" fill="white" opacity="0.3" />
      <line x1="110" y1="215" x2="110" y2="221" stroke="#3B82F6" strokeWidth="1.3" />
      <line x1="113" y1="215" x2="113" y2="221" stroke="#3B82F6" strokeWidth="1.3" />
      <line x1="116" y1="216" x2="116" y2="220" stroke="#3B82F6" strokeWidth="1.3" />
      <path d="M99 220 Q113 224 127 220" fill="none" stroke="#D1D5DB" strokeWidth="1.5" />
    </g>
  );

  const renderGroundShadow = () => (
    <ellipse cx="100" cy="226" rx="35" ry="5" fill="#1E3A5F" opacity="0.08">
      <animate attributeName="rx" values="35;37;35" dur="3s" repeatCount="indefinite" />
    </ellipse>
  );

  const renderBody = () => {
    switch (pose) {
      case 'waving':
        return (
          <g filter="url(#softShadow)">
            {renderGroundShadow()}
            {/* Body / Hoodie */}
            <path d="M85 130 Q80 130 75 140 L70 175 Q70 180 80 180 L120 180 Q130 180 130 175 L125 140 Q120 130 115 130 Z" fill="url(#hoodieGrad)" />
            {/* Hoodie pocket */}
            <rect x="85" y="158" width="30" height="12" rx="4" fill="#7B8290" opacity="0.4" />
            {/* Hoodie strings */}
            <line x1="95" y1="132" x2="93" y2="148" stroke="#7B8290" strokeWidth="1" />
            <line x1="105" y1="132" x2="107" y2="148" stroke="#7B8290" strokeWidth="1" />
            <circle cx="93" cy="149" r="1.5" fill="#7B8290" />
            <circle cx="107" cy="149" r="1.5" fill="#7B8290" />
            {/* Hood collar */}
            <path d="M85 130 Q90 126 100 128 Q110 126 115 130" fill="#7B8290" opacity="0.4" />
            {/* Highlight on hoodie */}
            <path d="M88 135 Q95 132 100 134" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="3" strokeLinecap="round" />
            {/* Paw Patrol logo on hoodie chest */}
            <g transform="translate(92, 140) scale(0.55)">
              <ellipse cx="14" cy="16" rx="6" ry="5" fill="#3B82F6" opacity="0.5" />
              <ellipse cx="9" cy="10" rx="3" ry="3.5" fill="#3B82F6" opacity="0.5" />
              <ellipse cx="14" cy="7.5" rx="3" ry="3.5" fill="#3B82F6" opacity="0.5" />
              <ellipse cx="19" cy="10" rx="3" ry="3.5" fill="#3B82F6" opacity="0.5" />
            </g>
            {/* Left arm (in pocket) */}
            <path d="M75 140 Q65 155 68 165" fill="none" stroke="url(#hoodieSleeve)" strokeWidth="14" strokeLinecap="round" />
            <circle cx="68" cy="167" r="7" fill="url(#skinGradArm)" />
            {/* Fingers on left hand */}
            <path d="M63 167 Q61 163 62 160" fill="none" stroke="url(#skinGradArm)" strokeWidth="2.5" strokeLinecap="round" />
            {/* Right arm (raised, static peace sign) */}
            <g>
              <path d="M125 140 Q140 125 145 105" fill="none" stroke="url(#hoodieSleeve)" strokeWidth="14" strokeLinecap="round" />
              <circle cx="145" cy="103" r="7" fill="url(#skinGradArm)" />
              {/* Peace sign fingers */}
              <line x1="143" y1="100" x2="140" y2="88" stroke="#C68642" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="147" y1="100" x2="149" y2="88" stroke="#C68642" strokeWidth="2.5" strokeLinecap="round" />
              {/* Thumb */}
              <line x1="140" y1="103" x2="136" y2="100" stroke="#C68642" strokeWidth="2" strokeLinecap="round" />
            </g>
            {/* Jogger pants */}
            <path d="M80 178 L78 210 Q78 215 85 215 L95 215 Q98 215 98 210 L100 190 L102 210 Q102 215 105 215 L115 215 Q122 215 122 210 L120 178 Z" fill="url(#pantsGrad)" />
            {/* Pant cuffs */}
            <rect x="78" y="208" width="20" height="5" rx="2" fill="#4A453F" />
            <rect x="102" y="208" width="20" height="5" rx="2" fill="#4A453F" />
            {renderShoes()}
          </g>
        );
      case 'traveling':
        return (
          <g filter="url(#softShadow)">
            {renderGroundShadow()}
            <path d="M85 130 Q80 130 75 140 L70 175 Q70 180 80 180 L120 180 Q130 180 130 175 L125 140 Q120 130 115 130 Z" fill="url(#hoodieGrad)" />
            <path d="M85 130 Q90 126 100 128 Q110 126 115 130" fill="#7B8290" opacity="0.4" />
            <path d="M88 135 Q95 132 100 134" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="3" strokeLinecap="round" />
            {/* Backpack */}
            <rect x="52" y="130" width="22" height="38" rx="6" fill="url(#backpackGrad)" />
            <rect x="55" y="136" width="16" height="10" rx="3" fill="#2563EB" />
            <path d="M63 130 Q63 126 70 126 L80 128" fill="none" stroke="#2563EB" strokeWidth="2.5" />
            <path d="M63 130 Q63 126 56 126 L52 128" fill="none" stroke="#2563EB" strokeWidth="2.5" />
            <line x1="63" y1="148" x2="63" y2="160" stroke="#1E40AF" strokeWidth="1.5" />
            <circle cx="63" cy="160" r="1.5" fill="#93C5FD" />
            <path d="M56 134 Q60 132 64 134" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" />
            {/* Arms */}
            <path d="M75 140 Q65 150 68 155" fill="none" stroke="url(#hoodieSleeve)" strokeWidth="14" strokeLinecap="round" />
            <circle cx="68" cy="157" r="7" fill="url(#skinGradArm)" />
            <path d="M125 140 Q135 150 133 160" fill="none" stroke="url(#hoodieSleeve)" strokeWidth="14" strokeLinecap="round" />
            <circle cx="133" cy="162" r="7" fill="url(#skinGradArm)" />
            {/* Pants */}
            <path d="M80 178 L78 210 Q78 215 85 215 L95 215 Q98 215 98 210 L100 190 L102 210 Q102 215 105 215 L115 215 Q122 215 122 210 L120 178 Z" fill="url(#pantsGrad)" />
            <rect x="78" y="208" width="20" height="5" rx="2" fill="#4A453F" />
            <rect x="102" y="208" width="20" height="5" rx="2" fill="#4A453F" />
            {renderShoes()}
          </g>
        );
      case 'cricket':
        return (
          <g filter="url(#softShadow)">
            {renderGroundShadow()}
            {/* Cricket jersey */}
            <path d="M85 130 Q80 130 75 140 L70 175 Q70 180 80 180 L120 180 Q130 180 130 175 L125 140 Q120 130 115 130 Z" fill="url(#jerseyGrad)" />
            <path d="M90 130 Q100 138 110 130" fill="none" stroke="#BFDBFE" strokeWidth="2" />
            <text x="92" y="162" fontSize="16" fontWeight="bold" fill="#3B82F6" fontFamily="sans-serif">7</text>
            {/* Left arm */}
            <path d="M75 140 Q60 155 58 170" fill="none" stroke="#EFF6FF" strokeWidth="14" strokeLinecap="round" />
            <circle cx="58" cy="172" r="7" fill="url(#skinGradArm)" />
            {/* Right arm (bat) */}
            <motion.g
              animate={{ rotate: [0, -30, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 3 }}
              style={{ originX: '125px', originY: '140px' }}
            >
              <path d="M125 140 Q140 130 148 115" fill="none" stroke="#EFF6FF" strokeWidth="14" strokeLinecap="round" />
              <circle cx="148" cy="113" r="7" fill="url(#skinGradArm)" />
              <rect x="146" y="70" width="8" height="45" rx="3" fill="#D97706" />
              <rect x="144" y="60" width="12" height="14" rx="2" fill="#F59E0B" />
              <line x1="150" y1="115" x2="150" y2="105" stroke="#92400E" strokeWidth="2" />
            </motion.g>
            <path d="M80 178 L78 210 Q78 215 85 215 L95 215 Q98 215 98 210 L100 190 L102 210 Q102 215 105 215 L115 215 Q122 215 122 210 L120 178 Z" fill="#F0F4F8" />
            {renderShoes()}
            <motion.circle cx="140" cy="216" r="6" fill="#DC2626"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
            <path d="M135 213 Q140 216 135 219" fill="none" stroke="white" strokeWidth="1" />
          </g>
        );
      case 'singing':
        return (
          <g filter="url(#softShadow)">
            {renderGroundShadow()}
            <path d="M85 130 Q80 130 75 140 L70 175 Q70 180 80 180 L120 180 Q130 180 130 175 L125 140 Q120 130 115 130 Z" fill="url(#hoodieGrad)" />
            <path d="M85 130 Q90 126 100 128 Q110 126 115 130" fill="#7B8290" opacity="0.4" />
            <path d="M88 135 Q95 132 100 134" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="3" strokeLinecap="round" />
            <path d="M75 140 Q58 148 52 155" fill="none" stroke="url(#hoodieSleeve)" strokeWidth="14" strokeLinecap="round" />
            <circle cx="52" cy="157" r="7" fill="url(#skinGradArm)" />
            <path d="M125 140 Q138 128 142 115" fill="none" stroke="url(#hoodieSleeve)" strokeWidth="14" strokeLinecap="round" />
            <circle cx="142" cy="113" r="7" fill="url(#skinGradArm)" />
            {/* Microphone */}
            <rect x="139" y="95" width="6" height="18" rx="3" fill="#6B7280" />
            <circle cx="142" cy="92" r="6" fill="#374151" />
            <circle cx="142" cy="92" r="4" fill="#6B7280" />
            <line x1="140" y1="90" x2="144" y2="90" stroke="#9CA3AF" strokeWidth="0.5" />
            <line x1="140" y1="92" x2="144" y2="92" stroke="#9CA3AF" strokeWidth="0.5" />
            <line x1="140" y1="94" x2="144" y2="94" stroke="#9CA3AF" strokeWidth="0.5" />
            {/* Music notes */}
            <motion.g animate={{ y: [-5, -18, -5], opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }}>
              <text x="150" y="85" fontSize="16" fill="#60A5FA">&#9834;</text>
            </motion.g>
            <motion.g animate={{ y: [0, -14, 0], opacity: [0.7, 1, 0.7] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}>
              <text x="128" y="78" fontSize="14" fill="#93C5FD">&#9835;</text>
            </motion.g>
            <motion.g animate={{ y: [-3, -16, -3], opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }}>
              <text x="155" y="75" fontSize="12" fill="#BFDBFE">&#9834;</text>
            </motion.g>
            <path d="M80 178 L78 210 Q78 215 85 215 L95 215 Q98 215 98 210 L100 190 L102 210 Q102 215 105 215 L115 215 Q122 215 122 210 L120 178 Z" fill="url(#pantsGrad)" />
            <rect x="78" y="208" width="20" height="5" rx="2" fill="#4A453F" />
            <rect x="102" y="208" width="20" height="5" rx="2" fill="#4A453F" />
            {renderShoes()}
          </g>
        );
      case 'dancing':
        return (
          <g filter="url(#softShadow)">
            {renderGroundShadow()}
            <path d="M85 130 Q80 130 75 140 L70 175 Q70 180 80 180 L120 180 Q130 180 130 175 L125 140 Q120 130 115 130 Z" fill="url(#hoodieGrad)" />
            <path d="M85 130 Q90 126 100 128 Q110 126 115 130" fill="#7B8290" opacity="0.4" />
            <path d="M88 135 Q95 132 100 134" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="3" strokeLinecap="round" />
            {/* Arms */}
            <g>
              <path d="M75 140 Q55 120 50 105" fill="none" stroke="url(#hoodieSleeve)" strokeWidth="14" strokeLinecap="round" />
              <circle cx="50" cy="103" r="7" fill="url(#skinGradArm)" />
            </g>
            <g>
              <path d="M125 140 Q145 120 150 105" fill="none" stroke="url(#hoodieSleeve)" strokeWidth="14" strokeLinecap="round" />
              <circle cx="150" cy="103" r="7" fill="url(#skinGradArm)" />
            </g>
            <path d="M80 178 L72 210 Q72 215 79 215 L89 215 Q92 215 92 210 L95 190 L98 210 Q98 215 101 215 L111 215 Q118 215 118 210 L128 178 Z" fill="url(#pantsGrad)" />
            <rect x="72" y="208" width="20" height="5" rx="2" fill="#4A453F" />
            <rect x="98" y="208" width="20" height="5" rx="2" fill="#4A453F" />
            <g>
              <ellipse cx="81" cy="218" rx="14" ry="6" fill="url(#shoeGrad)" />
              <line x1="75" y1="216" x2="75" y2="220" stroke="#3B82F6" strokeWidth="1.2" />
              <line x1="78" y1="215" x2="78" y2="221" stroke="#3B82F6" strokeWidth="1.2" />
              <line x1="81" y1="215" x2="81" y2="221" stroke="#3B82F6" strokeWidth="1.2" />
              <ellipse cx="119" cy="218" rx="14" ry="6" fill="url(#shoeGrad)" />
              <line x1="116" y1="215" x2="116" y2="221" stroke="#3B82F6" strokeWidth="1.2" />
              <line x1="119" y1="215" x2="119" y2="221" stroke="#3B82F6" strokeWidth="1.2" />
              <line x1="122" y1="216" x2="122" y2="220" stroke="#3B82F6" strokeWidth="1.2" />
            </g>
            {/* Sparkles */}
            <motion.text x="42" y="95" fontSize="12" fill="#FCD34D" animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }} transition={{ duration: 1.5, repeat: Infinity }}>&#10022;</motion.text>
            <motion.text x="155" y="95" fontSize="12" fill="#FCD34D" animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.7 }}>&#10022;</motion.text>
            <motion.text x="98" y="125" fontSize="8" fill="#FCD34D" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}>&#10022;</motion.text>
          </g>
        );
      case 'skating':
        return (
          <g filter="url(#softShadow)">
            {renderGroundShadow()}
            <path d="M85 130 Q80 130 75 140 L70 175 Q70 180 80 180 L120 180 Q130 180 130 175 L125 140 Q120 130 115 130 Z" fill="url(#hoodieGrad)" />
            <path d="M85 130 Q90 126 100 128 Q110 126 115 130" fill="#7B8290" opacity="0.4" />
            <path d="M75 140 Q52 138 45 142" fill="none" stroke="url(#hoodieSleeve)" strokeWidth="14" strokeLinecap="round" />
            <circle cx="44" cy="144" r="7" fill="url(#skinGradArm)" />
            <path d="M125 140 Q148 138 155 142" fill="none" stroke="url(#hoodieSleeve)" strokeWidth="14" strokeLinecap="round" />
            <circle cx="156" cy="144" r="7" fill="url(#skinGradArm)" />
            <path d="M80 178 L75 210 Q75 215 82 215 L92 215 Q95 215 95 210 L98 190 L101 210 Q101 215 104 215 L114 215 Q121 215 121 210 L125 178 Z" fill="url(#pantsGrad)" />
            <rect x="75" y="208" width="20" height="5" rx="2" fill="#4A453F" />
            <rect x="101" y="208" width="20" height="5" rx="2" fill="#4A453F" />
            {/* Roller skates */}
            <g>
              <rect x="68" y="215" width="24" height="7" rx="3" fill="#1E40AF" />
              <motion.circle cx="72" cy="225" r="3.5" fill="#60A5FA" stroke="#3B82F6" strokeWidth="1" animate={{ rotate: 360 }} transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }} />
              <motion.circle cx="80" cy="225" r="3.5" fill="#60A5FA" stroke="#3B82F6" strokeWidth="1" animate={{ rotate: 360 }} transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }} />
              <motion.circle cx="88" cy="225" r="3.5" fill="#60A5FA" stroke="#3B82F6" strokeWidth="1" animate={{ rotate: 360 }} transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }} />
            </g>
            <g>
              <rect x="97" y="215" width="24" height="7" rx="3" fill="#1E40AF" />
              <motion.circle cx="101" cy="225" r="3.5" fill="#60A5FA" stroke="#3B82F6" strokeWidth="1" animate={{ rotate: 360 }} transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }} />
              <motion.circle cx="109" cy="225" r="3.5" fill="#60A5FA" stroke="#3B82F6" strokeWidth="1" animate={{ rotate: 360 }} transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }} />
              <motion.circle cx="117" cy="225" r="3.5" fill="#60A5FA" stroke="#3B82F6" strokeWidth="1" animate={{ rotate: 360 }} transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }} />
            </g>
            {/* Speed lines */}
            <motion.g animate={{ opacity: [0.2, 0.8, 0.2] }} transition={{ duration: 0.6, repeat: Infinity }}>
              <line x1="38" y1="155" x2="25" y2="155" stroke="#93C5FD" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="40" y1="165" x2="22" y2="165" stroke="#93C5FD" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="38" y1="175" x2="28" y2="175" stroke="#93C5FD" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="42" y1="185" x2="30" y2="185" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" />
            </motion.g>
          </g>
        );
      case 'acting':
        return (
          <g filter="url(#softShadow)">
            {renderGroundShadow()}
            <path d="M85 130 Q80 130 75 140 L70 175 Q70 180 80 180 L120 180 Q130 180 130 175 L125 140 Q120 130 115 130 Z" fill="url(#blazerGrad)" />
            <path d="M90 130 L95 150 L100 130" fill="#0F172A" />
            <path d="M110 130 L105 150 L100 130" fill="#0F172A" />
            <polygon points="95,133 100,136 105,133 105,138 100,135 95,138" fill="#DC2626" />
            {/* Cape */}
            <motion.path
              d="M80 132 Q60 160 65 190 L75 180 Q70 155 82 135 Z"
              fill="#DC2626"
              animate={{ d: ["M80 132 Q60 160 65 190 L75 180 Q70 155 82 135 Z", "M80 132 Q55 158 60 192 L75 180 Q68 153 82 135 Z", "M80 132 Q60 160 65 190 L75 180 Q70 155 82 135 Z"] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <path d="M75 140 Q55 130 48 120" fill="none" stroke="url(#blazerGrad)" strokeWidth="14" strokeLinecap="round" />
            <circle cx="47" cy="118" r="7" fill="url(#skinGradArm)" />
            <path d="M125 140 Q140 135 148 125" fill="none" stroke="url(#blazerGrad)" strokeWidth="14" strokeLinecap="round" />
            <circle cx="149" cy="123" r="7" fill="url(#skinGradArm)" />
            <path d="M80 178 L78 210 Q78 215 85 215 L95 215 Q98 215 98 210 L100 190 L102 210 Q102 215 105 215 L115 215 Q122 215 122 210 L120 178 Z" fill="#0F172A" />
            {renderShoes()}
            {/* Spotlight */}
            <motion.ellipse
              cx="100" cy="220" rx="55" ry="8" fill="#FCD34D" opacity="0.15"
              animate={{ rx: [55, 60, 55], opacity: [0.1, 0.25, 0.1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </g>
        );
      case 'explorer':
      default:
        return (
          <g filter="url(#softShadow)">
            {renderGroundShadow()}
            <path d="M85 130 Q80 130 75 140 L70 175 Q70 180 80 180 L120 180 Q130 180 130 175 L125 140 Q120 130 115 130 Z" fill="url(#hoodieGrad)" />
            <path d="M85 130 Q90 126 100 128 Q110 126 115 130" fill="#7B8290" opacity="0.4" />
            <rect x="85" y="158" width="30" height="12" rx="4" fill="#7B8290" opacity="0.4" />
            <path d="M88 135 Q95 132 100 134" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="3" strokeLinecap="round" />
            <path d="M75 140 Q68 152 80 158" fill="none" stroke="url(#hoodieSleeve)" strokeWidth="14" strokeLinecap="round" />
            <circle cx="82" cy="158" r="7" fill="url(#skinGradArm)" />
            <path d="M125 140 Q132 152 120 158" fill="none" stroke="url(#hoodieSleeve)" strokeWidth="14" strokeLinecap="round" />
            <circle cx="118" cy="158" r="7" fill="url(#skinGradArm)" />
            <path d="M80 178 L78 210 Q78 215 85 215 L95 215 Q98 215 98 210 L100 190 L102 210 Q102 215 105 215 L115 215 Q122 215 122 210 L120 178 Z" fill="url(#pantsGrad)" />
            <rect x="78" y="208" width="20" height="5" rx="2" fill="#4A453F" />
            <rect x="102" y="208" width="20" height="5" rx="2" fill="#4A453F" />
            {renderShoes()}
          </g>
        );
    }
  };

  const renderHead = () => {
    const mouthOpen = pose === 'singing';
    const isHappy = ['dancing', 'waving', 'skating'].includes(pose);

    return (
      <g filter="url(#headShadow)">
        {/* Neck */}
        <rect x="94" y="120" width="12" height="14" rx="3" fill="url(#skinGrad)" />
        <rect x="94" y="120" width="12" height="4" rx="2" fill="#A0652F" opacity="0.15" />

        {/* Head - sharp angular anime face */}
        <path d="M68 90 Q68 62 100 58 Q132 62 132 90 L128 105 Q120 122 100 124 Q80 122 72 105 Z" fill="url(#skinGrad)" />
        {/* Face highlight */}
        <path d="M75 78 Q100 68 125 78 L122 88 Q100 82 78 88 Z" fill="rgba(255,255,255,0.06)" />
        {/* Sharp jawline shadow */}
        <path d="M72 105 Q80 118 100 120 Q120 118 128 105 L126 108 Q118 120 100 122 Q82 120 74 108 Z" fill="#A0652F" opacity="0.1" />

        {/* Ears - smaller, anime style */}
        <path d="M67 86 Q64 90 65 96 Q66 100 69 98 Q68 94 68 90 Z" fill="url(#skinGrad)" />
        <path d="M66 91 Q67 89 68 91" fill="none" stroke="#B87A3D" strokeWidth="0.6" opacity="0.3" />
        <path d="M133 86 Q136 90 135 96 Q134 100 131 98 Q132 94 132 90 Z" fill="url(#skinGrad)" />
        <path d="M132 91 Q133 89 134 91" fill="none" stroke="#B87A3D" strokeWidth="0.6" opacity="0.3" />

        {/* === Cool swept-back anime hair === */}
        <g>
          {/* Base hair volume */}
          <path d="M64 88 Q64 52 100 44 Q136 52 136 88 Q134 68 118 60 Q100 54 82 60 Q66 68 64 88" fill="url(#hairGrad)" />

          {/* Swept-back top - flowing to the right */}
          <path d="M68 65 Q75 42 100 38 Q125 40 140 55 L136 62 Q120 48 100 44 Q80 48 72 62 Z" fill="url(#hairGrad)" />

          {/* Cool swooping front bang - swept to one side */}
          <path d="M68 72 Q65 50 78 38 Q85 32 95 34 L88 48 Q78 52 72 68 Z" fill="url(#hairGrad)" />
          <path d="M72 68 Q70 48 82 36 Q88 30 96 32 L90 44 Q82 48 76 64 Z" fill="#0F0F1E" />

          {/* Side volume - left */}
          <path d="M62 80 Q58 68 62 56 Q64 50 70 46 L66 60 Q62 70 63 78 Z" fill="url(#hairGrad)" />
          {/* Side volume - right */}
          <path d="M138 80 Q142 68 138 56 Q136 50 130 46 L134 60 Q138 70 137 78 Z" fill="url(#hairGrad)" />

          {/* Flowing back spikes - dynamic windswept look */}
          <path d="M120 52 L138 38 Q132 48 142 42 L136 56" fill="url(#hairGrad)" />
          <path d="M126 48 L146 34 Q138 44 148 38 L138 52" fill="url(#hairGrad)" />
          <path d="M110 48 L128 32 Q122 42 132 36 L124 50" fill="url(#hairGrad)" />

          {/* Front fringe detail - sharp and stylish */}
          <path d="M76 62 Q72 48 80 40 L82 52 Z" fill="#0F0F1E" />
          <path d="M82 58 Q80 44 88 38 L88 50 Z" fill="url(#hairGrad)" />

          {/* Sideburns - clean and sharp */}
          <path d="M64 82 Q60 76 62 70 L65 74 Q63 78 64 82 Z" fill="url(#hairGrad)" />
          <path d="M136 82 Q140 76 138 70 L135 74 Q137 78 136 82 Z" fill="url(#hairGrad)" />

          {/* Highlights - glossy anime sheen */}
          <path d="M78 42 Q88 34 98 38" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="3" strokeLinecap="round" />
          <path d="M102 36 Q112 32 124 38" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M70 54 Q76 48 84 50" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="2" strokeLinecap="round" />
          {/* Blue-ish highlight streak */}
          <path d="M86 40 Q92 34 96 38" fill="none" stroke="#334155" strokeWidth="2" strokeLinecap="round" opacity="0.3" />
        </g>

        {/* Eyebrows - sharp angular anime style */}
        <path d="M77 81 L87 77 L93 80" fill="none" stroke="#0F0F1E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M107 80 L113 77 L123 81" fill="none" stroke="#0F0F1E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

        {/* Sunglasses - always on, anime style */}
        {renderSunglasses()}

        {/* Cheeks - subtle */}
        <ellipse cx="78" cy="102" rx="6" ry="4" fill="url(#cheekGlow)" />
        <ellipse cx="122" cy="102" rx="6" ry="4" fill="url(#cheekGlow)" />

        {/* Nose - sharp anime style, minimal */}
        <path d="M99 94 L100 100 L101 98" fill="none" stroke="#A0652F" strokeWidth="1.2" opacity="0.4" strokeLinecap="round" strokeLinejoin="round" />
        <ellipse cx="100" cy="100" rx="1" ry="0.6" fill="rgba(255,255,255,0.12)" />

        {/* Mouth */}
        {mouthOpen ? (
          <g>
            <path d="M92 106 Q100 114 108 106" fill="url(#lipGrad)" />
            <path d="M94 106 Q100 108 106 106" fill="white" opacity="0.8" />
            <path d="M95 110 Q100 113 105 110" fill="#991B1B" />
          </g>
        ) : isHappy ? (
          <g>
            {/* Confident smirk - anime style */}
            <path d="M90 106 Q100 114 112 105" fill="none" stroke="url(#lipGrad)" strokeWidth="2.5" strokeLinecap="round" />
            {/* Tooth flash */}
            <path d="M96 107 Q100 109 104 107" fill="white" opacity="0.5" />
          </g>
        ) : (
          <path d="M92 107 Q100 112 108 107" fill="none" stroke="url(#lipGrad)" strokeWidth="2.2" strokeLinecap="round" />
        )}

        {/* Sharp chin line */}
        <path d="M88 118 Q100 126 112 118" fill="none" stroke="#A0652F" strokeWidth="0.6" opacity="0.12" />

        {/* Skating helmet overlay */}
        {pose === 'skating' && (
          <g>
            <path d="M66 82 Q66 46 100 40 Q134 46 134 82" fill="#3B82F6" opacity="0.9" />
            <path d="M66 82 Q100 88 134 82" fill="none" stroke="#2563EB" strokeWidth="3" />
            <line x1="85" y1="52" x2="85" y2="68" stroke="#2563EB" strokeWidth="1.5" opacity="0.5" />
            <line x1="100" y1="48" x2="100" y2="68" stroke="#2563EB" strokeWidth="1.5" opacity="0.5" />
            <line x1="115" y1="52" x2="115" y2="68" stroke="#2563EB" strokeWidth="1.5" opacity="0.5" />
            <path d="M78 54 Q95 46 112 54" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        )}
      </g>
    );
  };

  return (
    <motion.svg
      viewBox="20 30 160 205"
      width={size}
      height={size}
      className={className}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, type: 'spring' }}
    >
      {defs}
      {renderBody()}
      {renderHead()}
    </motion.svg>
  );
}
