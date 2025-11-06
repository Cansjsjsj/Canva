import React, { useState } from 'react';
import ModeratorLogin from '../components/ModeratorLogin';
import GuestForm from '../components/GuestForm';
import { ModeratorIcon } from '../components/icons/ModeratorIcon';
import { GuestIcon } from '../components/icons/GuestIcon';

interface LoginPageProps {
  onModeratorLogin: () => void;
}

const SelectionButton: React.FC<{ onClick: () => void; title: string; description: string; children: React.ReactNode; }> = ({ onClick, title, description, children }) => (
    <button
        onClick={onClick}
        className="bg-slate-800 border border-slate-700 rounded-lg p-6 w-full max-w-sm text-center hover:bg-slate-700 hover:border-indigo-500 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900"
    >
        <div className="flex flex-col items-center">
            {children}
            <h2 className="text-2xl font-bold mt-4 text-white">{title}</h2>
            <p className="text-slate-400 mt-2">{description}</p>
        </div>
    </button>
);


const LoginPage: React.FC<LoginPageProps> = ({ onModeratorLogin }) => {
  const [mode, setMode] = useState<'moderator' | 'guest' | null>(null);

  if (mode === 'moderator') {
    return <ModeratorLogin onLoginSuccess={onModeratorLogin} onBack={() => setMode(null)} />;
  }

  if (mode === 'guest') {
    return <GuestForm onBack={() => setMode(null)} />;
  }

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">Welcome</h1>
        <p className="text-slate-400 text-lg mb-12 text-center">Please select your role to continue.</p>
        <div className="flex flex-col md:flex-row gap-8 w-full justify-center">
            <SelectionButton
                onClick={() => setMode('moderator')}
                title="Sign in as Moderator"
                description="Access the dashboard to view guest submissions."
            >
                <ModeratorIcon />
            </SelectionButton>
            <SelectionButton
                onClick={() => setMode('guest')}
                title="Sign in as Guest"
                description="Submit information to the public system data."
            >
                <GuestIcon />
            </SelectionButton>
        </div>
    </div>
  );
};

export default LoginPage;
