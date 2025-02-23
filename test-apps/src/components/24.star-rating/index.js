import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import "./star-rating.css";

export default function StarRating({ numberOfStars =  5 }) {
    const [ rating, setRating ] = useState(0);
    const [ hover, setHover ] = useState(0);

    function handleOnClick(currentIndex) {
        setRating(currentIndex);
    }

    function handleMouseEnter(currentIndex) {
        setHover(currentIndex);
    }

    function handleMouseLeave() {
        setHover(rating);
    }

    return (
        <div className="star-rating">
            {
                [...Array(numberOfStars)].map((_, index) => {
                    index += 1;

                    return (
                        <FaStar
                            className={(index <= (hover || rating)) ? 'active' : 'inactive'}
                            key={index}
                            size={40}
                            onClick={() => handleOnClick(index)}
                            onMouseMove={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                        />
                    )
                })
            }
        </div>
    );
};