import React from 'react';

function StepProgressBar({ activeStep, steps, setActiveStep }) {
    function handlePrevStep() {
        setActiveStep(prevStep => Math.max(prevStep - 1, 0));
    }

    function handleNextStep() {
        setActiveStep(prevStep => Math.min(prevStep + 1, steps.length - 1));
    }

    function calculateCurrentStepWidth() {
        return `${(100 / (steps.length - 1)) * activeStep}%`;
    }

    return (
        <div>
            <div className='steps'>
                {steps && steps.length > 0
                    ? steps.map((stepItem, index) => (
                        <div key={index} className={`step ${index <= activeStep ? 'active' : ''}`} style={{width: calculateCurrentStepWidth()}}>{stepItem}</div>
                    ))
                    : null
                }
            </div>
            <div className='step-buttons-wrapper'>
                <button
                    disabled={activeStep === 0}
                    onClick={handlePrevStep}
                >
                    Prev
                </button>
                <button
                    disabled={activeStep === steps.length - 1}
                    onClick={handleNextStep}
                >
                    Next
                </button>
            </div>
        </div>
    )
}

export default StepProgressBar;