import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { NextUIProvider ,createTheme} from "@nextui-org/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//pages
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
//react-query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./index.css";
import ProductPage from "./pages/ProductPage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {
        path:"products",
        element:<ProductsPage/>,
      
      },
      {
        path:"products/:productId",
        element:<ProductPage/>
      }
    ]
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
]);

const lightTheme=createTheme({
type: "light",
theme:{
  colors: {
    // generic colors
    white: '#ffffff',
    black: '#000000',

    // background colors (light)
    background: "$white",
    backgroundAlpha: "rgba(255, 255, 255, 0.8)", // used for semi-transparent backgrounds like the navbar
    foreground: "$black",
    backgroundContrast: "$white",


    //semantic colors (light)
    blue50: '#EDF5FF',
    // ...
    blue900: '#00254D',
    // ...

    // brand colors
    primaryLight: '$blue200',
    primaryLightHover: '$blue300', // commonly used on hover state
    primaryLightActive: '$blue400', // commonly used on pressed state
    primaryLightContrast: '$blue600', // commonly used for text inside the component
    primary: '$blue600',
    primaryBorder: '$blue500',
    primaryBorderHover: '$blue600',
    primarySolidHover: '$blue700',
    primarySolidContrast: '$white', // commonly used for text inside the component
    primaryShadow: '$blue500'

    // ... rest of colors (secondary, success, warning, error, etc)
  }
}})

const darkTheme = createTheme({
  type: "dark", // it could be "light" or "dark"
  theme: {
    colors: {
      // brand colors
      primaryLight: '$green200',
      primaryLightHover: '$green300',
      primaryLightActive: '$green400',
      primaryLightContrast: '$green600',
      primary: '#4ADE7B',
      primaryBorder: '$green500',
      primaryBorderHover: '$green600',
      primarySolidHover: '$green700',
      primarySolidContrast: '$white',
      primaryShadow: '$green500',

      gradient: 'linear-gradient(112deg, $blue100 -25%, $pink500 -10%, $purple500 80%)',
      link: '#5E1DAD',

      // you can also create your own color
      myColor: '#ff4ecd'

      // ...  more colors
    },
    space: {},
    fonts: {}
  }
})

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <NextUIProvider>
        <RouterProvider router={router} />
      </NextUIProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
