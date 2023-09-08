import React, { useState, createContext, useContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

////// Context //////
// 1. createContext => import createContext ใช้สำหรับ [Provider, Consumer] => ชื่อ Context
const ThemeContext = createContext();

//// ฝั่ง Provider ////
//#### A1. สร้าง HOC: Higer Order Component (ทำหน้าที่เป็น Provider ผู้จัดหาหรือแชร์ข้อมูล) [ฝั่ง Provider เท่านั้น]
// HOC คือ FC ที่รับ Component เข้าไป และ return Component ใหม่ออกมา ที่เก่งขึ้น มีความสามารถมากขึ้น
// ทำให้ children มีความสามารถบางอย่างจากแม่ ที่ตอนแรกอาจจะไม่มีในตัวเอง (ตัวแม่ที่ครอบลูกไว้อยู่ คือ HOC)
// parent แชร์ของให้ children ได้เสมอ เลยอาจจะไม่ต้องส่ง props แล้ว

// function ThemeContextProvider(props) {
//   console.log(props);
//   return <div>{props.children}</div>;
// }

// function ThemeContextProvider(props) {
//   console.log(props);
//   return <ThemeContext.Provider>{props.children}</ThemeContext.Provider>;
// }

/* 
//#### A2. Share Data และหรือ Logic ผ่าน attribute ที่ชื่อว่า value
==> Data (state, boolean, string, object, array, etc.)
==> Logic (Fn ที่ใช้ handle ต่างๆ)
*/

// Data: มีสองตัวคือ isDarkMode & styleObj
// Logic: setIsDarkMode, handleToggleTheme
// Provider ต้องคิดว่าเราจะแชร์อะไรให้ consumer ดี แล้วต้องระบุไปว่าเราจะแชร์อะไรให้ลูก

function ThemeContextProvider(props) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const stylesObj = {
    backgroundColor: isDarkMode ? "black" : "white",
    color: isDarkMode ? "white" : "black",
  };

  const handleToggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const sharedObj = { theme: stylesObj, toggleTheme: handleToggleTheme };
  return (
    <ThemeContext.Provider value={sharedObj}>
      {props.children}
    </ThemeContext.Provider>
  );
}

/* 
//#### A3. นำ Provider ไปครอบ children [ฝั่ง Provider เท่านั้น]
  <ThemeContextProvider>
    <App />
  </ThemeContextProvider>
*/

// ######################################################
// ######################################################
// ######################################################
// ######################################################

//// ฝั่ง Consumer ////

/*
//#### B1.: @Children Component ดึงค่า Shared Object ผ่านตัว useContext
SYNTAX: useContext(ContextName)

eg. const sharedObj = useContext(ThemeContext)
=> ต้อง import useContext แล้วไปเรียกใช้ตรงแถว state
*/

// UI: Component
function App() {
  const s = useContext(ThemeContext);
  console.log(s); // App เข้าถึง value ที่แม่แชร์มาให้ได้แล้ว โดยไม่ต้องส่ง prop เลย

  return (
    <div className="App" style={s.theme}>
      <h1>Theme App</h1>
      <button onClick={s.toggleTheme}>Toggle Theme</button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeContextProvider>
    <App />
  </ThemeContextProvider>
);
