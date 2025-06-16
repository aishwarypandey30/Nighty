import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layouts/layout" ;
import HomePage from "./pages/HomePage";
import Auth0CallbackPage from "./pages/Auth0CallbackPage";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout> <HomePage/></Layout>} />
      <Route path="/auth-callback" element={<Auth0CallbackPage />}></Route>
      <Route path="/user-profile" element={<span>USER PROFILE PAGE</span>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
