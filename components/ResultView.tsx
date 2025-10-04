import React from 'react';

interface ResultViewProps {
  generatedImage: string | null;
  onStartOver: () => void;
}

const ResultView: React.FC<ResultViewProps> = ({ generatedImage, onStartOver }) => {

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = `data:image/png;base64,${generatedImage}`;
      link.download = 'wedding_portrait.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto text-center">
      <h2 className="text-3xl font-semibold text-stone-100 mb-4">Your Portrait is Ready</h2>
      {generatedImage ? (
        <div className="mb-8 p-4 bg-black/30 rounded-xl shadow-2xl border border-[var(--color-border)] inline-block">
          <img src={`data:image/png;base64,${generatedImage}`} alt="Generated wedding photo" className="w-full rounded-md" />
        </div>
      ) : (
        <p className="text-red-500 mb-8" role="alert">Apologies, the portrait could not be generated. Please try again.</p>
      )}
      <div className="flex justify-center items-center gap-6">
        <button
          onClick={onStartOver}
          className="bg-transparent text-stone-300 font-bold py-3 px-12 rounded-full shadow-md hover:bg-stone-700 border border-[var(--color-border)] transition-all duration-300 transform hover:scale-105"
        >
          Create Another
        </button>
        {generatedImage && (
            <button
                onClick={handleDownload}
                style={{ backgroundColor: 'var(--color-accent)' }}
                className="text-gray-900 font-bold py-3 px-12 rounded-full shadow-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105"
            >
                Download Portrait
            </button>
        )}
      </div>
    </div>
  );
};

export default ResultView;