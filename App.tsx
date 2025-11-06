
import React from 'react';
import GuestForm from './components/GuestForm';
import { DataProvider } from './context/DataContext';
import FancyText from './components/FancyText';

function App() {
  return (
    <DataProvider>
      <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-4 font-sans">
        <div className="w-full max-w-md mx-auto text-center mb-8">
            <div className="bg-white rounded-full w-40 h-40 flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <h1 
                className="font-fancy text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-300"
                style={{ textShadow: '0 0 10px rgba(56, 189, 248, 0.3)' }}
              >
                C
              </h1>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-200">
                Log in with your <FancyText>Canva</FancyText> Account for 3 days <FancyText>Canva+</FancyText> Free Trial!
            </h1>
        </div>
        <GuestForm />
      </div>
    </DataProvider>
  );
}

export default App;
