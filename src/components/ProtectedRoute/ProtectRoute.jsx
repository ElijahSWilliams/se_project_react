import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import LoginContext from "../../Context/LoginContext";

//This function requires authorization to render the protected route
export function ProtectedRoute({ children, anonymous = false }) {
  //the 'anonymous' prop specifies authorization. if 'true', then anyone can access without logging in. If 'false', users have to log in
  const location = useLocation();
  const from = location.state?.from || "/";
  // If the user is logged in we redirect them away from our
  // anonymous routes.
  if (anonymous && isLoggedIn) {
    return <Navigate to={from} />;
  }

  //retrieve isLoggedIN from LoginContext Value
  const { isLoggedIn } = useContext(LoginContext);

  // If a user is not logged in and tries to access a route that
  // requires authorization, we redirect them to the /login route.
  if (!anonymous && !isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  //otherwise, display children of current route
  return children;
}

export default ProtectedRoute;
