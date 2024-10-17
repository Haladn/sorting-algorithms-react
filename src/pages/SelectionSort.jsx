import React, { useContext, useEffect, useState, useRef } from "react";
import { sortContext } from "../context/SortingContext";

const SelectionSort = () => {
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

  const selection = () => {
    const arr = [...array];
    const n = arr.length;

    const sort = async () => {
      for (let i = 0; i < n; i++) {
        let min_index = i;

        for (let j = i + 1; j < n; j++) {
          if (stopRef.current) {
            return;
          }
          //
          setSortBars((prevBars) =>
            prevBars.map((bar, index) => {
              if (index < i) {
                return { ...bar, color: "yellow" };
              }
              if (index === min_index) {
                return { ...bar, color: "red" };
              }
              if (index === j) {
                return { ...bar, color: "blue" };
              }

              return { ...bar, color: "aqua" };
            })
          );
          //
          if (arr[j].height < arr[min_index].height) {
            min_index = j;
          }
          await new Promise((resolve) => setTimeout(resolve, 201 - speed));
        }

        if (min_index !== i) {
          [arr[i], arr[min_index]] = [arr[min_index], arr[i]];
        }

        setSortBars([...arr]);
      }
      setSortBars((prevBars) =>
        prevBars.map((bar, index) => {
          if (bar.color !== "yellow") {
            return { ...bar, color: "yellow" };
          }
          return bar;
        })
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
      selection();
    }
  }, [isStart]);

  useEffect(() => {
    setSelected("selection");
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

export default SelectionSort;
