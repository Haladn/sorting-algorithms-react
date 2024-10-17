import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import { sortContext } from "../context/SortingContext";

const Navbar = () => {
  const {
    size,
    setSize,
    speed,
    setSpeed,
    isStart,
    setIsStart,
    isReset,
    setIsReset,
    isStop,
    setIsStop,
    setSelected,
    selected,
  } = useContext(sortContext);

  return (
    <div className="navbar">
      <div className="logo">Sorting Algorithms</div>
      <div className="actions">
        <div className="start">
          <button className="btn" onClick={() => setIsStart(true)}>
            start
          </button>
        </div>
        {/* <div className="stop">
          <button className="btn" onClick={() => setIsStop(true)}>
            stop
          </button>
        </div> */}
        <div className="reset">
          <button className="btn" onClick={() => setIsReset(true)}>
            reset
          </button>
        </div>
        <div className="range">
          <label htmlFor="range-size">size</label>
          <input
            id="range-size"
            type="range"
            step={1}
            min={5}
            max={100}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
          />
        </div>
        <div className="range">
          <label htmlFor="range-speed">speed</label>
          <input
            id="range-speed"
            type="range"
            min={1}
            max={200}
            step={5}
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          />
        </div>
      </div>
      <div className="algorithm">
        <Link
          className={`link ${selected === "bubble" ? "active" : ""}`}
          onClick={() => setSelected("bubble")}
          to="/"
        >
          Bubble
        </Link>
        <Link
          className={`link ${selected === "quick" ? "active" : ""}`}
          onClick={() => setSelected("quick")}
          to="quick-sort"
        >
          Quick
        </Link>
        <Link
          className={`link ${selected === "merge" ? "active" : ""}`}
          onClick={() => setSelected("merge")}
          to="merge-sort"
        >
          Merge
        </Link>
        <Link
          className={`link ${selected === "insertion" ? "active" : ""}`}
          onClick={() => setSelected("insertion")}
          to="insertion-sort"
        >
          Insertion
        </Link>
        <Link
          className={`link ${selected === "selection" ? "active" : ""}`}
          onClick={() => setSelected("selection")}
          to="selection-sort"
        >
          Selection
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
