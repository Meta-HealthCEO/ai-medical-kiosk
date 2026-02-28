interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export default function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-sm">
      <div className="h-2 bg-slate-800">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="px-6 py-3 flex justify-between items-center text-sm">
        <span className="text-slate-300">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-emerald-400 font-medium">
          {Math.round(progress)}% Complete
        </span>
      </div>
    </div>
  );
}
