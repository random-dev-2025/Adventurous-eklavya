'use client';

import { useEffect } from 'react';

const AWAY_TITLE = '👋 Come back, explorer!';
const BACK_TITLE = '🎉 Yay, you came back!';
const SLEEPY_ICON = '/favicon-sleepy.svg';

// When the visitor switches tabs, the tab title calls them back and the favicon falls asleep
export default function TabFun() {
  useEffect(() => {
    const originalTitle = document.title;
    const iconLink = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    const originalIcon = iconLink?.href;
    let backTimer: ReturnType<typeof setTimeout> | undefined;

    const onVisibility = () => {
      clearTimeout(backTimer);
      if (document.hidden) {
        document.title = AWAY_TITLE;
        if (iconLink) iconLink.href = SLEEPY_ICON;
      } else {
        document.title = BACK_TITLE;
        if (iconLink && originalIcon) iconLink.href = originalIcon;
        backTimer = setTimeout(() => (document.title = originalTitle), 2000);
      }
    };

    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      clearTimeout(backTimer);
      document.title = originalTitle;
      if (iconLink && originalIcon) iconLink.href = originalIcon;
    };
  }, []);

  return null;
}
