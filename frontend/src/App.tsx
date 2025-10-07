import { Route, Routes } from "react-router-dom";
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

const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />} path="/">
        <Route index element={<HomePage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="products/:id" element={<DrugDetailsPage />} />
      </Route>
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignUpPage />} />
      <Route path="forgot-password" element={<ForgotPasswordPage />} />
      <Route path="reset-password/:token" element={<ResetPasswordPage />} />
      <Route path="test/*" element={<TestPage />} />
      <Route path="cart" element={<Cart />} />
    </Routes>
  );
};

export default App;
