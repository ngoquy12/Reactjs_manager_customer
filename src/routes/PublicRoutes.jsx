import React from "react";
import LoadLazy from "../components/LoadLazy";
import NotFound from "../pages/user/notFound";

const Home = React.lazy(() => import("../pages/user/home"));
const Contact = React.lazy(() => import("../pages/user/contact"));
const About = React.lazy(() => import("../pages/user/about"));
const Login = React.lazy(() => import("../pages/user/login"));

const PublicRoutes = [
  {
    path: "/",
    element: <LoadLazy children={<Home />} />,
  },
  {
    path: "/conact",
    element: <LoadLazy children={<Contact />} />,
  },
  {
    path: "/about",
    element: <LoadLazy children={<About />} />,
  },
  {
    path: "/login",
    element: <LoadLazy children={<Login />} />,
  },
  {
    path: "*",
    element: <LoadLazy children={<NotFound />} />,
  },
];

export default PublicRoutes;
