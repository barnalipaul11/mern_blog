// src/App.jsx
import { ThemeProvider } from "../src/components/theme-provider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../src/components/layout/Layout";

import { RouteBlog, RouteBlogAdd,RouteBlogEdit,RouteIndex, RouteProfile, RouteSignIn, RouteSignUp } from "./helpers/RouteName";
import SignIn from "./pages/Signin";
import SignUp from "./pages/Signup";
import Index from "./pages";
import Profile from "./pages/Profile"
import Addblog from "./pages/Addblog"
import BlogDetails from "./pages/BlogDetails";
import EditBlog from './pages/EditBlog'

const App = () => (
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path={RouteIndex} element={<Index />} />
          <Route path={RouteProfile} element={<Profile />} />
          
          <Route path={RouteBlogAdd} element={<Addblog />} />
          <Route path={RouteBlog} element={<BlogDetails/>} />
          <Route path={RouteBlogEdit()} element={<EditBlog/>} />
        </Route>

        <Route path={RouteSignIn} element={<SignIn/>}/>
        <Route path={RouteSignUp} element={<SignUp/>}/>
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
