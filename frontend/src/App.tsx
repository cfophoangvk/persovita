import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./common/layouts/MainLayout";
import LoginPage from "./auth/pages/LoginPage";
import SignUpPage from "./auth/pages/SignUpPage";
import ForgotPasswordPage from "./auth/pages/ForgotPasswordPage";
import ResetPasswordPage from "./auth/pages/ResetPasswordPage";
import ShopPage from "./drugs/pages/ShopPage";
import DrugDetailsPage from "./drugs/pages/DrugDetailsPage";
import TestPage from "./test/pages/TestPage";
import Cart from "./cart/pages/Cart";
import HomePage from "./main/HomePage";
import AboutPage from "./main/AboutPage";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./auth/stores/useAuthStore";
import { useEffect } from "react";
import ProfilePage from "./auth/pages/ProfilePage";

const App = () => {
  const { user, checkAuth, checkingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white-900">
        <div className="relative">
          <div className="w-20 h-20 border-amber-200 border-5 rounded-full" />
          <div className="w-20 h-20 border-amber-500 border-t-5 animate-spin rounded-full absolute left-0 top-0" />
          <div className="sr-only">Loading</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route element={<MainLayout />} path="/">
          <Route index element={<HomePage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="products/:id" element={<DrugDetailsPage />} />
          <Route
            path="profile"
            element={user ? <ProfilePage /> : <Navigate to="/login" />}
          />
        </Route>
        <Route
          path="login"
          element={!user ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="signup"
          element={!user ? <SignUpPage /> : <Navigate to="/" />}
        />
        <Route
          path="forgot-password"
          element={!user ? <ForgotPasswordPage /> : <Navigate to="/" />}
        />
        <Route
          path="reset-password/:token"
          element={!user ? <ResetPasswordPage /> : <Navigate to="/" />}
        />
        <Route path="test/*" element={<TestPage />} />
        <Route path="cart" element={<Cart />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
