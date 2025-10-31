import { Form } from "./components/form";
import { Home } from "./components/home";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/addtask",
      element: <Form />,
    },
  ]);

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-40">
        <h1 className="mt-10 mb-4 text-3xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl">
          <span className="text-transparent bg-clip-text bg-linear-to-r to-emerald-600 from-sky-400">
            Todo
          </span>{" "}
          List
        </h1>

        <RouterProvider router={router} />
      </div>
    </>
  );
};

export default App;
