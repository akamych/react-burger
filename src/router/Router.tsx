import { createBrowserRouter } from "react-router-dom";
import App from "../components/app/App";
import { PAGES_URL } from "./Routes";
import IndexPage from "../components/pages/IndexPage";

type routeType = {
  path: string;
  element: JSX.Element;
};

const allRoutes: routeType[] = [];

const routeMap: Record<string, JSX.Element> = {
  index: <IndexPage />,
};

Object.entries(routeMap).forEach(([key, value]) => {
  allRoutes.push({
    path: PAGES_URL[key as keyof typeof PAGES_URL],
    element: <App page={value} />,
  });
});

const router = createBrowserRouter(allRoutes);

export default router;
