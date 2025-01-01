import { useState } from "react";
import "./progress.css";

function ProgessBar() {
    const [ progressPercent, setProgressPercent ] = useState(0);
    const [ errorMsg, setErrorMsg ] = useState('');

    function handleProgessPercent(e) {
        setProgressPercent(e.target.value);
        if (e.target.value < 0) {
            setErrorMsg('Please enter a value greater than 0');
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
                    {progressPercent >= 0 && progressPercent <= 100
                        ? (
                            <div 
                                className="inner-wrapper"
                                style={{ width: `${progressPercent}%`}}
                            >
                                {progressPercent}
                            </div>
                        )
                        : <p className="error-msg">{errorMsg}</p>
                    }
                </div>
            </div>
            <div className="input-container">
                <label>Input Percentage: </label>
                <input
                    type="number"
                    value={progressPercent}
                    onChange={handleProgessPercent}
                />
            </div>
        </div>
    )
}

export default ProgessBar;