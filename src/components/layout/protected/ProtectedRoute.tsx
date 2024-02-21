import { useSelector } from "react-redux";
import { selectUser } from "../../../services/reducers/AuthReducer";
import { Navigate } from "react-router-dom";
import { PAGES_URL } from "../../../constants/RoutesUrls";

export const ACCESS_TYPES: Record<string, string> = {
  USERS: "USERS",
  GUESTS: "GUESTS",
  ALL: "ALL",
} as const;

type propTypes = {
  page: JSX.Element;
  access: (typeof ACCESS_TYPES)[keyof typeof ACCESS_TYPES];
};

const ProtectedRoute = (props: propTypes) => {
  const user = useSelector(selectUser);
  const { page, access } = props;

  if (user === null && access === ACCESS_TYPES.USERS) {
    return <Navigate to={PAGES_URL.LOGIN} replace />;
  }

  if (user !== null && access === ACCESS_TYPES.GUESTS) {
    return <Navigate to={PAGES_URL.INDEX} replace />;
  }

  return <>{page}</>;
};

export default ProtectedRoute;
