import { useState } from 'react';

function Tooltip({ children, content, delay }) {
    const [ isVisible, setIsVisible ] = useState(false);
    let timeout;

    function handleShowTooltip() {
        timeout = setTimeout(() => {
            setIsVisible(true);
        }, delay || 500);
    }

    function handleHideTooltip() {
        clearTimeout(timeout);
        setIsVisible(false);
    }

    if (!children) {
        console.error('children prop doesn\'t received a valid HTML element.');
        return null;
    }

    return (
        <div
            className='tooltip-container'
            onMouseEnter={handleShowTooltip}
            onMouseLeave={handleHideTooltip}
        >
            {children}
            {isVisible ? <div className='tooltip'>{content}</div> : null}
        </div>
    );
}

export default Tooltip;