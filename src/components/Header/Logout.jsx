import { useDispatch } from "react-redux";
import { logout } from "../../features/authSlice";
import authService from "../../appwrite/auth";
import { Button } from "../common";
const Logout = () => {
  // TODO:
  const dispatch = useDispatch();
  const doLogout = () => {
    authService
      .logout()
      .then((response) => {
        console.log(response);
        dispatch(logout());
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      {/* <button className="inline-block px-6 py-2 duration-200 rounded-full hover:bg-blue-100" onClick={doLogout}>Logout</button> */}
      <Button onClick={doLogout}>Logout</Button>
    </>
  );
};

export default Logout;
