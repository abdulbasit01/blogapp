import { useState } from "react";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { useEffect } from "react";
import { login, logout } from "./features/authSlice";
import { Outlet } from "react-router-dom";
import { Footer, Header } from "./components";
const App = () => {
  const [loading, setLoadig] = useState(true);
  useEffect(() => {
    authService
      .getCurrentUserSession()
      .then((response) => {
        if (response) {
          dispatch(login(response));
        }
      })
      .catch(() => dispatch(logout()))
      .finally(() => {
        setLoadig(false);
      });
  }, []);

  const dispatch = useDispatch();
  if (loading) {
    return <div>loading ...........</div>;
  }
  return (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>
          {/* TODO:  */}
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
