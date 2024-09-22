import { Navigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Use a custom React Hook function
export const IsUserLogged = () => {
  const UserStore = useSelector((store) => store.User);

  let isLogin = false;
  let isRefresh = false;
  const localToken = localStorage.getItem("token");

  if (!localToken) return { isLogin };

  if (localToken && !UserStore.token) {
    UserStore.token = localToken;
    isRefresh = true;
  }

  isLogin = true;
  return { isLogin, isRefresh, isToken: !!localToken };
};

export const ProtectedRoutes = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { isLogin, isRefresh } = IsUserLogged();

  // If the user is not authenticated
  if (!isLogin) {
    // User try to admin pages, redirect to login page
    if (location.pathname.search("admin") === 1) {
      return <Navigate to="/login" />;
    }

    // Redirect to unauthenticated pages
    return children;

    // If the user is already logged and try to login, redirect to home page
  } else if (isLogin && location.pathname === "/login") {
    return <Navigate to="/" />;
  } else {
    if (isLogin && isRefresh) {
      dispatch.User.fetchUser();
    }

    // Otherwise, allow access to the route
    return children;
  }
};
