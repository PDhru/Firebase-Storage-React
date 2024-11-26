import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserCRUD from "./components/UserCRUD";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserCRUD />} />
      </Routes>
    </Router>
  );
}

export default App;
