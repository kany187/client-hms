import { useEffect } from "react";
import { logout } from "../../services/user/auth-service";

const Logout = () => {
  useEffect(() => {
    logout();

    window.location.href = "/login";
  }, []);

  return null;
};

export default Logout;
