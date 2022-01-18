import React from "react";
import Posts from "./components/Posts";
import FilteredSearch from "./components/FilteredSearch";
import "./App.css";

function App() {
  return (
    <div className="App">
      <FilteredSearch />
      <Posts />
    </div>
  );
}

export default App;
