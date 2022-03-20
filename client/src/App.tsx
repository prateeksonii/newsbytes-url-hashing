import { useAtom } from "jotai";
import { FC, useEffect, useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { privateApi } from "./api";
import loggedInAtom from "./atoms/loggedInAtom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";

const PublicRoute: FC = () => {
  const [loggedIn] = useAtom(loggedInAtom);

  if (loggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

const PrivateRoute: FC = () => {
  const [loggedIn] = useAtom(loggedInAtom);

  if (!loggedIn) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

const App: FC = () => {
  const [, setLoggedIn] = useAtom(loggedInAtom);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        await privateApi.get("/api/v1/auth");
        setLoggedIn(true);
      } catch (err) {
        setLoggedIn(false);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
