import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute, UnauthenticatedOnlyRoute } from "./components/Auth/ProtectedRoute";

/* GLOBAL */
import Header from "./components/Header/Header";
import SiteEngagementPrompt from "./components/SiteEngagementPrompt";

import {
  AboutPage as VertexAboutPage,
  BusinessPage,
  ContactPage as VertexContactPage,
  FounderPage as VertexFounderPage,
  HomePage as VertexHomePage,
  LegalPage,
  PageMeta,
  ProjectPreviewPage,
  ServicePage,
  ServicesPage as VertexServicesPage,
  SiteLayout,
  StudentsPage as VertexStudentsPage,
  WorkPage,
} from "./site/VertexSite";

/* AUTH & PROFILE COMPONENTS */
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import ForgotPassword from "./components/Auth/ForgotPassword";
import ResetPassword from "./components/Auth/ResetPassword";
import VerifyEmail from "./components/Auth/VerifyEmail";
import Profile from "./components/Profile/Profile";
import Dashboard from "./pages/Dashboard/Dashboard";
import Settings from "./pages/Settings/Settings";

/* PORTFOLIO */
import StudentsPage from "./pages/Portfolio/students/StudentsPage";
import ProfileSection from "./pages/Portfolio/students/sections/ProfileSection/ProfileSection";

/* ADMIN */
import WebDevAdmin from "./pages/Admin/WebDevAdmin";
import AdminCustomers from "./pages/Admin/AdminCustomers";
import AdminMediaNotes from "./pages/Admin/AdminMediaNotes";
import AdminNoteEditor from "./pages/Admin/AdminNoteEditor";
import AdminJobs from "./pages/Admin/AdminJobs";
import AdminPrompts, { PromptEditor } from "./pages/Admin/AdminPrompts";
import PromptsPage from "./pages/Prompts/PromptsPage";
import StudentNotesPage from "./pages/StudentNotes/StudentNotesPage";

/* ================= LAYOUTS ================= */

function HomeLayout() {
  return (
    <SiteLayout>
      <PageMeta />
      <Outlet />
    </SiteLayout>
  );
}

function StudentsLayout() {
  return <Outlet />;
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

/* ================= PAGES ================= */

function HomePage() {
  return <VertexHomePage />;
}

function NotFound() {
  return (
    <div style={{ padding: "120px", textAlign: "center" }}>
      <h1>404</h1>
      <p>Page not found</p>
    </div>
  );
}

/* NEW PAGES */
import CareerJobsPage from "./pages/CareerJobs/CareerJobsPage";
import TestimonialsPage from "./pages/Testimonials/TestimonialsPage";
import BlogPage from "./pages/Blog/BlogPage";

/* ================= ROUTES ================= */

export default function App() {
  return (
    <AuthProvider>
      <>
      <Routes>

        {/* MAIN WEBSITE */}
        <Route element={<HomeLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<VertexServicesPage />} />
          <Route path="/about" element={<VertexAboutPage />} />
          <Route path="/business/*" element={<BusinessPage />} />
          <Route path="/business/:serviceSlug" element={<ServicePage />} />
          <Route path="/students" element={<VertexStudentsPage />} />
          <Route path="/students/:serviceSlug" element={<ServicePage />} />
          <Route path="/work" element={<WorkPage />} />
          <Route path="/work/:projectSlug" element={<ProjectPreviewPage />} />
          <Route path="/privacy-policy" element={<LegalPage />} />
          <Route path="/terms" element={<LegalPage />} />
          <Route path="/portfolio-creation" element={<Navigate to="/students/portfolio-websites" replace />} />
          <Route path="/founder" element={<VertexFounderPage />} />
          
          {/* New Pages */}
          <Route path="/contact" element={<VertexContactPage />} />
          <Route path="/academy" element={<Navigate to="/" replace />} />
          <Route path="/digital-marketing/*" element={<Navigate to="/services#business-services" replace />} />
          <Route path="/technology" element={<Navigate to="/services" replace />} />
          <Route path="/students/notes/:noteSlug?" element={<StudentNotesPage />} />
          
          <Route path="/technology/web-development/*" element={<Navigate to="/services#business-services" replace />} />

          <Route path="/career-jobs" element={<CareerJobsPage />} />
          <Route path="/career-jobs/:jobSlug" element={<CareerJobsPage />} />
          <Route path="/prompts" element={<PromptsPage />} />
          <Route path="/prompts/:promptId" element={<PromptsPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/verify-email" element={<VerifyEmail />} />

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

        {/* STUDENTS PORTFOLIO */}
        <Route element={<StudentsLayout />}>
          <Route path="/portfolio/students" element={<StudentsPage />} />
          <Route
            path="/portfolio/students/profile"
            element={<ProfileSection />}
          />
        </Route>

        <Route path="/web-development" element={<Navigate to="/business/website-development" replace />} />
        <Route path="/consultation" element={<Navigate to="/contact" replace />} />
        <Route path="/client-work" element={<Navigate to="/work" replace />} />

        {/* AUTH (UNAUTHENTICATED ONLY) */}
        <Route element={<UnauthenticatedOnlyRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
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

        {/* 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>
      <SiteEngagementPrompt />
      </>
    </AuthProvider>
  );
}
