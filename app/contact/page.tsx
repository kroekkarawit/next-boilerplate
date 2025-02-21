"use client";

import React from "react";
import { Mail, MessageCircle, Facebook, Instagram } from "lucide-react";
import { useTranslation } from "react-i18next";
import "../../i18n"

const ContactPage = () => {
  const { t } = useTranslation();

  const socialLinks = [
    {
      platform: t('contact.social.email.platform'),
      handle: t('contact.social.email.handle'),
      icon: <Mail className="w-6 h-6" />,
      link: "mailto:director@star-keep.com",
      color: "hover:bg-blue-600/10 hover:text-blue-500",
    },
    {
      platform: t('contact.social.tiktok.platform'),
      handle: t('contact.social.tiktok.handle'),
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
        </svg>
      ),
      link: "https://tiktok.com/@starkeep.th",
      color: "hover:bg-pink-600/10 hover:text-pink-500",
    },
    {
      platform: t('contact.social.instagram.platform'),
      handle: t('contact.social.instagram.handle'),
      icon: <Instagram className="w-6 h-6" />,
      link: "https://instagram.com/starkeep.th",
      color: "hover:bg-purple-600/10 hover:text-purple-500",
    },
    {
      platform: t('contact.social.facebook.platform'),
      handle: t('contact.social.facebook.handle'),
      icon: <Facebook className="w-6 h-6" />,
      link: "https://facebook.com/star-keep",
      color: "hover:bg-blue-600/10 hover:text-blue-500",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Hero Section */}
      <div className="relative py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t('contact.hero.title')}
          </h1>
          <p className="text-xl text-gray-400">
            {t('contact.hero.description')}
          </p>
        </div>
      </div>

      {/* Contact Options */}
      <div className="max-w-4xl mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 gap-8">
          {/* Social Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                className={`group block p-6 rounded-lg bg-gray-900/50 border border-gray-800 hover:border-gray-700 transition-all duration-300 ${social.color}`}
                href={social.link}
                rel="noopener noreferrer"
                target="_blank"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-gray-800 group-hover:scale-110 transition-transform duration-300">
                    {social.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {social.platform}
                    </h3>
                    <p className="text-gray-400">{social.handle}</p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* FAQ Note */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 text-gray-400">
            <MessageCircle className="w-5 h-5" />
            <span>{t('contact.faq.note')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;