import { useEffect } from "react";
import { Routes, Route, Outlet, Navigate, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute, UnauthenticatedOnlyRoute } from "./components/Auth/ProtectedRoute";

/* GLOBAL */
import Header from "./components/Header/Header";

import {
  AboutPage as VertexAboutPage,
  BusinessPage,
  CareerHubPage,
  ContactPage as VertexContactPage,
  FaqPage,
  FounderPage as VertexFounderPage,
  HomePage as VertexHomePage,
  LegalPage,
  NotFoundPage,
  PageMeta,
  ProjectPreviewPage,
  ServicePage,
  ServicesPage as VertexServicesPage,
  SiteLayout,
  WorkPage,
} from "./site/VertexSite";

/* AUTH & PROFILE COMPONENTS */
import Login from "./components/Auth/Login";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";
import VerifyEmail from "./components/Auth/VerifyEmail";
import Profile from "./components/Profile/Profile";
import Dashboard from "./pages/Dashboard/Dashboard";
import Settings from "./pages/Settings/Settings";

/* ADMIN */
import WebDevAdmin from "./pages/Admin/WebDevAdmin";
import AdminCustomers from "./pages/Admin/AdminCustomers";
import AdminMediaNotes from "./pages/Admin/AdminMediaNotes";
import AdminNoteEditor from "./pages/Admin/AdminNoteEditor";
import AdminJobs from "./pages/Admin/AdminJobs";
import AdminPrompts, { PromptEditor } from "./pages/Admin/AdminPrompts";
import PromptsPage from "./pages/Prompts/PromptsPage";

/* ================= LAYOUTS ================= */

function HomeLayout() {
  return (
    <SiteLayout>
      <PageMeta />
      <Outlet />
    </SiteLayout>
  );
}

function AuthLayout() {
  return <Outlet />;
}

function AdminLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

function RouteScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) {
        target.scrollIntoView();
      } else {
        window.scrollTo(0, 0);
      }
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return null;
}

/* ================= PAGES ================= */

function HomePage() {
  return <VertexHomePage />;
}

/* NEW PAGES */
import CareerJobsPage from "./pages/CareerJobs/CareerJobsPage";
import BlogPage from "./pages/Blog/BlogPage";

/* ================= ROUTES ================= */

export default function App() {
  return (
    <AuthProvider>
      <>
      <RouteScrollManager />
      <Routes>

        {/* MAIN WEBSITE */}
        <Route element={<HomeLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<VertexServicesPage />} />
          <Route path="/about" element={<VertexAboutPage />} />
          <Route path="/business/*" element={<BusinessPage />} />
          <Route path="/business/:serviceSlug" element={<ServicePage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/work/:projectSlug" element={<ProjectPreviewPage />} />
          <Route path="/privacy-policy" element={<LegalPage />} />
          <Route path="/terms" element={<LegalPage />} />
          <Route path="/portfolio-creation" element={<Navigate to="/work" replace />} />
          <Route path="/founder" element={<VertexFounderPage />} />
          
          {/* New Pages */}
          <Route path="/contact" element={<VertexContactPage />} />
          <Route path="/academy" element={<Navigate to="/" replace />} />
          <Route path="/digital-marketing/*" element={<Navigate to="/services#business-services" replace />} />
          <Route path="/technology" element={<Navigate to="/services" replace />} />
          <Route path="/students" element={<Navigate to="/services" replace />} />
          <Route path="/students/*" element={<Navigate to="/services" replace />} />
          
          <Route path="/technology/web-development/*" element={<Navigate to="/services#business-services" replace />} />

          <Route path="/career-jobs" element={<CareerJobsPage />} />
          <Route path="/career-jobs/:jobSlug" element={<CareerJobsPage />} />
          <Route path="/career-hub" element={<CareerHubPage />} />
          <Route path="/resources" element={<Navigate to="/career-hub" replace />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/prompts" element={<PromptsPage />} />
          <Route path="/prompts/:promptId" element={<PromptsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/verify-email" element={<VerifyEmail />} />

          {/* CUSTOM 404 */}
          <Route path="*" element={<NotFoundPage />} />

          {/* PROTECTED CUSTOMER ROUTES */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/orders" element={<Dashboard />} />
            <Route path="/projects" element={<Dashboard />} />
            <Route path="/enrollments" element={<Dashboard />} />
          </Route>
        </Route>

        <Route path="/portfolio/students" element={<Navigate to="/work" replace />} />
        <Route path="/portfolio/students/*" element={<Navigate to="/work" replace />} />

        <Route path="/web-development" element={<Navigate to="/business/website-development" replace />} />
        <Route path="/consultation" element={<Navigate to="/contact" replace />} />
        <Route path="/client-work" element={<Navigate to="/work" replace />} />

        {/* AUTH (UNAUTHENTICATED ONLY) */}
        <Route path="/signup" element={<Navigate to="/login" replace />} />
        <Route element={<UnauthenticatedOnlyRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Route>

        {/* ADMIN */}
        <Route element={<AdminLayout />}>
          <Route element={<ProtectedRoute requireAdmin={true} />}>
            <Route path="/admin/web-development" element={<WebDevAdmin />} />
            <Route path="/admin/customers" element={<AdminCustomers />} />
            <Route path="/admin/media-notes" element={<AdminMediaNotes />} />
            <Route path="/admin/media-notes/new" element={<AdminNoteEditor />} />
            <Route path="/admin/media-notes/:noteId/edit" element={<AdminNoteEditor />} />
            <Route path="/admin/jobs" element={<AdminJobs />} />
            <Route path="/admin/prompts" element={<AdminPrompts />} />
            <Route path="/admin/prompts/new" element={<PromptEditor />} />
            <Route path="/admin/prompts/:promptId/edit" element={<PromptEditor />} />
          </Route>
        </Route>

        {/* 404 handled inside HomeLayout */}

      </Routes>
      </>
    </AuthProvider>
  );
}
