import { Route, Routes } from "react-router-dom";
import MainLayout from "./common/layouts/MainLayout";
import LoginPage from "./auth/pages/LoginPage";
import SignUpPage from "./auth/pages/SignUpPage";
import ForgotPasswordPage from "./auth/pages/ForgotPasswordPage";
import ResetPasswordPage from "./auth/pages/ResetPasswordPage";
import ShopPage from "./drugs/pages/ShopPage";
import DrugDetailsPage from "./drugs/pages/DrugDetailsPage";
import TestPage from "./test/pages/TestPage";

const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />} path="/">
        <Route index element={<div>Homepage</div>} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="products/:id" element={<DrugDetailsPage />} />
      </Route>
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignUpPage />} />
      <Route path="forgot-password" element={<ForgotPasswordPage />} />
      <Route path="reset-password/:token" element={<ResetPasswordPage />} />
      <Route path="test/*" element={<TestPage />} />
    </Routes>
  );
};

export default App;
