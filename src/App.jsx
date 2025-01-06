import { useSelector } from "react-redux";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AllRoutes from "./routes/AllRoutes";
import LoginHeader from "./components/LoginHeader";

function App() {
  // Access the isAuthenticated state from the Redux store
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

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
