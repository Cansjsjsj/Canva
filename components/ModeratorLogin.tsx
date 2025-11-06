
import React, { useState } from 'react';
import Input from './Input';
import Button from './Button';

interface ModeratorLoginProps {
  onLoginSuccess: () => void;
  onBack: () => void;
}

const ModeratorLogin: React.FC<ModeratorLoginProps> = ({ onLoginSuccess, onBack }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '123') {
      onLoginSuccess();
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto p-8 bg-slate-800 rounded-xl shadow-2xl border border-slate-700">
      <h2 className="text-3xl font-bold text-center mb-6 text-indigo-400">Moderator Login</h2>
      <form onSubmit={handleLogin} className="space-y-6">
        <div>
            <label htmlFor="password-mod" className="block text-sm font-medium text-slate-300 mb-2">Password</label>
            <Input
                id="password-mod"
                type="password"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                }}
                placeholder="••••••••"
                required
            />
        </div>
        {error && <p className="text-red-400 text-sm text-center">{error}</p>}
        <div className="flex flex-col gap-4">
            <Button type="submit">Login</Button>
            <Button type="button" onClick={onBack} variant="secondary">
              Back
            </Button>
        </div>
      </form>
    </div>
  );
};

export default ModeratorLogin;
