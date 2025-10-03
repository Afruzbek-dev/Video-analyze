
import React from 'react';
import { SearchIcon } from './IconComponents';

interface UrlInputFormProps {
  videoUrl: string;
  setVideoUrl: (url: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

export const UrlInputForm: React.FC<UrlInputFormProps> = ({ videoUrl, setVideoUrl, onAnalyze, isLoading }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze();
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col sm:flex-row items-center gap-3 bg-slate-800/50 p-3 rounded-xl border border-slate-700 shadow-lg">
        <div className="relative w-full">
          <input
            type="url"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
            disabled={isLoading}
            className="w-full pl-4 pr-4 py-3 bg-slate-800 text-slate-200 rounded-lg border-2 border-slate-600 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition duration-300 ease-in-out disabled:opacity-50"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-sky-600 text-white font-semibold rounded-lg shadow-md hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-sky-500 transition duration-300 ease-in-out disabled:bg-slate-600 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Analyzing...
            </>
          ) : (
            <>
              <SearchIcon className="w-5 h-5" />
              Analyze
            </>
          )}
        </button>
      </div>
    </form>
  );
};
