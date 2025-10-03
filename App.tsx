
import React, { useState, useCallback } from 'react';
import { UrlInputForm } from './components/UrlInputForm';
import { AnalysisDisplay } from './components/AnalysisDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { YouTubeIcon } from './components/IconComponents';
import { analyzeVideoUrl } from './services/geminiService';

const App: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = useCallback(async () => {
    if (!videoUrl) {
      setError('Please enter a YouTube video URL.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await analyzeVideoUrl(videoUrl);
      setAnalysisResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setAnalysisResult(null);
    } finally {
      setIsLoading(false);
    }
  }, [videoUrl]);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8 animate-fade-in-down">
          <div className="flex items-center justify-center gap-4 mb-2">
            <YouTubeIcon className="w-12 h-12 text-red-500" />
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Video Analysis Agent
            </h1>
          </div>
          <p className="text-lg text-slate-400">
            Enter a YouTube URL to generate a comprehensive AI-powered analysis.
          </p>
        </header>

        <main className="flex flex-col gap-8">
          <UrlInputForm
            videoUrl={videoUrl}
            setVideoUrl={setVideoUrl}
            onAnalyze={handleAnalyze}
            isLoading={isLoading}
          />
          
          {error && (
            <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          {isLoading && <LoadingSpinner />}
          
          {analysisResult && (
            <div className="animate-fade-in-up">
              <AnalysisDisplay analysisText={analysisResult} />
            </div>
          )}
        </main>
        
        <footer className="text-center mt-12 text-slate-500 text-sm">
            <p>Powered by Gemini. Analysis is AI-generated and may not be fully accurate.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
