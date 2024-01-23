import { createBrowserRouter } from "react-router-dom";
import App from "../components/app/App";
import { PAGES_URL } from "./Routes";
import IndexPage from "../components/pages/IndexPage";

type routeType = {
  path: string;
  element: JSX.Element;
};

const routeMap: Record<string, JSX.Element> = {
  index: <IndexPage />,
};

const allRoutes: routeType[] = Object.entries(routeMap).map(([key, value]) => ({
  path: PAGES_URL[key as keyof typeof PAGES_URL],
  element: <App page={value} />,
}));

const router = createBrowserRouter(allRoutes);

export default router;
