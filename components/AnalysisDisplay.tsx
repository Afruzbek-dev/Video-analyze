
import React, { useState, useMemo } from 'react';
import { CopyIcon, DownloadIcon, CheckIcon } from './IconComponents';

interface AnalysisDisplayProps {
  analysisText: string;
}

const formatTextToHtml = (text: string) => {
  const sections = text.split('---').filter(s => s.trim() !== '');
  if (sections.length === 0) return { __html: '' };

  let htmlContent = sections[0];

  htmlContent = htmlContent.replace(/## (.*)/g, '<h2 class="text-2xl font-bold text-sky-400 mb-4 mt-6">$1</h2>');
  htmlContent = htmlContent.replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-slate-100">$1</strong>');
  htmlContent = htmlContent.replace(/^- (.*)/gm, '<li class="flex items-start gap-3 mb-2"><svg class="w-4 h-4 mt-1.5 text-sky-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg><span>$1</span></li>');
  htmlContent = htmlContent.replace(/<\/li>\s*<li/g, '</li><li'); 
  htmlContent = htmlContent.replace(/((<li.*<\/li>\s*)+)/g, '<ul class="list-none pl-0 space-y-2">$1</ul>');

  return { __html: htmlContent };
};

export const AnalysisDisplay: React.FC<AnalysisDisplayProps> = ({ analysisText }) => {
  const [copied, setCopied] = useState(false);
  const formattedHtml = useMemo(() => formatTextToHtml(analysisText), [analysisText]);

  const handleCopy = () => {
    navigator.clipboard.writeText(analysisText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
                   "xmlns:w='urn:schemas-microsoft-com:office:word' "+
                   "xmlns='http://www.w3.org/TR/REC-html40'>"+
                   "<head><meta charset='utf-8'><title>Video Analysis</title></head><body>";
    const footer = "</body></html>";
    const sourceHTML = header + analysisText.replace(/\n/g, '<br/>').replace(/##/g, '<b>').replace(/\*/g, '') + footer;

    const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    const fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = 'video-analysis.doc';
    fileDownload.click();
    document.body.removeChild(fileDownload);
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl shadow-lg p-6 sm:p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-white">Analysis Result</h2>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-300 bg-slate-700/50 hover:bg-slate-700 rounded-md transition-colors"
          >
            {copied ? <CheckIcon className="w-4 h-4 text-green-400" /> : <CopyIcon className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-300 bg-slate-700/50 hover:bg-slate-700 rounded-md transition-colors"
          >
            <DownloadIcon className="w-4 h-4" />
            Download .doc
          </button>
        </div>
      </div>
      <div
        className="prose prose-invert prose-p:text-slate-300 prose-li:text-slate-300 max-w-none text-slate-300 leading-relaxed"
        dangerouslySetInnerHTML={formattedHtml}
      />
    </div>
  );
};
