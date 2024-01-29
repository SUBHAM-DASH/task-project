import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Forgotpassword from "./pages/Forgotpassword.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddClient from "./pages/AddClient.tsx";
import ListClient from "./pages/ListClient.tsx";
import NavbarComp from "./components/NavbarComp.tsx";
import ClientInformation from "./pages/ClientInformation.tsx";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </div>
  );
};

const AppContent = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("task-token");
  const location = useLocation();
  const currentPath = location.pathname;
  const [clients, setClients] = useState([]);

  useEffect(() => {
    if (!token && currentPath === "/pages/login") {
      navigate("/pages/login");
      return;
    } else if (!token && currentPath === "/pages/signup") {
      navigate("/pages/signup");
      return;
    } else if (!token && currentPath === "/pages/forgot-password") {
      navigate("/pages/forgot-password");
      return;
    }
  }, [navigate, token, currentPath]);

  return (
    <div>
      <ToastContainer />
      {token && <NavbarComp setClients={setClients}/>}
      <div className="m-4">
        <Routes>
          {token ? (
            <>
              <Route path="/" element={<Navigate to={"pages/dashboard"} />} />
              <Route path="/pages/dashboard" element={<Dashboard />} />
              <Route path="/pages/add-client" element={<AddClient />} />
              <Route path="/pages/client-list" element={<ListClient clients={clients} setClients={setClients}/>} />
              <Route
                path="/pages/client-list/:id"
                element={<ClientInformation />}
              />
              {/* <Route path="*" element={<Navigate to="pages/dashboard" />} /> */}
            </>
          ) : (
            <>
              <Route path="pages/login" element={<Login />} />
              <Route path="pages/signup" element={<Signup />} />
              <Route
                path="pages/forgot-password"
                element={<Forgotpassword />}
              />
              <Route path="*" element={<Navigate to={"pages/login"} />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
};

export default App;
