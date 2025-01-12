import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import './index.css'; // 글로벌 스타일 적용
import Sidebar from "./components/common/Sidebar/Sidebar";
import SearchBar from "./components/common/SearchBar/SearchBar";
import Home from "./components/common/Home/Home";
import Movies from "./components/common/Movies/Movies";
import TVSeries from "./components/common/TVseries/TVseries";
import Bookmarked from "./components/common/Bookmarked/Bookmarked";

const App = () => {
  return (
    <Router>
      <div className="app">
        {/* Sidebar */}
        <Sidebar />
        <div className="content">
          <Routes>
            {/* Home Page */}
            <Route
              path="/home"
              element={
                <>
                  <SearchBar />
                  <Home />
                </>
              }
            />

            {/* Movies Page */}
            <Route
              path="/movies"
              element={
                <>
                  <SearchBar />
                  <Movies />
                </>
              }
            />

            {/* TV Series Page */}
            <Route
              path="/tvseries"
              element={
                <>
                  <SearchBar />
                  <TVSeries />
                </>
              }
            />

            {/* Bookmarked Page */}
            <Route
              path="/bookmarked"
              element={
                <>
                  <SearchBar />
                  <Bookmarked />
                </>
              }
            />

            {/* Default Route */}
            <Route
              path="*"
              element={
                <>
                  <SearchBar />
                  <Home />
                </>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
