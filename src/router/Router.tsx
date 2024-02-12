import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../components/app/App";
import IndexPage from "../pages/index/IndexPage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <IndexPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export default router;
