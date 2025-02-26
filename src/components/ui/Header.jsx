import React from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n';
import { SearchBar } from './SearchBar';
import { NotificationsMenu } from './NotificationsMenu';
import { UserMenu } from './UserMenu';
import { ThemeToggle } from './ThemeToggle';

export function Header({ onMenuClick, onNavigate }) {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-30 border-b border-gray-100 dark:border-gray-900 bg-white dark:bg-gray-900">
      <div className="max-w-[1440px] mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-primary">{t('header.title')}</span>
          </div>
          <div className="hidden sm:block">
            <SearchBar placeholder={t('header.searchPlaceholder')} />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <NotificationsMenu />
          <ThemeToggle />
          <UserMenu onNavigate={onNavigate} />
          <select
            value={i18n.language}
            onChange={(e) => i18n.changeLanguage(e.target.value)}
            className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          >
            <option value="es">🇪🇸 Español</option>
            <option value="en">🇬🇧 English</option>
          </select>
        </div>
      </div>
    </header>
  );
}