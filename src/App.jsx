import { useState, useContext, useEffect } from "react";
import SortingContextProvider from "./context/SortingContext";
import BubbleSort from "./pages/BubbleSort";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import QuickSort from "./pages/QuickSort";
import MergeSort from "./pages/MergeSort";
import InsertionSort from "./pages/InsertionSort";
import SelectionSort from "./pages/SelectionSort";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  return (
    <>
      <SortingContextProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="*" element={<BubbleSort />} />
            <Route path="/bubble-sort" element={<BubbleSort />} />
            <Route path="quick-sort" element={<QuickSort />} />
            <Route path="merge-sort" element={<MergeSort />} />
            <Route path="selection-sort" element={<SelectionSort />} />
            <Route path="insertion-sort" element={<InsertionSort />} />
          </Routes>
        </BrowserRouter>
      </SortingContextProvider>
    </>
  );
}

export default App;
