
import React from 'react';
import GuestForm from './components/GuestForm';
import { DataProvider } from './context/DataContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { languages } from './utils/translations';

const AppContent = () => {
  const { language, setLanguage, t } = useLanguage();
  const currentLangName = languages.find(l => l.code === language)?.name || 'English (United States)';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#f0f2f5]">
      <GuestForm />
      <div className="mt-6 flex justify-between w-full max-w-[448px] px-0 text-xs text-[#1f1f1f]">
         <div className="relative inline-block text-left -ml-2">
            <div className="group cursor-pointer hover:bg-gray-200 p-2 rounded flex items-center">
               <span>{currentLangName}</span>
               <span className="ml-4 border-t-4 border-t-[#1f1f1f] border-x-4 border-x-transparent h-0 w-0"></span>
            </div>
            <select 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer appearance-none"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
               {languages.map((lang) => (
                 <option key={lang.code} value={lang.code}>
                   {lang.name}
                 </option>
               ))}
            </select>
         </div>
         <div className="flex gap-0">
           <span className="cursor-pointer hover:bg-gray-200 p-2 rounded">{t('help')}</span>
           <span className="cursor-pointer hover:bg-gray-200 p-2 rounded">{t('privacy')}</span>
           <span className="cursor-pointer hover:bg-gray-200 p-2 rounded">{t('terms')}</span>
         </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <DataProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </DataProvider>
  );
}

export default App;
