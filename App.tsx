import React, { useState, useCallback, useEffect } from 'react';
import { AppStep, WeddingStyle, WeddingScene, UploadedImage } from './types';
import { WEDDING_STYLES } from './constants';
import { generateWeddingPhoto } from './services/geminiService';
import ImageUploader from './components/ImageUploader';
import StyleSelector from './components/StyleSelector';
import GenerationView from './components/GenerationView';
import ResultView from './components/ResultView';
import { CameraIcon } from './components/icons';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.Upload);
  const [animationClass, setAnimationClass] = useState('animate-fadeIn');
  const [brideImage, setBrideImage] = useState<UploadedImage | null>(null);
  const [groomImage, setGroomImage] = useState<UploadedImage | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<WeddingStyle | null>(null);
  const [selectedScene, setSelectedScene] = useState<WeddingScene | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const changeStep = (newStep: AppStep) => {
    setAnimationClass('animate-fadeOut');
    setTimeout(() => {
      setStep(newStep);
      setAnimationClass('animate-fadeIn');
    }, 500); // Match animation duration
  };

  const handleStartOver = () => {
    setSelectedStyle(null);
    setSelectedScene(null);
    setGeneratedImage(null);
    setIsLoading(false);
    setError(null);
    changeStep(AppStep.StyleSelection);
  };

  const handleFullReset = () => {
    setBrideImage(null);
    setGroomImage(null);
    setSelectedStyle(null);
    setSelectedScene(null);
    setGeneratedImage(null);
    setIsLoading(false);
    setError(null);
    changeStep(AppStep.Upload);
  };
  
  const handleStyleSelect = (style: WeddingStyle) => {
    setSelectedStyle(style);
    if (style.scenes.length > 0) {
        setSelectedScene(style.scenes[0]);
    } else {
        setSelectedScene(null);
    }
  };

  const handleGeneration = useCallback(async () => {
    if (!brideImage || !groomImage || !selectedStyle || !selectedScene) {
      setError("Please provide both portraits and select your desired style and scene.");
      return;
    }

    setIsLoading(true);
    setError(null);
    changeStep(AppStep.Generating);

    try {
      const result = await generateWeddingPhoto(
          brideImage.base64, 
          brideImage.mimeType, 
          groomImage.base64,
          groomImage.mimeType,
          selectedStyle, 
          selectedScene
      );
      if (result) {
        setGeneratedImage(result);
        changeStep(AppStep.Result);
      } else {
        throw new Error("The portrait could not be generated. Please try a different style or photo.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
      changeStep(AppStep.StyleSelection); 
    } finally {
      setIsLoading(false);
    }
  }, [brideImage, groomImage, selectedStyle, selectedScene]);

  const renderStep = () => {
    switch (step) {
      case AppStep.Upload:
        return (
          <>
            <h2 className="text-3xl font-semibold text-center text-stone-100 mb-2">Step 1: Provide the Portraits</h2>
            <p className="text-center text-stone-400 mb-8">Please provide a clear, well-lit portrait of each individual.</p>
            <div className="grid md:grid-cols-2 gap-8">
              <ImageUploader title="Portrait of the Bride" onImageUpload={setBrideImage} />
              <ImageUploader title="Portrait of the Groom" onImageUpload={setGroomImage} />
            </div>
            <div className="text-center mt-10">
              <button
                onClick={() => changeStep(AppStep.StyleSelection)}
                disabled={!brideImage || !groomImage}
                style={{ backgroundColor: 'var(--color-accent)' }}
                className="text-gray-900 font-bold py-3 px-12 rounded-full shadow-lg hover:opacity-90 disabled:bg-stone-500 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
              >
                Define Art Direction
              </button>
            </div>
          </>
        );
      case AppStep.StyleSelection:
        return (
          <StyleSelector
            styles={WEDDING_STYLES}
            selectedStyle={selectedStyle}
            onStyleSelect={handleStyleSelect}
            selectedScene={selectedScene}
            onSceneSelect={setSelectedScene}
            onGenerate={handleGeneration}
            onBack={handleFullReset}
            isGenerationDisabled={!selectedStyle || !selectedScene || isLoading}
            error={error}
          />
        );
      case AppStep.Generating:
        return <GenerationView />;
      case AppStep.Result:
        return <ResultView generatedImage={generatedImage} onStartOver={handleStartOver} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 flex flex-col items-center justify-center">
      <header className="text-center mb-8 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
        <div className="inline-flex items-center gap-4">
          <CameraIcon className="w-8 h-8 text-[var(--color-accent)]" />
          <h1 className="text-4xl sm:text-5xl font-bold text-stone-100 tracking-tight">Your Wedding Portrait Studio</h1>
        </div>
        <p 
          className="text-lg sm:text-2xl text-stone-400 mt-1 tracking-wider" 
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          By William Lai
        </p>
        <p className="text-stone-300 mt-2 text-lg">AI-Powered Wedding Portraits</p>
      </header>
      <main className={`w-full max-w-5xl mx-auto bg-[var(--color-surface)] rounded-2xl shadow-2xl p-8 sm:p-12 transition-all duration-500 border border-[var(--color-border)] ${animationClass}`}>
        {renderStep()}
      </main>
    </div>
  );
};

export default App;