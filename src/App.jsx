import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AllRoutes from "./routes/AllRoutes";
import LoginHeader from "./components/LoginHeader";
import { restoreSession } from "./redux/authSlice";

function App() {
  const dispatch = useDispatch(); // Initialize useDispatch
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Dispatch restoreSession when the app loads
  useEffect(() => {
    dispatch(restoreSession());
  }, [dispatch]);

  return (
    <div>
      {/* Conditionally render the correct header based on authentication status */}
      {isAuthenticated ? <LoginHeader /> : <Header />}
      
      <AllRoutes />
      <Footer />
    </div>
  );
}

export default App;
