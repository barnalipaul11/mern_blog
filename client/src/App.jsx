// src/App.jsx
import { ThemeProvider } from "../src/components/theme-provider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../src/components/layout/Layout";

import { RouteBlogAdd,RouteIndex, RouteProfile, RouteSignIn, RouteSignUp } from "./helpers/RouteName";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import Index from "./pages";
import Profile from "./pages/Profile"
import Addblog from "./pages/Addblog"

const App = () => (
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={RouteIndex} element={<Index />} />
          <Route path={RouteProfile} element={<Profile />} />
          <Route path={RouteBlogAdd} element={<Addblog />} />
        </Route>

        <Route path={RouteSignIn} element={<SignIn/>}/>
        <Route path={RouteSignUp} element={<SignUp/>}/>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
