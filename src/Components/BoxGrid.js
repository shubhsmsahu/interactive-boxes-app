import React from 'react';
import '../Css/BoxGrid.css';

const BoxGrid = ({ boxes, onBoxClick }) => {
  const total = boxes.length;
  const topCount = Math.ceil(total / 3);
  const middleCount = Math.floor(total / 3);
  const bottomCount = total - topCount - middleCount;


    return (
        <div className="c-container">
            {/* Top row */}
            <div className="c-row">
            {Array.from({ length: topCount }).map((_, i) => (
                <div
                    key={i}
                    className="box"
                    style={{ backgroundColor: boxes[i] }}
                    onClick={() => onBoxClick(i)}
                />
            ))} 
            </div>

            {/* Middle column */}
            <div className="c-column">
            {Array.from({ length: middleCount }).map((_, i) => (
                <div className="c-middle" key={topCount + i}>
                    <div
                        className="box"
                        style={{ backgroundColor: boxes[topCount + i] }}
                        onClick={() => onBoxClick(topCount + i)}
                    />
                </div>
            ))}
            </div>

            {/*  Bottom row */}
            <div className="c-row">
            {Array.from({ length: bottomCount }).map((_, i) => (
                <div
                    key={topCount + middleCount + i}
                    className="box"
                    style={{ backgroundColor: boxes[topCount + middleCount + i] }}
                    onClick={() => onBoxClick(topCount + middleCount + i)}
                />
            ))}
            </div>

        </div>
  );
};

export default BoxGrid;
