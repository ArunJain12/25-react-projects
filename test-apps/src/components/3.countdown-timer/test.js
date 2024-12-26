import React from 'react';
import CountDownTimer from '.';
import './timer.css';

function CountDownTimerTest() {
    const handleTimeFinish = () => {
        console.log('Timer Finished.');
    }

    return (
        <div className='countdown-timer-container'>
            <h1>CountDownTimer</h1>
            {/* initialTime passed will be in seconds */}
            <CountDownTimer initialTime={120} onTimeFinish={handleTimeFinish} />
        </div>
    )
}

export default CountDownTimerTest;