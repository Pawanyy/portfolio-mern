import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import ContactPage from "./pages/admin/ContactPage";
import DashboardPage from "./pages/admin/DashboardPage";
import TagsPage from "./pages/admin/TagsPage";
import CategoriesPage from "./pages/admin/CategoriesPage";
import PostsPage from "./pages/admin/PostsPage";
import PortfolioPage from "./pages/admin/PortfolioPage";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<Layout />}>
              <Route index path="dashboard" element={<DashboardPage />} />
              <Route path="tags" element={<TagsPage />} />
              <Route path="categories" element={<CategoriesPage />} />
              <Route path="posts" element={<PostsPage />} />
              <Route path="projects" element={<>Hi</>} />
              <Route path="portfolio" element={<PortfolioPage />} />
              <Route path="resume" element={<>Hi</>} />
              <Route path="contact" element={<ContactPage />} />
              <Route path="settings" element={<>Hi</>} />
              <Route path="builds" element={<>Hi</>} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
