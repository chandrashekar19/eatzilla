import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Header from "./components/header";
import About from "./components/about";
import Body from "./components/body";
import ReactDOM from "react-dom/client";
import "./index.css";
import Error from "./components/error";
import Contact from "./components/contact";
import RestaurantMenu from "./components/restaurantMenu";
const AppLayout = () => {
  return (
    <div className="app">
      <Header />
      <Outlet />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/restaurant/:resId",
        element: <RestaurantMenu />,
      },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);

export default AppLayout;
