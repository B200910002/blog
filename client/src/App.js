import React, { useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

import { AuthProvider, AuthContext } from "./context/AuthContext";
import { StoryProvider } from "./context/StoryContext";

import Auth from "./authentication/Auth";
import Login from "./authentication/Login";
import Register from "./authentication/Register";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import NoPage from "./pages/NoPage";

import Header from "./components/Header";
// import Footer from "./components/Footer";
import EmailVerify from "./components/EmailVerify";
import Followers from "./components/Followers";
import Following from "./components/Following";
import ViewStory from "./components/story/ViewStory";

export default function App() {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="login/register" element={<Register />} />
        <Route path="login/register/login" element={<Login />} />
      </Route>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route path="contact" element={<Contact />}></Route>
        <Route path=":email" element={<Profile />}>
          <Route index element={<ViewStory />} />
          <Route path="followers" element={<Followers />} />
          <Route path="following" element={<Following />} />
        </Route>
      </Route>
      <Route path="/user/:id/verify/:token" element={<EmailVerify />}></Route>
      <Route path="*" element={<NoPage />} />
    </Routes>
  );
}

const Layout = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
  return (
    <>
      {user && isAuthenticated ? (
        <>
          <Header />
          <hr style={{ margin: 0 }} />
          <div style={{ margin: "0 5%" }}>
            <StoryProvider>
              <Outlet />
            </StoryProvider>
          </div>
        </>
      ) : (
        <Navigate to="/auth/login" />
      )}
    </>
  );
};
