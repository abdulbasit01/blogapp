import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Protected = ({ children, authentication = true }) => {
  const authStatus = useSelector((state) => state.auth.status);
  const [loader, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    // TODO: make it more easy
    // true authStatus = false != true
    // navigate
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    //   False True !== True 
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }
    setLoading(false);
  }, [authStatus, navigate, authentication]);

  return loader ? <div>loading...</div>: <>{children}</>;
};

export default Protected;
