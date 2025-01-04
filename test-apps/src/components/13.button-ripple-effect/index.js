import { useEffect, useState } from "react";
import "./ripple.css";

function ButtonRippleEffect() {
    const [ isRipplingEffect, setIsRipplingEffect ] = useState(false);
    const [ coordinates, setCoordinates ] = useState({ x: -1, y: -1 });

    function handleRippleEffect(event) {
        // console.log(
        //     event.target.getBoundingClientRect(),
        //     event.clientX,
        //     event.clientY
        // );
        const boundingRect = event.target.getBoundingClientRect();
        setCoordinates({
            x: event.clientX - boundingRect.left,
            y: event.clientY - boundingRect.top
        });
    }

    useEffect(() => {
        if ((coordinates.x !== -1) && (coordinates.y !== -1)) {
            setIsRipplingEffect(true);
            setTimeout(() => setIsRipplingEffect(false), 500);
        }
        else {
            setIsRipplingEffect(false);
        }
    }, [coordinates]);

    useEffect(() => {
        if (!isRipplingEffect) {
            setCoordinates({ x: -1, y: -1 });
        }
    }, [isRipplingEffect]);

    return (
        <div className="ripple-effect-container">
            <h1>Button Ripple Effect</h1>
            <button className="ripple-btn" onClick={handleRippleEffect}>
                {isRipplingEffect ? (
                    <span
                        className="ripple-inner-span"
                        style={{ left: coordinates.x, top: coordinates.y }}
                    >
                    </span>
                ) : null}
                Click button to See Ripple Effect
            </button>
        </div>
    );
}

export default ButtonRippleEffect;