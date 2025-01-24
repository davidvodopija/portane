import React, {useEffect, useState} from "react";
import {Range} from "react-range";
import "./slider.css"

const MultiRangeSlider = ({min = 0, max = 1000, funcSetValues}) => {
    const [values, setValues] = useState([min, max]);
    useEffect(() => {
        funcSetValues({
            minPrice: values[0],
            maxPrice: values[1],
        });
    }, [values]);
    return (
        <div className="mx-3 mt-5 mb-4 slider">
            <Range
                step={1}
                min={min}
                max={max}
                values={values}
                onChange={(values) => setValues(values)} // Update values when slider moves
                renderTrack={({props, children}) => (
                    <div className="track" {...props}>
                        {children}
                    </div>
                )}
                renderThumb={({props, isDragged, index}) => {
                    const {key, ...restProps} = props;
                    return (
                        <div
                            key={key} // Explicitly set key here
                            {...restProps}
                            className="thumb-stick"
                        >
                            <div className="slider-text">
                                {values[index]}
                            </div>
                        </div>
                    );
                }}
            />
            {/*<div style={{marginTop: "20px"}}>
                <strong>Selected Range:</strong> {values[0]} - {values[1]}
            </div>*/
            }
        </div>
    );
};

export default MultiRangeSlider;
