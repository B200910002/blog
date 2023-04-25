import React, { useContext, Suspense } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

import { Containers } from "./constants/styles";
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
import Footer from "./components/Footer";
import EmailVerify from "./components/EmailVerify";
import Followers from "./components/Followers";
import Following from "./components/Following";
import ViewStory from "./components/story/ViewStory";

// const Auth = lazy(() => wait(1000).then(() => import("./pages/Auth")));
// const Login = lazy(() => wait(1000).then(() => import("./pages/Login")));
// const Register = lazy(() => wait(1000).then(() => import("./pages/Register")));
// const Profile = lazy(() => wait(1000).then(() => import("./pages/Profile")));
// const Home = lazy(() => wait(1000).then(() => import("./pages/Home")));
// const Contact = lazy(() => wait(1000).then(() => import("./pages/Contact")));
// const NoPage = lazy(() => wait(1000).then(() => import("./pages/NoPage")));
// const Header = lazy(() => wait(1000).then(() => import("./components/Header")));
// const Footer = lazy(() => wait(1000).then(() => import("./components/Footer")));

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
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
          <Route
            path="/user/:id/verify/:token"
            element={<EmailVerify />}
          ></Route>
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

const Layout = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
  return (
    <>
      {user && isAuthenticated ? (
        <>
          <Header />
          <div style={Containers.main}>
            <Suspense fallback={<h1>Loading...</h1>}>
                <StoryProvider>
                  <Outlet />
                </StoryProvider>
            </Suspense>
          </div>
          <Footer />
        </>
      ) : (
        <Navigate to="/auth/login" />
      )}
    </>
  );
};

// function wait(time) {
//   return new Promise((resolve) => {
//     setTimeout(resolve, time);
//   });
// }
