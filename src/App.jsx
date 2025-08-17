import Map from "./shared/components/Map.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import EditRoutePage from "@src/routes/pages/EditRoute.jsx";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/routes/:id" element={<EditRoutePage />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
