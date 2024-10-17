import React, { useState, useEffect, useRef, useContext } from "react";
import { sortContext } from "../context/SortingContext";
import { getMergeSortAnimations } from "../utils/mergeSortHelper";

const MergeSort = () => {
  const {
    size,
    setSize,
    speed,
    setSpeed,
    isStart,
    setIsStart,
    isReset,
    setIsReset,
    array,
    setSelected,
  } = useContext(sortContext);

  const [sortBars, setSortBars] = useState([]);
  const stopRef = useRef(false);
  const arrRef = useRef(0);

  const sorting = async () => {
    const animations = getMergeSortAnimations([...array]);
    for (let i = 0; i < animations.length; i++) {
      if (stopRef.current) {
        setSortBars((prevBars) =>
          prevBars.map((bar) =>
            bar.color === "aqua" ? bar : { ...bar, color: "aqua" }
          )
        );
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 201 - speed));
      if (i % 2 === 0) {
        const [indexOne, indexTwo] = animations[i];
        setSortBars((prevBars) =>
          prevBars.map((bar, index) => {
            if (index === indexOne) {
              return { ...bar, color: "red" };
            }

            if (index === indexTwo && indexTwo !== indexOne) {
              return { ...bar, color: "blue" };
            }

            return bar;
          })
        );
      } else {
        const [barOneIdx, barOne] = animations[i];
        setSortBars((prevBars) =>
          prevBars.map((bar, index) => {
            if (index === barOneIdx) {
              return barOne;
            }
            return { ...bar, color: "aqua" };
          })
        );
      }
    }

    setIsStart(false);
  };

  // set stopRef to false when start sorting
  useEffect(() => {
    if (isStart) {
      stopRef.current = false;
      sorting();
    }
  }, [isStart]);

  // when reseting the bars, stop sorting
  useEffect(() => {
    if (isReset) {
      stopRef.current = true;
    }
  }, [isReset]);

  //  at first render, set selected to merge then set the bars
  useEffect(() => {
    setSelected("merge");
    setSortBars(array);
  }, [array]);

  return (
    <div className="bubble-sort">
      {sortBars.map((bar, index) => (
        <div
          className="bar"
          key={index}
          style={{
            height: `${bar.height}px`,
            width: `${bar.width}`,
            backgroundColor: `${bar.color}`,
          }}
        >
          <div
            className="number"
            style={{ fontSize: `${size < 80 ? 13 : 8.5}px` }}
          >
            {bar.height}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MergeSort;
