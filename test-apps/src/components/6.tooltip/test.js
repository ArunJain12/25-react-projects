import React from 'react';
import Tooltip from '.';
import './tooltip.css';

function TooltipTest() {
    return (
        <div>
            <h1>Tooltip</h1>
            <Tooltip delay={1000} content={'Tooltip Content'} children={<p>Hover Me!</p>} />
        </div>
    )
};

export default TooltipTest;