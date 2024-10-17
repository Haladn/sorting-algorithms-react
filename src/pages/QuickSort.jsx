import React, { useContext, useEffect, useState, useRef } from "react";
import { sortContext } from "../context/SortingContext";
import { quickSortAnimation } from "../utils/quickSortHelper";
const QuickSort = () => {
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

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, 201 - ms));

  const sorting = async () => {
    const animation = quickSortAnimation([...array]);
    for (let i = 0; i < animation.length; i++) {
      if (stopRef.current) {
        setSortBars((prevBars) =>
          prevBars.map((bar) =>
            bar.color === "aqua" ? bar : { ...bar, color: "aqua" }
          )
        );
        return;
      }

      const [action, indexOne, barOne, indexTwo, barTwo, pivotIndex] =
        animation[i];

      // Highlight the pivot if provided
      if (pivotIndex !== undefined) {
        setSortBars((prevBars) =>
          prevBars.map((bar, index) =>
            index === pivotIndex ? { ...bar, color: "yellow" } : bar
          )
        );
      }

      // Add a delay based on speed
      await delay(speed);

      switch (action) {
        case "compare":
          setSortBars((prevBars) =>
            prevBars.map((bar, index) => {
              if (index === indexOne) return { ...bar, color: "red" };
              if (index === indexTwo) return { ...bar, color: "blue" };
              if (index === pivotIndex) return { ...bar, color: "yellow" };
              return { ...bar, color: "aqua" };
            })
          );
          break;

        case "swap":
          setSortBars((prevBars) => {
            const newBars = [...prevBars];
            newBars[indexOne] = barTwo;
            newBars[indexTwo] = barOne;
            return newBars;
          });
          break;

        case "pivotSwap":
          setSortBars((prevBars) => {
            const newBars = [...prevBars];
            newBars[indexOne] = barTwo; // Move pivot to correct position
            newBars[indexTwo] = barOne; // Swap pivot
            return newBars;
          });
          break;

        default:
          break;
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
    setSelected("quick");
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

export default QuickSort;
