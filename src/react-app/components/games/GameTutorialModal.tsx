import { useState } from 'react';
import { ArrowRight, ArrowLeft, X, Sparkles, Check } from 'lucide-react';

export interface TutorialStep {
  title: string;
  description: string;
  tip?: string;
  badge?: string;
}

interface GameTutorialModalProps {
  gameTitle: string;
  steps: TutorialStep[];
  isOpen: boolean;
  onComplete: () => void;
}

export default function GameTutorialModal({
  gameTitle,
  steps,
  isOpen,
  onComplete
}: GameTutorialModalProps) {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen || steps.length === 0) return null;

  const isLastStep = currentStep === steps.length - 1;
  const step = steps[currentStep];

  const handleNext = () => {
    if (isLastStep) {
      onComplete();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl border border-slate-200/90 shadow-xl max-w-md w-full overflow-hidden transition-all transform scale-100 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#133384]" />
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Panduan Bermain • {gameTitle}
            </h3>
          </div>
          
          <button
            onClick={onComplete}
            className="text-xs text-slate-400 hover:text-slate-700 font-medium px-2 py-1 rounded hover:bg-slate-100 transition-colors"
          >
            Lewati Tutorial
          </button>
        </div>

        {/* Step Progress Indicators */}
        <div className="px-5 pt-4">
          <div className="flex items-center gap-1.5">
            {steps.map((_, idx) => (
              <div 
                key={idx}
                className={`h-1 flex-1 rounded-full transition-all duration-200 ${
                  idx === currentStep 
                    ? 'bg-[#133384]' 
                    : idx < currentStep 
                    ? 'bg-[#133384]/40' 
                    : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-[11px] font-semibold text-slate-400">
              Langkah {currentStep + 1} dari {steps.length}
            </span>
            {step.badge && (
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-[#133384] border border-blue-100">
                {step.badge}
              </span>
            )}
          </div>
        </div>

        {/* Step Content */}
        <div className="p-5 pt-3">
          <h4 className="text-base font-bold text-slate-900 leading-snug mb-2">
            {step.title}
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            {step.description}
          </p>

          {step.tip && (
            <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <span className="font-semibold text-slate-800">Tips Penting: </span>
                {step.tip}
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation Buttons */}
        <div className="px-5 py-3.5 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between gap-3">
          {currentStep > 0 ? (
            <button
              onClick={handlePrev}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali</span>
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={handleNext}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#133384] hover:bg-[#0e245e] rounded-lg transition-all active:scale-[0.98] shadow-2xs"
            >
              <span>{isLastStep ? 'Mulai Main Sekarang' : 'Selanjutnya'}</span>
              {isLastStep ? (
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              ) : (
                <ArrowRight className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
