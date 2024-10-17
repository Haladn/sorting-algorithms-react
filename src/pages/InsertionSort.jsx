import React, { useContext, useState, useEffect, useRef } from "react";
import { sortContext } from "../context/SortingContext";
const InsertionSort = () => {
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

  const insertion = async () => {
    const arr = [...array];
    const n = arr.length;
    let i, j;

    const sort = async () => {
      console.log("started...");
      for (i = 1; i < n; i++) {
        let key = arr[i];
        setSortBars((prevBars) =>
          prevBars.map((bar, index) => {
            if (index == i) {
              return { ...bar, color: "red" };
            }
            if (index < i) {
              return { ...bar, color: "yellow" };
            }
            return { ...bar };
          })
        );
        j = i - 1;
        while (j >= 0 && arr[j].height > key.height) {
          setSortBars((prevBars) =>
            prevBars.map((bar, index) => {
              if (index == j + 1) {
                return { ...bar, color: "blue" };
              }
              if (index < i) {
                return { ...bar, color: "yellow" };
              }
              return { ...bar };
            })
          );
          arr[j + 1] = arr[j];
          j -= 1;

          if (stopRef.current) {
            setSortBars((prevBars) =>
              prevBars.map((bar) =>
                bar.color === "aqua" ? bar : { ...bar, color: "aqua" }
              )
            );
            return;
          }

          await new Promise((resolve) => setTimeout(resolve, 201 - speed));
        }

        arr[j + 1] = key;
        setSortBars([...arr]);
        if (stopRef.current) {
          return;
        }
      }
      setSortBars((prevBars) =>
        prevBars.map((bar) =>
          bar.color === "yellow" ? bar : { ...bar, color: "yellow" }
        )
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
      insertion();
    }
  }, [isStart]);

  useEffect(() => {
    setSelected("insertion");
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
export default InsertionSort;
