import { Route, Routes } from "react-router-dom";
import MainLayout from "./common/layouts/MainLayout";
import LoginPage from "./user/pages/LoginPage";

const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout />} path="/">
        <Route index element={<div>Homepage</div>} />
        <Route path="products" element={<div>ShopPage</div>} />
      </Route>
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<div>RegisterPage</div>} />
    </Routes>
  );
};

export default App;
