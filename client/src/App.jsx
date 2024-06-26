import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import { GlobalProvider } from "./contexts/GlobalContext";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Blog from "./pages/Blog";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Create from "./pages/Create";

import { AuthProvider } from "./contexts/AuthContext";
import Protected from "./components/Protected";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Homepage />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/blogs/:category/:id/:title",
          element: <Blog />,
        },
        {
          path: "/sign-up",
          element: <Signup />,
        },
        {
          path: "/profile",
          element: (
            <Protected>
              <Profile />
            </Protected>
          ),
        },
        {
          path: "/create",
          element: (
            <Protected>
              <Create />
            </Protected>
          ),
        },
      ],
    },
  ]);
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <GlobalProvider>
          <RouterProvider router={router} />
        </GlobalProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
