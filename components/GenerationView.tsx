import React from 'react';
import { ShutterIcon } from './icons';

const GenerationView: React.FC = () => {
  return (
    <div className="text-center" aria-live="polite" aria-busy="true">
        <div className="flex justify-center items-center mb-6">
            <ShutterIcon className="w-20 h-20 text-[var(--color-accent)] animate-spin-slow" />
        </div>
        <h2 className="text-3xl font-semibold text-stone-100 mb-2">Developing Your Portrait...</h2>
        <p className="text-stone-400">Our digital darkroom is at work. This may take a moment.</p>
        <div className="w-full max-w-md mx-auto bg-stone-700 rounded-full h-1.5 mt-8 overflow-hidden">
            <div 
                className="h-full rounded-full animate-progress"
                style={{
                    backgroundSize: '200% 100%',
                    backgroundImage: `linear-gradient(to right, transparent 0%, var(--color-accent) 50%, transparent 100%)`
                }}
            ></div>
        </div>
        <style>{`
            .animate-spin-slow {
                animation: spin 3s linear infinite;
            }
            .animate-progress {
                animation: progress-indeterminate 2.5s ease-in-out infinite;
            }
            @keyframes spin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            @keyframes progress-indeterminate {
                0% { background-position: 200% 0; }
                100% { background-position: -200% 0; }
            }
        `}</style>
    </div>
  );
};

export default GenerationView;