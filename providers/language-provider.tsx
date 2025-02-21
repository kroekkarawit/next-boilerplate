'use client';

import { ReactNode, useEffect } from 'react';
import '../i18n';
import { useTranslation } from 'react-i18next';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation();

  useEffect(() => {
    // You can handle language changes here
    const handleLanguageChange = () => {
      document.documentElement.lang = i18n.language;
    };

    handleLanguageChange();
    i18n.on('languageChanged', handleLanguageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [i18n]);

  return <>{children}</>;
}