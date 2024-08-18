import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Header from "./components/header";
import About from "./components/about";
import Body from "./components/body";
import ReactDOM from "react-dom/client";
import "./index.css";
const AppLayout = () => {
  return (
    <div>
      <Header />
      <Body />
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
  },
  {
    path: "/about",
    element: <About />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);

export default AppLayout;
