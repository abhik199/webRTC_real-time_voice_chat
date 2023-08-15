import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
// import { useSelector } from "react-redux"; // Import the useSelector hook
import Home from "./pages/Home/Home";
import Navigation from "./components/shared/Navigation/Navigation";
import "./App.css";

import Authenticate from "./pages/Authenticate/Authenticate";
import Activate from "./pages/Activate/Activate";
import Rooms from "./pages/Rooms/Rooms";
const isAuth = false;
const user = {
  activated: false,
};

const App = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route
          path="/"
          element={
            <GuestRoute>
              <Home />
            </GuestRoute>
          }
        />
        <Route
          path="/authenticate"
          element={
            <GuestRoute>
              <Authenticate />
            </GuestRoute>
          }
        />
        <Route
          path="/activate"
          element={
            <SemiProtectedRoute>
              <Activate />
            </SemiProtectedRoute>
          }
        />
        <Route
          path="/rooms"
          element={
            <ProtectedRoute>
              <Rooms />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

const GuestRoute = ({ children }) => {
  // const isAuth = useSelector((state) => state.auth.isAuth);
  return isAuth ? <Navigate to="/rooms" /> : children;
};

const SemiProtectedRoute = ({ children }) => {
  // const { user, isAuth } = useSelector((state) => state.auth);
  return (
    <>
      {!isAuth ? (
        <Navigate to="/" />
      ) : !user.activated ? (
        children
      ) : (
        <Navigate to="/rooms" />
      )}
    </>
  );
};

const ProtectedRoute = ({ children }) => {
  // const { user, isAuth } = useSelector((state) => state.auth);
  return (
    <>
      {!isAuth ? (
        <Navigate to="/" />
      ) : !user.activated ? (
        <Navigate to="/activate" />
      ) : (
        children
      )}
    </>
  );
};

export default App;
