import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Helmet } from 'react-helmet';
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import "./assets/css/homepage.css";
import HomePage from "./pages/Frontend/HomePage";
import Index from "./components/Header";
import Construction from "../src/pages/Frontend/Construction";
// Libraries
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";


import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import ManageProducts from "./pages/AdminDashboard/ManageContent";
import DashboardHome from "./pages/AdminDashboard/DashboardHome";
import ClassCategory from "./components/ClassCategory";
import Description from "./components/description";
import Login from "./components/Auth/Login";
import  About from "./components/AboutSection";
import Register from "./components/Auth/Register";
import PrivateRoute from "./Routes/PrivateRoute";
import { AuthProvider } from "../src/contexts/AuthContext";
import DiscusionFourm from "../src/components/DiscussionFourm";
import Results  from "../src/components/Results";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Disclaimer from "./components/disclaimer";

const App = () => {
  const location = useLocation(); // Get the current location

  // Define the routes where the Index (header) and Sidebar should not be shown
  const excludedRoutes = ["/Add Grammar", "/ManageProducts"];
  const shouldShowHeaderAndSidebar = !excludedRoutes.includes(location.pathname);

  return (
    <div className="app-layout">
      <Index />
      <div className="main-content-wrapper">
        {/* Conditionally render Sidebar */}
        {shouldShowHeaderAndSidebar && <Sidebar />}
        <div className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route
              path="/*"
              element={
                <>
                  <HomePage />
                  <ClassCategory />

                </>
              }
            />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/construction" element={<Construction />} />
            <Route path="/description/:subCategory/:topicId" element={<Description />} />
            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<About />} />
            <Route path="/discussion_forum" element={<DiscusionFourm />} />
            <Route path="/results" element={<Results />} />
           
            
            {/* <Route path="/register" element={<Register />} /> */}

            {/* Private Routes */}
            <Route
              path="/Add Grammar"
              element={
                <PrivateRoute>
                  <DashboardHome />
                </PrivateRoute>
              }
            />
            <Route
              path="/ManageProducts"
              element={
                <PrivateRoute>
                  <ManageProducts />
                </PrivateRoute>
              }
            />
          </Routes>
        </div>
      </div>
      <Footer />
    </div>
  );
};

// Wrap App with Router and AuthProvider to access useLocation and provide authentication context
const AppWithRouter = () => (
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
);

export default AppWithRouter;