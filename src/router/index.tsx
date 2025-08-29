import { createBrowserRouter } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import HomeView from "../views/Home/HomeView";
import NotFoundView from "../views/NotFound/NotFoundView";
import DownloadView from "../views/Download/DownloadView";
import ContactView from "../views/Contact/ContactView";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomeView />,
      },
      {
        path: "/download",
        element: <DownloadView />,
      },
      {
        path: "/contact",
        element: <ContactView />,
      },
      {
        path: "*",
        element: <NotFoundView />,
      },
    ],
  },
]);

export default router;
