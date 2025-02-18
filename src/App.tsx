import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NewPatient from "./pages/NewPatient";
import EditPatient from "./pages/EditPatient";
import ViewPatient from "./pages/ViewPatient";
import CalendarPage from "./pages/Calendar";
import AssessmentResults from "./pages/AssessmentResults";
import EditProfile from "./pages/EditProfile";
import Financial from "./pages/Financial";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/patients" element={<Index />} />
          <Route path="/patient/new" element={<NewPatient />} />
          <Route path="/patient/edit/:id" element={<EditPatient />} />
          <Route path="/patient/view/:id" element={<ViewPatient />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/assessment-results" element={<AssessmentResults />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/financial" element={<Financial />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;