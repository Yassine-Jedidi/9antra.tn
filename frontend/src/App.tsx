import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminRoute from "./components/AdminRoute";
import LandingPage from "./components/LandingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminRoute />} />
      </Routes>
    </Router>
  );
}

export default App;
