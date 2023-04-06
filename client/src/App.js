import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ALL COMPONENTS
import Navbar from "./components/Navbar";

// ALL CSS
import "./styles/navbar.scss";

function App() {
  return (
    <Router>
      {/* NAVBAR */}
      <Navbar />

      {/* ALL ROUTES */}
      <Routes>
        <Route
          path="/"
          element={
            <h1
              style={{
                paddingTop: "100px",
              }}
            >
              HOME
            </h1>
          }
        />
        <Route
          path="/about-us"
          element={
            <h1
              style={{
                paddingTop: "100px",
              }}
            >
              ABOUT US
            </h1>
          }
        />
        <Route
          path="/contact-us"
          element={
            <h1
              style={{
                paddingTop: "100px",
              }}
            >
              CONTACT US
            </h1>
          }
        />
        <Route
          path="/wishlist"
          element={
            <h1
              style={{
                paddingTop: "100px",
              }}
            >
              WISHLIST
            </h1>
          }
        />
        <Route
          path="/cart"
          element={
            <h1
              style={{
                paddingTop: "100px",
              }}
            >
              CART
            </h1>
          }
        />
        <Route
          path="/profile"
          element={
            <h1
              style={{
                paddingTop: "100px",
              }}
            >
              PROFILE
            </h1>
          }
        />
      </Routes>

      {/* FOOTERs */}
    </Router>
  );
}

export default App;
