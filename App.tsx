
import React from 'react';
import GuestForm from './components/GuestForm';
import { DataProvider } from './context/DataContext';
import FancyText from './components/FancyText';

function App() {
  return (
    <DataProvider>
      <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-4 font-sans">
        <div className="w-full max-w-md mx-auto text-center mb-8">
            <div className="mb-6">
              <FancyText className="text-7xl md:text-8xl">Canva</FancyText>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-200">
                Log in with your Canva Account for 3 days <FancyText className="text-4xl md:text-5xl align-middle">Canva+</FancyText> Free Trial!
            </h1>
        </div>
        <GuestForm />
      </div>
    </DataProvider>
  );
}

export default App;