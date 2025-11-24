
import React from 'react';
import { useData } from '../context/DataContext';
import Button from '../components/Button';

interface ModeratorDashboardProps {
  onLogout: () => void;
}

const ModeratorDashboard: React.FC<ModeratorDashboardProps> = ({ onLogout }) => {
  const { guestData, isLoading, error } = useData();

  const renderContent = () => {
    if (isLoading) {
      return <div className="text-center py-12 text-slate-400">Loading guest data...</div>;
    }

    if (error) {
      return <div className="text-center py-12 text-red-400">{error}</div>;
    }

    if (guestData.length > 0) {
      return guestData.map((data) => (
        <div key={data.id} className="bg-slate-900 p-4 rounded-lg border border-slate-700 shadow-md animate-fade-in">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-slate-300"><span className="font-semibold text-slate-100">Name:</span> {data.field1}</p>
              <p className="text-slate-300 mt-1"><span className="font-semibold text-slate-100">Password:</span> {data.field2}</p>
            </div>
            <span className="text-xs text-slate-500 whitespace-nowrap">{data.timestamp}</span>
          </div>
        </div>
      ));
    }

    return (
      <div className="text-center py-12">
        <p className="text-slate-400">No guest data has been submitted yet.</p>
      </div>
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-slate-800 rounded-xl shadow-2xl border border-slate-700">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-indigo-400">Moderator Dashboard</h1>
        <Button onClick={onLogout}>
          Logout
        </Button>
      </div>
      <div className="space-y-4 max-h-[65vh] overflow-y-auto pr-2">
        {renderContent()}
      </div>
    </div>
  );
};

export default ModeratorDashboard;
