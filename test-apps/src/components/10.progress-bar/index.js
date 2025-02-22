import { useState } from "react";
import "./progress.css";

function ProgessBar() {
    const [ progressPercent, setProgressPercent ] = useState(0);
    const [ errorMsg, setErrorMsg ] = useState('');

    function handleProgessPercent(e) {
        const progressNum = e.target.value;
        setProgressPercent(progressNum);
        if (String(progressNum).includes('-')) {
            setErrorMsg('Please enter only positive values greater than or equal to 0');
            return;
        }
        else if (e.target.value > 100) {
            setErrorMsg('Please enter a value less than 100');
            return;
        }
        setErrorMsg('');
    }

    return (
        <div className="progress-bar-container">
            <h1>Custom Progress Bar</h1>
            <div className="progress-bar">
                <div className={`${!errorMsg ? 'wrapper' : 'error-wrapper'}`}>
                    {String(progressPercent).includes('-') || progressPercent > 100
                        ? <p className="error-msg">{errorMsg}</p>
                        : (
                            <div 
                                className="inner-wrapper"
                                style={{ 
                                    width: `${progressPercent}%`,
                                    color: `${progressPercent >= 4 ? 'white': 'black'}`
                                }}
                                role="progressbar"
                            >
                                {progressPercent}%
                            </div>
                        )
                    }
                </div>
            </div>
            <div className="input-container">
                <label>Input Percentage: </label>
                <input
                    type="number"
                    value={progressPercent}
                    onChange={handleProgessPercent}
                    aria-label="progressPercentage"
                />
            </div>
        </div>
    )
}

export default ProgessBar;