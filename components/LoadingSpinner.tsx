
import React from 'react';

export const LoadingSpinner: React.FC = () => {
  const messages = [
    "Analyzing video content...",
    "Processing transcript data...",
    "Generating key insights...",
    "Finalizing the report...",
  ];
  const [message, setMessage] = React.useState(messages[0]);

  React.useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      index = (index + 1) % messages.length;
      setMessage(messages[index]);
    }, 2500);

    return () => clearInterval(intervalId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 bg-slate-800/50 border border-slate-700 rounded-xl">
      <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-slate-300 font-medium text-lg">{message}</p>
      <p className="text-slate-400 text-sm">This may take a moment.</p>
    </div>
  );
};
