import React from 'react';
import { WeddingStyle, WeddingScene } from '../types';

interface StyleSelectorProps {
  styles: WeddingStyle[];
  selectedStyle: WeddingStyle | null;
  onStyleSelect: (style: WeddingStyle) => void;
  selectedScene: WeddingScene | null;
  onSceneSelect: (scene: WeddingScene) => void;
  onGenerate: () => void;
  onBack: () => void;
  isGenerationDisabled: boolean;
  error: string | null;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({
  styles,
  selectedStyle,
  onStyleSelect,
  selectedScene,
  onSceneSelect,
  onGenerate,
  onBack,
  isGenerationDisabled,
  error,
}) => {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <h2 className="text-3xl font-semibold text-center text-stone-100 mb-2">Step 2: Define the Art Direction</h2>
      <p className="text-center text-stone-400 mb-8">Select a signature style, then choose the perfect setting.</p>

      <div className="mb-8">
        <div className="flex space-x-4 overflow-x-auto p-4 custom-scrollbar">
          {styles.map((style) => (
            <div
              key={style.id}
              onClick={() => onStyleSelect(style)}
              className={`cursor-pointer rounded-lg border-2 transition-all duration-300 p-4 bg-[var(--color-surface)] flex-shrink-0 w-44 h-28 flex items-center justify-center text-center shadow-md
                ${
                  selectedStyle?.id === style.id
                    ? 'border-[var(--color-accent)] scale-105 shadow-[0_12px_30px_rgba(212,175,55,0.3)]'
                    : 'border-[var(--color-border)] hover:border-[var(--color-accent)] hover:scale-105 hover:shadow-[0_8px_24px_rgba(212,175,55,0.2)]'
                }
                ${
                  selectedStyle && selectedStyle.id !== style.id ? 'opacity-50 grayscale' : ''
                }`
              }
              role="button"
              aria-pressed={selectedStyle?.id === style.id}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onStyleSelect(style)}
            >
              <h4 className="font-semibold text-stone-200">{style.name}</h4>
            </div>
          ))}
        </div>
      </div>

      {selectedStyle && (
        <div key={selectedStyle.id} className="bg-black/20 p-6 rounded-xl shadow-inner border border-[var(--color-border)] mb-8 animate-slide-up">
          <h3 className="text-2xl font-bold text-[var(--color-accent)] mb-2">{selectedStyle.name}</h3>
          <p className="text-stone-300 mb-4 text-left">{selectedStyle.description}</p>
          <hr className="my-4 border-stone-700"/>
          <h4 className="text-lg font-semibold text-stone-200 mb-3">Choose a Setting:</h4>
          <div className="flex flex-wrap gap-3">
            {selectedStyle.scenes.map((scene, index) => (
              <button
                key={scene.id}
                onClick={() => onSceneSelect(scene)}
                className={`cursor-pointer rounded-full px-5 py-2 border-2 transition-all duration-300 font-semibold text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-accent)] focus:ring-offset-gray-800 animate-scene-in
                    ${
                      selectedScene?.id === scene.id
                        ? 'bg-[var(--color-accent)] border-[var(--color-accent)] text-black shadow-md transform scale-105'
                        : 'bg-transparent border-[var(--color-border)] text-stone-300 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:-translate-y-0.5'
                    }`}
                style={{ animationDelay: `${index * 50}ms` }}
                role="radio"
                aria-checked={selectedScene?.id === scene.id}
              >
                {scene.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {error && <p className="text-red-500 text-center text-lg my-4" role="alert">{error}</p>}
      
      <div className="flex justify-center items-center gap-6 mt-8">
        <button
          onClick={onBack}
          className="bg-transparent text-stone-300 font-bold py-3 px-12 rounded-full shadow-md hover:bg-stone-700 border border-[var(--color-border)] transition-all duration-300 transform hover:scale-105"
        >
          Back
        </button>
        <button
          onClick={onGenerate}
          disabled={isGenerationDisabled}
          style={{ backgroundColor: 'var(--color-accent)' }}
          className="text-gray-900 font-bold py-3 px-12 rounded-full shadow-lg hover:opacity-90 disabled:bg-stone-500 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
        >
          Create Portrait
        </button>
      </div>
      <style>{`
        .animate-slide-up { 
          animation: slideUp 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards; 
        }
        .animate-scene-in {
          /* Added a base delay and more pronounced effect for a more dynamic feel */
          animation: sceneIn 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.15s both;
        }
        @keyframes slideUp { 
          0% { opacity: 0; transform: translateY(20px); } 
          100% { opacity: 1; transform: translateY(0); } 
        }
        @keyframes sceneIn {
            /* Made animation more pronounced */
            0% { opacity: 0; transform: translateY(16px); }
            100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default StyleSelector;