import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import DashboardPage from "./pages/DashboardPage";
import CreateSurveyPage from "./pages/CreateSurveyPage";
import EditSurveyPage from "./pages/EditSurveyPage";
import SurveyResponsesPage from "./pages/SurveyResponsesPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegistrationPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/surveys/new" element={<CreateSurveyPage />} />
      <Route path="/surveys/:surveyId/edit" element={<EditSurveyPage />} />
      <Route
        path="/surveys/:surveyId/responses"
        element={<SurveyResponsesPage />}
      />
      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
}
