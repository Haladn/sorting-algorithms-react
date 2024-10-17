import React, { useState, createContext, useEffect } from "react";

export const sortContext = createContext();

const SortingContextProvider = ({ children }) => {
  const [array, setArray] = useState([]);
  const [size, setSize] = useState(50);
  const [speed, setSpeed] = useState(100);
  const [isStart, setIsStart] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [isStop, setIsStop] = useState(false);
  const [selected, setSelected] = useState("");

  const contextData = {
    isStart,
    setIsReset,
    isReset,
    setIsStart,
    array,
    setArray,
    size,
    setSize,
    speed,
    setSpeed,
    isStop,
    setIsStop,
    selected,
    setSelected,
  };

  const generateArray = () => {
    let newArr = [];
    // a random number between 10 to 700
    for (let i = 0; i <= size; i++) {
      const bar = {};
      bar.id = i;
      bar.height = Math.floor(Math.random() * (500 - 20 + 1)) + 20;
      bar.color = "aqua";
      bar.width = "1.5vw";
      newArr.push(bar);
    }
    setArray(newArr);
    setIsStart(false);
    setIsReset(false);
    setIsStop(false);
  };
  useEffect(() => {
    generateArray();
  }, [isReset, size, selected]);
  return (
    <sortContext.Provider value={contextData}>{children}</sortContext.Provider>
  );
};

export default SortingContextProvider;
