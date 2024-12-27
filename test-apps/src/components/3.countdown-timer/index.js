import React, { useEffect, useRef, useState } from 'react';

// initialTime will be in miniseconds.
function CountDownTimer({ initialTime, onTimeFinish }) {
    const [ time, setTime ] = useState(initialTime);
    const [ isRunning, setIsRunning ] = useState(true);
    const [ isResetClicked, setIsResetClicked ] = useState(false);
    const intervalTimeRef = useRef();

    useEffect(() => {
        if (isRunning) {
            intervalTimeRef.current = setInterval(() => {
                setTime(prevTime => {
                    if (prevTime === 0) {
                        clearInterval(intervalTimeRef.current);
                        setIsRunning(false);
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }
        else {
            clearInterval(intervalTimeRef.current);
        }
        return () => clearInterval(intervalTimeRef.current);
    }, [isRunning, onTimeFinish]);

    function handlePauseAndResume() {
        setIsRunning(prevIsRunning => !prevIsRunning);
    }

    function handleStart() {
        if (time !== initialTime)
            setTime(initialTime);
        setIsRunning(true);
        setIsResetClicked(false);
    }
    
    function handleReset() {
        clearInterval(intervalTimeRef.current);
        setTime(initialTime);
        setIsRunning(false);
        setIsResetClicked(true);
    }

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return (
        <div className='countdown-timer'>
            <p>{String(minutes).padStart(2, '0')} : {seconds.toString().padStart(2, '0')}</p>
            <div className='timer-buttons'>
                <button disabled={isResetClicked || time === 0} onClick={handlePauseAndResume}>{isRunning ? 'Pause' : 'Resume'}</button>
                <button onClick={handleReset}>Reset</button>
                <button disabled={isRunning} onClick={handleStart}>Start</button>
            </div>
        </div>
    );
}

export default CountDownTimer;