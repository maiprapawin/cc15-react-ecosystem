import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const stylesObj = {
    backgroundColor: isDarkMode ? "black" : "white",
    color: isDarkMode ? "white" : "black",
  };

  const handleToggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <div className="App" style={stylesObj}>
      <h1>Theme App</h1>
      <button onClick={handleToggleTheme}>Toggle Theme</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
