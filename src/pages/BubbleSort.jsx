import React, { useEffect, useState, useContext, useRef } from "react";
import { sortContext } from "../context/SortingContext";
import Navbar from "../components/Navbar";
import "../styles/BubbleSort.css";

const BubbleSort = () => {
  const [sortBars, setSortBars] = useState([]);
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

  const stopRef = useRef(false);

  const bubbleSort = () => {
    const arr = [...array];
    const n = arr.length;
    let swapped;

    const sort = async () => {
      for (let i = 0; i < n - 1; i++) {
        swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
          setSortBars((prevBars) =>
            prevBars.map((bar, index) => {
              if (index === j) {
                return { ...bar, color: "red" }; // Highlight compared bars
              }

              if (index === j + 1) {
                return { ...bar, color: "blue" };
              }
              return bar; // Reset other bars to original color
            })
          );

          await new Promise((resolve) => setTimeout(resolve, 201 - speed));

          // setSortBars(prevArray=>prevArray.map((bar,index)=>))
          if (arr[j].height > arr[j + 1].height) {
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            swapped = true;
          }

          setSortBars([...arr]);
          if (stopRef.current) {
            setSortBars((prevBars) =>
              prevBars.map((bar) =>
                bar.color === "aqua" ? bar : { ...bar, color: "aqua" }
              )
            );
            return;
          }
        }

        arr[arr.length - i - 1].color = "yellow";
        setSortBars([...arr]);
        if (!swapped) {
          break;
        }
      }
      setSortBars(
        (prevBars) => prevBars.map((bar) => ({ ...bar, color: "yellow" })) // Color all bars blue if fully sorted
      );
    };
    sort();
    setIsStart(false);
  };

  useEffect(() => {
    if (isReset) {
      stopRef.current = true;
    }
  }, [isReset]);

  useEffect(() => {
    if (isStart) {
      stopRef.current = false;
      bubbleSort();
    }
  }, [isStart]);

  useEffect(() => {
    setSelected("bubble");
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

export default BubbleSort;
