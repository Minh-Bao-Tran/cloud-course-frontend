import SideBar from "./shared/components/SideBar.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import EditRoutePage from "@src/routes/pages/EditRoute.jsx";
import NewRoutePage from "@src/routes/pages/NewRoute.jsx";

import "./App.css";

function App() {
  return (
    <Router>
      <SideBar></SideBar>
      <Routes>
        <Route path="/routes/new" element={<NewRoutePage />} ></Route>
        <Route path="/routes/:id" element={<EditRoutePage />} ></Route>
      </Routes>
    </Router>
  );
}

export default App;
