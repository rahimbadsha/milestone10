import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Users from './components/users.jsx';
import UsersDetails from './components/UsersDetails.jsx';
import UpdateUser from './components/UpdateUser.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "users/:id",
    loader: ({ params }) => fetch(`http://localhost:3000/users/${params.id}`),
    Component: UsersDetails,
  },
  {
    path: "update/:id",
    loader: ({ params }) => fetch(`http://localhost:3000/users/${params.id}`),
    Component: UpdateUser,
  },
]);

//const root = document.getElementById("root");


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
