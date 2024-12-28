import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import CurrentUserContext from "../../Context/CurrentUserContext";

//This function requires authorization to render the protected route
export function ProtectedRoute({ children, anonymous = false }) {
  //the 'anonymous' prop specifies authorization. if 'true', then anyone can access without logging in. If 'false', users have to log in
  const location = useLocation();
  const from = location.state?.from || "/";

  //retrieve isLoggedIN from CurrentUserContext Value
  const { isLoggedIn } = useContext(CurrentUserContext);

  // If the user is logged in we redirect them away from our
  // anonymous routes.
  if (anonymous && isLoggedIn) {
    return <Navigate to={from} />;
  }

  // If a user is not logged in and tries to access a route that
  // requires authorization, we redirect them to the /signin route.
  if (anonymous && !isLoggedIn) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  //otherwise, display children of current route
  return children;
}

export default ProtectedRoute;
