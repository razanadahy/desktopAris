import React from "react";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import LoginPage from "./Page/LoginPage";
import Inscription from "./Page/Inscription";
import MainContent from "./Page/MainContent";

function App() {
    return (
        <Router>
            <Routes>
              <Route path="/" element={<LoginPage/>} />
              <Route path="/inscription" element={<Inscription/>} />
              <Route path="/main" element={<MainContent/>} />
            </Routes>
        </Router>
    );
}

export default App;
