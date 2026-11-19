import { useState } from 'react';
import { ArrowRight, ArrowLeft, Check, HelpCircle, X } from 'lucide-react';

export interface TutorialStep {
  title: string;
  description: string;
  highlightText?: string;
}

interface GameTutorialModalProps {
  gameTitle: string;
  steps: TutorialStep[];
  onComplete: () => void;
  onSkip: () => void;
}

export default function GameTutorialModal({
  gameTitle,
  steps,
  onComplete,
  onSkip,
}: GameTutorialModalProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const isLast = currentStep === steps.length - 1;

  const handleNext = () => {
    if (isLast) {
      onComplete();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const step = steps[currentStep];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div 
        className="w-full max-w-md bg-white rounded-2xl border border-slate-200/90 shadow-xl overflow-hidden animate-fade-in flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-blue-100/70 text-[#133384]">
              <HelpCircle className="w-4 h-4" />
            </span>
            <span className="text-xs font-bold text-slate-800">
              Panduan Permainan • {gameTitle}
            </span>
          </div>

          <button
            onClick={onSkip}
            className="text-xs font-medium text-slate-400 hover:text-slate-700 transition-colors px-2 py-1"
          >
            Lewati
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* Step Indicator */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#133384] bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
              Langkah {currentStep + 1} dari {steps.length}
            </span>

            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {steps.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-200 ${
                    idx === currentStep
                      ? 'w-6 bg-[#133384]'
                      : 'w-2 bg-slate-200'
                  }`}
                />
              ))}
            </div>
          </div>

          <h3 className="text-base font-bold text-slate-900 leading-snug mb-2">
            {step.title}
          </h3>

          <p className="text-xs text-slate-600 leading-relaxed mb-4">
            {step.description}
          </p>

          {step.highlightText && (
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 text-xs text-slate-700 flex items-start gap-2">
              <span className="font-semibold text-[#133384] shrink-0">Catatan:</span>
              <span className="leading-relaxed">{step.highlightText}</span>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="px-5 py-3.5 border-t border-slate-100 bg-slate-50/40 flex items-center justify-between">
          <div>
            {currentStep > 0 ? (
              <button
                onClick={handlePrev}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Sebelumnya</span>
              </button>
            ) : (
              <button
                onClick={onSkip}
                className="text-xs font-medium text-slate-500 hover:text-slate-800 transition-colors"
              >
                Skip Tutorial
              </button>
            )}
          </div>

          <button
            onClick={handleNext}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#133384] hover:bg-[#0e245e] text-white text-xs font-semibold rounded-lg transition-all active:scale-[0.98] shadow-2xs"
          >
            <span>{isLast ? 'Mulai Permainan' : 'Selanjutnya'}</span>
            {isLast ? (
              <Check className="w-3.5 h-3.5 stroke-[2.5]" />
            ) : (
              <ArrowRight className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
