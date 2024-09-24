import React from "react";
import LoadLazy from "../components/LoadLazy";

const LayoutAdmin = React.lazy(() => import("../layouts/admin/LayoutAdmin"));
const Dashborad = React.lazy(() => import("../pages/admin/dashborad"));
const Customer = React.lazy(() => import("../pages/admin/customer"));
const Product = React.lazy(() => import("../pages/admin/product"));

const PrivateRoutes = [
  {
    path: "/admin",
    element: <LoadLazy children={<LayoutAdmin />} />,
    children: [
      {
        index: true,
        element: <LoadLazy children={<Dashborad />} />,
      },
      {
        path: "customer",
        element: <LoadLazy children={<Customer />} />,
      },
      {
        path: "product",
        element: <LoadLazy children={<Product />} />,
      },
    ],
  },
];

export default PrivateRoutes;

// /admin/customer
// /admin/product =>  Nested Routes
