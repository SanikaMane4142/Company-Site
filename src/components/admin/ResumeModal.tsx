import React from "react";

interface ResumeModalProps {
  resumeUrl: string;
  onClose: () => void;
}

const ResumeModal: React.FC<ResumeModalProps> = ({ resumeUrl, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">Resume Preview</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex-1 bg-gray-100 rounded-lg overflow-hidden min-h-[600px]">
          {resumeUrl.endsWith('.pdf') ? (
            <iframe 
              src={`${resumeUrl}#toolbar=0`} 
              className="w-full h-full border-none"
              title="Resume Preview"
            ></iframe>
          ) : (
             <div className="w-full h-full flex flex-col items-center justify-center p-10 text-center">
                <img src={resumeUrl} alt="Resume Preview" className="max-w-full max-h-full object-contain shadow-lg" />
                <p className="mt-4 text-sm text-gray-500 italic">Image Preview - Some browsers might not support inline PDF preview without proper extensions.</p>
             </div>
          )}
        </div>
        
        <div className="mt-6 flex justify-end gap-3">
          <a 
            href={resumeUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-6 py-2 bg-gray-100 text-gray-700 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
          >
            Download Original
          </a>
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-gray-900 text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;
