import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NewPatient from "./pages/NewPatient";
import EditPatient from "./pages/EditPatient";
import ViewPatient from "./pages/ViewPatient";
import CalendarPage from "./pages/Calendar";
import AssessmentResults from "./pages/AssessmentResults";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/patient/new" element={<NewPatient />} />
          <Route path="/patient/edit/:id" element={<EditPatient />} />
          <Route path="/patient/view/:id" element={<ViewPatient />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/assessment-results" element={<AssessmentResults />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;