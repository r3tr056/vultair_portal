interface ProgressBarProps {
    steps: string[]
    currentStep: number
}

export default function ProgressBar({ steps, currentStep }: ProgressBarProps) {
    return (
        <div className="mb-8">
            <div className="flex justify-between">
                {steps.map((step, index) => (
                    <div key={index} className="flex flex-col items-center">
                        <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${index <= currentStep ? 'bg-green-600 text-white' : 'bg-gray-300 text-gray-600'
                                }`}
                        >
                            {index + 1}
                        </div>
                        <span className="mt-2 text-xs text-gray-600">{step}</span>
                    </div>
                ))}
            </div>
            <div className="mt-4 h-2 bg-gray-200 rounded-full">
                <div
                    className="h-full bg-green-600 rounded-full transition-all duration-300 ease-in-out"
                    style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                ></div>
            </div>
        </div>
    )
}

